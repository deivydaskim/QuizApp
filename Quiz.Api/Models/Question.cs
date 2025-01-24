using System.ComponentModel.DataAnnotations;

namespace QuizApp.Models;

public class Question
{
  [Key]
  public int Id { get; set; }
  public required string Text { get; set; }
  public required QuestionType Type { get; set; }
  public string[]? Options { get; set; }
  public required string[] CorrectAnswer { get; set; }
}

public enum QuestionType
{
  Radio,
  Checkbox,
  Text
}
