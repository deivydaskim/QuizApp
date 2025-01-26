import type { Question } from '@/types/quiz';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@mui/material';

type Props = {
  question: Question;
  answer: string | string[];
  onChange: (questionId: number, answer: string | string[]) => void;
};

const Question = ({ question, answer, onChange }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (question.type === 'Checkbox') {
      const currentAnswer = Array.isArray(answer) ? answer : [];

      onChange(
        question.id,
        e.target.checked
          ? [...currentAnswer, value]
          : currentAnswer.filter(a => a !== value),
      );
    } else {
      onChange(question.id, value);
    }
  };

  return (
    <div className="flex grow flex-col justify-between overflow-y-auto px-2 [scrollbar-width:thin]">
      <h3 className="my-3 text-2xl font-medium text-gray-800">
        {question.text}
      </h3>
      {question.type === 'Radio' && (
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
      {question.type === 'Checkbox' && (
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
      {question.type === 'Text' && (
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
