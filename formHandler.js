const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const logger = require('./loggerFunction');
const validate = require('./validate');
const ddbService = require('./serviceDatabase');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/createUser',async (request,response)=>{
    logger.logInfo(request.body);
    //Validate the input requests against the schema
    const attributes = validate.checkMandatoryFields(request.body);
    if(attributes.length>0){
        logger.logInfo("Failed mandatory field check");
        response.status(400).send("Mandatory fields missing ",attributes);
    }else{
        const responseFlag = await ddbService.createUser(request.body);
        if(responseFlag){
            logger.logInfo('User Added successfully')
            response.status(200).send('User Added successfully');
        }
        else{
            response.status(500).send("Failed at dynamodb",)
        }
        
    }
 })

 app.listen(3000);