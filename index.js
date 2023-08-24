require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./src/server');


// URL anatomy for MongoDB;
const DB_user = process.env.DB_user;
const DB_password = process.env.DB_password;
const DE_host = process.env.DE_host;
const DB_name = process.env.DB_name;


//first connect to db, then if all good launch the server, if not show error message.
mongoose.connect(
    `mongodb+srv://${DB_user}:${DB_password}@${DE_host}/${DB_name}`)
    // 'mongodb+srv://holow19:Digimon19@hollow19.r4ynzyy.mongodb.net/koders_db?retryWrites=true&w=majority')
  .then (() => {
    server.listen(8080, () => {
        console.log('Server listening 8080');
    });
  })
   .catch((error) => {
    console.error('Error to connect', error);
   })

