import React from 'react';

function BookingItem({ booking, index }) {
    const screeningTime = booking.screeningTime.replace('T', ' ').slice(0, -3);

    return (
        <p key={index}>
            "{booking.movie}" på {booking.theater},
            Tid: {screeningTime}, 
            Bokningsnummer: {booking.bookingNumber}                      
        </p>
    );
}

export default BookingItem;