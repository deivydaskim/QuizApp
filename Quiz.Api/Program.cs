using Microsoft.EntityFrameworkCore;
using QuizApp.Models;
using QuizApp.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddDbContext<QuizContext>(options => options.UseInMemoryDatabase("QuizDB"));
builder.Services.AddScoped<IQuizService, QuizService>();
builder.Services.AddCors(options =>
   {
        options.AddPolicy("AllowLocalhost", builder =>
           builder.WithOrigins("http://localhost:5173")
                  .AllowAnyMethod()
                  .AllowAnyHeader());
   });

var app = builder.Build();

// Seed database
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<QuizContext>();
    context.SeedQuestionsFromJson("Data/questions.json");
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("AllowLocalhost");
}

app.MapControllers();
app.Run();
