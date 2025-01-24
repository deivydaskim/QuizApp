// TODO: ADD CHECK IF QUESTION ID IN ANSWERS IS NOT REPEATING, EACH SHOULD BE UNIQUE IN REQUEST BODY FOR SUBMIT
// TODO: CREATE ERROR HANDLING HERE AND IN CONTROLLER
// TODO: SEND RANDOM QUESTIONS FROM DB, MAXIMUM 10;

using Microsoft.EntityFrameworkCore;
using QuizApp.DTOs;
using QuizApp.Models;

namespace QuizApp.Services;

public class QuizService : IQuizService
{
  private readonly QuizContext _db;

  public QuizService(QuizContext context)
  {
    _db = context;
  }

  public async Task<List<QuestionDto>> GetQuestionsAsync()
  {
    var questions = await _db.Questions
        .Select(q => new QuestionDto
        {
          Id = q.Id,
          Text = q.Text,
          Type = q.Type.ToString(), // Convert enum value to its string name
          Options = q.Options
        })
        .ToListAsync();

    return questions;
  }

  public async Task<QuizResult> SubmitQuizAsync(QuizSubmitDto submission)
  {
    // Extract the question IDs from the answers
    var questionIds = submission.Answers.Select(a => a.QuestionId).Distinct().ToList();
    // Only fetch questions that are needed (matching the IDs in the submission)
    var questions = await _db.Questions
        .Where(q => questionIds.Contains(q.Id))
        .ToListAsync();

    int score = 0;
    const int default_points = 100;

    // Loop to check correct answers
    foreach (var answer in submission.Answers)
    {
      var question = questions.FirstOrDefault(q => q.Id == answer.QuestionId);

      // Skip if question is not found
      if (question == null)
      {
        continue;
      }

      // Skip if no answers are provided for this question
      if (answer.UserAnswer.Length == 0)
      {
        continue;
      }

      if (question.Type == QuestionType.Radio || question.Type == QuestionType.Text)
      {
        if (string.Equals(answer.UserAnswer[0], question.CorrectAnswer[0], StringComparison.OrdinalIgnoreCase))
        {
          score += default_points;
        }
      }
      else if (question.Type == QuestionType.Checkbox)
      {
        var correctQuizAnswer = question.CorrectAnswer;
        var selectedUserAnswer = answer.UserAnswer;

        // Check how many selected answers match the correct answers
        int correctCount = selectedUserAnswer.Count(opt => correctQuizAnswer.Contains(opt));
        int totalCorrect = correctQuizAnswer.Length;
        score += (default_points * correctCount + totalCorrect - 1) / totalCorrect; // Rounds up to integer
      }
    }

    var result = new QuizResult
    {
      Email = submission.Email,
      Score = score,
    };

    await _db.QuizResults.AddAsync(result);
    await _db.SaveChangesAsync();

    return result;
  }

  public async Task<List<HighScoreDto>> GetHighScoresAsync()
  {
    var highScores = await _db.QuizResults
        .OrderByDescending(e => e.Score)
        .ThenBy(e => e.SubmittedAt)
        .Take(10)
        .ToListAsync();

    var result = highScores.Select((e, i) => new HighScoreDto
    {
      Id = e.Id,
      Position = i + 1,
      Email = e.Email,
      Score = e.Score,
      SubmittedAt = e.SubmittedAt
    }).ToList();

    return result;
  }
}