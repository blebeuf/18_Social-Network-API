const { connect, connection } = require('mongoose');

// Updated with a valid connection string
const connectionString = 'mongodb://127.0.0.1:27017/mySocialNetworkAPI';

// Connect to MongoDB without deprecated options
connect(connectionString);

module.exports = connection;
