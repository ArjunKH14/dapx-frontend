#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { FrontendStack } from '../lib/frontend-stack';

const app = new cdk.App();
const account = app.node.tryGetContext('account');
const region = app.node.tryGetContext('region');

new FrontendStack(app, 'DapxFrontendStack', {
  env: {
    account: account,
    region: region,
  }
});
