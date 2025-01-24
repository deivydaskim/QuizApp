using System.ComponentModel.DataAnnotations;

namespace QuizApp.Models;

public class Question
{
  [Key]
  public int Id { get; set; }
  public string? Text { get; set; }
  public QuestionType Type { get; set; }
  public string[]? Options { get; set; }
  public string[]? CorrectAnswer { get; set; }
}

public enum QuestionType
{
  Radio,
  Checkbox,
  Text
}
