# Requirements
1. docker

# Follow the steps to run the project locally

1. Clone the repository
```git
git clone https://github.com/Subham-Panda/pratilipi-backend-microservices.git
```

2. No inside the repository
```
cd pratilipi-backend-microservices
```

3. Run the following command to run hr project locally on docker
```
docker-compose up -d
```

The docker containers use network mode host.

The database instance with all the three databases can be connected locally to mongodb://localhost:27017/

The rabbit mq dashboard can be accessed at http://localhost:15672/ with login credentials
>username: guest

>password: guest

# The documentation is available at:
<a href="https://documenter.getpostman.com/view/17855939/UVeCQoNL" target="_blank">Link to the Documentation</a>


# Details of the microservices
There are 3 microservices in this project and one api gateway:

1. User Microservice - This microservice is responsible for user related operations.
2. Content Microservice - This microservice is responsible for content related operations.
3. User Interaction Microservice - This microservice is responsible for user interaction with the content related operations.
4. API Gateway - This microservice is responsible for routing the requests to the microservices.

MongoDb is used for databases. Each of the three microservice has its own database, and is only responsible for handling it.
RabbitMQ is used for messaging. Each of the three microservice has its own queues for various operations related to that microservice.
