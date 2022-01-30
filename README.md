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

### NOTE: wait for 2 to 3 minutes after docker-compose has completed, before playing around with the api and testing it, since rabbitmq service inside the container takes some time to fire up, and the other services also start successfully after rabbitmq service is fired up successfully.

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

# High Level Diagram
![High Level Diagram for the Microservices Architecture](/images/HLD.drawio.png "High Level Diagram for the Microservices Architecture")

# Low Level Diagrams

The Blue Message Queues in the diagram below are persistent queues.
The Purple Message Queues in the diagram below are temporary queues made for every request to the microservice which immediately gets deleted after the response is received.


> # Interaction Between User Microservice and API Gateway
> ![Low Level Diagram for Interaction between User Service and API Gateway](/images/LLD_User_API.drawio.png "Low Level Diagram for Interaction between User Service and API Gateway")
<br>
<br>
> # Interaction Between Content Microservice and API Gateway
> ![Low Level Diagram for Interaction between Content Service and API Gateway](/images/LLD_Content_API-1.drawio.png "Low Level Diagram for Interaction between Content Service and API Gateway")
> ![Low Level Diagram for Interaction between Content Service and API Gateway](/images/LLD_Content_API-2.drawio.png "Low Level Diagram for Interaction between Content Service and API Gateway")

<br>
<br>

> # Interaction Between User Interaction Microservice and API Gateway
> ![Low Level Diagram for Interaction between User Interaction Service and API Gateway](/images/LLD_Interaction_API.drawio.png "Low Level Diagram for Interaction between User Interaction Service and API Gateway")

<br>
<br>

> # Interaction Between User Interaction Microservice and Content Microservice
> ![Low Level Diagram for Interaction between User Interaction Service and Content Service](/images/LLD_Interaction_Content.drawio.png "Low Level Diagram for Interaction between User Interaction Service and Content Service")
> This interaction is used by contents service to get the top user interactions from User Interaction Service and also to initialize a document in the database of User Interaction Service whenever a new content is added.

<br>
<br>

> # Interaction Between User Interaction Microservice and User Microservice
> ![Low Level Diagram for Interaction between User Interaction Service and User Service](/images/LLD_Interaction_User.drawio.png "Low Level Diagram for Interaction between User Interaction Service and User Service")
> This interaction is used by user service to verify whether the user making the interaction is a valid user or not and hence prevent recording false interactions.

