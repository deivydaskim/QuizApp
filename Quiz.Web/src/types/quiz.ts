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

type BaseResult = {
  id: number;
  email: string;
  score: number;
  submittedAt: string;
};

export type Result = BaseResult;

export type HighScore = BaseResult & {
  position: number;
};
