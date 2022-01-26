const sendCustomResponse = (res, statusCode, responseMessageContent, serviceName) => {
    if(responseMessageContent.error){
        res.status(statusCode).json({
            status: 'error',
            service: serviceName,
            error: responseMessageContent.error,
        });
        return;
    } else if(responseMessageContent) {
        res.status(statusCode).json({
            status: 'success',
            data: responseMessageContent,
        });
        return;
    } else {
        res.status(500).json({
            status: 'fail',
            message: `${serviceName} service is not available`,
        });
        return;
    }
}

module.exports = sendCustomResponse;