import { apiGet, apiPost, Globals } from "./api";
import { getFormattedDate } from "./dateUtils";

export async function setStepCountForDate(date, value){
  let formattedDate = getFormattedDate(date);
  let data = { id: Globals.user.id, 
                 date: formattedDate, 
                 value: value
  };
  console.log(data);
  const x = await apiPost("userstepcounts/setStepCountForDate", data);
  return x;
}

export async function getStepCountForDate(date){
  let formattedDate = getFormattedDate(date);
  let params = { id: Globals.user.id, date: formattedDate};
  console.log(params);
  const x = await apiGet("userstepcounts/getStepCountForDate", params)
  console.log(x);
  return x.value;
}

export async function getStepCountSinceDate(id, date){
  let formattedDate = getFormattedDate(date);
  let params = { id: id, date: formattedDate};
  console.log(params);
  const x = await apiGet("userstepcounts/getStepCountSinceDate", params);

  return x;
}

export async function getStepHistoryChartData(id, date){
  let formattedDate = getFormattedDate(date);
  let dateParts = formattedDate.split('-');
  // Please pay attention to the month (dateParts[1]); JavaScript counts months from 0:
  // January - 0, February - 1, etc.
  let startDate = new Date(dateParts[0], dateParts[1] -1, dateParts[2]-4)
  const stepData = await getStepCountSinceDate(id, startDate);
  let dataArray = [];
  dataArray.push(['Date', 'stepcount'])
  // We're displaying data for past 5 days
  for( let i = 0 ; i < 5; i++){
    // Get the date for the index.
    let date = new Date(dateParts[0], dateParts[1] -1, dateParts[2]-(4-i));
    // Default value is 0
    let value = 0;
    for (let dataIndex in stepData){
      let data = stepData[dataIndex];
      let thisDate = new Date(data.date);
      if(getFormattedDate(thisDate) === getFormattedDate(date)){
        value = data.value===null ? 0 : data.value;
      }
    }
    dataArray.push([getFormattedDate(date), value]);
  }
  return dataArray;
}