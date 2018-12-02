const express = require('express');
const logger = require('morgan');
const app = express();
const config = require('../config');
const mongoose = require('mongoose');
const User = require('../model/user');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));


// Connect mongo db
mongoose.connect(config.mongodb, {
  useNewUrlParser: true,
  useCreateIndex: true
}, err => {
  if (err) {
    console.warn("Can not connect to mongodb server.");
    console.error(err.message);
  }
});

var usersmodel = User.schema.obj;

app.use('/users/:id', (req, res) => {

var id = Number(req.params.id);

console.warn(id);
  User.findById(id, (err, user) => {
       if (err){
         res.send({status: {message: "Internal error", error: true}, data: err });
       } else if (user == null) {
         res.send({status: {message: "No content", error: true}, data: err });
       } else {

  const dbuser = usersmodel;
  dbuser.name = user.name
  dbuser.email = user.email;
  dbuser.password = user.password;
  dbuser.date = user.date;
  res.send({status: {message: 'OK', error: false}, data: dbuser});
  }
  });
});

app.use('/users', (req, res) => {

User.find((err, users) => {
     if (err){
       res.send({status: {message: "Internal error", error: true}, data: err });
     } else if (users == null) {
       res.send({status: {message: "No content", error: true}, data: err });
     } else {

let dbusers = new Array(usersmodel);

for (var i = 0, len = dbusers.length; i < len; i++) {
  usersmodel.name = users[i].name
  usersmodel.email = users[i].email;
  usersmodel.password = users[i].password;
  usersmodel.date = users[i].date;
  dbusers.push(usersmodel);
}
  res.send({status: {message: 'OK', error: false}, data: dbusers});
}
});
});

module.exports = app;
