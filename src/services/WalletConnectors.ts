import { InjectedConnector } from 'wagmi/connectors/injected';
import ASSETS_URL from '@/constants/assetsURL';
import { WalletLinks } from '@/constants/publicURL';

class WalletProviders {
  _instance: any;
  _name: string = '';
  iconPath: string = '';
  connectFunction: any;

  setConnector(fnc: any) {
    this.connectFunction = fnc;
  }

  connect() {
    this.connectFunction();
  }

  get iconURL() {
    return this.iconPath;
  }

  get name() {
    return this._name;
  }
}

export class VictionWallet extends WalletProviders {
  static id = 'viction';
  _name = 'Metamask';
  iconPath = ASSETS_URL.MetaMask;

  get instance() {
    return new InjectedConnector();
  }

  get connectorId() {
    return VictionWallet.id;
  }

  get walletLink() {
    return WalletLinks.viction;
  }
}

export type WalletConnectorType = VictionWallet;

export const victionConnector: WalletConnectorType = new VictionWallet();

const WalletConnectors = {
  [VictionWallet.id]: victionConnector,
  from: (id: string): any | undefined => {
    return WalletConnectors[id];
  },
};

export default WalletConnectors;
