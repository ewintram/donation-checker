import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as DonationChecker from '../lib/donation-checker-stack';

test('ecs cluster created', () => {
  const app = new cdk.App();
  const stack = new DonationChecker.DonationCheckerStack(app, 'TestStack');
  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::ECS::Cluster', 1);
});
