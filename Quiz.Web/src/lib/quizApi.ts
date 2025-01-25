const apiUrl = import.meta.env.VITE_API_URL;

export const fetchQuizData = async (endpoint: string) => {
  const response = await fetch(`${apiUrl}${endpoint}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Unknown error');
  }

  return response.json();
};
