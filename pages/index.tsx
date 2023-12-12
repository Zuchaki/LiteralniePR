import { Inter } from 'next/font/google';
import { useState } from 'react';
import { useQuery } from 'react-query';

import Loader from '@/components/Loader';
import Modal from '@/components/Modal';
import NetworkFetchError from '@/components/NetworkFetchError';
import Text from '@/components/Text';

import Keyboard from '../components/Keyboard/Keyboard';
import ResultsLetters from '../components/ResultsLetters/ResultsLetters';
import { getAnswerWord } from '../services/getAnswerWord';

const inter = Inter({ subsets: ['latin'] });

const Home = () => {
  const [userWordsAttempt, setUserWordsAttempt] = useState<string[]>(['']);
  const [isRezultModalOpen, setIsRezultModalOpen] = useState<boolean>(true);
  const { data, isError, isLoading, refetch } = useQuery({
    queryFn: () => getAnswerWord(),
    queryKey: ['anwserWord'],
  });

  if (isLoading) return <Loader className="h-screen" />;
  if (isError || !data)
    return <NetworkFetchError onRefetch={refetch} className="h-screen" />;

  const answerWord = data[0].slowo;
  const isGameWin = userWordsAttempt
    .slice(0, -1)
    .includes(answerWord.toLocaleUpperCase());

  return (
    <main
      className={`flex min-h-screen flex-col items-center pt-10 ${inter.className}`}
    >
      <ResultsLetters
        userWordsAttempt={userWordsAttempt}
        className="mb-3"
        answerWord={answerWord}
      />
      <Keyboard
        answerWord={answerWord}
        userWordsAttempt={userWordsAttempt}
        setUserWordsAttempt={setUserWordsAttempt}
      />
      <Modal
        isOpen={(isGameWin || userWordsAttempt.length > 6) && isRezultModalOpen}
        showCloseButton
        onRequestClose={() => setIsRezultModalOpen(false)}
        closeButtonLabel="Zamknij"
        header={isGameWin ? 'WYGRANA' : 'PRZEGRANA'}
      >
        <Text variant="sm" className="mb-2">
          Poprawne słowo: <span className="font-bold">{answerWord}</span>
        </Text>
        <Text variant="md">
          {isGameWin
            ? `Wygrałeś po ${userWordsAttempt.length - 1} ${
                userWordsAttempt.length === 2 ? 'próbie' : 'próbach'
              }`
            : 'Niestety dzisiaj nie udało Ci się wygrać, spróbuj ponownie jutro!'}
        </Text>
      </Modal>
    </main>
  );
};

export default Home;
