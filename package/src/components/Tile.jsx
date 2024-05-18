"use client";

import { memo } from "react";
import { useSnakeGameContext } from "@/context/snake-game-context";
import { cn } from "@/lib/utils";

function Tile({ col, row, isSnake, isFood }) {
  const { placeFood, tileSize } = useSnakeGameContext();

  const onClick = () => {
    if (isSnake || isFood) return;
    placeFood({ x: col, y: row });
  };

  const internalTileSize =
    isSnake && isFood ? tileSize * 0.95 : tileSize * 0.85;
  return (
    <div
      onClick={onClick}
      style={{ width: tileSize, height: tileSize }}
      className={cn("flex items-center justify-center")}
    >
      <div
        style={{ width: internalTileSize, height: internalTileSize }}
        className={cn(
          "rounded-sm p-px",
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
