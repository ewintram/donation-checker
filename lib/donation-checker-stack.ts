import * as cdk from "aws-cdk-lib";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export class DonationCheckerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "ProductionVpc");
    const cluster = new ecs.Cluster(this, "ProductionCluster", { vpc });
    const taskDefinition = new ecs.FargateTaskDefinition(
      this,
      "DonationCheckerTaskDef"
    );

    taskDefinition.addContainer("DonationCheckerApi", {
      image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
    });

    const service = new ecs.FargateService(this, "DonationCheckerService", {
      cluster,
      taskDefinition,
    });
  }
}
