const express = require('express');

const app = express();

const PORT = 3000;// port generalized

app.use(express.static(__dirname + '/../client/public'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})