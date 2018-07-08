const MongoClient = require('mongodb').MongoClient

// Using free-tier MongoDB from mlab
const URL = "mongodb://test:testuser1160.k@ds131601.mlab.com:31601/geo";

module.exports = async function() {
    return MongoClient.connect(URL, { useNewUrlParser: true }).then(client => client.db())
}