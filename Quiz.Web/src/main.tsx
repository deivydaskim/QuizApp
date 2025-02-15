import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import './global.css';
import QuizPage from '@/pages/QuizPage';
import HighscoresPage from '@/pages/Highscores';
import Layout from '@/pages/Layout';
import { QuizProvider } from '@/context/QuizProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QuizProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<QuizPage />} />
            <Route path="highscores" element={<HighscoresPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QuizProvider>
  </StrictMode>,
);
