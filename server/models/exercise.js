const conn = require("./mysql-connection");

const model = {
  getAll(callback){
    conn.query("SELECT * FROM exercises", (err, data) => {
      callback(err, data);
    });
  },
  getExerciseWithName(input, callback){
    conn.query("SELECT * FROM exercises WHERE exerciseName=?",
              [input.exerciseName],
              (err, data) => {
                callback(err, data)
              })
  },
  add(input, callback){
    conn.query("INSERT INTO exercises (exerciseName, caloriesPerHour, type) VALUES (?)", 
                [[input.exerciseName, input.caloriesPerHour, input.type]], 
                (err, data) => {
                  if(err){
                    callback(err)
                    return
                  }
                  model.getExerciseWithName(input, (err, data) => {
                    callback(err, data);
                  })
                }
    );
  }

};

module.exports = model;
