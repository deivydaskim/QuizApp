//TODO: SEED MORE DATA FROM JSON FILE

using Microsoft.EntityFrameworkCore;

namespace QuizApp.Models;

public class QuizContext : DbContext
{
  public QuizContext(DbContextOptions<QuizContext> options) : base(options) { }

  public DbSet<Question> Questions { get; set; }
  public DbSet<QuizResult> QuizResults { get; set; }

  // Method for seeding memory with hard coded values.
  public void SeedQuestions()
  {
    var questions = new List<Question>
    {
      new Question {
        Id = 1,
        Text = "What is 2 + 2?",
        Type = QuestionType.Radio,
        Options = ["4", "3", "5", "6"],
        CorrectAnswer = ["4"]
      },

      new Question {
        Id = 2,
        Text = "Select even numbers",
        Type = QuestionType.Checkbox,
        Options = ["1", "2", "3", "4" ],
        CorrectAnswer = ["2", "4"]
      },

      new Question {
        Id = 3,
        Text = "Type the capital of France",
        Type = QuestionType.Text,
        CorrectAnswer = ["Paris"]
      },
    };

    Questions.AddRange(questions);
    SaveChanges();
  }
}
