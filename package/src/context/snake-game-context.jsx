"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useInterval } from "@/hooks/use-interval";
import { useRefDimension } from "@/hooks/use-ref-dimension";
import { getInRangeValue } from "@/lib/utils";

const SnakeGameContext = createContext();

const TIME_FRAME = 150;
const MAX_FORWARD_STEP = 15;
const TILE_SIZE = 40;

const Directions = {
  UP: "UP",
  RIGHT: "RX",
  DOWN: "DW",
  LEFT: "LX",
};

// Provider component to wrap the entire game and provide the game state
export const SnakeGameProvider = ({ children }) => {
  const [tileSize] = useState(TILE_SIZE);
  const [gridDimension, setGridDimension] = useState({ cols: 0, rows: 0 });
  const [snake, setSnake] = useState([
    { x: 9, y: 10 },
    { x: 8, y: 10 },
    { x: 7, y: 10 },
    { x: 6, y: 10 },
    { x: 5, y: 10 },
  ]);
  const [foods, setFoods] = useState([{ x: 10, y: 15 }]);

  const [direction, setDirection] = useState(Directions.RIGHT);
  const [changeCount, setChangeCount] = useState(0);

  const [houseRef, windowSize] = useRefDimension();

  useEffect(() => {
    setGridDimension(() => ({
      rows: Math.floor(windowSize.height / tileSize),
      cols: Math.floor(windowSize.width / tileSize),
    }));
  }, [windowSize.width, windowSize.height, tileSize]);

  const addFood = (newFood) => {
    setFoods((prevFoods) => [...prevFoods, newFood]);
  };

  const addSnakeTail = () => {
    setSnake((prevSnake) => [...prevSnake, prevSnake.at(-1)]);
  };

  const pickRandomDirection = () => {
    if (direction === Directions.UP || direction === Directions.DOWN) {
      return [Directions.LEFT, Directions.RIGHT].at(
        Math.floor(Math.random() * 2),
      );
    } else {
      return [Directions.UP, Directions.DOWN].at(Math.floor(Math.random() * 2));
    }
  };

  const updateDirection = () => {
    setChangeCount((prev) => prev - 1);

    if (changeCount === 0) {
      setChangeCount(Math.floor(Math.random() * MAX_FORWARD_STEP) + 1);
      setDirection(pickRandomDirection());
    }
  };

  const getNewHead = () => {
    const head = snake.at(0);
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

  const updateSnake = () => {
    const tail = snake.at(-1);
    const isDigested = foods.findIndex((f) => f.x === tail.x && f.y === tail.y);

    if (isDigested !== -1) {
      setFoods((prevFood) => prevFood.filter((_, i) => i !== isDigested));
      addSnakeTail();
    }

    updateDirection();
    const newHead = getNewHead();

    setSnake((prevSnake) => {
      const newSnake = [newHead, ...prevSnake.slice(0, -1)];
      return newSnake;
    });
  };

  useInterval(() => {
    updateSnake();
  }, TIME_FRAME);

  return (
    <SnakeGameContext.Provider
      value={{
        houseRef,
        gridDimension,
        snake,
        foods,
        addFood,
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
