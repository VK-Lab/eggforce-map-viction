import { useCallback } from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';
import messages from '@/components/EggHatchSelectingModal/messages';
import { StakeDetailsSpec, ClaimDetailsSpec } from '@/types/EggActions';
import { parseViction } from '@/helpers/balance';
import { useContractWrite, Address } from 'wagmi';
import configs from '@/constants/settings';
import abi from './abiIncubating';
import { ENTRY_POINT_DELEGATE, ENTRY_POINT_UNDELEGATE } from '@/constants/key';

const useEggHatching = () => {
  const user = useCurrentUser();

  const VIC_VALIDATOR_ADDRESS = configs.VIC_SC_VALIDATOR;

  const {
    // eslint-disable-next-line
    data: dataVote,
    writeAsync: writeVote,
    isSuccess: isSuccessVote,
    isLoading: isLoadingVote,
    isError: isErrorVote,
  } = useContractWrite({
    address: VIC_VALIDATOR_ADDRESS as Address,
    abi: abi,
    functionName: 'vote',
  });
  const {
    // eslint-disable-next-line
    data: dataUnvote,
    writeAsync: writeUnvote,
    isSuccess: isSuccessUnvote,
    isLoading: isLoadingUnvote,
    isError: isErrorUnvote,
  } = useContractWrite({
    address: VIC_VALIDATOR_ADDRESS as Address,
    abi: abi,
    functionName: 'unvote',
  });

  const onStakeHandler = useCallback(
    async (stakeDetails: StakeDetailsSpec) => {
      console.log(`🚀 ~ stakeDetails:`, stakeDetails);

      if (!user || !writeVote || !writeUnvote) {
        return undefined;
      }
      if (stakeDetails.entryPoint === ENTRY_POINT_UNDELEGATE) {
        const { hash } = await writeUnvote({
          args: [
            stakeDetails.validator,
            // '0xfFC679Dcdf444D2eEb0491A998E7902B411CcF20',
            parseViction(stakeDetails.amount.toString()),
          ],
        });
        console.log(`🚀 ~ hash[UNVOTE]:`, hash);

        return {
          deployHash: hash,
          signedDeploy: {
            txHash: hash,
          },
        };
      }

      if (stakeDetails.entryPoint === ENTRY_POINT_DELEGATE) {
        const { hash } = await writeVote({
          args: [
            stakeDetails.validator,
            // '0xfFC679Dcdf444D2eEb0491A998E7902B411CcF20',
          ],
          value: parseViction(stakeDetails.amount.toString()),
        });
        console.log(`🚀 ~ hash[VOTE]:`, hash);

        return {
          deployHash: hash,
          signedDeploy: {
            txHash: hash,
          },
        };
      }

      return undefined;
    },
    [writeVote, writeUnvote, user],
  );

  const onClaimHandler = useCallback(
    async (claimDetails: ClaimDetailsSpec) => {
      if (!user) {
        return undefined;
      }

      // const result = undefined;
      const hash = `claim-${claimDetails.fromAddress}-${claimDetails.amount}`;

      return {
        deployHash: hash,
        signedDeploy: {
          txHash: hash,
        },
      };
    },
    [user],
  );

  const validate = useCallback(
    (data: any) => {
      let errors: any = {};
      const { balance } = user;
      const { fee, amount, minAmount } = data;

      const minAmount_MOTE = parseViction(minAmount.toString());
      const amount_MOTE = parseViction(amount.toString());
      const fee_MOTE = parseViction(fee.toString());
      const zero = BigInt(0);

      if (!balance) {
        errors.balance = 'Error reading balance from current user';
      }
      const balanceUser = BigInt(balance ?? 0);

      if (amount === undefined || amount_MOTE <= zero) {
        errors.amount = messages.errorMoreThanZero.defaultMessage;
      } else if (amount_MOTE > zero && balance) {
        const total = amount_MOTE + fee_MOTE;

        if (total > balanceUser) {
          errors.amount = messages.errorLargerThanBalance.defaultMessage;
        }
      }

      // eslint-disable-next-line no-mixed-operators
      if (
        !errors.amount &&
        ((balance && balanceUser <= minAmount_MOTE) ||
          amount_MOTE < minAmount_MOTE)
      ) {
        errors.amount = messages.errorLessThanMinAmount.defaultMessage;
      }

      return errors;
    },
    [user],
  );

  return {
    hatch: onStakeHandler,
    undelegate: onStakeHandler,
    claim: onClaimHandler,
    isDeploying: isLoadingVote || isLoadingUnvote,
    isError: isErrorVote || isErrorUnvote,
    isSuccess: isSuccessVote || isSuccessUnvote,
    validate,
  };
};

export default useEggHatching;
