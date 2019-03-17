const conn = require("./mysql-connection");

const model = {
  getAll(callback){
    conn.query("SELECT * FROM usercontactmethod", (err, data) => {
      callback(err, data);
    });
  },
  getAllContactMethodForUser(input, callback){
    conn.query("SELECT * FROM usercontactmethod WHERE userID=?",
               input.userID,
               (err, data) => {
                 callback(err, data)
               })
  },
  getContactTypeForUser(input, callback){
    conn.query("SELECT * FROM usercontactmethod WHERE userID=? AND type=?",
              [input.userID, input.type],
              (err, data) => {
                callback(err,data)
              }) 
  },
  add(input, callback){
    conn.query("INSERT INTO usercontactmethod (userID, type, value) VALUES (?)", 
                [[input.userID, input.type, input.value]], 
                (err, data) => {
                  if(err){
                    callback(err)
                    return
                  }
                  model.getAllContactMethodForUser(input, (err, data) => {
                    callback(err, data)
                  })
                }
    );
  }

};

module.exports = model;
