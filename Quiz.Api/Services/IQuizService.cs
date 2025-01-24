using QuizApp.DTOs;
using QuizApp.Models;

namespace QuizApp.Services;

public interface IQuizService
{
  Task<List<QuestionDto>> GetQuestionsAsync();
  Task<QuizResult> SubmitQuizAsync(QuizSubmitDto submission);
  Task<List<HighScoreDto>> GetHighScoresAsync();
}