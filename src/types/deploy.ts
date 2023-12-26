import type { SignResult } from '@casperdash/usewallet-core';

export type DeployItem = {
  hash: string;
  createdAt: string;
  type: string;
  status: DeployStatus;
  metadata?: DeployMetadataType;
};

export enum DeployStatus {
  COMPLETED = 'completed',
  PENDING = 'pending',
  FAILED = 'failed',
}

export type DeployMetadataType = {
  from: string;
  action: string;
  id: string;
};

export type SignedDeployResult = {
  deployHash: string;
  signedDeploy: SignResult;
};
