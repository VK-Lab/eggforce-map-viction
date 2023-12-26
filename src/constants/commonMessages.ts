const commonMessages = {
  errNotEnoughBalance: {
    id: 'CommonMessage.errNotEnoughBalance',
    defaultMessage:
      'Not enough VIC to proceed. Please check your account balance.',
  },
  errNotEnoughBalanceWithValue: (value: string) => ({
    id: 'CommonMessage.errNotEnoughBalanceWithValue',
    defaultMessage: `Not enough VIC to proceed. Required ${value} VIC, please check your account balance.`,
  }),
  labelDelegate: {
    id: 'CommonMessage.labelDelegate',
    defaultMessage: 'INCUBATE',
  },
  labelUndelegate: {
    id: 'CommonMessage.labelUndelegate',
    defaultMessage: 'STOP',
  },
  labelClaimSNC: {
    id: 'CommonMessage.labelClaimSNC',
    defaultMessage: 'LEVEL UP',
  },
  labelDragonHatch: {
    id: 'CommonMessage.labelDragonHatch',
    defaultMessage: 'HATCH DRAGON',
  },
};

export default commonMessages;
