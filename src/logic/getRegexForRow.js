export default function getPatternsForRow(grid, rowIndex, minLength) {
  // For a specified row in the grid,
  // get the regex patterns that could make a new word in that row
  // in the form [[pattern, column index where pattern starts],...]
  let patterns = [];
  const row = grid[rowIndex];

  for (
    let startPosition = 0;
    startPosition < row.length - minLength + 1;
    startPosition++
  ) {
    // If the previous element was a letter, skip
    if (row[startPosition - 1]?.match("^.$")) {
      continue;
    }
    let pattern = "";
    let includesLetter = false;
    for (
      let currentPosition = startPosition;
      currentPosition < row.length;
      currentPosition++
    ) {
      if (
        !row[currentPosition].match("^.$") &&
        grid?.[rowIndex - 1]?.[currentPosition]
      ) {
        break;
      }
      if (
        !row[currentPosition].match("^.$") &&
        grid?.[rowIndex + 1]?.[currentPosition]
      ) {
        break;
      }
      // Add the element to the pattern
      if (row[currentPosition] === "") {
        pattern += ".";
      } else if (
        (row[currentPosition] === "+") |
        (row[currentPosition] === "/") |
        (row[currentPosition] === "-") |
        (row[currentPosition] === "*") |
        (row[currentPosition] === "=")
      ) {
        // todo see if cleaner way to catch and handle escaping
        pattern += `\\${row[currentPosition]}`;
      } else {
        pattern += row[currentPosition];
      }

      // const element = row[currentPosition].match("^.$")
      //   ? row[currentPosition]
      //   : ".";
      // pattern += element;

      if (row[currentPosition].match("^.$")) {
        includesLetter = true;
      }

      if (
        !(
          // don't push the pattern if any of these cases are true
          // no letters
          (
            !includesLetter ||
            // less than minLength
            currentPosition - startPosition < minLength ||
            // the next element is a letter
            row[currentPosition + 1]?.match("^.$")
          )
        )
      ) {
        patterns.push([pattern, startPosition]);
      }
    }
  }
  return patterns;
}
