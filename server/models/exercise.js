const conn = require("./mysql-connection");

const model = {
  async getAll(callback){
    return await conn.query("SELECT * FROM exercises");
  },
  async getExerciseWithName(input, callback){
    return await conn.query(
                            "SELECT * FROM exercises WHERE exerciseName=?",
                            [input.exerciseName]
    );
  },
  async add(input, callback){
    await conn.query("INSERT INTO exercises (exerciseName, caloriesPerHour, type) VALUES (?)", 
                [[input.exerciseName, input.caloriesPerHour, input.type]]
    );
    return await model.getExerciseWithName(input);
  }

};

module.exports = model;
