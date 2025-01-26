import { useState } from 'react';

import { Alert, Snackbar, TextField, Button } from '@mui/material';
import { validateEmail } from '@/lib/utils';

type Props = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  onStartQuiz: () => void;
};

const StartQuiz = ({ email, setEmail, onStartQuiz }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = () => {
    setError(null);

    if (email.trim() === '') {
      setError('Please enter your email to start the quiz.');
      setOpenSnackbar(true);
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setOpenSnackbar(true);
      return;
    }

    onStartQuiz();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <div className="flex h-full flex-col items-center justify-around">
        <h1 className="text-primary text-center text-3xl font-bold">
          Welcome to the Quiz!
        </h1>

        <TextField
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          fullWidth
          variant="outlined"
          label="Enter your email to start the quiz"
          className="max-w-md"
        />

        <Button onClick={handleSubmit} variant="contained" color="primary">
          Start Quiz
        </Button>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="error" onClose={handleCloseSnackbar}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default StartQuiz;
