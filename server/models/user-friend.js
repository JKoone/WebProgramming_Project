const conn = require("./mysql-connection");

const model = {
  getAll(callback){
    conn.query("SELECT * FROM userfriends", (err, data) => {
      callback(err, data);
    });
  },
  get(id, callback){

  },
  add(input, callback){
    // ? - We'll pass those values later
    // Why [[]]
    //  - We want an array of arrays
    conn.query("INSERT INTO InClass_Person (FirstName, LastName, Birthday, Password, created_at) VALUES (?)", 
                [[input.FirstName, input.LastName, input.Birthday, input.Password, new Date()]], 
                (err, data) => {
                  callback(err, data);
                }
    );
  }

};

module.exports = model;
