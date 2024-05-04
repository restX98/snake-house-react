"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useInterval } from "@/hooks/use-interval";
import { useGrid } from "@/hooks/use-grid";
import { useSnake } from "@/hooks/use-snake";
import { useFoods } from "@/hooks/use-foods";
import { TIME_FRAME } from "@/lib/constants";

const SnakeGameContext = createContext();

// Provider component to wrap the entire game and provide the game state
export const SnakeGameProvider = ({ children }) => {
  const { gridRef, gridDimension } = useGrid({ cols: 0, rows: 0 });
  const { snake, walk, growSnake } = useSnake(gridDimension);
  const { foods, placeFood, foundDigestedFood } = useFoods(snake);

  useInterval(() => {
    if (foundDigestedFood()) {
      growSnake();
    }
    walk();
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
