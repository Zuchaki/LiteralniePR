import { Word } from "@/pages";
import classNames from "classnames";

type Props = {
  words: Word[];
  lineIndex: number;
  letterIndex: number;
};
const SingleLetter: React.FC<Props> = ({ words, lineIndex, letterIndex }) => {
  const defaultClassName =
    "w-12 h-12 border flex border-primary-600 justify-center items-center";

  if (!words[lineIndex] || !words[lineIndex][letterIndex])
    return <div className={defaultClassName}>{""}</div>;

  return (
    <div
      className={classNames(defaultClassName, {
        "bg-success": words[lineIndex][letterIndex].status === "FOUND",
        "bg-warning":
          words[lineIndex][letterIndex].status === "IN_THE_WRONG_PLACE",
        "bg-neutral-600": words[lineIndex][letterIndex].status === "MISS",
      })}
    >
      {words[lineIndex][letterIndex].letter.toUpperCase()}
    </div>
  );
};

export default SingleLetter;
