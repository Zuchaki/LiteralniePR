import React from "react";
import Key from "./Key";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";
import { Word } from "@/pages";

type Props = {
  addLLetterToArray: (clicedKey?: string) => void;
  deleteLastLetterFromArray: () => void;
  checkLastWordInArray: () => void;
  className?: string;
  words: Word[];
};
const Keyboard: React.FC<Props> = ({
  addLLetterToArray,
  deleteLastLetterFromArray,
  checkLastWordInArray,
  className,
  words,
}) => {
  const keysOnKeyboard = ["ąćęłóśńżź", "qwertyuiop", "asdfghjkl", "zxcvbnm"];
  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <div className="flex flex-col gap-2 items-center">
        {keysOnKeyboard.map((line) => (
          <div className="flex gap-1" key={line}>
            {line.split("").map((keyValue) => (
              <Key
                words={words}
                key={keyValue}
                keyValue={keyValue}
                onActive={addLLetterToArray}
                className="md:w-10 md:h-16 w-8 h-12"
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex w-full h-10 felx-row gap-2">
        <Key
          keyValue="Enter"
          onActive={checkLastWordInArray}
          className="w-full"
        />
        <Key
          icon={faBackspace}
          keyValue="Backspace"
          onActive={deleteLastLetterFromArray}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Keyboard;
