export function capitalize(dateAndTime) {
  let capitalized = `${dateAndTime.charAt(0).toUpperCase()}${dateAndTime.substring(1, dateAndTime.length)}`;
  return capitalized;
}

export function jsonDateToString(dateAndTime, options, timeZone) {
  const BookingDateTime = new Date(dateAndTime);
  return BookingDateTime.toLocaleDateString(timeZone, options);
  }