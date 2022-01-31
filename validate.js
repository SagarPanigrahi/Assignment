const Validator = require('jsonschema').Validator;
const v = new Validator();

const schema = {
    "id": "/createUser",
    "type": "object",
    "properties": {
      "name": {"type": "string"},
      "sex": {"type": "string"},
      "age": {"type": "integer", "minimum": 1}
    },
    "required": ["name","sex","age"]
  };

const checkMandatoryFields = (body) =>{
    const validateResult = v.validate(body,schema);
    const mandatoryFields = [];
    if(validateResult.errors.length>0){
        for (const error of validateResult.errors) {
            mandatoryFields.push(error.message);
        }
    }
    return mandatoryFields;
}

module.exports = {
    checkMandatoryFields
}