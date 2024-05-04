import { useState } from "react";

export function useFoods(snake) {
  const [foods, setFoods] = useState([{ x: 10, y: 15 }]);

  const placeFood = (newFood) => {
    setFoods((prevFoods) => [...prevFoods, newFood]);
  };

  const foundDigestedFood = () => {
    const tail = snake.at(-1);
    const isDigested = foods.findIndex((f) => f.x === tail.x && f.y === tail.y);
    if (isDigested > -1) {
      setFoods((prevFood) => prevFood.filter((_, i) => i !== isDigested));
      return true;
    }
    return false;
  };

  return { foods, placeFood, foundDigestedFood };
}
