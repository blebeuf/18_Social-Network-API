// Function to add a date suffix (st, nd, rd, th) to a day of the month.
const addDateSuffix = date => {
    const dateStr = date.toString();
    const lastTwoChars = dateStr.slice(-2);
  
    if (lastTwoChars === '11' || lastTwoChars === '12' || lastTwoChars === '13') {
      return dateStr + 'th';
    }
  
    switch (dateStr.charAt(dateStr.length - 1)) {
      case '1':
        return dateStr + 'st';
      case '2':
        return dateStr + 'nd';
      case '3':
        return dateStr + 'rd';
      default:
        return dateStr + 'th';
    }
  };
  
  // Main function to format a timestamp into a human-readable date string.
  module.exports = (timestamp, { monthLength = 'short', dateSuffix = true } = {}) => {
    const months = [
      [ 'Jan', 'January' ],
      [ 'Feb', 'February' ],
      [ 'Mar', 'March' ],
      [ 'Apr', 'April' ],
      [ 'May', 'May' ],
      [ 'Jun', 'June' ],
      [ 'Jul', 'July' ],
      [ 'Aug', 'August' ],
      [ 'Sep', 'September' ],
      [ 'Oct', 'October' ],
      [ 'Nov', 'November' ],
      [ 'Dec', 'December' ]
    ];
  
    const dateObj = new Date(timestamp);
    const monthIndex = dateObj.getMonth();
    const formattedMonth = months[monthIndex][monthLength === 'short' ? 0 : 1];
    const dayOfMonth = dateSuffix ? addDateSuffix(dateObj.getDate()) : dateObj.getDate();
    const year = dateObj.getFullYear();
  
    let hour = dateObj.getHours();
    const periodOfDay = hour >= 12 ? 'pm' : 'am';
    
    // Convert hour to 12-hour format and handle midnight case
    hour = hour % 12;
    if (hour === 0) {
      hour = 12;
    }
  
    // Ensure minutes are always two digits
    const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();
  
    // Construct the full formatted date string
    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
  
    return formattedTimeStamp;
  };
  