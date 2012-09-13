exports.isValid = function (request){
    console.log("Factory: request handling");
    request.valid = "true";
    return request;
};

