export const validateEmail = (email: string) => {
  // Basic email regex for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString(undefined, {
    dateStyle: 'medium',
  });
};