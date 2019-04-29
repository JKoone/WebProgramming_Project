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

  const x = await apiGet("userstepcounts/getStepCountSinceDate", params);

  return x;
}
