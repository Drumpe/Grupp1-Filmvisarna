export function capitalize(dateAndTime) {
  let capitalized = `${dateAndTime.charAt(0).toUpperCase()}${dateAndTime.substring(1, dateAndTime.length)}`;
  return capitalized;
}

export function getLocaleDateString(dateAndTime, options) {
  const bookingDateTime = new Date(dateAndTime);
  //Options är en objekt där man lägger till vilka tider som ska visas exempelvis år, månad, osv
  return bookingDateTime.toLocaleDateString(`sv-SE`, options);
  }