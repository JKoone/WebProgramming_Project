const conn = require("./mysql-connection");

const model = {
  async getAll(){
    return await conn.query("SELECT * FROM userexercises");
  },
  // Values were getting overwritten. Had to switch the join order Exercises -> Userexercises
  async getExercisesForDate(input){
    return await conn.query(
                          "SELECT * FROM exercises e \
                          INNER JOIN userexercises ue on ue.exerciseID = e.id \
                          WHERE date=? AND ue.userID=?",
                          [input.date, input.id]
    );
  },
  async addExerciseForUser(input, callback){
    await conn.query("INSERT INTO userexercises (userID, exerciseID, date, duration) VALUES (?)",
              [[input.userID, input.exerciseID, input.date, input.duration]]
    );
    return await model.getExercisesForDate(input);
  }

};

module.exports = model;
