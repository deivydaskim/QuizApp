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
}