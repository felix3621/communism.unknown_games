const { MongoClient } = require("mongodb");
require('dotenv').config();
const logger = require("./logger.cjs");

const mDBClient = new MongoClient(process.env.MONGODB_URI);

async function connectToDatabase() {
    try {
        await mDBClient.connect();
        logger.info('Connected to MongoDB', 'db');
        return mDBClient.db("communism_unknown_games");
    } catch (error) {
        logger.error('Error connecting to MongoDB: '+error, 'db');
        throw error;
    }
}

module.exports = connectToDatabase();