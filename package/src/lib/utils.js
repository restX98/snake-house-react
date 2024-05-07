import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getInRangeValue(value, max) {
  const range = max + 1;
  return ((value % range) + range) % range;
}

export function pickRandom(array) {
  return array.at(Math.floor(Math.random() * array.length));
}

export function getRandom(from, to) {
  return Math.floor(Math.random() * to) + from;
}

export function pickWithProbabilityOf(probability) {
  return Math.random() < probability;
}
