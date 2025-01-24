namespace QuizApp.DTOs;

public class QuestionDto
{
  public int Id { get; set; }
  public string? Text { get; set; }
  public string? Type { get; set; }
  public string[]? Options { get; set; }
}

