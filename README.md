# Quiz App

This is a web application that allows users to take quizzes and view high scores. The app is written with built with a React front-end, using Vite as the bundler with Bun as package manager, and an ASP.NET Core backend with an in-memory database to handle quiz logic.

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
