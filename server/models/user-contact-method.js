const conn = require("./mysql-connection");

const model = {
  async getAll(){
    return await conn.query("SELECT * FROM usercontactmethod");
  },
  async getAllContactMethodForUser(input){
    return await conn.query("SELECT * FROM usercontactmethod WHERE userID=?", input.userID);
  },
  async getContactTypeForUser(input){
    return await conn.query(
                            "SELECT * FROM usercontactmethod WHERE userID=? AND type=?",
                            [input.userID, input.type]
    );
  },
  async add(input){
    await conn.query(
                    "INSERT INTO usercontactmethod (userID, type, value) VALUES (?)",
                     [[input.userID, input.type, input.value]]
    );
    return await model.getAllContactMethodForUser(input);
  }

};

module.exports = model;
