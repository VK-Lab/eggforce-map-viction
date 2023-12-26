const messages = {
  hatchFailed: {
    id: 'EggHatchSelectingModal.mintFailed',
    defaultMessage:
      "Something didn't look right. Selvyn has been noticed and having a look. You can safely close this",
  },
  hatchSuccess: {
    id: 'EggHatchSelectingModal.mintSuccess',
    defaultMessage:
      'Successfully and started incubating. You can safely close this',
  },
  errorMoreThanZero: {
    id: 'EggHatchSelectingModal.errorMoreThanZero',
    defaultMessage: 'Staking amount must be larger than 0 CSPR',
  },
  errorLessThanMinAmount: {
    id: 'EggHatchSelectingModal.errorLessThanMinAmount',
    defaultMessage: 'Staking amount must be greater than or equal to 100 VIC',
  },
  errorNotEnoughBalance: {
    id: 'EggHatchSelectingModal.errorNotEnoughBalance',
    defaultMessage:
      'Insufficient balance, please check your balance and try another one.',
  },
  errorLargerThanBalance: {
    id: 'EggHatchSelectingModal.errorLargerThanBalance',
    defaultMessage:
      'Staking amount has exceeded current balance. Please try a smaller value.',
  },
  selectValidatorFromCard: {
    id: 'EggHatchSelectingModal.selectValidatorFromCard',
    defaultMessage:
      'Pre-Selected validator has been applied. Please acknowledge this is only applicable to eggs which were never incubated before.',
  },
  clearSelectValidatorFromCard: {
    id: 'EggHatchSelectingModal.clearSelectValidatorFromCard',
    defaultMessage: 'Pre-Selected validator has been removed.',
  },
};

export default messages;
