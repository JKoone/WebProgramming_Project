const conn = require("./mysql-connection");

const model = {
  getAll(callback){
    conn.query("SELECT * FROM userexercises", (err, data) => {
      callback(err, data);
    });
  },
  getExercisesForDate(input, callback){
    conn.query("SELECT * FROM userexercises WHERE date=?",
              [input.date],
              (err, data) => {
                callback(err,data)
              })
  },
  addExerciseForUser(input, callback){
    conn.query("INSERT INTO userexercises (userID, exerciseID, date, duration) VALUES (?)",
              [[input.userID, input.exerciseID, input.date, input.duration]],
              (err, data) => {
                if(err){
                  callback(err)
                  return
                }
                model.getExercisesForDate(input, (err,data) => {
                  callback(err, data)
                })
              })
  }

};

module.exports = model;
