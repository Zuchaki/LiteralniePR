import classNames from 'classnames';

export enum ComparingStatus {
  FOUND,
  IN_WRONG_PLACE,
  MISS,
}
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

  const getComparisonStatus = () => {
    if (!letterAtIndex || !isComparable) return;
    const letterAtIndexOccurrencesInTargetWordToCompare = targetWordToCompare
      .split('')
      .filter((e) => e === letterAtIndex);
    const letterAtIndexOccurrencesInWord = word
      ?.split('')
      .slice(0, letterIndex + 1)
      .filter((e) => e === letterAtIndex);
    const occurrencesMatchingLettersLength =
      word
        ?.split('')
        ?.filter(
          (wordLetter, index) =>
            wordLetter === targetWordToCompare[index] &&
            wordLetter === letterAtIndex,
        ).length ?? 0;

    const isInWrongPlace =
      letterAtIndexOccurrencesInWord &&
      letterAtIndexOccurrencesInTargetWordToCompare.length -
        occurrencesMatchingLettersLength >=
        letterAtIndexOccurrencesInWord.length &&
      occurrencesMatchingLettersLength <
        letterAtIndexOccurrencesInTargetWordToCompare.length;
    const isFound = word?.[letterIndex] === targetWordToCompare[letterIndex];

    if (isFound) return ComparingStatus.FOUND;
    if (isInWrongPlace) return ComparingStatus.IN_WRONG_PLACE;
    return ComparingStatus.MISS;
  };

  return (
    <div
      className={classNames(
        'flex justify-center items-center text-neutral-1000 h-9 w-9 rounded-sm border-2 border-primary-400 font-semibold md:h-14 md:w-14 md:text-lg',
        className,
        {
          'bg-error !text-white border-none':
            getComparisonStatus() === ComparingStatus.MISS,
          'bg-warning !text-white border-none':
            getComparisonStatus() === ComparingStatus.IN_WRONG_PLACE,
          'bg-success !text-white border-none':
            getComparisonStatus() === ComparingStatus.FOUND,
        },
      )}
    >
      {letterAtIndex.toLocaleUpperCase()}
    </div>
  );
};

export default LetterPlaceholder;
