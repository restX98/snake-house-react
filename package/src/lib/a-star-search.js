// A javascript Program to implement A* Search Algorithm

const FLT_MAX = 2147483647;

// typedef pair<double, pair<int, int> > pPair;

// A structure to hold the necessary parameters
class cell {
  // Row and Column index of its parent
  // Note that 0 <= i <= ROW-1 & 0 <= j <= COL-1
  constructor() {
    this.parent_i = 0;
    this.parent_j = 0;
    this.f = 0;
    this.g = 0;
    this.h = 0;
  }
}

// A Utility Function to check whether given cell (row, col)
// is a valid cell or not.
function isValid(row, col, maxRow, maxCol) {
  // Returns true if row number and column number
  // is in range
  return row >= 0 && row < maxRow && col >= 0 && col < maxCol;
}

// A Utility Function to check whether the given cell is
// blocked or not
function isUnBlocked(grid, row, col) {
  // Returns true if the cell is not blocked else false
  if (grid[row][col] == 1) return true;
  else return false;
}

// A Utility Function to check whether destination cell has
// been reached or not
function isDestination(row, col, dest) {
  if (row == dest.x && col == dest.y) return true;
  else return false;
}

// A Utility Function to calculate the 'h' heuristics.
function calculateHValue(row, col, dest) {
  // Return using the distance formula
  return Math.sqrt(
    (row - dest.x) * (row - dest.x) + (col - dest.y) * (col - dest.y),
  );
}

// A Utility Function to trace the path from the source
// to destination
function tracePath(cellDetails, dest) {
  let row = dest.x;
  let col = dest.y;

  // stack<Pair> Path;
  let Path = [];

  while (
    !(
      cellDetails[row][col].parent_i == row &&
      cellDetails[row][col].parent_j == col
    )
  ) {
    Path.push({ x: row, y: col });
    let temp_row = cellDetails[row][col].parent_i;
    let temp_col = cellDetails[row][col].parent_j;
    row = temp_row;
    col = temp_col;
  }

  return Path.reverse();
}

