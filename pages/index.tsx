import { Inter } from "next/font/google";
import { useQuery } from "react-query";
import { getWords } from "../services/getWord";
import { useState } from "react";
import Keyboard from "../components/Keyboard/Keyboard";
import { endOfArray } from "@/utils/findEndOfArray";
import ResultsLetters from "../components/ResultsLetters/ResultsLetters";
import toast from "react-hot-toast";
import Modal from "@/components/Modal";

const inter = Inter({ subsets: ["latin"] });

export enum Status {
  FOUND = "FOUND",
  IN_THE_WRONG_PLACE = "IN_THE_WRONG_PLACE",
  MISS = "MISS",
  IN_TRY = "IN_TRY",
}

enum GameEndStatus {
  WIN = "WIN",
  LOST = "LOST",
}

type IsEnd = { isEnd: boolean; status: GameEndStatus };
export type Word = { letter: string; status: Status }[];

const Home = () => {
  const [words, setWords] = useState<Word[]>([[]]);
  const [isEnd, setIsEnd] = useState<IsEnd>();

  const {
    data: answerWord,
    isError,
    isLoading,
  } = useQuery({
    queryFn: () => getWords(),
    queryKey: ["words"],
  });

  const { data: checkWord } = useQuery({
    queryFn: () =>
      getWords(
        words[endOfArray(words).outer]
          .map((e) => e.letter)
          .join("")
          .toLowerCase()
      ),
    queryKey: [
      "words",
      words[endOfArray(words).outer]
        .map((e) => e.letter)
        .join("")
        .toLowerCase(),
    ],
  });

  const addLetterToArray = (clickedKey?: string) => {
    if (
      typeof clickedKey !== "string" ||
      endOfArray(words).inner >= 5 ||
      endOfArray(words).outer >= 5 ||
      isEnd
    )
      return;
    const newWords = [...words];
    newWords[endOfArray(words).outer] = [
      ...newWords[endOfArray(words).outer],
      {
        letter: clickedKey,
        status: Status.IN_TRY,
      },
    ];
    setWords(newWords);
  };

  const deleteLastLetterFromArray = () => {
    if (endOfArray(words).inner === 0) return;
    const newWords = [...words];
    newWords[endOfArray(words).outer] = newWords[endOfArray(words).outer].slice(
      0,
      -1
    );
    setWords(newWords);
  };

  const checkLastWordInArray = () => {
    if (endOfArray(words).inner < 5) return;
    if (!checkWord?.[0]?.slowo)
      return toast.error("Nie ma takiego słowa w bazie");
    const lastWordIndex = endOfArray(words).outer;
    const newWords = words;

    //Analyze the current word by comparing it to the answer and modify the status of every letter
    newWords[lastWordIndex].forEach((singleLetterOfNewWords, letterIndex) => {
      if (
        answerWord?.[0].slowo?.split("").includes(singleLetterOfNewWords.letter)
      ) {
        newWords[lastWordIndex][letterIndex] = {
          letter: newWords[lastWordIndex][letterIndex].letter,
          status: Status.IN_THE_WRONG_PLACE,
        };
      }
    });

    answerWord?.[0].slowo
      .toUpperCase()
      .split("")
      .forEach((letterOfSplitWord, index) => {
        if (
          letterOfSplitWord ===
          newWords[lastWordIndex][index].letter.toUpperCase()
        ) {
          newWords[lastWordIndex][index] = {
            letter: newWords[lastWordIndex][index].letter,
            status: Status.FOUND,
          };
        }
        if (newWords[lastWordIndex][index].status === "IN_TRY") {
          newWords[lastWordIndex][index] = {
            letter: newWords[lastWordIndex][index].letter,
            status: Status.MISS,
          };
        }
      });

    //Check if the user won or lost the game
    if (
      newWords[lastWordIndex].filter((letter) => letter.status === "FOUND")
        .length === 5
    ) {
      setIsEnd({ isEnd: true, status: GameEndStatus.WIN });
    }
    if (
      newWords[lastWordIndex].filter((letter) => letter.status === "FOUND")
        .length !== 5 &&
      endOfArray(newWords).outer === 4
    ) {
      setIsEnd({ isEnd: true, status: GameEndStatus.LOST });
    }

    //Close the current word and start a new one
    setWords([...newWords, []]);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something gone wrong</div>;
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <ResultsLetters words={words} className="mb-3" />
      <Keyboard
        addLLetterToArray={addLetterToArray}
        deleteLastLetterFromArray={deleteLastLetterFromArray}
        checkLastWordInArray={checkLastWordInArray}
        words={words}
      />
      <Modal
        onRequestClose={() => setIsEnd({ isEnd: false, status: isEnd!.status })}
        isOpen={!!isEnd?.isEnd}
        showCloseButton
        closeButtonLabel="Zamknij"
      >
        Gra skończona,
        {isEnd?.status === "WIN"
          ? ` udało ci się za: ${endOfArray(words).outer} próbą`
          : ` nie udało ci się zgadnąć słowa`}
      </Modal>
    </main>
  );
};

export default Home;
