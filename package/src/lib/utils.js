import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getInRangeValue(value, max) {
  const range = max + 1;
  return ((value % range) + range) % range;
}
