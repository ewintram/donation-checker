import * as cdk from "aws-cdk-lib";
import * as ecs from "aws-cdk-lib/aws-ecs";
import { Template } from "aws-cdk-lib/assertions";
import * as DonationChecker from "../lib/donation-checker-stack";
import { ContainerDefinition } from "aws-cdk-lib/aws-ecs";

describe("DonationCheckerStack", () => {
  let template: Template;

  beforeEach(() => {
    const app = new cdk.App();
    const stack = new DonationChecker.DonationCheckerStack(app, "TestStack");
    template = Template.fromStack(stack);
  });

  it("should create production ecs cluster", () => {
    template.resourceCountIs("AWS::ECS::Cluster", 1);
  });

  it("should create production vpc", () => {
    template.resourceCountIs("AWS::EC2::VPC", 1);
  });

  it("should create donation checker task def and add container", () => {
    template.resourceCountIs("AWS::ECS::TaskDefinition", 1);
  });

  it("should create donation checker fargate service", () => {
    template.resourceCountIs("AWS::ECS::Service", 1);
  });

  it("should create a production load balancer", () => {
    template.resourceCountIs("AWS::ElasticLoadBalancingV2::LoadBalancer", 1);
  });
});
