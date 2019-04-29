import { api, apiGet, apiPost, Globals } from "./api";
export async function GetFriends() {
  if(!Globals.user){
    return
  }
  let params = {id: Globals.user.id}
  const x = await apiGet("userfriends/getFriends", params)
  console.log(x);
  return x;
}

// Function to get all of the users that are not friends.
// This will be a nice function for adding possible friends.
// 1) Grab the list of users.
// 2) Grab the Friends of the logged in user
// 3) Return the users that are not friends using Array.filter
export async function getNonFriends() {
  if(!Globals.user){
    return
  }
  let params = {id: Globals.user.id}
  const x = await apiGet("userfriends/getNonFriends", params)
  return x;
}

export async function AddFriend(friendId) {
  let data = {id1: Globals.user.id, id2: friendId};

  const x = await apiPost("userfriends/addFriend", data);
  console.log(x);
  return x
}

export async function RemoveFriend(friendId) {
  let data = {id1: Globals.user.id, id2: friendId};

  const x = await apiPost("userfriends/removeFriend", data);
  console.log(x);
  
  return x;
}