# Donation checker API


## Dev seup

The application runs in Docker in both dev and production.

* Install [Docker desktop](https://www.docker.com/products/docker-desktop/)
* Run `make start` to build and start the API container
* Visit http://localhost:3000/users/1 to see the API response. Note that user IDs 1-4 exist.

### Useful commands for dev

* `make test`        to run automated tests for the app
* `make shell`       to enter the container
* `make down`        to stop the container


## AWS infrastructure

The infrastructure for this API is deployable via [aws-cdk](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html) if you have an AWS account. 

### Deployment setup

* Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and [configure it](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html)
TODO: Set account ID and region with variables
* Install [Docker desktop](https://www.docker.com/products/docker-desktop/) if you haven't already during the dev setup
* Install Node
* Run `npm install`
* The production Docker container builds from the dev container, so you must have gone through the dev set up before you can deploy

### Useful commands for infrastructure

* `cdk deploy`      to deploy this stack
* `cdk diff`        to compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
* `npm test`        to run automated tests for the stack 