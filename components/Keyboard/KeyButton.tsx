import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import type { ComponentProps } from 'react';
import React from 'react';

import {
  ComparingStatus,
  getComparisonStatusKeyboardButton,
} from '@/utils/getComparisonStatus';

import Button from '../Button';

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
  const comparisonStatus = getComparisonStatusKeyboardButton(
    keyValue,
    previousWordsAttempt,
    targetWord,
  );

  return (
    <Button
      {...props}
      size={props.size ?? 'keyboardKey'}
      type="button"
      prefixIcon={icon}
      onBlur={() => {}}
      onClick={onClick}
      className={classNames(className, {
        '!bg-error text-white': comparisonStatus === ComparingStatus.MISS,
        '!bg-warning text-white':
          comparisonStatus === ComparingStatus.IN_WRONG_PLACE,
        '!bg-success text-white': comparisonStatus === ComparingStatus.FOUND,
      })}
    >
      {isHiddenOnKeyValue ? null : keyValue.toLocaleUpperCase()}
    </Button>
  );
};

export default KeyButton;
