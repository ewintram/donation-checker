import { SNS } from "@aws-sdk/client-sns";

const REGION = "eu-west-1";

const snsClient = new SNS({ region: REGION });

export default snsClient;
