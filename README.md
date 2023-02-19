# Donation checker API

## AWS infrastructure

The infrastructure for this API is deployable via [aws-cdk](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html) if you have an AWS account. 

### Set up in order to deploy infrastructure

* Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and [configure it](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html)
TODO: Set account ID and region with variables
* Install [Docker desktop](https://www.docker.com/products/docker-desktop/)
* Install Node
* Run `npm install`
### Useful commands to deploy infrastructure

* `cdk deploy`      deploy this stack
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

### Tests

* `npm test`        run automated tests for the stack 