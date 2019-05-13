import { apiPost, apiGet, Globals } from "./api";

export async function GetAllExercises(){
  const x = await apiGet("exercises/");
  return x;
}

export async function GetExerciseWithName(name){

  let searchString = name.trim()+".*";
  let params = {exerciseName: searchString};
  const x = await apiGet("exercises/getExerciseWithName", params);
  console.log(x);
  return x;

}

export async function AddExercise(data){
  const x = await apiPost("exercises/", data);
  return x[0];
}
