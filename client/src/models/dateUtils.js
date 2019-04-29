// This file contains helper functions for working with dates.

// Get the formatted date.
export function getFormattedDate(date){
  if(!(date instanceof Date)){
    return date;
  }
  let dd = date.getDate();
  let mm = date.getMonth() + 1; //January is 0!
  let yyyy = date.getFullYear();
  
  if (dd < 10) {
    dd = '0' + dd;
  } 
  if (mm < 10) {
    mm = '0' + mm;
  } 
   return yyyy + '-' + mm + '-' + dd;

}