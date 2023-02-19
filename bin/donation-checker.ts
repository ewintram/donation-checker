#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { DonationCheckerStack } from "../lib/donation-checker-stack";

const app = new cdk.App();
new DonationCheckerStack(app, "DonationCheckerStack", {
  env: { account: "549823983155", region: "eu-west-1" },
});
