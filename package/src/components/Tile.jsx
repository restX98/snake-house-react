"use client";

import { useState, useEffect } from "react";
import { useSnakeGameContext } from "@/context/snake-game-context";
import { cn } from "@/lib/utils";

function Tile({ coords }) {
  const { snake, foods, addFood } = useSnakeGameContext();
  const [isSnake, setIsSnake] = useState(false);
  const [isFood, setIsFood] = useState(false);

  useEffect(() => {
    setIsSnake(() =>
      snake.some((tail) => {
        return tail.x === coords.col && tail.y === coords.row;
      }),
    );

    setIsFood(() =>
      foods.some((food) => {
        return food.x === coords.col && food.y === coords.row;
      }),
    );
  }, [foods, snake, coords.col, coords.row]);

  return (
    <div
      onClick={() => addFood({ x: coords.col, y: coords.row })}
      className={cn("h-10 w-10 p-1", isSnake && isFood ? "p-px" : "p-1")}
    >
      <div
        className={cn(
          "h-full w-full rounded-sm p-px",
          isSnake ? "bg-green-700" : isFood ? "bg-red-700" : "bg-zinc-900",
        )}
      >
        <div
          className={cn(
            "h-full w-full rounded-sm",
            isSnake
              ? "bg-tile-snake shadow-tile-snake"
              : isFood
                ? "bg-tile-food shadow-tile-food"
                : "shadow-tile",
          )}
        ></div>
      </div>
    </div>
  );
}

export default Tile;
