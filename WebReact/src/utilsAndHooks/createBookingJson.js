

export default function createBookingJson(seats, user, screeningId, tickets) {
  var tmpBookingSeatsArr = [];
  var priceCat = makePriceCategoriesArray(tickets);
  var index = 0;
  seats.forEach((elem) => {
    if (elem.wanted) {
      tmpBookingSeatsArr.push({ SeatId: elem.seatId, PriceCategoryId: priceCat[index++] });
    }
  });
  const bookingData = {
    EmailAdress: user.userRole === "guest" ? formData.email : user.email,
    ScreeningId: screeningId,
    BookingXSeats: tmpBookingSeatsArr,
  }
  return bookingData;
}

function makePriceCategoriesArray(tickets) {
  var result = [];
  for (let index = 0; index < tickets.pensioner; index++) {
    result.push(3);
  }
  for (let index = 0; index < tickets.child; index++) {
    result.push(2);
  }
  for (let index = 0; index < tickets.ordinary; index++) {
    result.push(1);
  }
  return result;
}