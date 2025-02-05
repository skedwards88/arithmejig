import {buildRegexForRow} from "./buildRegexForRow";
import {allEquations} from "./allEquations";

function getRandom(pseudoRandomGenerator) {
  //todo import from logic pkg instead
  if (pseudoRandomGenerator) {
    return pseudoRandomGenerator();
  } else {
    return Math.random();
  }
}

// return a random element from a given array
function pickRandomItemFromArray(inputArray, pseudoRandomGenerator) {
  //todo import from logic pkg instead
  return inputArray[
    Math.floor(getRandom(pseudoRandomGenerator) * inputArray.length)
  ];
}

export function fillArrayWithEquation(row) {
  const pattern = buildRegexForRow(row);

  const possibleMatches = allEquations.filter((equation) =>
    pattern.test(equation),
  );

  if (possibleMatches.length === 0) {
    return undefined;
  }

  const selectedMatch = pickRandomItemFromArray(possibleMatches);
}
