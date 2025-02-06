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
  return {piecesOverlap: overlappingPiecesQ, grid: grid}; //todo don't need to return grid here anymore
}

export function gameSolvedQ(pieces, gridSize) {
  const boardPieces = pieces.filter(
    (piece) => piece.boardTop >= 0 && piece.boardLeft >= 0,
  );

  const {piecesOverlap} = piecesOverlapQ(boardPieces, gridSize);
  if (piecesOverlap) {
    return {
      gameIsSolved: false,
      reason: `No symbols may overlap`,
    };
  }

  const {gameIsSolved, reason} = {gameIsSolved: false, reason: "todo"}; //todo implement this

  return {
    gameIsSolved: gameIsSolved,
    reason: reason,
  };
}
