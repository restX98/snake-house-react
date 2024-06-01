import { useState, useMemo } from "react";
import {
  getInRangeValue,
  pickRandom,
  pickWithProbabilityOf,
} from "@/lib/utils";
import { CHANGE_DIRECTION_PROBABILITY, Directions } from "@/lib/constants";
import AStarSearch from "@/lib/a-star-search";

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

export function useSnake(gridDimension, foods) {
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

  const grid = useMemo(() => {
    const g = new Array(gridDimension.rows);
    for (let i = 0; i < g.length; i++) {
      g[i] = new Array(gridDimension.cols).fill(1);
    }
    snake.tail.slice(1).forEach((s) => {
      if (g[s.y] && g[s.y][s.x]) {
        g[s.y][s.x] = 0;
      }
    });
    return g;
  }, [snake.tail, gridDimension.cols, gridDimension.rows]);

  const detectedFoods = useMemo(() => {
    return foods.filter(
      (f) =>
        !snake.ns.find((s) => s.x === f.x && s.y === f.y) &&
        !snake.tail.find((t) => t.x === f.x && t.y === f.y),
    );
  }, [snake.f_ns, foods]); // eslint-disable-line react-hooks/exhaustive-deps

  const walk = ({ digested }) => {
    setSnake((prevSnake) => {
      // Calculate next steps
      const ns = [...prevSnake.ns];
      detectedFoods.forEach((f) => {
        const source = ns.length > 0 ? ns.at(-1) : prevSnake.tail.at(0);
        const path = new AStarSearch(grid, source, f).find();
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

      let tail = digested ? prevSnake.tail : prevSnake.tail.slice(0, -1);

      // Cut tail if snake eaten itself
      const prevHead = prevSnake.tail.at(0);
      const eatenItself = tail
        .slice(1)
        .findIndex((t) => t.x === prevHead.x && t.y === prevHead.y);
      if (eatenItself > 0) {
        tail = tail.slice(0, eatenItself - 1);
      }

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
