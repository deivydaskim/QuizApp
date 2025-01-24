import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import './global.css';
import HomePage from '@/pages/Home';
import HighscoresPage from '@/pages/Highscores';
import Layout from '@/pages/Layout';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="highscores" element={<HighscoresPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
