import { useState } from "react";
import { getRandom, pickWithProbabilityOf } from "@/lib/utils";
import { POPUP_FOOD_PROBABILITY } from "@/lib/constants";

export function useFoods(gridDimension) {
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

  const popUpFood = () => {
    if (pickWithProbabilityOf(POPUP_FOOD_PROBABILITY)) {
      placeFood({
        x: getRandom(0, gridDimension.cols),
        y: getRandom(0, gridDimension.rows),
      });
    }
  };

  return { foods, placeFood, digestFoodAt, popUpFood };
}
