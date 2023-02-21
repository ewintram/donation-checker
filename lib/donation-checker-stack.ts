import * as cdk from "aws-cdk-lib";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecrAssets from "aws-cdk-lib/aws-ecr-assets";
import * as ecsPatterns from "aws-cdk-lib/aws-ecs-patterns";
import { Construct } from "constructs";
import path = require("path");

export class DonationCheckerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "ProductionVpc");
    const cluster = new ecs.Cluster(this, "ProductionCluster", { vpc });

    const asset = new ecrAssets.DockerImageAsset(this, "DonationCheckerImage", {
      directory: path.join(__dirname, "../app/build"),
      extraHash: `${Date.now()}`,
    });

    new ecsPatterns.ApplicationLoadBalancedFargateService(
      this,
      "DonationCheckerService",
      {
        cluster,
        taskImageOptions: {
          image: ecs.ContainerImage.fromDockerImageAsset(asset),
        },
      }
    );
  }
}
