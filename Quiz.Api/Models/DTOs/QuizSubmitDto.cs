namespace QuizApp.DTOs;

public class QuizSubmitDto
{
  public required string Email { get; set; }
  public required List<UserAnswerDto> Answers { get; set; }
}

public class UserAnswerDto
{
  public required int QuestionId { get; set; }
  public required string[] UserAnswer { get; set; }
}
