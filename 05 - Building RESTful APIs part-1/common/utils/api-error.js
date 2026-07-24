class ApiError extends Error {
    constructor(statusCode, message){
        super(meassage);
        this.statusCode = statusCode;
        this.isOptional = true;
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message = 'Bad Request'){
        throw new ApiError(400, message);
    }

    static unauthorized(message = 'Unauthorized'){
        throw new ApiError(400, message);
    }

    static forbidden(message = 'Forbidden'){
        throw new ApiError(400, message);
    }

    static notfound(message = 'Not-Found'){
        throw new ApiError(400, message);
    }

    static conflict(message = 'Conflict -User already exists!'){
        throw new ApiError(409, message);
    }
}


export default ApiError;