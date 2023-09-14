import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { projectPrefix } from '@helpers';
import { config } from '@config';

export class HFSStorageStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new Bucket(this, projectPrefix('storage-construct'), {
      bucketName: projectPrefix('storage'),

      removalPolicy:
        config.app.env === 'prod'
          ? RemovalPolicy.RETAIN
          : RemovalPolicy.DESTROY,

      ...(config.app.env === 'prod' && {
        autoDeleteObjects: true,
      }),
    });
  }
}
