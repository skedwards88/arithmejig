export function buildRegexForRow(row) {
  const firstIndex = row.findIndex((i) => i !== "");

  if (firstIndex === -1) {
    // If empty array, then can match any string up to array length
    return new RegExp(`^.{0,${row.length}}$`);
  }

  const lastIndex = row.findLastIndex((i) => i !== "");

  let regexComponents = [];
  for (
    let currentIndex = firstIndex;
    currentIndex <= lastIndex;
    currentIndex++
  ) {
    const value = row[currentIndex];
    if (value === "") {
      regexComponents.push(".{1}");
    } else if (
      (value === "+") |
      (value === "/") |
      (value === "-") |
      (value === "*") |
      (value === "=")
    ) {
      // todo see if cleaner way to catch and handle escaping
      regexComponents.push(`\\${value}`);
    } else {
      regexComponents.push(value);
    }
  }

  let regexString = "^";
  if (firstIndex > 0) {
    regexString += `.{0,${firstIndex}}`;
  }
  regexString += regexComponents.join("");
  if (lastIndex + 1 < row.length) {
    regexString += `.{0,${row.length - 1 - lastIndex}}`;
  }
  regexString += "$";

  const regexPattern = new RegExp(regexString);

  return regexPattern;
}