// A Function to find the shortest path between
// a given source cell to a destination cell according
// to A* Search Algorithm
export function aStarSearch(grid, src, dest) {
  // If the source is out of range
  if (isValid(src.y, src.x, grid.length, grid[0].length) == false) {
    return [];
  }

  // If the destination is out of range
  if (isValid(dest.y, dest.x, grid.length, grid[0].length) == false) {
    return [];
  }

  // Either the source or the destination is blocked
  if (
    isUnBlocked(grid, src.y, src.x) == false ||
    isUnBlocked(grid, dest.y, dest.x) == false
  ) {
    return [];
  }

  // If the destination cell is the same as source cell
  if (isDestination(src.y, src.x, dest) == true) {
    return [];
  }

  // Create a closed list and initialise it to false which
  // means that no cell has been included yet This closed
  // list is implemented as a boolean 2D array
  let closedList = new Array(grid[0].length);
  for (let i = 0; i < grid[0].length; i++) {
    closedList[i] = new Array(grid.length).fill(false);
  }

  // Declare a 2D array of structure to hold the details
  // of that cell
  let cellDetails = new Array(grid[0].length);
  for (let i = 0; i < grid[0].length; i++) {
    cellDetails[i] = new Array(grid.length);
  }

  let i, j;

  for (i = 0; i < grid[0].length; i++) {
    for (j = 0; j < grid.length; j++) {
      cellDetails[i][j] = new cell();
      cellDetails[i][j].f = FLT_MAX;
      cellDetails[i][j].g = FLT_MAX;
      cellDetails[i][j].h = FLT_MAX;
      cellDetails[i][j].parent_i = -1;
      cellDetails[i][j].parent_j = -1;
    }
  }

  // Initialising the parameters of the starting node
  (i = src.x), (j = src.y);
  cellDetails[i][j].f = 0;
  cellDetails[i][j].g = 0;
  cellDetails[i][j].h = 0;
  cellDetails[i][j].parent_i = i;
  cellDetails[i][j].parent_j = j;

  /*
     Create an open list having information as-
     <f, <i, j>>
     where f = g + h,
     and i, j are the row and column index of that cell
     Note that 0 <= i <= ROW-1 & 0 <= j <= COL-1
     This open list is implemented as a set of pair of
     pair.*/
  let openList = new Map();

  // Put the starting cell on the open list and set its
  // 'f' as 0
  openList.set(0, [i, j]);

  // We set this boolean value as false as initially
  // the destination is not reached.
  let foundPath = [];

  while (openList.size > 0) {
    let p = openList.entries().next().value;

    // Remove this vertex from the open list
    openList.delete(p[0]);

    // Add this vertex to the closed list
    i = p[1][0];
    j = p[1][1];
    closedList[i][j] = true;

    /*
         Generating all the 8 successor of this cell
 
                    N
                    |
                    |
             W----Cell----E
                    |
                    |
                    S
 
         Cell-->Popped Cell (i, j)
         N -->  North       (i-1, j)
         S -->  South       (i+1, j)
         E -->  East        (i, j+1)
         W -->  West           (i, j-1)*/

    // To store the 'g', 'h' and 'f' of the 8 successors
    let gNew, hNew, fNew;

    //----------- 1st Successor (North) ------------

    // Only process this cell if this is a valid one
    if (isValid(i - 1, j, grid.length, grid[0].length) == true) {
      // If the destination cell is the same as the
      // current successor
      if (isDestination(i - 1, j, dest) == true) {
        // Set the Parent of the destination cell
        cellDetails[i - 1][j].parent_i = i;
        cellDetails[i - 1][j].parent_j = j;
        foundPath = tracePath(cellDetails, dest);
        return foundPath;
      }
      // If the successor is already on the closed
      // list or if it is blocked, then ignore it.
      // Else do the following
      else if (
        closedList[i - 1][j] == false &&
        isUnBlocked(grid, i - 1, j) == true
      ) {
        gNew = cellDetails[i][j].g + 1;
        hNew = calculateHValue(i - 1, j, dest);
        fNew = gNew + hNew;

        // If it isn’t on the open list, add it to
        // the open list. Make the current square
        // the parent of this square. Record the
        // f, g, and h costs of the square cell
        //                OR
        // If it is on the open list already, check
        // to see if this path to that square is
        // better, using 'f' cost as the measure.
        if (
          cellDetails[i - 1][j].f == FLT_MAX ||
          cellDetails[i - 1][j].f > fNew
        ) {
          openList.set(fNew, [i - 1, j]);

          // Update the details of this cell
          cellDetails[i - 1][j].f = fNew;
          cellDetails[i - 1][j].g = gNew;
          cellDetails[i - 1][j].h = hNew;
          cellDetails[i - 1][j].parent_i = i;
          cellDetails[i - 1][j].parent_j = j;
        }
      }
    }

    //----------- 2nd Successor (South) ------------

    // Only process this cell if this is a valid one
    if (isValid(i + 1, j, grid.length, grid[0].length) == true) {
      // If the destination cell is the same as the
      // current successor
      if (isDestination(i + 1, j, dest) == true) {
        // Set the Parent of the destination cell
        cellDetails[i + 1][j].parent_i = i;
        cellDetails[i + 1][j].parent_j = j;
        foundPath = tracePath(cellDetails, dest);
        return foundPath;
      }
      // If the successor is already on the closed
      // list or if it is blocked, then ignore it.
      // Else do the following
      else if (
        closedList[i + 1][j] == false &&
        isUnBlocked(grid, i + 1, j) == true
      ) {
        gNew = cellDetails[i][j].g + 1;
        hNew = calculateHValue(i + 1, j, dest);
        fNew = gNew + hNew;

        // If it isn’t on the open list, add it to
        // the open list. Make the current square
        // the parent of this square. Record the
        // f, g, and h costs of the square cell
        //                OR
        // If it is on the open list already, check
        // to see if this path to that square is
        // better, using 'f' cost as the measure.
        if (
          cellDetails[i + 1][j].f == FLT_MAX ||
          cellDetails[i + 1][j].f > fNew
        ) {
          openList.set(fNew, [i + 1, j]);
          // Update the details of this cell
          cellDetails[i + 1][j].f = fNew;
          cellDetails[i + 1][j].g = gNew;
          cellDetails[i + 1][j].h = hNew;
          cellDetails[i + 1][j].parent_i = i;
          cellDetails[i + 1][j].parent_j = j;
        }
      }
    }

    //----------- 3rd Successor (East) ------------

    // Only process this cell if this is a valid one
    if (isValid(i, j + 1, grid.length, grid[0].length) == true) {
      // If the destination cell is the same as the
      // current successor
      if (isDestination(i, j + 1, dest) == true) {
        // Set the Parent of the destination cell
        cellDetails[i][j + 1].parent_i = i;
        cellDetails[i][j + 1].parent_j = j;
        foundPath = tracePath(cellDetails, dest);
        return foundPath;
      }

      // If the successor is already on the closed
      // list or if it is blocked, then ignore it.
      // Else do the following
      else if (
        closedList[i][j + 1] == false &&
        isUnBlocked(grid, i, j + 1) == true
      ) {
        gNew = cellDetails[i][j].g + 1;
        hNew = calculateHValue(i, j + 1, dest);
        fNew = gNew + hNew;

        // If it isn’t on the open list, add it to
        // the open list. Make the current square
        // the parent of this square. Record the
        // f, g, and h costs of the square cell
        //                OR
        // If it is on the open list already, check
        // to see if this path to that square is
        // better, using 'f' cost as the measure.
        if (
          cellDetails[i][j + 1].f == FLT_MAX ||
          cellDetails[i][j + 1].f > fNew
        ) {
          openList.set(fNew, [i, j + 1]);

          // Update the details of this cell
          cellDetails[i][j + 1].f = fNew;
          cellDetails[i][j + 1].g = gNew;
          cellDetails[i][j + 1].h = hNew;
          cellDetails[i][j + 1].parent_i = i;
          cellDetails[i][j + 1].parent_j = j;
        }
      }
    }

    //----------- 4th Successor (West) ------------

    // Only process this cell if this is a valid one
    if (isValid(i, j - 1, grid.length, grid[0].length) == true) {
      // If the destination cell is the same as the
      // current successor
      if (isDestination(i, j - 1, dest) == true) {
        // Set the Parent of the destination cell
        cellDetails[i][j - 1].parent_i = i;
        cellDetails[i][j - 1].parent_j = j;
        foundPath = tracePath(cellDetails, dest);
        return foundPath;
      }

      // If the successor is already on the closed
      // list or if it is blocked, then ignore it.
      // Else do the following
      else if (
        closedList[i][j - 1] == false &&
        isUnBlocked(grid, i, j - 1) == true
      ) {
        gNew = cellDetails[i][j].g + 1;
        hNew = calculateHValue(i, j - 1, dest);
        fNew = gNew + hNew;

        // If it isn’t on the open list, add it to
        // the open list. Make the current square
        // the parent of this square. Record the
        // f, g, and h costs of the square cell
        //                OR
        // If it is on the open list already, check
        // to see if this path to that square is
        // better, using 'f' cost as the measure.
        if (
          cellDetails[i][j - 1].f == FLT_MAX ||
          cellDetails[i][j - 1].f > fNew
        ) {
          openList.set(fNew, [i, j - 1]);

          // Update the details of this cell
          cellDetails[i][j - 1].f = fNew;
          cellDetails[i][j - 1].g = gNew;
          cellDetails[i][j - 1].h = hNew;
          cellDetails[i][j - 1].parent_i = i;
          cellDetails[i][j - 1].parent_j = j;
        }
      }
    }
  }

  // When the destination cell is not found and the open
  // list is empty, then we conclude that we failed to
  // reach the destination cell. This may happen when the
  // there is no way to destination cell (due to
  // blockages)
  // if (foundDest == false) console.log("Failed to find the Destination Cell\n");

  return [];
}
