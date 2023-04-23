const { connect, connection } = require("mongoose"); //promise

//const mongoose = require('mongoose');//callback

const connectionString = "mongodb://localhost:27017/socialNetwork_db";

connect(connectionString, {
  useNewUrlParser: true,
});

module.exports = connection;
