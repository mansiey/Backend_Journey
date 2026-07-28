//if validation fails, we will standarized error
import APIError from '../utils/api-error.js';


const validate = (Dtoclass) => {
    return (req, res, next) => {
        const { error, value } = Dtoclass.validate(req.body)
        if(error){
            throw APIError.badRequest(error.join("; "));
        }

        //no need to send req.body as the data anymore, send the validated data ahead
        req.body = value;
        next();
    }
};

export default validate;