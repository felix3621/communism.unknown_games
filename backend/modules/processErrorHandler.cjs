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
    
    process.on('unhandledRejection', async (reason, promise) => {
        logger.error(`unhandledRejection at: ${reason.stack}\n Reason: ${reason}`,trace);
        process.exit(1);
    })
    
    process.on('uncaughtException', (error) => {
        logger.error(`uncaughtException: ${error}`,trace);
    })
}