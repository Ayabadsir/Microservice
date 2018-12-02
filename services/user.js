const express = require('express');
const logger = require('morgan');
const app = express();

// Liste d'utilisateur
var data = [
  {
    name: "Moussa Dakia",
    email: "moussa@adei-institut.com",
    password: "$2a$10$Lrt4HKHuse6OQvH8OX7lyu",
    date: "2018-11-22 20:51:47"
  },
  {
    name: "Nikia",
    email: "nikia@adei-institut.com",
    password: "$2a$10$Lrt4HKHuse6OQvH8OX7lyu",
    date: "2018-11-22 20:51:47"
  },
  {
    name: "Mohamed Touré",
    email: "toure@adei-institut.com",
    password: "$2a$10$Lrt4HKHuse6OQvH8OX7lyu",
    date: "2018-11-22 20:51:47"
  },
  {
    name: "Eli",
    email: "eli@adei-institut.com",
    password: "$2a$10$Lrt4HKHuse6OQvH8OX7lyu",
    date: "2018-11-22 20:51:47"
  }
];

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));


app.use('/users/:id', (req, res) => {
  
  // récupérer l'id dans url
  var id = req.params.id;
  var user;

  switch(id) {
      case '1':

      // On prend le premier user du tableau
      user = data[0];
      // Formater la reponse en json
      res.json(user)
          break;
      case '2':
      user = data[1];
      res.json(user)
          break;
      case '3':
      user = data[2];
      res.json(user)
          break;
      case '4':
      user = data[3];
      res.json(user)
          break;
      default:
          res.json({"error":"Not found"})
  }
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.send({status: {message: 'OK', error: false}, data:{}});
});

app.use('/users', (req, res) => {

res.json(data)
res.writeHead(200, {'Content-Type': 'application/json'});
res.send({status: {message: 'OK', error: false}, data: []});

});

module.exports = app;

