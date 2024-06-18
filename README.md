# cdk-quick-create-links

This is a sample project for generate quick create link with CDK.

## Usage

1. install cdk and cdk-assets in this project

    ```bash
    npm install
    ```

1. setup CDK in your AWS account

    ```bash
    npx cdk bootstrap
    ```

1. synthesize CloudFormation template

    ```bash
    npx cdk synth
    ```

1. publish synthesized template to S3 bucket

    ```bash
    npx cdk-assets publish --path cdk.out/CdkQuickCreateLinksStack.assets.json -v
    ```

1. generate URL according to the format below
    > https://(region).console.aws.amazon.com/cloudformation/home?region=(region)#/stacks/create/review
    > ?stackName=(your Stack name)
    > &templateURL=(your template S3 URL)
    > &param_ParamContentBasedDeduplication=(true/false)
    > &param_ParamFifoQueue=(true/false)
    > &param_ParamVisibilityTimeout=(123)
    - You can change stackName query.
    - The templateURL is linked to the S3 bucket object displayed in the execution results of the cdk-assets command. You can get the exact templateURL by viewing the object from the management console.
