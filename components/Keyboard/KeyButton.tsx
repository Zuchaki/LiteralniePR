import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import type { ComponentProps } from 'react';
import React from 'react';

import Button from '../Button';
import { ComparingStatus } from '../ResultsLetters/LetterPlaceholder';

type Props = {
  keyValue: string;
  icon?: IconDefinition;
  isHiddenOnKeyValue?: boolean;
  className?: string;
  previousWordsAttempt?: string[];
  targetWord?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & ComponentProps<typeof Button>;
const KeyButton: React.FC<Props> = ({
  keyValue,
  icon,
  className,
  onClick,
  previousWordsAttempt,
  targetWord,
  isHiddenOnKeyValue = false,
  ...props
}) => {
  const getComparisonStatus = () => {
    if (!previousWordsAttempt || !targetWord) return;
    const isFound = previousWordsAttempt.some((wordToCompare) =>
      wordToCompare
        .toLocaleLowerCase()
        .split('')
        .some(
          (letterToCompare, index) =>
            letterToCompare === targetWord[index] &&
            letterToCompare === keyValue,
        ),
    );
    const isInWrongPlace = previousWordsAttempt.some(
      (wordToCompare) =>
        wordToCompare.toLocaleLowerCase().includes(keyValue) &&
        targetWord.includes(keyValue),
    );
    const isMiss = previousWordsAttempt.some(
      (wordToCompare) =>
        wordToCompare.toLocaleLowerCase().includes(keyValue) &&
        !targetWord.includes(keyValue),
    );

    if (isFound) return ComparingStatus.FOUND;
    if (isInWrongPlace) return ComparingStatus.IN_WRONG_PLACE;
    if (isMiss) return ComparingStatus.MISS;
  };
  return (
    <Button
      {...props}
      size={props.size ?? 'keyboardKey'}
      type="button"
      prefixIcon={icon}
      tabIndex={-1}
      onBlur={() => {}}
      onClick={onClick}
      className={classNames(className, {
        '!bg-error text-white': getComparisonStatus() === ComparingStatus.MISS,
        '!bg-warning text-white':
          getComparisonStatus() === ComparingStatus.IN_WRONG_PLACE,
        '!bg-success text-white':
          getComparisonStatus() === ComparingStatus.FOUND,
      })}
    >
      {isHiddenOnKeyValue ? null : keyValue.toLocaleUpperCase()}
    </Button>
  );
};

export default KeyButton;
