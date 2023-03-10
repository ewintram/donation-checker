# Donation checker API


## Dev seup

The application runs in Docker in both dev and production.

* Install [Docker desktop](https://www.docker.com/products/docker-desktop/)
* Run `make start` to build and start the API container
* Run `make shell` to enter the container, then `npm i` to install dependencies
* Visit http://localhost:3000/users/1 to see the API response
  - Note that user IDs 1-4 are persisted
  - Note that no real phone numbers are assigned to the persisted users

### Useful commands for dev

* `make test`        to run automated tests for the app
* `make shell`       to enter the container
* `make logs`        to tail the container logs
* `make down`        to stop the container


## AWS infrastructure

The infrastructure for this API is deployable via [aws-cdk](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html) if you have an AWS account. 

### Deployment setup

* Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and [configure it](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html). Note that following this configuration you will be deploying resources to this AWS account and region
* Install [Docker desktop](https://www.docker.com/products/docker-desktop/) if you haven't already during the dev setup
* Install Node
* Run `npm install`
* The production Docker container builds from the dev container, so you must have gone through the dev set up before you can deploy

### Useful commands for infrastructure

* `cdk deploy`      to deploy this stack
* `cdk diff`        to compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
* `npm test`        to run automated tests for the stack 


### Stack architecture

* I chose to deploy a Docker container to ECS as this enabled me to build the app easily in dev in a Docker container. I also tried to Dockerise the CDK project but was unable to as a Docker engine is required in order to build the image asset if it is built from a local file
* I used NodeCache to store the users for the scope of the task but would use a relational database in AWS if this API was live
* I chose to build a simple Express REST API which can easily be consumed by any client
+ I chose Fargate launch type for its lower overhead and cost 
* I thought that the VPC and Cluster might be in a separate stack, in order to be deployed separately and shared across multiple projects, but I didn't have time to explore this
* The most challenging part was understanding the concept of deploying the infrastructure with the app. For example, the recommended approach was to deploy the Docker image as an asset, but this does not deploy it to ECR as an image but instead within the assets repository for the stack


### Scalability considerations

* I would apply an autoscaling policy on the ECS containers based on the CPU and memory usage metrics reported by AWS Cloudwatch to scale up the number of containers when the API is in high demand, and then scale down instances when CPU/memory returns to a lower usage, in order to keep costs low
* The stack includes a load balancer to split traffic evenly across services
* I would deploy the stack to specific AWS regions if the API was going to be used by users from those regions if latency was an issue


### Logging and monitoring in production

* I would ensure that application logs are able to be monitored following deployments either in CloudWatch logs or another provider e.g. DataDog
* I would set up alerts (whether in AWS CloudWatch alarms or DataDog monitors) to notify engineers of certain errors being over a normal threshold (determined by monitoring normal usage for a short time after first launch), e.g. in the scenario where the SMS message sends were failing more frequently than usual
* I would utilise dashboards to track service health status, CPU and memory usage in graphs so that any anomolies can be spotted more quickly


### Deployment pipeline

* I would create separate AWS accounts for staging and production in order to deploy the same stack into different environments
* The pipeline could be created with AWS CDK Pipeline with a Stage for each environment so that deployments can be automated and managed remotely
* There was no need for environment variables within the application at this point but I would load environment files into the Docker containers and pull any secrets from SSM into the ECS containers via AWS CDK in staging and production deployments




