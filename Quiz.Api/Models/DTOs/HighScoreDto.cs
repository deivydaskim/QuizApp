using System.ComponentModel.DataAnnotations;

namespace QuizApp.DTOs;

public class HighScoreDto
{
  public int Id { get; set; }
  public int Position { get; set; }
  public required string Email { get; set; }
  public int Score { get; set; }
  public DateTime SubmittedAt { get; set; }
}
