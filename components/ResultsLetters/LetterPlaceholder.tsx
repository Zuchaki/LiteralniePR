import classNames from 'classnames';

import {
  ComparingStatus,
  getComparisonStatusLetterPlaceholder,
} from '@/utils/getComparisonStatus';

type Props = {
  word?: string;
  letterIndex: number;
  targetWordToCompare: string;
  isComparable?: boolean;
  className?: string;
};
const LetterPlaceholder: React.FC<Props> = ({
  word,
  letterIndex,
  targetWordToCompare,
  isComparable = false,
  className,
}) => {
  const letterAtIndex = word
    ? word.split('').find((_, index) => index === letterIndex) ?? ''
    : '';

  const comparisonStatus = isComparable
    ? getComparisonStatusLetterPlaceholder(
        letterIndex,
        targetWordToCompare,
        word,
        letterAtIndex,
      )
    : null;

  return (
    <div
      className={classNames(
        'flex justify-center items-center text-neutral-1000 h-9 w-9 rounded-sm border-2 border-primary-400 font-semibold md:h-14 md:w-14 md:text-lg',
        className,
        {
          'bg-error !text-white border-none':
            comparisonStatus === ComparingStatus.MISS,
          'bg-warning !text-white border-none':
            comparisonStatus === ComparingStatus.IN_WRONG_PLACE,
          'bg-success !text-white border-none':
            comparisonStatus === ComparingStatus.FOUND,
        },
      )}
    >
      {letterAtIndex.toLocaleUpperCase()}
    </div>
  );
};

export default LetterPlaceholder;
