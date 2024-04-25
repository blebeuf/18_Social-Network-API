const { connect, connection } = require('mongoose');

// replace with a actually connection
const connectionString = 'mongodb://127.0.0.1:27017/...';

connect(connectionString);

module.exports = connection;
