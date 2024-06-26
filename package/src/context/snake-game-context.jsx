"use client";

import { createContext, useContext } from "react";
import { useInterval } from "@/hooks/use-interval";
import { useGrid } from "@/hooks/use-grid";
import { useSnake } from "@/hooks/use-snake";
import { useFoods } from "@/hooks/use-foods";
import { TIME_FRAME, TILE_SIZE } from "@/lib/constants";

const SnakeGameContext = createContext();

export const SnakeGameProvider = ({ children }) => {
  const { gridRef, gridDimension } = useGrid(TILE_SIZE);
  const { foods, placeFood, digestFoodAt, popUpFood } = useFoods(gridDimension);
  const { snake, walk } = useSnake(gridDimension, foods);

  useInterval(() => {
    popUpFood();
    walk({
      digested: digestFoodAt(snake.at(-1)),
    });
  }, TIME_FRAME);

  return (
    <SnakeGameContext.Provider
      value={{
        houseRef: gridRef,
        gridDimension,
        tileSize: TILE_SIZE,
        snake,
        foods,
        placeFood,
      }}
    >
      {children}
    </SnakeGameContext.Provider>
  );
};

export function useSnakeGameContext() {
  const context = useContext(SnakeGameContext);
  if (!context) {
    throw new Error(
      "useSnakeGameContext must be used within a SnakeGameContext",
    );
  }
  return context;
}
