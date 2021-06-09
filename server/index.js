const express = require('express');
const axios = require('axios');
const db = require('../database/index.js')
const app = express();

const PORT = 3000;// port generalized

app.use(express.json())
app.use(express.static(__dirname + '/../client/public'));

app.post('/players', function(req, res) {
  console.log(req.body)
  db.save(req.body)
})

app.get('/players', function(req, res) {
  db.getPlayers(function(players) {res.send(players)})
})

app.delete('/players', function(req, res) {
  db.deletePlayer(req.body.personId)
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})