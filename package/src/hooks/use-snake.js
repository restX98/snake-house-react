import { useState } from "react";
import { getInRangeValue } from "@/lib/utils";
import { MAX_FORWARD_STEP, Directions } from "@/lib/constants";

const getNewHead = (snake, direction, gridDimension) => {
  const head = snake.at(0);
  switch (direction) {
    case "UP":
      return {
        x: head.x,
        y: getInRangeValue(head.y - 1, gridDimension.rows - 1),
      };
    case "RX":
      return {
        x: getInRangeValue(head.x + 1, gridDimension.cols - 1),
        y: head.y,
      };
    case "DW":
      return {
        x: head.x,
        y: getInRangeValue(head.y + 1, gridDimension.rows - 1),
      };
    case "LX":
      return {
        x: getInRangeValue(head.x - 1, gridDimension.cols - 1),
        y: head.y,
      };
    default:
      return {
        x: getInRangeValue(head.x + 1, gridDimension.cols - 1),
        y: head.y,
      };
  }
};

const pickRandomDirection = (direction) => {
  if (direction === Directions.UP || direction === Directions.DOWN) {
    return [Directions.LEFT, Directions.RIGHT].at(
      Math.floor(Math.random() * 2),
    );
  } else {
    return [Directions.UP, Directions.DOWN].at(Math.floor(Math.random() * 2));
  }
};

export function useSnake(gridDimension) {
  const [snake, setSnake] = useState([
    { x: 9, y: 10 },
    { x: 8, y: 10 },
    { x: 7, y: 10 },
    { x: 6, y: 10 },
    { x: 5, y: 10 },
  ]);

  const [direction, setDirection] = useState(Directions.RIGHT);
  const [changeCount, setChangeCount] = useState(0);

  const walk = () => {
    if (changeCount === 0) {
      setChangeCount(Math.floor(Math.random() * MAX_FORWARD_STEP) + 1);
      setDirection(pickRandomDirection(direction));
    } else {
      setChangeCount((prev) => prev - 1);
    }

    setSnake((prevSnake) => [
      getNewHead(snake, direction, gridDimension),
      ...prevSnake.slice(0, -1),
    ]);
  };

  const growSnake = () => {
    setSnake((prevSnake) => [...prevSnake, prevSnake.at(-1)]);
  };

  return { snake, walk, growSnake };
}
