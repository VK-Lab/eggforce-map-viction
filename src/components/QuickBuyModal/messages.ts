import { Links } from '@/constants/publicURL';

const messages = {
  labelStartMint: {
    id: 'QuickBuyModal.labelStartMint',
    defaultMessage: 'MINT',
  },
  labelStartMinting: {
    id: 'QuickBuyModal.labelStartMinting',
    defaultMessage: 'MINTING',
  },
  labelEggAmount: {
    id: 'QuickBuyModal.labelEggAmount',
    defaultMessage: '5 PER WALLET - Price 1,895 CSPR',
  },
  errMinAmount: {
    id: 'QuickBuyModal.errMinAmount',
    defaultMessage: 'Minimum egg quantity reached!',
  },
  errMaxAmount: {
    id: 'QuickBuyModal.errMaxAmount',
    defaultMessage: 'Maximum eggs quantity reached!',
  },
  mintFailed: {
    id: 'QuickBuyModal.mintFailed',
    defaultMessage:
      "Something didn't look right. Selvyn has been noticed and having a look. You can safely close this",
  },
  mintSuccess: {
    id: 'QuickBuyModal.mintSuccess',
    defaultMessage:
      'Successfully deployed! Minting is in progress and might take a while before showing up on your NFT Collection. You can safely close this',
  },
  labelNoPermission: {
    id: 'QuickBuyModal.labelNoPermission',
    defaultMessage: `Hey hatcher, for Egg minting you might need to collect Selvyn's Hammer or Whitelist Ticket from Selvyn first. \n
      Please <a class="link--discord" href="${Links.discord}" rel="nofollow noopener noreferrer" target="_blank">join our Discord</a> to grab it.`,
  },
  purchaseSuccess: {
    id: 'QuickBuyModal.purchaseSuccess',
    defaultMessage: 'NFT purchase successful!',
  },
  purchaseFailed: {
    id: 'QuickBuyModal.purchaseFailed',
    defaultMessage: 'NFT purchase failed!',
  },
};

export default messages;
