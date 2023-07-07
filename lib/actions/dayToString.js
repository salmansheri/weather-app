export const convertDateToDay = (dateString) => {
  var day = new Date(dateString);
  return day.getDay();
};
