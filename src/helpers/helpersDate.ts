export class HelpersDate {
    static currentYear = new Date().getFullYear().toString();
    static currentMonthInNumber = new Date().getMonth() + 1;
  
  
    static getCurrentMonth() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      return `${year}-${month}`;
    }
  
    static getCurrentDate() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const day = currentDate.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  
    static getCurrentHour() {
      const currentDate = new Date();
      const hours = currentDate.getHours().toString().padStart(2, "0");
      const minutes = currentDate.getMinutes().toString().padStart(2, "0");
      const seconds = currentDate.getSeconds().toString().padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    }
  }