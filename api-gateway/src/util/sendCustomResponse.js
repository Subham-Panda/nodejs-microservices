const sendCustomResponse = (res, statusCode, responseMessageContent, serviceName) => {
    if(responseMessageContent) {
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