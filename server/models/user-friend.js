const conn = require("./mysql-connection");

const model = {
  getAll(callback){
    conn.query("SELECT * FROM userfriends", (err, data) => {
      callback(err, data);
    });
  },
  getFriends(id, callback){
    // We need to look at both userID1 and userID2 for the matching values
    // Union the matches and return
    conn.query("SELECT u.id, u.FirstName, u.LastName FROM users u \
                INNER JOIN userfriends uf on u.id = uf.userID1 AND uf.userID2= ? \
                UNION \
                SELECT u.id, u.FirstName, u.LastName FROM users u \
                INNER JOIN userfriends uf on u.id = uf.userID2 AND uf.userID1= ?\ ",
                [id, id],
                (err, data) => {
                  callback(err,data)
                })
  },
  addFriend(input, callback){
    // Always insert and retrieve the ids with userid1 < userid2
    // This allows us to assure the combination is unique
    id1 = input.id1
    id2 = input.id2
    if(input.id1 > input.id2){
      id1 = input.id2
      id2 = input.id1
    }
    conn.query("INSERT INTO userfriends (userID1, userID2, dateEstablished) VALUES (?)",
              [[id1, id2, new Date()]],
              (err, data) => {
                callback(err, data);
              })
  },
  removeFriend(input, callback){
    // Always insert and retrieve and remove the ids with userid1 < userid2
    // This allows us to assure the combination is unique
    id1 = input.id1
    id2 = input.id2
    if(input.id1 > input.id2){
      id1 = input.id2
      id2 = input.id1
    }
    conn.query("DELETE FROM userfriends WHERE userID1=? AND userID2=?",
                [id1, id2],
                (err,data) => {
                  callback(err,data);
                })
  }

};

module.exports = model;
