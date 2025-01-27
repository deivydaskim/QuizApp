using Microsoft.EntityFrameworkCore;
using QuizApp.Models;
using QuizApp.Services;
using QuizApp.DTOs;

public class QuizServiceTests
{
  private QuizContext GetDbContextMockData()
  {
    var options = new DbContextOptionsBuilder<QuizContext>()
    // Creating unique database with Guid.NewGuid() for every test, IDisposable solution might be better for more tests;
      .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
      .Options;

    var dbContext = new QuizContext(options);

    dbContext.Questions.AddRange(
      [
        new Question
        {
          Id = 1,
          Text = "What is the capital of Lithuania?",
          Type = QuestionType.Radio,
          Options = ["Kaunas", "Vilnius", "Klaipėda", "Šiauliai"],
          CorrectAnswer = ["Vilnius"]
        },
        new Question
        {
          Id = 2,
          Text = "Select the colors of the Lithuanian flag.",
          Type = QuestionType.Checkbox,
          Options =  ["Red", "Green", "Blue", "Yellow"],
          CorrectAnswer = ["Yellow", "Green", "Red" ]
        },
        new Question
        {
          Id = 3,
          Text = "In what year did Lithuania declare independence from the Soviet Union?",
          Type = QuestionType.Text,
          Options = null,
          CorrectAnswer = ["1990"]
        }
      ]);

    dbContext.QuizResults.AddRange(
      [
        new QuizResult { Email = "test1@gmail.com", Score = 100 },
        new QuizResult { Email = "test2@gmail.com", Score = 300 },
        new QuizResult { Email = "test3@gmail.com", Score = 200 }
      ]);

    dbContext.SaveChanges();

    return dbContext;
  }

  private QuizService GetQuizServiceWithData()
  {
    var dbContext = GetDbContextMockData();

    return new QuizService(dbContext);
  }

  [Fact]
  public async Task GetQuestionsAsync_ShouldReturnQuestions()
  {
    var quizService = GetQuizServiceWithData();

    var questions = await quizService.GetQuestionsAsync();

    Assert.Equal(3, questions.Count);
  }

  [Fact]
  public async Task GetQuestionsAsync_ShouldReturnQuestionsInRandomOrder()
  {
    var quizService = GetQuizServiceWithData();

    var firstOrder = await quizService.GetQuestionsAsync();
    var secondOrder = await quizService.GetQuestionsAsync();

    Assert.NotEqual(firstOrder, secondOrder);
  }

  [Theory]
  [InlineData(1, new[] { "Vilnius" }, 100)]
  [InlineData(1, new[] { "Kaunas" }, 0)]
  public async Task SubmitQuizAsync_ShouldCalculateScores(int questionId, string[] answers, int expectedScore)
  {
    var quizService = GetQuizServiceWithData();

    var submission = new QuizSubmitDto
    {
      Email = "test@gmail.com",
      Answers = new List<UserAnswerDto>
        {
            new UserAnswerDto { QuestionId = questionId, UserAnswer = answers }
        }
    };

    var result = await quizService.SubmitQuizAsync(submission);

    Assert.Equal(expectedScore, result.Score);
  }

  // ID2: Select the colors of the Lithuanian flag
  [Theory]
  [InlineData(2, new[] { "Blue" }, 0)]
  [InlineData(2, new[] { "Red", "Red" }, 33)]
  [InlineData(2, new[] { "Yellow", "Red" }, 66)]
  [InlineData(2, new[] { "Yellow", "Red", "Blue" }, 33)]
  [InlineData(2, new[] { "Yellow", "Red", "Green" }, 100)]
  [InlineData(2, new[] { "Yellow", "Red", "Blue", "Green" }, 66)]
  public async Task SubmitQuizAsync_ShouldHandleCheckboxAnswersCorrectly(int questionId, string[] answers, int expectedScore)
  {
    var quizService = GetQuizServiceWithData();

    var submission = new QuizSubmitDto
    {
      Email = "test@gmail.com",
      Answers = new List<UserAnswerDto>
        {
            new UserAnswerDto { QuestionId = questionId, UserAnswer = answers }
        }
    };

    var result = await quizService.SubmitQuizAsync(submission);

    Assert.Equal(expectedScore, result.Score);
  }

  [Fact]
  public async Task GetHighScoresAsync_ShouldReturnHighScoresInDescendingOrder()
  {
    var quizService = GetQuizServiceWithData();

    var highScores = await quizService.GetHighScoresAsync();

    Assert.Equal(3, highScores.Count);
    var scores = highScores.Select(hs => hs.Score).ToList();
    Assert.True(scores.SequenceEqual(scores.OrderByDescending(score => score)));
  }

  [Fact]
  public async Task GetHighScoresAsync_ShouldReturnNoHighScores()
  {
    var dbContext = new QuizContext(
      new DbContextOptionsBuilder<QuizContext>()
        .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
        .Options);

    var quizService = new QuizService(dbContext);

    var highScores = await quizService.GetHighScoresAsync();

    Assert.Empty(highScores);
  }
}
