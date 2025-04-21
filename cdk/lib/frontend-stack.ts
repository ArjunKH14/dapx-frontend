import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as amplify from '@aws-cdk/aws-amplify-alpha';
import * as cdk from 'aws-cdk-lib';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';

export class FrontendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const amplifyApp = new amplify.App(this, 'DAPXFrontendApp', {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'ArjunKH14',
        repository: 'dapx-frontend',
        oauthToken: cdk.SecretValue.secretsManager('github-token'),
      }),
      buildSpec: codebuild.BuildSpec.fromObjectToYaml({
        version: '1.0',
        frontend: {
          phases: {
            preBuild: {
              commands: ['npm ci'],
            },
            build: {
              commands: ['npm run build'],
            },
          },
          artifacts: {
            baseDirectory: 'build',
            files: ['**/*'],
          },
          cache: {
            paths: ['node_modules/**/*'],
          },
        },
      }),
    });

    amplifyApp.addBranch('master'); // Deploys main branch
    amplifyApp.addEnvironment('REACT_APP_BACKEND_URL', 'http://dapxba-dapxf-ae6aziuspqzl-846503671.us-east-1.elb.amazonaws.com/api/health');
  }
}
