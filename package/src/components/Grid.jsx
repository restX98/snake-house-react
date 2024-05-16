"use client";

import Tile from "./Tile";
import { useSnakeGameContext } from "@/context/snake-game-context";
import { cn } from "@/lib/utils";

function isSnake(snake, coords) {
  if (!snake || !coords) return false;
  return snake.some((tail) => tail.x === coords.col && tail.y === coords.row);
}

function isFood(foods, coords) {
  if (!foods || !coords) return false;
  return foods.some((food) => food.x === coords.col && food.y === coords.row);
}

function Grid({ className }) {
  const { houseRef, gridDimension, snake, foods } = useSnakeGameContext();
  const _cols = Array.from({ length: gridDimension.cols }, (_, index) => index);
  const _rows = Array.from({ length: gridDimension.rows }, (_, index) => index);

  return (
    <div
      ref={houseRef}
      className={cn(className, "flex flex-col justify-evenly")}
    >
      {_rows.map((row) => (
        <div key={row} className="flex w-screen justify-evenly">
          {_cols.map((col) => (
            <Tile
              key={`${col}-${row}`}
              col={col}
              row={row}
              isSnake={isSnake(snake, { col, row })}
              isFood={isFood(foods, { col, row })}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;
