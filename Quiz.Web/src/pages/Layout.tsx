import { Outlet, useNavigate } from 'react-router';

import { Button } from '@mui/material';

const Layout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-300 to-pink-300 p-4">
      <header className="mb-8 flex justify-center">
        <nav className="flex gap-8">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/')}
          >
            Start Quiz
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/highscores')}
          >
            High Scores
          </Button>
        </nav>
      </header>
      <div className="mx-auto h-[26rem] max-w-screen-sm rounded-xl bg-white p-4 shadow-2xl">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
