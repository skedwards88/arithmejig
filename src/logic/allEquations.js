import {evaluate} from "mathjs";

// Note: I started writing logic to generate equations on the fly based on
// known elements (see src/logic/generateRandomEquation.js).
// However, just essentially hard-coding the list like this let me largely reuse
// my crossjig logic and get to a prototype faster. It also is logically pretty
// fast to regex for a matching equation instead of generating valid equations
// on the fly.
// So I'm not happy with the elegance here, but it makes sense to keep at least
// for now. In the future, if I let people control the operators and digits that
// are used, or if I want more complex/diverse expressions, this decision will
// need to be revisited.

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
