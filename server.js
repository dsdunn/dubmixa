const express = require('express');
const app = express();

app.use(express.static('public'));

app.use('/tone', express.static(__dirname + '/tone'));

const server = app.listen(8080, () => {
  console.log('server is running on port 8080');
});