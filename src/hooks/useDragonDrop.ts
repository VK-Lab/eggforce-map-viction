import { useCallback } from 'react';
import { executeErrorMessage } from '@/services/errorsWrapper';
import useConfirmDeploy from './useConfirmDeploy';
import useCurrentUser from './useCurrentUser';
import useSiteConfigurations from './useSiteConfigurations';
import { MakeDragonDetailsSpec } from '@/types/EggActions';

const useDragonDrop = () => {
  const user = useCurrentUser();
  const { isDeploying, isError } = useConfirmDeploy();
  const siteConfig = useSiteConfigurations();

  const onMakeDragon = useCallback(
    async ({ tokenId, paymentAmount }: MakeDragonDetailsSpec) => {
      try {
        if (!user) {
          throw new Error('Missing public key');
        }

        if (
          !siteConfig ||
          !siteConfig?.DRAGON_BROKER_CONTRACT_HASH ||
          !siteConfig?.TOKEN_CONTRACT_HASH
        ) {
          throw new Error('Invalid configurations');
        }
        const deployResult = undefined;
        console.log(`🚀 ~ onDropDragon ~ deployResult:`, deployResult);

        return deployResult;
      } catch (error: any) {
        executeErrorMessage(error);
        return undefined;
      }
    },
    [siteConfig, user],
  );

  return { isDeploying, isError, makeDragon: onMakeDragon };
};

export default useDragonDrop;
