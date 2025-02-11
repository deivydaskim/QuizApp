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
        .OrderBy(q => Guid.NewGuid()) // Random order
        .Take(10)
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
        var selectedUserAnswer = answer.UserAnswer.Distinct().ToArray(); // Also removes duplicates for checkbox answers

        // Check if the user selected exactly the correct answers (no extras)
        bool allAnswersCorrect = selectedUserAnswer.Length == correctQuizAnswer.Length && !selectedUserAnswer.Except(correctQuizAnswer).Any();

        if (allAnswersCorrect)
        {
          score += default_points;
        }
        else
        {
          int totalCorrect = correctQuizAnswer.Length;
          int valueForAnswer = default_points / totalCorrect;

          // Get how many user answers are correct, and how many incorrect
          int correctCount = selectedUserAnswer.Count(opt => correctQuizAnswer.Contains(opt));
          int incorrectCount = selectedUserAnswer.Length - correctCount;

          // Apply a score for correct answers, but penalize for incorrect selections
          int scoreAdjustment = (valueForAnswer * correctCount) - (valueForAnswer * incorrectCount);
          scoreAdjustment = Math.Max(scoreAdjustment, 0);  // Ensure score doesn't go below 0

          score += scoreAdjustment;
        }
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