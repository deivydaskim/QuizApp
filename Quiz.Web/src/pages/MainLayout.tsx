import { Outlet, useNavigate } from 'react-router';

import Button from '@/components/Button';

const MainLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-300 to-pink-300 p-4">
      <header className="mb-8 flex justify-center">
        <nav className="flex gap-8">
          <Button variant="secondary" onClick={() => navigate('/')}>
            Start Quiz
          </Button>
          <Button variant="secondary" onClick={() => navigate('/highscores')}>
            High Scores
          </Button>
        </nav>
      </header>
      <div className="mx-auto h-96 max-w-screen-sm rounded-xl bg-white p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
