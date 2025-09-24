import getSchoolYear from "../utils/getSchoolYear";

const handleDateChange = (info, { setSchoolYear, setCurrentMonth, setCurrentYear, checkToken }) => {

    if (!checkToken()) {
      return;
    }

    const month = info.view.currentStart.getMonth()+1;
    const year = info.view.currentStart.getFullYear();

    const schoolYear = getSchoolYear(month, year);

    const currentMonth = `${year}-${month.toString().padStart(2,"0")}`;

    // set schoolYear
    setSchoolYear(schoolYear);

    // set current month
    setCurrentMonth(currentMonth);

    // set year
    setCurrentYear(year);

  };

export default handleDateChange;