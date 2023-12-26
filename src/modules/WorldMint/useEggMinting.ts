import { useCallback } from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';
import type { TypePurchasePackageParams } from '@/types/package';
import {
  useWaitForTransaction,
  usePrepareContractWrite,
  useContractWrite,
} from 'wagmi';
import { Address, parseAbi } from 'viem';
import configs from '@/constants/settings';

const useEggMinting = () => {
  const user = useCurrentUser();
  const { config } = usePrepareContractWrite({
    address: configs.VIC_SC_ADDRESS as Address,
    abi: parseAbi(['function mint(address _to) public']),
    // abi: [
    //   {
    //     inputs: [
    //       {
    //         internalType: 'address',
    //         name: '_to',
    //         type: 'address',
    //       },
    //     ],
    //     name: 'mint',
    //     outputs: [],
    //     stateMutability: 'nonpayable',
    //     type: 'function',
    //   },
    // ],
    functionName: 'mint',
    args: [user && (user?.activeKey as Address)],
    enabled: !!user?.activeKey,
  });

  const { data, writeAsync } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const onBuy = useCallback(
    async (dataForm: TypePurchasePackageParams) => {
      if (!user) {
        return;
      }

      if (writeAsync) {
        const { hash } = await writeAsync();

        return {
          deployHash: hash,
          signedDeploy: {},
          isSuccess,
          isLoading,
        };
      }

      return undefined;
    },
    [isLoading, isSuccess, user, writeAsync],
  );

  return {
    buy: onBuy,
    isDeploying: isLoading,
    isError: false,
    isSuccess,
  };
};

export default useEggMinting;
