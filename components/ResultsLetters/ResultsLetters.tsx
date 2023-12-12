import classNames from 'classnames';

import LetterPlaceholder from './LetterPlaceholder';

type Props = {
  userWordsAttempt: string[];
  answerWord: string;
  className?: string;
};

const ResultsLetters: React.FC<Props> = ({
  userWordsAttempt,
  answerWord,
  className,
}) => {
  return (
    <div className={classNames('flex flex-col gap-2', className)}>
      {[...Array(6)].map((_word, wordIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="flex flex-row gap-2" key={wordIndex}>
          {[...Array(5)].map((_leter, letterIndex) => (
            <LetterPlaceholder
              // eslint-disable-next-line react/no-array-index-key
              key={letterIndex}
              letterIndex={letterIndex}
              word={userWordsAttempt[wordIndex]?.toLocaleLowerCase()}
              targetWordToCompare={answerWord}
              isComparable={userWordsAttempt.length > wordIndex + 1}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ResultsLetters;
