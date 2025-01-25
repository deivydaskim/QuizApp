using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace QuizApp.Models;

public class QuizContext : DbContext
{
  public QuizContext(DbContextOptions<QuizContext> options) : base(options) { }

  public DbSet<Question> Questions { get; set; }
  public DbSet<QuizResult> QuizResults { get; set; }

  // Method for seeding questions from JSON file
  public void SeedQuestionsFromJson(string jsonFilePath)
  {
    if (Questions.Any()) return; // Skip seeding if there are already questions in the database

    try
    {
      var jsonData = File.ReadAllText(jsonFilePath);
      var options = new JsonSerializerOptions
      {
        PropertyNameCaseInsensitive = true,
      };
      // Convert enums to be as string names
      options.Converters.Add(new JsonStringEnumConverter());

      var questions = JsonSerializer.Deserialize<List<Question>>(jsonData, options);

      if (questions != null)
      {
        Questions.AddRange(questions);
        SaveChanges();
      }
    }
    catch (Exception ex)
    {
      Console.WriteLine($"Error seeding questions: {ex.Message}");
    }
  }
}
