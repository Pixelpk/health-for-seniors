import { RemovalPolicy, SecretValue, Stack } from 'aws-cdk-lib';
import {
  InstanceClass,
  InstanceSize,
  InstanceType,
  Peer,
  Port,
  SecurityGroup,
  SubnetType,
  Vpc,
} from 'aws-cdk-lib/aws-ec2';
import {
  DatabaseInstance,
  DatabaseInstanceEngine,
  PostgresEngineVersion,
  StorageType,
} from 'aws-cdk-lib/aws-rds';
import { projectPrefix } from '@helpers';

export class DatabaseStack {
  db: DatabaseInstance;
  constructor(stack: Stack) {
    const vpc = Vpc.fromLookup(stack, projectPrefix('db-vpc-construct'), {
      vpcId: 'vpc-0d59e18047a1f2cc3', // Default VPC Id
      isDefault: true,
      region: process.env.AWS_REGION,
      ownerAccountId: process.env.AWS_ACCOUNT,
    });

    const secrityGroup = new SecurityGroup(
      stack,
      projectPrefix('sg-db-construct'),
      {
        vpc,
        allowAllOutbound: true,
        securityGroupName: projectPrefix('sg-rds-pg'),
      }
    );

    secrityGroup.addIngressRule(Peer.anyIpv4(), Port.allTraffic());

    this.db = new DatabaseInstance(stack, projectPrefix('rds-pg-construct'), {
      engine: DatabaseInstanceEngine.postgres({
        version: PostgresEngineVersion.VER_15_3,
      }),
      multiAz: false,
      instanceIdentifier: projectPrefix('rds-pg'),
      credentials: {
        username: String(process.env.RDS_USER),
        password: new SecretValue(String(process.env.RDS_PASSWORD)),
      },
      instanceType: InstanceType.of(InstanceClass.T4G, InstanceSize.MICRO),
      storageType: StorageType.GP2,
      allocatedStorage: 20,
      publiclyAccessible: true,
      removalPolicy: RemovalPolicy.RETAIN,
      vpc,
      databaseName: projectPrefix(String(process.env.RDS_DB_NAME)),
      vpcSubnets: {
        subnetType: SubnetType.PUBLIC,
      },
      securityGroups: [secrityGroup],
    });
  }
}
