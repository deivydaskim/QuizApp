import { useState } from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@mui/material';

import { QuestionTypeEnum, type Question } from '@/types/quiz';

type Props = {
  question: Question;
  initialAnswer: string | string[];
  onChange: (questionId: number, answer: string | string[]) => void;
};

const Question = ({ question, initialAnswer, onChange }: Props) => {
  const [answer, setAnswer] = useState(initialAnswer);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let newAnswer: string | string[];

    if (question.type === 'Checkbox') {
      const current = Array.isArray(answer) ? answer : [];
      newAnswer = e.target.checked
        ? [...current, value]
        : current.filter(a => a !== value);
    } else {
      newAnswer = value;
    }

    setAnswer(newAnswer);
    onChange(question.id, newAnswer);
  };

  return (
    <div className="flex grow flex-col justify-between overflow-y-auto px-2 [scrollbar-width:thin]">
      <h3 className="my-3 text-2xl font-medium text-gray-800">
        {question.text}
      </h3>
      {question.type === QuestionTypeEnum.RADIO && (
        <RadioGroup
          value={answer}
          onChange={handleChange}
          name={question.id.toString()}
        >
          {question.options?.map(option => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      )}
      {question.type === QuestionTypeEnum.CHECKBOX && (
        <div className="flex flex-col">
          {question.options?.map(option => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  value={option}
                  checked={answer.includes(option)}
                  onChange={handleChange}
                />
              }
              label={option}
            />
          ))}
        </div>
      )}
      {question.type === QuestionTypeEnum.TEXT && (
        <TextField
          type="text"
          value={answer || ''}
          onChange={handleChange}
          label="Enter answer"
          fullWidth
          size="small"
          autoComplete="off"
        />
      )}
    </div>
  );
};

export default Question;
