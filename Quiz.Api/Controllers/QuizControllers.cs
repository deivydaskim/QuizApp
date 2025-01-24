using Microsoft.AspNetCore.Mvc;
using QuizApp.DTOs;
using QuizApp.Services;

namespace QuizApp.Controllers;

[ApiController]
[Route("api/quiz")]

public class QuizController : ControllerBase
{
  private readonly IQuizService _quizService;

  public QuizController(IQuizService quizService)
  {
    _quizService = quizService;
  }

  [HttpGet]
  public async Task<ActionResult<List<QuestionDto>>> GetQuestions()
  {
    var questions = await _quizService.GetQuestionsAsync();
    return Ok(questions);
  }

  [HttpPost]
  public async Task<ActionResult> SubmitQuiz([FromBody] QuizSubmitDto submission)
  {
    var result = await _quizService.SubmitQuizAsync(submission);
    return Ok(result);
  }
}