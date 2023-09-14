import { Stack } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { IFunction } from 'aws-cdk-lib/aws-lambda';

import { projectPrefix } from '@helpers';

type EAPIS =
  | 'send-email'
  | 'download-file'
  | 'upload-file'
  | 'create-folder'
  | 'list-content'
  | 'delete-file';

export class APIGatewayConstruct {
  api: RestApi;

  constructor(
    stack: Stack,
    props: {
      lambda: Record<EAPIS, IFunction>;
    }
  ) {
    this.api = new RestApi(stack, projectPrefix('api-construct'), {
      defaultCorsPreflightOptions: {
        allowOrigins: ['*'],
        allowMethods: ['*'],
        allowHeaders: ['*'],
      },
    });

    // send-email
    const sendEmailResource = this.api.root.addResource('send-email');
    sendEmailResource.addMethod(
      'POST',
      new LambdaIntegration(props.lambda['send-email'])
    );

    // upload-file
    const uploadFileResource = this.api.root.addResource('upload-file');
    uploadFileResource.addMethod(
      'POST',
      new LambdaIntegration(props.lambda['upload-file'])
    );

    // download-file
    const downloadFileResource = this.api.root.addResource('download-file');
    downloadFileResource.addMethod(
      'POST',
      new LambdaIntegration(props.lambda['download-file'])
    );

    // delete-file
    const deleteFileResource = this.api.root.addResource('delete-file');
    deleteFileResource.addMethod(
      'POST',
      new LambdaIntegration(props.lambda['delete-file'])
    );

    // list-content
    const listContentResource = this.api.root.addResource('list-content');
    listContentResource.addMethod(
      'POST',
      new LambdaIntegration(props.lambda['list-content'])
    );

    // create-folder
    const createFolderResource = this.api.root.addResource('create-folder');
    createFolderResource.addMethod(
      'POST',
      new LambdaIntegration(props.lambda['create-folder'])
    );
  }
}
