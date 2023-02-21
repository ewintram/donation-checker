#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { DonationCheckerStack } from "../lib/donation-checker-stack";

const app = new cdk.App();
new DonationCheckerStack(app, "DonationCheckerStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
