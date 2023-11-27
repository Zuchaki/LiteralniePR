import { Word } from "@/pages";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, { useEffect } from "react";

type Props = {
  keyValue: string;
  onActive: (clicedKey?: string) => void;
  icon?: IconDefinition;
  className?: string;
  words?: Word[];
};
const Key: React.FC<Props> = ({
  keyValue,
  onActive,
  icon,
  className,
  words,
}) => {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onActive]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (
      event.key !== keyValue &&
      event.key !== keyValue.toLowerCase() &&
      event.key !== keyValue.toUpperCase()
    )
      return;
    return onActive(keyValue);
  };

  const letterStatus = words
    ?.map((word) => word.find((letter) => letter.letter === keyValue)?.status)
    .filter((status) => status)
    ?.sort((a, b) => {
      const order = { IN_TRY: 4, MISS: 3, IN_THE_WRONG_PLACE: 2, FOUND: 1 };
      return order[a ?? "IN_TRY"] - order[b ?? "IN_TRY"];
    });

  return (
    <button
      onClick={() => onActive(keyValue)}
      className={classNames(
        `border font-semibold border-secondary-800 rounded-md hover:bg-secondary-200 ${className}`,
        {
          "bg-neutral-600": letterStatus?.[0] === "MISS",
          "bg-warning": letterStatus?.[0] === "IN_THE_WRONG_PLACE",
          "bg-success": letterStatus?.[0] === "FOUND",
        }
      )}
    >
      {icon ? <FontAwesomeIcon icon={icon} /> : keyValue.toUpperCase()}
    </button>
  );
};

export default Key;
