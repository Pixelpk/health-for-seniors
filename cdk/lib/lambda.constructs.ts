import { Stack } from 'aws-cdk-lib';
import { IFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import {
  NodejsFunction,
  NodejsFunctionProps,
} from 'aws-cdk-lib/aws-lambda-nodejs';
import { projectPrefix } from '@helpers';
import { join } from 'path';

const getCommonLambdaConfigByName = (name: string): NodejsFunctionProps => {
  return {
    functionName: projectPrefix(`${name}-lambda`),
    entry: join(__dirname, `../services/lambda/${name}/src/index.ts`),
    handler: 'index.handler',
    runtime: Runtime.NODEJS_18_X,
    bundling: {
      minify: true,
    },
  };
};

export class APILambdaConstructs {
  sendEmailLambda: IFunction;
  downloadFileLambda: IFunction;
  uploadFileLambda: IFunction;
  listContentLambda: IFunction;
  createFolderLambda: IFunction;
  deleteFileLambda: IFunction;

  constructor(stack: Stack) {
    this.createFolderLambda = new NodejsFunction(
      stack,
      projectPrefix('create-folder-lambda-contruct'),
      {
        ...getCommonLambdaConfigByName('create-folder'),
      }
    );

    this.downloadFileLambda = new NodejsFunction(
      stack,
      projectPrefix('download-file-lambda-contruct'),
      {
        ...getCommonLambdaConfigByName('download-file'),
      }
    );

    this.uploadFileLambda = new NodejsFunction(
      stack,
      projectPrefix('upload-file-lambda-contruct'),
      {
        ...getCommonLambdaConfigByName('upload-file'),
      }
    );

    this.listContentLambda = new NodejsFunction(
      stack,
      projectPrefix('list-content-lambda-contruct'),
      {
        ...getCommonLambdaConfigByName('list-content'),
      }
    );

    this.sendEmailLambda = new NodejsFunction(
      stack,
      projectPrefix('send-email-lambda-contruct'),
      {
        ...getCommonLambdaConfigByName('send-email'),
      }
    );

    this.deleteFileLambda = new NodejsFunction(
      stack,
      projectPrefix('delete-file-lambda-contruct'),
      {
        ...getCommonLambdaConfigByName('delete-file'),
      }
    );
  }
}
