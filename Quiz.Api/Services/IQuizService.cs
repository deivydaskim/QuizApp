using QuizApp.DTOs;

namespace QuizApp.Services;

public interface IQuizService
{
  Task<List<QuestionDto>> GetQuestionsAsync();
}