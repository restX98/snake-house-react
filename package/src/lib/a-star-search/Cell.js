"use strict";

const FLT_MAX = 2147483647;

export default class Cell {
  constructor(
    f = FLT_MAX,
    g = FLT_MAX,
    h = FLT_MAX,
    parent_x = -1,
    parent_y = -1,
  ) {
    this.parent_x = parent_x;
    this.parent_y = parent_y;
    this.f = f;
    this.g = g;
    this.h = h;
  }
}
