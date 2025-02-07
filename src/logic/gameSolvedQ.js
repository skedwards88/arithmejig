import {transposeGrid} from "@skedwards88/word_logic";
import {evaluate} from "mathjs";

function piecesOverlapQ(boardPieces, gridSize) {
  let overlappingPiecesQ = false;

  let grid = JSON.parse(
    JSON.stringify(Array(gridSize).fill(Array(gridSize).fill(""))),
  );

  for (let index = 0; index < boardPieces.length; index++) {
    //todo rename letter var/prop name
    const letters = boardPieces[index].letters;
    let top = boardPieces[index].boardTop;
    for (let rowIndex = 0; rowIndex < letters.length; rowIndex++) {
      let left = boardPieces[index].boardLeft;
      for (let colIndex = 0; colIndex < letters[rowIndex].length; colIndex++) {
        if (letters[rowIndex][colIndex]) {
          if (grid[top][left]) {
            overlappingPiecesQ = true;
            break;
          }
          grid[top][left] = letters[rowIndex][colIndex];
        }
        left += 1;
      }
      if (overlappingPiecesQ) {
        break;
      }
      top += 1;
    }
    if (overlappingPiecesQ) {
      break;
    }
  }
  return {piecesOverlap: overlappingPiecesQ, grid: grid};
}

function getSurroundingLetterIndexes({
  //todo export from skelogic, then import here instead
  startingIndex,
  grid,
  alreadyFoundIndexes,
}) {
  const surroundingIndexes = [
    [startingIndex[0] - 1, startingIndex[1]],
    [startingIndex[0] + 1, startingIndex[1]],
    [startingIndex[0], startingIndex[1] - 1],
    [startingIndex[0], startingIndex[1] + 1],
  ];

  let surroundingLetterIndexes = [];
  for (let index = 0; index < surroundingIndexes.length; index++) {
    // If there is a letter at the surrounding index
    if (grid?.[surroundingIndexes[index][0]]?.[surroundingIndexes[index][1]]) {
      // and if the surrounding index was not found already
      if (
        !alreadyFoundIndexes.some(
          (alreadyFoundIndex) =>
            alreadyFoundIndex[0] === surroundingIndexes[index][0] &&
            alreadyFoundIndex[1] === surroundingIndexes[index][1],
        )
      ) {
        surroundingLetterIndexes.push(surroundingIndexes[index]);
      }
    }
  }
  return surroundingLetterIndexes;
}

function isSingleGroupingQ(grid) {
  //todo export from skelogic, then import here instead
  const numLetters = grid.flatMap((i) => i).filter((i) => i).length;

  // start at any index with a letter
  // recursively, check top,bottom,left,right of the letter for any connected letter
  // to generate a list of all of the letters that are connected
  // then compare with the indexes of all the letters to make sure the same
  let startingIndex;
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    for (let colIndex = 0; colIndex < grid[rowIndex].length; colIndex++) {
      if (grid[rowIndex][colIndex]) {
        startingIndex = [rowIndex, colIndex];
        break;
      }
    }
    if (startingIndex) {
      break;
    }
  }
  let connectionsToCheckForConnections = getSurroundingLetterIndexes({
    startingIndex: startingIndex,
    grid: grid,
    alreadyFoundIndexes: [startingIndex],
  });
  let connectedIndexes = [startingIndex, ...connectionsToCheckForConnections];

  let count = 0;
  while (connectionsToCheckForConnections.length && count < 100) {
    count++;
    let surroundingIndex = connectionsToCheckForConnections.pop();
    const newSurroundingIndexes = getSurroundingLetterIndexes({
      startingIndex: surroundingIndex,
      grid: grid,
      alreadyFoundIndexes: connectedIndexes,
    });
    connectionsToCheckForConnections = [
      ...connectionsToCheckForConnections,
      ...newSurroundingIndexes,
    ];
    connectedIndexes = [...connectedIndexes, ...newSurroundingIndexes];
  }

  return numLetters === connectedIndexes.length;
}

export function gameSolvedQ(pieces, gridSize) {
  const boardPieces = pieces.filter(
    (piece) => piece.boardTop >= 0 && piece.boardLeft >= 0,
  );

  const {piecesOverlap, grid} = piecesOverlapQ(boardPieces, gridSize);
  if (piecesOverlap) {
    return {
      gameIsSolved: false,
      reason: `No symbols may overlap`,
    };
  }

  const isSingleGrouping = isSingleGroupingQ(grid);
  if (!isSingleGrouping) {
    return {
      gameIsSolved: false,
      reason: `All of the pieces must connect`,
    };
  }

  const transposedGrid = transposeGrid(grid);
  const jointGrid = [...grid, ...transposedGrid];
  for (let rowIndex = 0; rowIndex < jointGrid.length; rowIndex++) {
    let currentWord = "";
    for (
      let characterIndex = 0;
      characterIndex < jointGrid[rowIndex].length;
      characterIndex++
    ) {
      let character = jointGrid[rowIndex][characterIndex];
      // If a letter, append to current word
      if (character.match("^.$")) {
        currentWord += character;
      }

      // if the word is complete (either we are at the end of the row or at a non-letter)
      // and longer than one letter
      // then
      // verify the word
      if (
        currentWord &&
        (characterIndex === jointGrid[rowIndex].length - 1 ||
          !character.match("^.$"))
      ) {
        if (currentWord.length > 1) {
          // False if not an equation
          if (!currentWord.includes("=")) {
            return {
              gameIsSolved: false,
              reason: `${currentWord} is not a complete equation`,
            };
          }

          const expressions = currentWord.split("=");

          try {
            const values = expressions.map((expression) =>
              evaluate(expression),
            );
            if (values.includes(undefined)) {
              return {
                gameIsSolved: false,
                reason: `Could not evaluate ${currentWord}`,
              };
            }

            if (!values.every((value) => value === values[0])) {
              return {
                gameIsSolved: false,
                reason: `${currentWord} is not true`,
              };
            }
          } catch (error) {
            return {
              gameIsSolved: false,
              reason: `Could not evaluate ${currentWord}`,
            };
          }
        }

        currentWord = "";
      }
    }
  }

  return {gameIsSolved: true, reason: ""};
}

// todo could convert crossword valid q into a more generalizable function, with one of the inputs being what should evaluate against...but that might not be worth it
