"use client";

import { memo } from "react";
import { useSnakeGameContext } from "@/context/snake-game-context";
import { cn } from "@/lib/utils";

function Tile({ col, row, isSnake, isFood }) {
  const { placeFood } = useSnakeGameContext();

  const onClick = () => {
    if (isSnake || isFood) return;
    placeFood({ x: col, y: row });
  };

  return (
    <div
      onClick={onClick}
      className={cn("size-10 p-1", isSnake && isFood ? "p-px" : "p-1")}
    >
      <div
        className={cn(
          "size-full rounded-sm p-px",
          isSnake ? "bg-green-700" : isFood ? "bg-red-700" : "bg-zinc-900",
        )}
      >
        <div
          className={cn(
            "size-full rounded-sm",
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

function comparator(prevProps, nextProps) {
  return (
    prevProps.col === nextProps.col &&
    prevProps.row === nextProps.row &&
    prevProps.isSnake === nextProps.isSnake &&
    prevProps.isFood === nextProps.isFood
  );
}

export default memo(Tile, comparator);
