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
    if (questions == null || questions.Count == 0)
    {
      return NotFound("No questions found.");
    }
    return Ok(questions);
  }

  [HttpPost]
  public async Task<ActionResult> SubmitQuiz([FromBody] QuizSubmitDto submission)
  {
    if (submission == null)
    {
      return BadRequest("Quiz submission is required.");
    }

    var duplicateQuestions = submission.Answers
      .GroupBy(a => a.QuestionId)
      .Where(g => g.Count() > 1)
      .Select(g => g.Key)
      .ToList();

    if (duplicateQuestions.Any())
    {
      return BadRequest("Each question can only be answered once, no dublication!");
    }

    var result = await _quizService.SubmitQuizAsync(submission);

    if (result == null)
    {
      return BadRequest("Invalid quiz submission.");
    }
    return Ok(result);
  }

  [HttpGet("highscores")]
  public async Task<ActionResult<List<HighScoreDto>>> GetHighScores()
  {
    var highScores = await _quizService.GetHighScoresAsync();
    return Ok(highScores);
  }
}