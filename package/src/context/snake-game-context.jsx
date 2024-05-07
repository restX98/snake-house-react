"use client";

import { createContext, useContext } from "react";
import { useInterval } from "@/hooks/use-interval";
import { useGrid } from "@/hooks/use-grid";
import { useSnake } from "@/hooks/use-snake";
import { useFoods } from "@/hooks/use-foods";
import { TIME_FRAME } from "@/lib/constants";

const SnakeGameContext = createContext();

export const SnakeGameProvider = ({ children }) => {
  const { gridRef, gridDimension } = useGrid();
  const { foods, placeFood, digestFoodAt } = useFoods();

  const { snake, walk } = useSnake(gridDimension, digestFoodAt, foods);

  useInterval(() => {
    const haveEaten = digestFoodAt(snake.at(-1));
    walk({
      haveEaten,
    });
  }, TIME_FRAME);

  return (
    <SnakeGameContext.Provider
      value={{
        houseRef: gridRef,
        gridDimension,
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
