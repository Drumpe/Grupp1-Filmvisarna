export function getLocaleDateString(dateAndTime, options) {
  const formatted = new Date(dateAndTime);
  //Options är en objekt där man lägger till vilka tider som ska visas exempelvis år, månad, osv
  // Exempel: const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return formatted.toLocaleDateString(`sv-SE`, options);
}

export function getLocaleTimeString(dateAndTime, options) {
  const formatted = new Date(dateAndTime);
  return formatted.toLocaleTimeString(`sv-SE`, options);
}

export function capitalize(dateAndTime) {
  let capitalized = `${dateAndTime.charAt(0).toUpperCase()}${dateAndTime.substring(1, dateAndTime.length)}`;
  return capitalized;
}

/// call for every item in array to get , and . appropriately
export function getSentenceDelimiter(array, i) {
  if (i + 1 === array.length) {
    return `.`
  } else {
    return `, `
  }
}
