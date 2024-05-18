"use strict";

import Cell from "./Cell";

export default class AStarSearch {
  constructor(grid, src = null, dest = null) {
    this.grid = grid;
    this.c_row = grid.length;
    this.c_col = grid[0].length;

    const closedList = new Array(this.c_col);
    for (let i = 0; i < this.c_col; i++) {
      closedList[i] = new Array(this.c_row).fill(false);
    }
    this.closedList = closedList;

    const cellDetails = new Array(this.c_col.length);
    for (let i = 0; i < this.c_col; i++) {
      cellDetails[i] = new Array(this.c_row);
      for (let j = 0; j < cellDetails[i].length; j++) {
        cellDetails[i][j] = new Cell();
      }
    }
    this.cellDetails = cellDetails;

    if (src) {
      this.src = src;

      const x = this.src.x;
      const y = this.src.y;
      this.cellDetails[x][y] = new Cell(0, 0, 0, x, y);

      this.openList = new Map();
      this.openList.set(0, [x, y]);
    }

    if (dest) {
      this.dest = dest;
    }
  }

  find() {
    const openList = this.openList;
    while (openList.size > 0) {
      const p = openList.entries().next().value; // Maybe getting the lower index could be an improvement

      openList.delete(p[0]);

      const x = p[1][0];
      const y = p[1][1];
      this.closedList[x][y] = true;

      const {
        north_x,
        north_y,
        south_x,
        south_y,
        east_x,
        east_y,
        west_x,
        west_y,
      } = this.getSuccessorFrom(x, y);

      if (this.processCellAt(x, y, north_x, north_y)) {
        return this.tracePath();
      }
      if (this.processCellAt(x, y, south_x, south_y)) {
        return this.tracePath();
      }

      if (this.processCellAt(x, y, east_x, east_y)) {
        return this.tracePath();
      }
      if (this.processCellAt(x, y, west_x, west_y)) {
        return this.tracePath();
      }
    }

    return [];
  }

  processCellAt(x, y, next_x, next_y) {
    if (!this.isValidPosition(next_x, next_y)) {
      return false;
    }

    if (this.isDestination(next_x, next_y)) {
      const nextCellDetails = this.cellDetails[next_x][next_y];
      nextCellDetails.parent_x = x;
      nextCellDetails.parent_y = y;

      return true;
    }

    if (this.isProcessed(next_x, next_y) || this.isBlocked(next_x, next_y)) {
      return false;
    }

    const next_g = this.cellDetails[x][y].g + 1; // Increment steps count
    const next_h = this.calculateHeuristicValue(next_x, next_y);
    const next_f = next_g + next_h;

    const nextCellDetails = this.cellDetails[next_x][next_y];
    if (nextCellDetails.f > next_f) {
      this.openList.set(next_f, [next_x, next_y]);

      nextCellDetails.f = next_f;
      nextCellDetails.g = next_g;
      nextCellDetails.h = next_h;
      nextCellDetails.parent_x = x;
      nextCellDetails.parent_y = y;
    }

    return false;
  }

  tracePath() {
    const path = [];

    let x = this.dest.x;
    let y = this.dest.y;
    let temp_cd = this.cellDetails[x][y];
    while (!(temp_cd.parent_x === x && temp_cd.parent_y === y)) {
      path.push({ x, y });
      const temp_x = temp_cd.parent_x;
      const temp_y = temp_cd.parent_y;
      x = temp_x;
      y = temp_y;
      temp_cd = this.cellDetails[x][y];
    }

    return path.reverse();
  }

  isValidPosition(x, y) {
    return x >= 0 && x < this.c_col && y >= 0 && y < this.c_row;
  }

  isDestination(x, y) {
    return x === this.dest.x && y === this.dest.y;
  }

  isBlocked(x, y) {
    try {
      return this.grid[y][x] === 0;
    } catch (ex) {
      console.log("Grid: ", this.grid);
      console.log("Grid[x]: ", this.grid[x]);
      console.log("Grid[x][y]: ", this.grid[x][y]);
      throw new Error();
    }
  }

  isProcessed(x, y) {
    return this.closedList[x][y] === true;
  }

  calculateHeuristicValue(x, y) {
    return Math.abs(x - this.dest.x) + Math.abs(y - this.dest.y);
  }

  /**
   * Generating all the 4 successor of this cell
   *
   *                N
   *                |
   *                |
   *          W----Cell----E
   *                |
   *                |
   *                S
   *
   * Cell -->Popped Cell  (i, j)
   * N    -->  North      (i-1, j)
   * S    -->  South      (i+1, j)
   * E    -->  East       (i, j+1)
   * W    -->  West       (i, j-1)
   */
  getSuccessorFrom(x, y) {
    return {
      north_x: x - 1,
      north_y: y,
      south_x: x + 1,
      south_y: y,
      east_x: x,
      east_y: y + 1,
      west_x: x,
      west_y: y - 1,
    };
  }
}
