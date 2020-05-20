function wordSearch(words, word) {
  let startingPositions = [];

  for (let row = 0; row < words.length; row++) {
    for (let column = 0; column < words[row].length; column++) {
      if (words[row][column] === word[0]) {
        startingPositions.push([row, column]);
      }
    }
  }

  console.log(startingPositions);

  for (let each of startingPositions) {
    let startingRow = parseInt(each[0]);
    let startingColumn = parseInt(each[1]);

    let copyOfWords = words;

    let trial = [];

    let stack = word.split("");

    function tuning() {
      trial.push(copyOfWords[startingRow][startingColumn]);
      copyOfWords[startingRow][startingColumn] = "-";
      stack.shift();
      console.log(copyOfWords);
    }

    while (stack.length > 0) {
      tuning();

      let rightColumn =
        startingColumn + 1 < words[startingRow].length
          ? startingColumn + 1
          : startingColumn;
      let downRow =
        startingRow + 1 < words.length ? startingRow + 1 : startingRow;
      let leftColumn =
        startingColumn - 1 > 0 ? startingColumn - 1 : startingColumn;
      let upRow = startingRow - 1 > 0 ? startingRow - 1 : startingRow;

      if (copyOfWords[startingRow][rightColumn] === stack[0]) {
        startingColumn = rightColumn;
      } else if (copyOfWords[downRow][startingColumn] === stack[0]) {
        startingRow = downRow;
      } else if (copyOfWords[startingRow][leftColumn] === stack[0]) {
        startingColumn = leftColumn;
      } else if (copyOfWords[upRow][startingColumn] === stack[0]) {
        startingRow = upRow;
      } else {
        break;
      }
    }

    if (trial.join("") === word) {
      return true;
    }
  }
  return false;
}

module.exports = wordSearch;
