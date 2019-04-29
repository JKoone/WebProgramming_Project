import { apiPost, apiGet, Globals } from "./api";

export async function getAll(){
  const x = await apiGet("users/");
  return x
}

export async function GetUserWithID(id){
  let params = {id: id}
  const x = await apiGet("users/getUserWithID", params);
  return x[0];
}

export async function Login(data){
  const x = await apiPost("users/login", data);
  Globals.user = x.user;
  Globals.token = x.token;
  console.log(Globals.user);
  console.log(Globals.token);
  return x;
}

export async function Register(data){
  const x = await apiPost("users/register", data);
  Globals.user = x.user;
  Globals.token = x.token;
  console.log(Globals.user);
  console.log(Globals.token);
  return x;
}

export async function Update(data){
  const x = await apiPost("users/update", data);
  Globals.user = x;
  return x;
}