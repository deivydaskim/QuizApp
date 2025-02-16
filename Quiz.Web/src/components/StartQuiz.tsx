import { useRef, useState } from 'react';
import {
  Alert,
  Snackbar,
  TextField,
  Button,
  SnackbarCloseReason,
} from '@mui/material';
import { validateEmail } from '@/lib/utils';
import { useQuiz } from '@/hooks/useQuiz';

const StartQuiz = () => {
  const { setEmail, startQuiz } = useQuiz();
  const [snackbar, setSnackbar] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!emailRef.current) return;

    const email = emailRef.current.value.trim();
    const errorMessage = validateEmail(email);

    if (errorMessage) {
      setSnackbar(errorMessage);
      return;
    }

    setEmail(email);
    startQuiz();
  };

  const handleCloseSnackbar = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(null);
  };

  return (
    <>
      <div className="flex h-full flex-col items-center justify-around">
        <h1 className="text-primary text-center text-3xl font-bold">
          Welcome to the Quiz!
        </h1>

        <TextField
          type="email"
          inputRef={emailRef}
          fullWidth
          variant="outlined"
          label="Enter your email to start the quiz"
          error={!!snackbar}
          className="max-w-md"
        />

        <Button onClick={handleSubmit} variant="contained" color="primary">
          Start Quiz
        </Button>
      </div>

      <Snackbar
        open={!!snackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="error" onClose={handleCloseSnackbar}>
          {snackbar}
        </Alert>
      </Snackbar>
    </>
  );
};

export default StartQuiz;
