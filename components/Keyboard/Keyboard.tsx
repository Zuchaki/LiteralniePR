import { faBackspace } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import type { Dispatch, SetStateAction } from 'react';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

import polishWordsList from '@/public/polishWords.json';

import KeyButton from './KeyButton';

type Props = {
  className?: string;
  userWordsAttempt: string[];
  setUserWordsAttempt: Dispatch<SetStateAction<string[]>>;
  answerWord: string;
};

const Keyboard: React.FC<Props> = ({
  className,
  userWordsAttempt,
  setUserWordsAttempt,
  answerWord,
}) => {
  const keysOnKeyboard = ['ąćęłóśńżź', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
  const currentUserWordAttempt = userWordsAttempt[userWordsAttempt.length - 1];

  const handleKeyPress = (keyValue: string) => {
    if (
      userWordsAttempt.length > 6 ||
      userWordsAttempt.slice(0, -1).includes(answerWord.toLocaleUpperCase())
    )
      return;
    if (
      keysOnKeyboard
        .join('')
        .split('')
        .find((e) => e === keyValue.toLocaleLowerCase()) &&
      currentUserWordAttempt.length < 5
    )
      return setUserWordsAttempt(
        userWordsAttempt.map((singleAttempt, index) =>
          index + 1 === userWordsAttempt.length
            ? singleAttempt.concat(keyValue.toLocaleUpperCase())
            : singleAttempt,
        ),
      );

    if (keyValue === 'Enter' && currentUserWordAttempt.length === 5) {
      return !polishWordsList.includes(
        currentUserWordAttempt.toLocaleLowerCase(),
      )
        ? toast.error('Brak słowa w bazie')
        : setUserWordsAttempt([...userWordsAttempt, '']);
    }
    if (keyValue === 'Backspace' && currentUserWordAttempt.length > 0)
      return setUserWordsAttempt(
        userWordsAttempt.map((singleAttempt, index) =>
          index + 1 === userWordsAttempt.length
            ? singleAttempt.slice(0, -1)
            : singleAttempt,
        ),
      );
  };

  const onKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();
    handleKeyPress(event.key);
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [userWordsAttempt]);

  return (
    <div className={classNames(`flex flex-col gap-6`, className)}>
      <div className="flex flex-col items-center gap-2">
        {keysOnKeyboard.map((keyboardRow) => (
          <div className="flex gap-1" key={keyboardRow}>
            {keyboardRow.split('').map((keyValue) => (
              <KeyButton
                onClick={() => handleKeyPress(keyValue)}
                previousWordsAttempt={userWordsAttempt?.slice(0, -1)}
                targetWord={answerWord}
                key={keyValue}
                keyValue={keyValue.toLocaleLowerCase()}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="felx-row flex w-full items-center justify-center gap-2">
        <KeyButton
          keyValue="Enter"
          onClick={() => handleKeyPress('Enter')}
          size="w-full"
        />
        <KeyButton
          isHiddenOnKeyValue
          icon={faBackspace}
          keyValue="Backspace"
          onClick={() => handleKeyPress('Backspace')}
          size="w-full"
        />
      </div>
    </div>
  );
};

export default Keyboard;
