export const validateEmail = (email: string): string | null => {
  if (!email.trim()) return 'Please enter your email to start the quiz.';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Please enter a valid email address.';

  return null;
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString(undefined, {
    dateStyle: 'medium',
  });
};
