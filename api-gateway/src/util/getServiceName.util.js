const getServiceName = (queueName) => {
    const serviceName = queueName.split('.')[0];
    return serviceName;
}

module.exports = getServiceName;