function countIslands(grid) {
  const rowSize = grid.length;
  const columnSize = grid[0].length;

  let startingPositions = [];

  let islands = 0;

  for (let row = 0; row < rowSize; row++) {
    for (let column = 0; column < grid[row].length; column++) {
      if (grid[row][column] === 1) {
        startingPositions.push([row, column]);
      }
    }
  }

  let copyOfStartingPositions = [...startingPositions];

  // console.log(copyOfStartingPositions);

  function checkForArray(parentArray, childArray) {
    const parent = JSON.stringify(parentArray);
    const child = JSON.stringify(childArray);

    return parent.indexOf(child);
  }

  function getAdjacents(position) {
    const [row, column] = position;

    const topAdjacent = row === 0 ? false : [row - 1, column];
    const rightAdjacent = column === columnSize ? false : [row, column + 1];
    const bottomAdjacent = row === rowSize ? false : [row + 1, column];
    const leftAdjacent = column === 0 ? false : [row, column - 1];

    return [topAdjacent, rightAdjacent, bottomAdjacent, leftAdjacent].filter(
      Boolean
    );
  }

  // function gridItem(array) {
  //   return grid[parseInt(array[0])][parseInt(array[1])];
  // }

  for (let each = 0; each < startingPositions.length; each++) {
    const startingRow = parseInt(startingPositions[each][0]);
    const startingColumn = parseInt(startingPositions[each][1]);

    const item = [startingRow, startingColumn];

    if (checkForArray(copyOfStartingPositions, item) > -1) {
      let path = [];

      let queue = [];
      queue.push([startingRow, startingColumn]);

      function checkPath(array) {
        return checkForArray(path, array);
      }

      while (queue.length > 0) {
        // console.log(queue);
        path.push(queue[0]);

        copyOfStartingPositions.splice(
          checkForArray(copyOfStartingPositions, queue[0]),
          1
        );

        let adjacentPositions = getAdjacents(queue[0]);

        for (let point of adjacentPositions) {
          let position = [parseInt(point[0]), parseInt(point[1])];

          if (
            checkForArray(startingPositions, position) > -1 &&
            checkPath(position) < 0
          ) {
            queue.push(position);
          }
        }

        queue.shift();
      }
      islands++;
    }
  }

  return islands;
}

module.exports = countIslands;
