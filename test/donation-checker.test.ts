import * as cdk from 'aws-cdk-lib';
import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as DonationChecker from '../lib/donation-checker-stack';

describe('DonationCheckerStack', () => {

  let template: Template;

  beforeEach(() => {
    const app = new cdk.App();
    const stack = new DonationChecker.DonationCheckerStack(app, 'TestStack');
    template = Template.fromStack(stack);
  });

  it('should create production ecs cluster', () => {
    template.resourceCountIs('AWS::ECS::Cluster', 1);
  });

  it('should create production vpc', () => {
    template.resourceCountIs('AWS::EC2::VPC', 1);
  });

  it('should create donation checker task def', () => {
    template.resourceCountIs('AWS::ECS::TaskDefinition', 1);
  });
});

