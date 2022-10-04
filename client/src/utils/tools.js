export const daysBetweenDates = (date1, date2) => {
  const MILI_SECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(timeDiff / MILI_SECONDS_PER_DAY);
  return diffDays;
};

export const getDateInRange = (start, end) => {
  const sDate = new Date(start); //.getTime();
  const eDate = new Date(end); //.getTime();
  let dates = [];
  while (sDate <= eDate) {
    //console.log(sDate, " | ", eDate);
    dates.push(new Date(sDate).getTime()); //Convert 'new Date(sDate)' to timestamp for better management
    //ADD 1 DAY TO THE START DATE
    sDate.setDate(sDate.getDate() + 1);
  }
  return dates;
};
