const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/players', {useNewUrlParser: true, useUnifiedTopology: true});

let playerSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  personId: {type: Number, unique: true}
})

let Player = mongoose.model('Player', playerSchema);

let save = (player) => {
  var player1 = new Player({
    firstName: player.firstName,
    lastName: player.lastName,
    personId: player.personId
  });

  player1.save(function(err, results) {
    if (err) {
      console.log(err);
    }
  })
}

let deletePlayer = (id) => {
  Player.deleteOne({personId: id}, function(err) {
    console.log(err);
  })
}

let getPlayers = (callback) => {
  mongoose.model('Player', playerSchema).find()
  .then(data => callback(data))
  .catch(error => console.log(err))
}

module.exports.save = save;
module.exports.deletePlayer = deletePlayer;
module.exports.getPlayers = getPlayers;