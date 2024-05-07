import { useState, useMemo } from "react";
import {
  getInRangeValue,
  pickRandom,
  pickWithProbabilityOf,
} from "@/lib/utils";
import { CHANGE_DIRECTION_PROBABILITY, Directions } from "@/lib/constants";
import { aStarSearch } from "@/lib/a-star-search";

const getNewHead = (snake, gridDimension) => {
  const head = snake.tail.at(0);
  switch (snake.direction) {
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

export function useSnake(gridDimension, digestFoodAt, foods) {
  const [snake, setSnake] = useState({
    ns: [],
    f_ns: false,
    direction: Directions.RIGHT,
    tail: [
      { x: 9, y: 10 },
      { x: 8, y: 10 },
      { x: 7, y: 10 },
      { x: 6, y: 10 },
      { x: 5, y: 10 },
    ],
  });

  const grid = new Array(gridDimension.rows).fill(
    new Array(gridDimension.cols).fill(1),
  );

  const detectedFoods = useMemo(() => {
    const det = foods.filter(
      (f) =>
        !snake.ns.find((s) => s.x === f.x && s.y === f.y) &&
        !snake.tail.find((t) => t.x === f.x && t.y === f.y),
    );
    return det;
  }, [snake.f_ns, foods]); // eslint-disable-line react-hooks/exhaustive-deps

  const walk = ({ haveEaten }) => {
    setSnake((prevSnake) => {
      // Calculate next steps
      const ns = [...prevSnake.ns];
      detectedFoods.forEach((f) => {
        const source = ns.length > 0 ? ns.at(-1) : prevSnake.tail.at(0);
        const path = aStarSearch(grid, source, f);
        path && ns.push(...path);
      });
      const f_ns = detectedFoods.length > 0 ? !prevSnake.f_ns : prevSnake.f_ns;

      // Update the direction
      const direction = pickWithProbabilityOf(CHANGE_DIRECTION_PROBABILITY)
        ? pickRandomDirection(prevSnake.direction)
        : prevSnake.direction;

      // Generate the new head and tail
      const head =
        ns.length > 0 ? ns.shift() : getNewHead(prevSnake, gridDimension);
      const tail = haveEaten ? prevSnake.tail : prevSnake.tail.slice(0, -1);

      return {
        direction,
        ns,
        f_ns,
        tail: [head, ...tail],
      };
    });
  };

  return { snake: snake.tail, walk };
}
