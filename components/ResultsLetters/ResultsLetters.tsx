import { Word } from "@/pages";
import createEmptyArray from "@/utils/createEmptyArray";
import SingleLetter from "./SingleLetter";

type Props = {
  words: Word[];
  className?: string;
};

const ResultsLetters: React.FC<Props> = ({ words, className }) => {
  const placeHolders = createEmptyArray(5, 5);

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {placeHolders.map((line, lineIndex) => (
        <div className="flex flex-row gap-1" key={lineIndex}>
          {line.map((_letter, letterIndex) => (
            <SingleLetter
              key={`${lineIndex}-${letterIndex}`}
              lineIndex={lineIndex}
              letterIndex={letterIndex}
              words={words}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ResultsLetters;
