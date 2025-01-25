import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { getHighScores } from '@/lib/quizApi';
import { HighScore } from '@/types/quiz';
import { formatDate } from '@/lib/utils';

const HighscoresPage = () => {
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchHighScores = async () => {
      try {
        const data = await getHighScores();
        setHighScores(data);
      } catch (error) {
        console.error('Failed to fetch highscores:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHighScores();
  }, []);

  if (isError) {
    return <div className="text-center">Failed to load highscores.</div>;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <TableContainer className="h-full">
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Pos</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Submitted</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {highScores.map(({ id, position, email, score, submittedAt }) => {
            const positionClasses: Record<number, string> = {
              1: 'h-8 w-8 bg-yellow-500 text-white',
              2: 'h-7 w-7 bg-gray-400 text-white',
              3: 'bg-orange-500 text-white',
            };
            const positionClass = positionClasses[position] || 'bg-gray-200';

            return (
              <TableRow key={id}>
                <TableCell>
                  <div
                    className={`${positionClass} flex h-6 w-6 items-center justify-center rounded-full`}
                  >
                    {position}
                  </div>
                </TableCell>
                <TableCell className="max-w-40 break-words sm:max-w-80">
                  {email}
                </TableCell>
                <TableCell>{score}</TableCell>
                <TableCell>{formatDate(submittedAt)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HighscoresPage;
