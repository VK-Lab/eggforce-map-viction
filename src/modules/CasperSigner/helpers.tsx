import { isAddress } from 'viem';
import isString from 'lodash/isString';

/**
 * Check value is public key.
 * @param {String}  - Public key.
 * @return {Boolean} - Is valid public key
 */
export const isValidPublicKey = (publicKey: string) => {
  try {
    if (!isString(publicKey)) {
      return false;
    }

    /**
     * TODO: what similar
     */
    // const pbKey = CLPublicKey.fromHex(publicKey);
    const pbKey = isAddress(publicKey);
    return pbKey ? true : false;
  } catch (error) {
    return false;
  }
};
