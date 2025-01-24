import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import './global.css';
import QuizPage from '@/pages/Quiz.tsx';
import HighscoresPage from '@/pages/Highscores';
import MainLayout from '@/pages/MainLayout';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<QuizPage />} />
          <Route path="highscores" element={<HighscoresPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
