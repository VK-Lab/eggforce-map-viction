import type { TypeEggFilterSpec } from '@/modules/EggCollection/store';
import { NFTTypeEnum } from '@/types/NFTItem';

const filterEggsData = (
  data: any,
  filters: TypeEggFilterSpec,
  viewMode: NFTTypeEnum,
) => {
  let result = [...data];
  console.log(`🚀 ~ result:`, result);

  if (
    filters?.element !== 'all' &&
    (viewMode === NFTTypeEnum.DRAGON || viewMode === NFTTypeEnum.EGG)
  ) {
    result = [
      ...data.filter((item: any) => {
        const metadataElementalIndex = viewMode === NFTTypeEnum.DRAGON ? 6 : 0;
        return (
          item?.metadata?.[metadataElementalIndex]?.value === filters?.element
        );
      }),
    ];
  }

  if (viewMode === NFTTypeEnum.EGG) {
    if (filters?.hatchStatus !== 'all') {
      result = result.filter(
        (item) => item?.egg?.status === filters?.hatchStatus,
      );
    }

    if (filters?.paymentMethod !== 'all') {
      if (filters?.paymentMethod === 'fullPaid') {
        result = result.filter((item) => !item?.isInstallment);
      }

      if (filters?.paymentMethod === 'installmentPayment') {
        result = result.filter((item) => item?.isInstallment);
      }
    }
  }

  return result;
};

export { filterEggsData };
