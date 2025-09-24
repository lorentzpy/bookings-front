//import dayjs;

import dayjs from "dayjs";

const getBlockedDates = (bookings) => {

    var blockedDates = [];

    bookings.forEach(booking => {
        
        var startDate = dayjs(booking.from);
        var endDate = dayjs(booking.to);

        while (startDate.isBefore(endDate) || startDate.isSame(endDate, "day")) {
            blockedDates.push(startDate.format("YYYY-MM-DD"));
            startDate = startDate.add(1, "day");
        }
    });

    return blockedDates;
}

export default getBlockedDates;