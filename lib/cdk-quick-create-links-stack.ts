import * as cdk from 'aws-cdk-lib';
import * as cfn from 'aws-cdk-lib/aws-cloudformation';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkQuickCreateLinksStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // params
    const contentBasedDeduplication = new cdk.CfnParameter(this, 'ParamContentBasedDeduplication', {
      allowedValues: ['true', 'false'],
      default: 'false'
    })
    const visibilityTimeout = new cdk.CfnParameter(this, 'ParamVisibilityTimeout', {
      type: 'Number',
      default: 300
    })

    // example resource
    const queue = new sqs.Queue(this, 'CdkQuickCreateLinksQueue', {
      contentBasedDeduplication: true,
      visibilityTimeout: cdk.Duration.seconds(visibilityTimeout.valueAsNumber)
    });

    // set bool params to prop as L1 construct
    const cfnQueue = queue.node.defaultChild as sqs.CfnQueue;
    cfnQueue.addPropertyOverride('ContentBasedDeduplication',
      cdk.Fn.ref(contentBasedDeduplication.logicalId)
    );

    // output for check params
    new cdk.CfnOutput(this, 'OutputContentBasedDeduplication', {
      value: contentBasedDeduplication.valueAsString
    })
    new cdk.CfnOutput(this, 'OutputVisibilityTimeout', {
      value: visibilityTimeout.valueAsString
    })
  }
}
