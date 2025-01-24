using System.ComponentModel.DataAnnotations;

namespace QuizApp.Models;

public class QuizResult
{
  [Key]
  public int Id { get; set; }
  public string? Email { get; set; }
  public int Score { get; set; }
  public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
}
