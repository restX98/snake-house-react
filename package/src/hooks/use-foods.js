import { useState } from "react";

export function useFoods() {
  const [foods, setFoods] = useState([]);

  const placeFood = (newFood) => {
    setFoods((prevFoods) => [...prevFoods, newFood]);
  };

  const digestFoodAt = ({ x, y }) => {
    const isDigested = foods.findIndex((f) => f.x === x && f.y === y);
    if (isDigested > -1) {
      setFoods((prevFood) => prevFood.filter((_, i) => i !== isDigested));
      return true;
    }
    return false;
  };

  return { foods, placeFood, digestFoodAt };
}
