var fs = require('fs');
const logger = require('./logger.cjs');

module.exports = (process, trace) => {
    process.on('SIGINT', () => {
        logger.error(`killed by user`,trace);
        process.exit(1);
    })
    
    process.on('SIGTERM', () => {
        logger.error(`killed by system`,trace);
        process.exit(1);
    })
    
    process.on('unhandledRejection', async (reason) => {
        logger.error(`unhandledRejection: ${reason.stack}`,trace);
        process.exit(1);
    })
    
    process.on('uncaughtException', (error) => {
        logger.error(`uncaughtException: ${error.stack}`,trace);
    })
}