import { useState } from "react";
import {
  getInRangeValue,
  pickRandom,
  pickWithProbabilityOf,
} from "@/lib/utils";
import { CHANGE_DIRECTION_PROBABILITY, Directions } from "@/lib/constants";

const getNewHead = (tail, direction, gridDimension) => {
  const head = tail.at(0);
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
    return pickRandom([Directions.LEFT, Directions.RIGHT]);
  } else {
    return pickRandom([Directions.UP, Directions.DOWN]);
  }
};

export function useSnake(gridDimension) {
  const [snake, setSnake] = useState({
    direction: Directions.RIGHT,
    tail: [
      { x: 9, y: 10 },
      { x: 8, y: 10 },
      { x: 7, y: 10 },
      { x: 6, y: 10 },
      { x: 5, y: 10 },
    ],
  });

  const walk = () => {
    setSnake((prevSnake) => {
      const direction = pickWithProbabilityOf(CHANGE_DIRECTION_PROBABILITY)
        ? pickRandomDirection(prevSnake.direction)
        : prevSnake.direction;
      const tail = [
        getNewHead(prevSnake.tail, prevSnake.direction, gridDimension),
        ...prevSnake.tail.slice(0, -1),
      ];
      return {
        direction,
        tail,
      };
    });
  };

  const growSnake = () => {
    // setSnake((prevSnake) => [...prevSnake, prevSnake.at(-1)]);
  };

  return { snake, walk, growSnake };
}
