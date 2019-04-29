const conn = require("./mysql-connection");

const model = {
  async getAll(){
    return await conn.query("SELECT * FROM userfriends");
  },
  async getFriends(id){
    // We need to look at both userID1 and userID2 for the matching values
    // Union the matches and return
    return await conn.query(
                          "SELECT u.id, u.FirstName, u.LastName FROM users u \
                          INNER JOIN userfriends uf on u.id = uf.userID1 AND uf.userID2= ? \
                          UNION \
                          SELECT u.id, u.FirstName, u.LastName FROM users u \
                          INNER JOIN userfriends uf on u.id = uf.userID2 AND uf.userID1= ?\ ",
                          [id, id]
    );
  },
  // Method for getting non-friends..
  // Not sure if this is the best way to implement this, but it works for now.
  async getNonFriends(id){
    friends = await this.getFriends(id);
    friendIds = friends.map(friend => friend.id);
    friendIds.push(id);
    console.log(friendIds)
    return await conn.query(
                          "SELECT u.id, u.FirstName, u.LastName FROM users u WHERE u.id NOT IN (?)",
                          [friendIds]
    );

  },
  async addFriend(input){
    // Always insert and retrieve the ids with userid1 < userid2
    // This allows us to assure the combination is unique
    id1 = input.id1
    id2 = input.id2
    if(input.id1 > input.id2){
      id1 = input.id2
      id2 = input.id1
    }
    return await conn.query(
                          "INSERT INTO userfriends (userID1, userID2, dateEstablished) VALUES (?)",
                          [[id1, id2, new Date()]]
    );
  },
  async removeFriend(input){
    // Always insert and retrieve and remove the ids with userid1 < userid2
    // This allows us to assure the combination is unique
    id1 = input.id1
    id2 = input.id2
    if(input.id1 > input.id2){
      id1 = input.id2
      id2 = input.id1
    }
    return await conn.query(
                            "DELETE FROM userfriends WHERE userID1=? AND userID2=?",
                            [id1, id2]
    );
  }

};

module.exports = model;
