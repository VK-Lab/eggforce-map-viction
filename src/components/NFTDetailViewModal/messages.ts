import { MIN_SNC_INCREMENT_TO_CLAIM } from '@/constants/key';

const messages = {
  unhatchFailed: {
    id: 'NFTDetailViewModal.unhatchFailed',
    defaultMessage:
      "Something didn't look right. Selvyn has been noticed and having a look. You can safely close this",
  },
  claimSNCFailed: {
    id: 'NFTDetailViewModal.claimFailed',
    defaultMessage:
      "Something didn't look right. Selvyn has been noticed and having a look. You can safely close this",
  },
  claimSNCSuccess: {
    id: 'NFTDetailViewModal.claimSuccess',
    defaultMessage:
      'Successfully sent claim request. You can safely close this',
  },
  claimSNCNotEnoughSNC: {
    id: 'NFTDetailViewModal.claimSNCNotEnoughSNC',
    defaultMessage: `You must have at least ${MIN_SNC_INCREMENT_TO_CLAIM} SNC to perform this action.`,
  },
  claimSNCNotEnoughCSPR: (fee: string) => ({
    id: 'NFTDetailViewModal.claimSNCNotEnoughCSPR',
    defaultMessage: `Not enough CSPR balance. You must have at least ${fee} CSPR to perform this action.`,
  }),
  makeDragonNotEnoughCSPR: {
    id: 'NFTDetailViewModal.claimSNCNotEnoughCSPR',
    defaultMessage: `Not enough CSPR balance. You must have at least ${30} CSPR to perform this action.`,
  },
  makeDragonFailed: {
    id: 'NFTDetailViewModal.makeDragonFailed',
    defaultMessage:
      "Something didn't look right. Selvyn has been noticed and having a look. You can safely close this",
  },
  eggProcessingTip: {
    id: 'NFTDetailViewModal.eggProcessingTip',
    defaultMessage: `When egg is in processing mode, that means a transaction is being processed on Casper Network chain. Any relevant actions will be paused temporarily, and will go back to normal after a few minutes. Thanks for understanding.`,
  },
};

export default messages;
