export function capitalize(dateAndTime) {
  let capitalized = `${dateAndTime.charAt(0).toUpperCase()}${dateAndTime.substring(1, dateAndTime.length)}`;
  return capitalized;
}

export function jsonDateToString(dateAndTime, options, timeZone) {
  const BookingDateTime = new Date(dateAndTime);
  //Options är en objekt där man lägger till vilka tider som ska visas exempelvis år, månad, osv
  return BookingDateTime.toLocaleDateString(timeZone, options);
  }