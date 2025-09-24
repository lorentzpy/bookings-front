const getSchoolYear = (month, year) => {
    if (month >= 9) {
      return `${year}-${year + 1}`;
    } else {
      return `${year - 1}-${year}`;
    }
  };

export default getSchoolYear;