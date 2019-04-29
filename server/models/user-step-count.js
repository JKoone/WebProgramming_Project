const conn = require("./mysql-connection");

const model = {
  async getAll(){
    return await conn.query("SELECT * FROM userstepcount");
  },
  async getStepCountForDate(input){
    return await conn.query(
                            'SELECT * FROM userstepcount WHERE userID=? AND DATE=?',
                            [input.id, input.date]
    );
  },
  async getStepCountSinceDate(input){
    return await conn.query(
                            'SELECT * FROM userstepcount WHERE userID=? AND DATE >=?',
                            [input.id, input.date]
    );
  },
  async setStepCountForDate(input){
    await conn.query(
                     `INSERT INTO userstepcount (userID, date, value) 
                      VALUES (?) 
                      ON DUPLICATE KEY UPDATE 
                      value=?`, 
                      [[input.id, input.date, input.value], input.value]
    );
    return await model.getStepCountForDate(input);
  }

};

module.exports = model;
