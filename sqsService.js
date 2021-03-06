var AWS = require('aws-sdk');
var sqs = new AWS.SQS();
AWS.config.apiVersions = {
    sqs: '2012-11-05',
};
AWS.config.update({
    region: 'eu-west-1',
    accessKeyId: 'XXXXX',
    secretAccessKey: 'XXXX'
  });
  
const uuid = require('uuid');
const params = {  
    QueueUrl: "XXXXX"
};

const sendLogMessage = (message) => {
    params.MessageBody = JSON.stringify(message),
    params.MessageGroupId = message.name,
    params.MessageDeduplicationId = uuid.v4();
    sqs.sendMessage(params).promise();
}

module.exports = {
    sendLogMessage
}