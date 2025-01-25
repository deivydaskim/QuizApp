const apiUrl = import.meta.env.VITE_API_URL;

export const getQuizData = async () => {
  const response = await fetch(`${apiUrl}/api/quiz`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Unknown error');
  }

  return response.json();
};

export const submitQuizData = async (data: Record<string, unknown>) => {
  const response = await fetch(`${apiUrl}/api/quiz`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Unknown error');
  }

  return response.json();
};
