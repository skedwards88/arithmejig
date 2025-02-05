function generateAllEquations() {
  const operators = ["+", "-", "*", "/"];

  let expressionsByValue = {};

  for (const operator of operators) {
    for (let operandA = 0; operandA <= 9; operandA++) {
      for (let operandB = 0; operandB <= 9; operandB++) {
        const equation = `${operandA}${operator}${operandB}`;
        const value = eval(equation);

        // todo could add more exclusions potentially, like no multiplication with 0
        if (Number.isInteger(value)) {
          if (!expressionsByValue[value]) {
            expressionsByValue[value] = [equation];
          } else {
            expressionsByValue[value] = [
              ...expressionsByValue[value],
              equation,
            ];
          }
        }
      }
    }
  }

  let allEquations = [];
  for (const equations of Object.values(expressionsByValue)) {
    for (let index1 = 0; index1 < equations.length; index1++) {
      for (let index2 = 1; index2 < equations.length; index2++) {
        if (index1 === index2) {
          continue;
        }
        // todo this is catching some missing cases but also resulting in dups
        allEquations.push(`${equations[index1]}=${equations[index2]}`);
        allEquations.push(`${equations[index2]}=${equations[index1]}`);
      }
    }
  }
}

export const allEquations = generateAllEquations();
