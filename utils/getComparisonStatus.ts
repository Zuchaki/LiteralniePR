export enum ComparingStatus {
  FOUND,
  IN_WRONG_PLACE,
  MISS,
}

export const getComparisonStatusLetterPlaceholder = (
  letterIndex: number,
  targetWordToCompare: string,
  word?: string,
  letterAtIndex?: string,
) => {
  if (!word || !letterAtIndex) return;
  const letterAtIndexOccurrencesInTargetWordToCompare = targetWordToCompare
    .split('')
    .filter((e) => e === letterAtIndex);
  const letterAtIndexOccurrencesInWord = word
    .split('')
    .slice(0, letterIndex + 1)
    .filter((e) => e === letterAtIndex);
  const occurrencesMatchingLettersLength =
    word
      .split('')
      .filter(
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

export const getComparisonStatusKeyboardButton = (
  keyValue: string,
  previousWordsAttempt?: string[],
  targetWord?: string,
) => {
  if (!previousWordsAttempt || !targetWord) return;
  const isFound = previousWordsAttempt.some((wordToCompare) =>
    wordToCompare
      .toLocaleLowerCase()
      .split('')
      .some(
        (letterToCompare, index) =>
          letterToCompare === targetWord[index] && letterToCompare === keyValue,
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
