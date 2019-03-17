const conn = require("./mysql-connection");

const model = {
  getAll(callback){
    conn.query("SELECT * FROM userstepcount", (err, data) => {
      callback(err, data);
    });
  },
  getStepCountForDate(input, callback){
    conn.query('SELECT * FROM userstepcount WHERE userID=? AND DATE=?',
                [input.id, input.date],
                (err, data) => {
                  callback(err, data)
                })
  },
  getStepCountSinceDate(input, callback){
    conn.query('SELECT * FROM userstepcount WHERE userID=? AND DATE >=?',
              [input.id, input.date],
              (err,data) => {
                callback(err, data)
              })
  },
  setStepCountForDate(input, callback){
    conn.query(`INSERT INTO userstepcount (userID, date, value) 
                VALUES (?) 
                ON DUPLICATE KEY UPDATE 
                value=?`, 
                [[input.id, input.date, input.value], input.value],
                (err, data) => {
                  if(err){
                    callback(err)
                    return
                  }
                  model.getStepCountForDate(input, (err, data) => {
                    callback(err, data[0])
                  })
                })
  }

};

module.exports = model;
