const conn = require("./mysql-connection");
const bcrypt = require('bcrypt');
const userContactModel = require('./user-contact-method')
const jwt = require('jsonwebtoken');

const SALT_FACTOR = 8;
const JWT_SECRET = process.env.JWT_SECRET || 'some long string..';

const model = {
  async getAll(){
    let users =  await conn.query("SELECT * FROM users");
    users.forEach(function(user) {
      delete user.Password;
    })
    return users;
  },
  async get(id){
    let user = await conn.query('SELECT * FROM users WHERE id=(?)', id);
    delete user[0].Password;
    return user;
  },
  async getUserWithEmail(input){
    return await conn.query("SELECT * FROM users u INNER JOIN usercontactmethod uc on u.id = uc.userID AND uc.value = ? ",
                  [input.Email]
                  );
  },
  async add(input){
    const hash = await bcrypt.hash(input.Password, SALT_FACTOR);
    const data = await conn.query(
      "INSERT INTO users (FirstName, LastName, Age, Height, Weight, Birthday, Password, CreatedAt) VALUES (?)", 
      [[input.FirstName, input.LastName, input.Age, input.Height, input.Weight, input.Birthday, hash, new Date()]]
    );
    console.log("----Add----")
    console.log(data)
    return await model.get(data.insertId);
  },
  async update(input){
    await conn.query(
      "UPDATE users SET FirstName=?, LastName=?, Age=?, Height=?, Weight=?, Birthday=?, UpdatedAt=? WHERE id=?",
      [input.FirstName, input.LastName, input.Age, input.Height, input.Weight, input.Birthday, new Date(), input.id]
    );
    const data = await model.get(input.id);
    const user = {...data[0], Password: null};
    return user
  },
  async updateWeight(input){
    // ? - We'll pass those values later
    await conn.query(
            "UPDATE users SET Weight=?, UpdatedAt=? WHERE id=?", 
            [input.Weight, new Date(), input.id]
    );
    return await model.get(input.id);
  },
  async updateHeight(input, callback){
    // ? - We'll pass those values later
    await conn.query(
                    "UPDATE users SET Height=?, UpdatedAt=? WHERE id=?", 
                    [input.Height, new Date(), input.id]
    ); 
    return await model.get(input.id);
  },
  async updateAge(input, callback){
    // ? - We'll pass those values later
    await conn.query(
                    "UPDATE users SET Age=?, UpdatedAt=? WHERE id=?", 
                    [input.Age, new Date(), input.id]
    ); 
    return await model.get(input.id);
  },
  async updatePassword(input, callback){
    const hash = bcrypt.hash(input.NewPassword, SALT_FACTOR);
    return await conn.query(
                          "UPDATE users SET Password=?, UpdatedAt=? WHERE id=?", 
                          [hash, new Date(), input.id]
    );
  },
  async comparePassword(password, userPassword){
    return await bcrypt.compare(password, userPassword);
  },
  getFromToken(token){
    return jwt.verify(token, JWT_SECRET);
  },
  async login(input){
    const data = await model.getUserWithEmail(input);
    if(data.length == 0){
      throw Error('The login information was not correct.');
    }
    const user = data[0];
    const userID = data[0].userID;
    const isPasswordValid = await model.comparePassword(input.Password, user.Password);
    if(!isPasswordValid){
      throw Error('The login information was not correct.');
    } else {
      const user = { ...data[0], password: null, id: userID, userID: null};
      return {user, token: jwt.sign(user, JWT_SECRET)};
    }
  },
  async register(input){
    const existingUser = await model.getUserWithEmail(input)
    if(existingUser.length != 0){
      throw Error('Email already in use.');
    }
    const data = await model.add(input);
    const user = data[0];
    await userContactModel.add({userID:user.id,type:'email',value:input.Email});
    const returnUser = { ...user, password: null};
    console.log(returnUser);
    return {user: returnUser, token: jwt.sign(returnUser, JWT_SECRET)};
  }
};

module.exports = model;
