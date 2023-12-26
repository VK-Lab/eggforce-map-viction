import { selectEggPurchaseStore } from '@/modules/EggPurchase/selectors';
import { useAppSelector as useSelector } from '@/app/hooks';

const useBlockMinting = ({
  isDeploying = false,
}: {
  isDeploying?: boolean;
}) => {
  const eggPurchasesStore = useSelector(selectEggPurchaseStore);
  const { deployHash } = eggPurchasesStore;
  const latestDeploy = deployHash.at(0) ?? undefined;
  console.log(`🚀 ~ latestDeploy:`, latestDeploy);

  return {
    shouldDisable: false,
  };
};

export default useBlockMinting;
