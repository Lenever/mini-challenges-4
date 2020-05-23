function countIslands(grid) {
  const rowSize = grid.length;
  const columnSize = grid[0].length;

  function getGridItem(row, column) {
    return grid[parseInt(row)][parseInt(column)];
  }

  let startingNodes = [];

  let visitedNodes = [];

  let islands = 0;

  // Function for getting all the positions of 1 in the grid
  for (let row = 0; row < rowSize; row++) {
    for (let column = 0; column < columnSize; column++) {
      if (getGridItem(row, column) === 1) {
        startingNodes.push([row, column]);
      }
    }
  }

  // Function for checking for an array
  function checkForArray(parentArray, childArray) {
    const child = JSON.stringify(childArray);

    let contains = parentArray.some((point) => JSON.stringify(point) === child);

    return contains;
  }

  // Function for getting all the adjacent positions
  function getAdjacents(position) {
    const [row, column] = position;

    const topAdjacent = row === 0 ? false : [row - 1, column];
    const rightAdjacent = column === columnSize - 1 ? false : [row, column + 1];
    const bottomAdjacent = row === rowSize - 1 ? false : [row + 1, column];
    const leftAdjacent = column === 0 ? false : [row, column - 1];

    return [topAdjacent, rightAdjacent, bottomAdjacent, leftAdjacent].filter(
      Boolean
    );
  }

  for (let node of startingNodes) {
    // Using BFS to traverse grid with starting nodes that haven't been visited
    if (!checkForArray(visitedNodes, node)) {
      // Creating a queue
      let queue = [];

      // Pushing starting node to queue
      queue.push(node);

      while (queue.length > 0) {
        visitedNodes.push(queue[0]);

        const adjacents = getAdjacents(queue[0]);

        // Pushing eligible (nodes with 1) adjacent nodes that haven't been visited into queue
        for (let adjacent of adjacents) {
          if (
            checkForArray(startingNodes, adjacent) &&
            !checkForArray(queue, adjacent) &&
            !checkForArray(visitedNodes, adjacent)
          ) {
            queue.push(adjacent);
            grid[adjacent[0]][adjacent[1]] = "#";
          }
        }

        // unqueue visited node
        queue.shift();
      }

      islands++;
    }
  }

  return islands;
}

module.exports = countIslands;
