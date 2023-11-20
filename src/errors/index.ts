function conflictError(message: string) {
    return {
        name: "ConflictError",
        message,
    };
}

function duplicatedEmailError(email: string) {
    return {
        name: "DuplicatedEmailError",
        message: "There is already an user with given email",
        email,
    };
}

function unauthorizedError() {
    return {
        name: "UnauthorizedError",
        message: "You must be signed in to continue",
    };
}

function notFoundError() {
    return {
        name: "NotFoundError",
        message: "No result for this search!",
    };
}

function noBodyError() {
    return {
        name: "NoBodyError",
        message: "This request expects a body and didn't get one"
    }
}

function notFoundAtQueryError(data: string,column: string){
    return {
        name: "NotFoundAtQueryError",
        message: `Couldn't find a ${column} with ${data}`,
    };
}

function httpsQueryNotGiven(query: string){
    return {
        name: "HttpsQueryNotGiven",
        message: `Couldn't find a ${query} query in the api url`,
    };
}

function invalidCredentialsError() {
    return {
        name: "InvalidCredentialsError",
        message: "Email or password are incorrect",
    };
}

function invalidInputData(field, received, expected) {
    return {
        name: "InvalidInputDataError",
        message: `field ${field} expected to be ${expected} but instead received ${received} `
    }
}

function invalidTokenError(){
    return {
        name: "InvalidTokenError",
        message: "the authorization header of this request received an invalid token"
    }
}

function insuficientAcessLevelError(){
    return {
        name: "InsuficientAccessLevelError",
        message: "your access level is insuficient for this operation"
    }
}

export default {
    conflictError,
    duplicatedEmailError,
    unauthorizedError,
    notFoundError,
    invalidCredentialsError,
    invalidInputData,
    notFoundAtQueryError,
    httpsQueryNotGiven,
    noBodyError,
    invalidTokenError,
    insuficientAcessLevelError
};