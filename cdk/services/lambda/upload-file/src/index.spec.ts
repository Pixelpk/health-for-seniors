import { handler } from './index';

// Mock the 'pg' library to control the behavior of 'client.query'
// jest.mock("pg", () => {
//   const mockQuery = jest.fn();

//   const mockClient = {
//     query: mockQuery,
//     connect: jest.fn(),
//     release: jest.fn(),
//   };

//   return {
//     Pool: jest.fn(() => ({
//       connect: () => mockClient,
//     })),
//   };
// });

describe('Insert data in database', () => {
  it('should run for email sign up', async () => {
    await handler({
      version: '1',
      userPoolId: 'us-east-1_qUezepiKh',
      callerContext: {
        awsSdkVersion: 'aws-sdk-unknown-unknown',
        clientId: '6tiuobadv26rf3g3llb2bc5ron',
      },
      triggerSource: 'PostAuthentication_Authentication',
      userName: 'Google_106336616719875652150',
      region: 'us-east-1',
      response: {},
      request: {
        newDeviceUsed: true,
        userAttributes: {
          email: 'ikramulhaq@pixelpk.com',
          sub: '345824d8-a081-70ff-a8e1-bb983941fe53',
          given_name: 'Ikram',
          family_name: 'PixelPk',
          picture:
            'https://lh3.googleusercontent.com/a/ACg8ocL-DEPrjQc_FDrS5IHI52NWc1a7T2KcK4z4ujzXp9Zf=s96-c',
        },
      },
    });
  });
});
