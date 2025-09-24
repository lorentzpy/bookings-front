import bookingSource from "../events/bookingSource";
import publicHolidaySource from "../events/publicHolidaySource";
import holidaySource from "../events/holidaySource";

const getSources = (schoolYear, currentMonth, currentYear, selectedZones, publicHolidays) => {

    const sources = [];

    const h = holidaySource(schoolYear, selectedZones);
    if (h) sources.push(h);

    sources.push(bookingSource(currentMonth));

    if (publicHolidays) {
      sources.push(publicHolidaySource(currentYear));
    }

    return sources;
}

export default getSources;