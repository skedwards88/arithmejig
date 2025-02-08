import {evaluate} from "mathjs";

function generateAllEquations() {
  const operators = ["+", "-", "*", "/"];

  let expressionsByValue = {};

  for (const operator of operators) {
    for (let operandA = 1; operandA <= 9; operandA++) {
      for (let operandB = 1; operandB <= 9; operandB++) {
        // Skip multiplication by 1
        // Skip division by 1
        // Skip division by self
        if (
          (operator === "*" && operandA === 1) ||
          (operator === "*" && operandB === 1) ||
          (operator === "/" && operandB === 1) ||
          (operator === "/" && operandB === operandA)
        ) {
          continue;
        }
        const equation = `${operandA}${operator}${operandB}`;

        const value = evaluate(equation);

        if (!Number.isInteger(value)) {
          continue;
        }

        if (!expressionsByValue[value]) {
          expressionsByValue[value] = [equation];
        } else {
          expressionsByValue[value] = [...expressionsByValue[value], equation];
        }
      }
    }
  }

  let allEquations = [];

  for (const equations of Object.values(expressionsByValue)) {
    for (let index1 = 0; index1 < equations.length; index1++) {
      for (let index2 = 0; index2 < equations.length; index2++) {
        if (index1 === index2) {
          continue;
        }
        allEquations.push(`${equations[index1]}=${equations[index2]}`);
      }
    }
  }

  return allEquations;
}

export const allEquations = generateAllEquations();
