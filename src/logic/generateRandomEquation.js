function getRandom(pseudoRandomGenerator) { //todo import from logic pkg instead
  if (pseudoRandomGenerator) {
    return pseudoRandomGenerator();
  } else {
    return Math.random();
  }
}

// return a random element from a given array
function pickRandomItemFromArray(inputArray, pseudoRandomGenerator) {//todo import from logic pkg instead
  return inputArray[
    Math.floor(getRandom(pseudoRandomGenerator) * inputArray.length)
  ];
}

export function pickRandomIntBetween(int1, int2, pseudoRandomGenerator) {//todo import from logic pkg instead
  const min = Math.min(int1, int2);
  const max = Math.max(int1, int2);

  // To make it inclusive, need max + 1
  return Math.floor(min + getRandom(pseudoRandomGenerator) * (max + 1 - min));
}

export function generateRandomEquation(pseudoRandomGenerator) {
  const operators = ["+", "-", "*", "/"];

  const operator = pickRandomItemFromArray(operators, pseudoRandomGenerator);
  let operandA;
  let operandB;

  if (operator === "/") {
    // For division, disallow 0 and 1, and force the result to be an int
    operandB = pickRandomIntBetween(2, 9, pseudoRandomGenerator);
    const targetValue = pickRandomIntBetween(2, 9, pseudoRandomGenerator);
    operandA = targetValue * operandB;
  } else if (operator === "*") {
    // For multiplication,  disallow 0 and 1
    operandA = pickRandomIntBetween(2, 9, pseudoRandomGenerator);
    operandB = pickRandomIntBetween(2, 9, pseudoRandomGenerator);
  } else {
    // For addition and subtraction, disallow 0
    operandA = pickRandomIntBetween(1, 9, pseudoRandomGenerator);
    operandB = pickRandomIntBetween(1, 9, pseudoRandomGenerator);
  }

  const equation = `${operandA}${operator}${operandB}`;

  console.log(`${equation} = ${eval(equation)}`);

  return equation;
}

function getWholeDivisors(targetValue) {
  const possibleDivisors = Array.from({ length: targetValue }, (_, i) => i + 1);
  const wholeDivisors = possibleDivisors.filter(i => targetValue % i === 0)
console.log(JSON.stringify(wholeDivisors));
  return wholeDivisors
}


export function generateRandomEquationOfValue(targetValue, pseudoRandomGenerator) {
  const operators = ["*"];

  const operator = pickRandomItemFromArray(operators, pseudoRandomGenerator);
  let operandA;
  let operandB;

  // todo use switch and math.js evaluate instead

  if (operator === "+") {
    operandA = pickRandomIntBetween(1, targetValue, pseudoRandomGenerator);
    operandB = targetValue - operandA
  } else if (operator === "-") {
    operandB = pickRandomIntBetween(1, targetValue, pseudoRandomGenerator);
    operandA = operandB + targetValue
  } else if (operator === "/") {
    operandB = pickRandomIntBetween(2, 9, pseudoRandomGenerator);
    operandA = targetValue * operandB
  } else if (operator === "*") {
    const wholeDivisors = getWholeDivisors(targetValue);//todo later can exclude 1 and target unless they are the only divisor
    operandA = pickRandomItemFromArray(wholeDivisors, pseudoRandomGenerator);
    operandB = targetValue / operandA;
  }

  const equation = `${operandA}${operator}${operandB}`;

  console.log(`${equation} = ${eval(equation)}`);

  return equation;
}
