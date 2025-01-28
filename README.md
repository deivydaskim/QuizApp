# Quiz App

This is a web application that allows users to take quizzes and view high scores. The app is built with a React front-end, using Vite as the bundler, and an ASP.NET Core backend with an in-memory database to handle quiz logic.

## Technologies Used

### Frontend
- **React**: JavaScript library for building user interfaces.
- **React Router**: Library for handling routing and navigation in the React app.
- **TypeScript**: Adds type safety to the frontend.
- **Vite**: Fast and modern bundler for frontend development.
- **TailwindCSS**: Utility-first CSS framework for custom styling.
- **Material UI (MUI)**: Component library for React to build a modern user interface.

### Backend
- **ASP.NET Core**: Backend framework to provide REST API for the application with all logic.
- **Entity Framework Core**: Object-relational mapping (ORM) for database access.
- **In-memory Database**: Used for storing quiz data and high scores temporarily.
- **Swagger**: Integrated for API documentation.

## Features

- Take a quiz with a set of questions.
- Answers can be with single (radio, text) or multi (checkbox) value;
- View top 10 high scores.
- Backend handles all quiz calculation logic.
- Responsive design powered with TailwindCSS.
- Modern UI with MUI components.
- Error handling for both frontend and backend.

## Installation and Setup

### Prerequisites
- **Node.js**: Install [Node 18+ or 20+](https://nodejs.org/en/download).
- **.NET SDK**: Install [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0).
- **Bun (Optional)**: Install [Bun](https://bun.sh) for faster package management.
  

### 1. Clone the Repository
Run the following commands to clone the repository and navigate to the project folder:
1. `git clone https://github.com/deivydaskim/QuizApp.git`
2. `cd QuizApp`


### 2. Backend Setup
1. Navigate to the backend directory:
   - `cd Quiz.Api`
2. Restore dependencies:
   - `dotnet restore`
3. Run the backend:
   - `dotnet run`

The backend will run on `http://localhost:5054`, API docs - `http://localhost:5054/swagger/index.html`.

### 3. Frontend Setup
1. Navigate to the frontend directory:
   - `cd Quiz.Web`
2. Install dependencies:
   - `bun install` or `npm install`
3. Start the development server:
   - `bun dev` or `npm run dev`

The frontend will run on `http://localhost:5173`.