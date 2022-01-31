const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const logger = require('./loggerFunction');
AWS.config.update({
    region: 'eu-west-1',
    accessKeyId: 'XXXXX',
    secretAccessKey: 'XXXX'
});

const documentClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10'
});

const createUser = (body) => {
    const params = {
        TableName: "User",
        Key: {
            name: body.name,
            age: body.age,
            sex: body.sex
        }
    };
    try {
        logger.logInfo(params)
        await documentClient.update(params).promise();
        return true;
    } catch (err) {
        logger.logInfo(err);
        return false;
    }
}

module.exports = {
    createUser
}