import { apiPost, apiGet, Globals } from "./api";
import { getFormattedDate } from "./dateUtils";

export async function GetExercisesForDate(userID, date) {
  let formattedDate = null;
 // if(date instanceof Date){
   formattedDate = getFormattedDate(date);
 // } else {
 //   formattedDate = date;
 // }
  let params = {id: userID, date: formattedDate};
  const x = await apiGet("userexercises/getExercisesForDate", params)
  return x;
}

export async function AddExerciseForUser(exercise) {
  exercise.userID = Globals.user.id;

  const x = await apiPost("userexercises/addExerciseForUser", exercise);
  return x;
}
