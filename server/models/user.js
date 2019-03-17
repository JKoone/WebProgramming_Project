const conn = require("./mysql-connection");
const bcrypt = require('bcrypt');
const userContactModel = require('./user-contact-method')
const SALT_FACTOR = 8;

const model = {
  getAll(callback){
    conn.query("SELECT * FROM users", (err, data) => {
      callback(err, data);
    });
  },
  get(id, callback){
    conn.query('SELECT * FROM users WHERE id=(?)', id, 
        (err, data) => {
          callback(err, data[0]);
    });
  },
  getUserWithEmail(input, callback){
    conn.query("SELECT * FROM users u INNER JOIN usercontactmethod uc on u.id = uc.userID AND uc.value = ? ",
              [input.Email],
              (err, data) => {
                callback(err, data[0]);
              }
    );
  },
  add(input, callback){
    bcrypt.hash(input.Password, SALT_FACTOR, (err, hash) => {
      if(err) callback(err)

      conn.query("INSERT INTO users (FirstName, LastName, Age, Height, Weight, Password, CreatedAt) VALUES (?)", 
                  [[input.FirstName, input.LastName, input.Age, input.Height, input.Weight, hash, new Date()]], 
                  (err, data) => {
                    if(err){
                      callback(err)
                      return
                    }
                    const id = data.insertId
                    model.get(id,(err,data)=>{
                      callback(err, data);
                    })
                  }
      );
    })
  },
  update(input,callback){
    conn.query("UPDATE users SET FirstName=?, LastName=?, Age=?, Height=?, Weight=?, UpdatedAt=? WHERE id=?",
              [input.FirstName, input.LastName, input.Age, input.Height, input.Weight, new Date(), input.id],
              (err, data) => {
                if(err){
                  callback(err)
                  return
                }
                model.get(input.id, (err, data) => {
                  callback(err, data)
                })
              })
  },
  updateWeight(input, callback){
    // ? - We'll pass those values later
    conn.query("UPDATE users SET Weight=?, UpdatedAt=? WHERE id=?", 
                [input.Weight, new Date(), input.id], 
                (err, data) => {
                  if(err){
                    callback(err)
                    return
                  }
                  model.get(input.id, (err, data) => {
                    callback(err, data)
                  })
                }
    )
  },
  updateHeight(input, callback){
    // ? - We'll pass those values later
    conn.query("UPDATE users SET Height=?, UpdatedAt=? WHERE id=?", 
                [input.Height, new Date(), input.id], 
                (err, data) => {
                  if(err){
                    callback(err)
                    return
                  }
                  model.get(input.id, (err, data) => {
                    callback(err, data)
                  })
                }
    )
  },
  updateAge(input, callback){
    // ? - We'll pass those values later
    conn.query("UPDATE users SET Age=?, UpdatedAt=? WHERE id=?", 
                [input.Age, new Date(), input.id], 
                (err, data) => {
                  if(err){
                    callback(err)
                    return
                  }
                  model.get(input.id, (err, data) => {
                    callback(err, data)
                  })
                }
    )
  },
  updatePassword(input, callback){
    bcrypt.hash(input.NewPassword, SALT_FACTOR, (err, hash) => {
      if(err) callback(err)
      conn.query("UPDATE users SET Password=?, UpdatedAt=? WHERE id=?", 
                [hash, new Date(), input.id],
                (err, data) => {
                  callback(err, data);
                }
      )
    })
  },
  comparePassword(password, userPassword, callback){
    bcrypt.compare(password, userPassword, 
                  (err, res) => {
                    callback(err, res);
                  }
    );
  },
  login(input, callback){
    model.getUserWithEmail(input, (err, user)=> {
      if(err){
        callback(err)
        return
      }
      if(!user){
        callback(Error('The login information was not correct.'))
        return
      }

      model.comparePassword(input.Password, user.Password, (err, isPasswordValid)=> {
        console.log(isPasswordValid)
        if(!isPasswordValid){
          callback('The login information was not correct.')
          return
        }
        callback(err, user);
      })
    })
  },
  register(input, callback){
    model.getUserWithEmail(input, (err, user) => {
      if(err){ 
        callback(err)
        return
      }
      if(user){
        callback(new Error('Email already in use.'))
        return
      }

      model.add(input, (err, user) => {
        if(err) {
          callback (err)
          return
        }
        userContactModel.add({userID:user.id,type:'email',value:input.Email}, (err, data) => {
          callback(err,user);
        })
      })
    })
  },
};

module.exports = model;
