export type Question = {
  id: number;
  text: string;
  type: 'Radio' | 'Checkbox' | 'Text';
  options?: string[];
};

export type Answer = {
  questionId: number;
  answer: string | string[];
};

export type Result = {
  id: number;
  email: string;
  score: number;
  submittedAt: string;
};
