const API_ROOT = process.env.API_ROOT || "http://localhost:3000/";

import $ from 'jquery';

// Globals variable we will use for cache-ing data we need between views
export const Globals = {
  user: null,
  errors: [],
  deleteError(i){
    this.errors.splice(i, 1);
  }
}
// Had to break up the Get / Post to support GET Params.

// TODO: We might not need to break this up.
//       We can probably get away with embedding the params in the url prior to passing to api.

export async function apiGet(url, params) {
  let response = null; 
  let headers = { "Authorization": `Bearer ${Globals.token}` }
  console.log({ headers, params});
  response = await fetch(API_ROOT + url +'?'+ $.param(params), { headers });
  if(!response.ok){
      throw await response.json();
  }
  return await response.json();
}

export async function apiPost(url, data) {
  let response = null; 
  let headers = { "Authorization": `Bearer ${Globals.token}` }
  response = await fetch(API_ROOT + url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
        ...headers,
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  if(!response.ok){
    throw await response.json();
  }
  return await response.json();
}

export async function api(url, data) {
  let response = null; 
  let headers = { "Authorization": `Bearer ${Globals.token}` }
  if(!data){
      response = await fetch(API_ROOT + url, { headers });
  }else{
      response = await fetch(API_ROOT + url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
              ...headers,
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
  }
  if(!response.ok){
      throw await response.json();
  }
  return await response.json();
}
