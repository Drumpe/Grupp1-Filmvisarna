/// call for every item in array to get , and . appropriately
export function getSentenceDelimiter(array, i) {
  if (i + 1 === array.length) {
    return `.`
  } else {
    return `, `
  }
}