const sqsService = require('./sqsService');
const logInfo = async (message) => {
    sqsService.sendLogMessage(message);
}
module.exports = {
    logInfo
}