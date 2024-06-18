import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkQuickCreateLinksStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // params
    const fifoQueue = new cdk.CfnParameter(this, 'ParamFifoQueue', {
      allowedValues: ['true', 'false'],
      default: 'false'
    });
    const contentBasedDeduplication = new cdk.CfnParameter(this, 'ParamContentBasedDeduplication', {
      allowedValues: ['true', 'false'],
      default: 'false'
    });
    const visibilityTimeout = new cdk.CfnParameter(this, 'ParamVisibilityTimeout', {
      type: 'Number',
      default: 300
    })

    // example resource (SQS-1)
    const queue1 = new sqs.Queue(this, 'CdkQuickCreateLinksQueue1', {
      visibilityTimeout: cdk.Duration.seconds(visibilityTimeout.valueAsNumber)
    });

    // set bool params to prop as L1 construct (SQS-1)
    const cfnQueue1 = queue1.node.defaultChild as sqs.CfnQueue;
    const fifoCondition = new cdk.CfnCondition(this, 'FifoCondition', {
      expression: cdk.Fn.conditionEquals(fifoQueue, 'true')
    })
    cfnQueue1.addPropertyOverride('FifoQueue',
      cdk.Fn.conditionIf(fifoCondition.logicalId, true, cdk.Fn.ref("AWS::NoValue"))
    );

    // example resource (SQS-2)
    const queue2 = new sqs.Queue(this, 'CdkQuickCreateLinksQueue2', {
      fifo: true,
      visibilityTimeout: cdk.Duration.seconds(visibilityTimeout.valueAsNumber)
    });

    // set bool params to prop as L1 construct (SQS-2)
    const cfnQueue2 = queue2.node.defaultChild as sqs.CfnQueue;
    cfnQueue2.addPropertyOverride('ContentBasedDeduplication',
      cdk.Fn.ref(contentBasedDeduplication.logicalId)
    );

    // output for check params
    new cdk.CfnOutput(this, 'OutputFifoQueue', {
      value: fifoQueue.valueAsString
    })
    new cdk.CfnOutput(this, 'OutputContentBasedDeduplication', {
      value: contentBasedDeduplication.valueAsString
    })
    new cdk.CfnOutput(this, 'OutputVisibilityTimeout', {
      value: visibilityTimeout.valueAsString
    })
  }
}
