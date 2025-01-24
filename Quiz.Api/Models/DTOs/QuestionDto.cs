namespace QuizApp.DTOs;

public class QuestionDto
{
  public int Id { get; set; }
  public required string Text { get; set; }
  public required string Type { get; set; }
  public string[]? Options { get; set; }
}

