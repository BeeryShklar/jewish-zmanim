export function getDaysInMonth(month: number, year: number): number {
  var date = new Date(year, month, 1);
  var days = 0;
  while (date.getMonth() === month) {
    days++
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export const gregMonthsEng = ["January", "February", "March", "April", "May",
  "June", "July", "August", "September", "October", "November", "December"]

export const gregMonthsHe = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי",
  "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]

export const getGregMonths = (isHebrew) => isHebrew ? gregMonthsHe : gregMonthsEng