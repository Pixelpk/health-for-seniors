import * as cdk from 'aws-cdk-lib';
import { CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { APIGatewayConstruct } from './api-gateway.construct';
import { APILambdaConstructs } from './lambda.constructs';
import { projectPrefix } from '@helpers';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambda = new APILambdaConstructs(this);

    const { api } = new APIGatewayConstruct(this, {
      lambda: {
        'create-folder': lambda.createFolderLambda,
        'delete-file': lambda.deleteFileLambda,
        'download-file': lambda.downloadFileLambda,
        'list-content': lambda.listContentLambda,
        'send-email': lambda.sendEmailLambda,
        'upload-file': lambda.uploadFileLambda,
      },
    });

    new CfnOutput(this, projectPrefix('api-url-output'), {
      value: api.url,
    });
  }
}
