import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import './global.css';
import QuizPage from '@/pages/QuizPage';
import HighscoresPage from '@/pages/Highscores';
import Layout from '@/pages/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QuizProvider } from './context/QuizProvider';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              index
              element={
                <QuizProvider>
                  <QuizPage />
                </QuizProvider>
              }
            ></Route>
            <Route path="highscores" element={<HighscoresPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
