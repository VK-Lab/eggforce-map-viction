import { useCallback, useEffect } from 'react';
// import useSWR from 'swr';
// import { fetcher } from '@/services/axios';
// import API from '@/constants/api';
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from '@/app/hooks';
import { packagesDetailActions } from '@/modules/WorldMint/store';
import { selectPackagesDetailStore } from '@/modules/WorldMint/selectors';
import type {
  DiscountPackageItemType,
  PackageClientItemType,
} from '@/components/QuickBuyModal/PackageItems';
import { parseViction, formatViction } from '@/helpers/balance';

const generateDiscountPackages = (
  discountMap: DiscountPackageItemType[],
  pricePerEgg: bigint,
): PackageClientItemType[] => {
  return discountMap.map(
    (packageItem: DiscountPackageItemType, index: number) => {
      const amount = BigInt(packageItem.amount);
      const discount = BigInt(parseFloat(packageItem.discount as string) * 100);
      const priceDefault = BigInt(pricePerEgg) * amount;
      const discountPrice = (priceDefault * discount) / BigInt(100);
      const priceSale = priceDefault - discountPrice;

      return {
        id: index,
        name: `${packageItem.name} Pack`,
        amount: packageItem.amount,
        percent: parseFloat(packageItem.discount as string),
        priceDefault: priceDefault.toString(),
        priceSale: priceSale.toString(),
      };
    },
  );
};

const useFetchEggPackages = () => {
  const dispatch = useDispatch();
  const storeData = useSelector(selectPackagesDetailStore);
  // const { data, error } = useSWR(API.fetchPackagesDetail, fetcher);

  const updatePackages = useCallback(
    (serverPackages: any, serverPrice: any) => {
      const pricePerEgg = parseViction('2'); // 2 VIC/egg
      const DISCOUNT_MAP = [
        {
          name: 'VICTION 1',
          amount: '1',
          discount: '1',
        },
        // {
        //   name: 'VICTION 2',
        //   amount: '3',
        //   discount: '0.3',
        // },
        ...serverPackages,
      ];
      const packages = generateDiscountPackages(
        DISCOUNT_MAP as DiscountPackageItemType[],
        pricePerEgg,
      );

      dispatch(
        packagesDetailActions.bindData({
          packagesMap: packages,
          pricePerEgg: formatViction(pricePerEgg),
        }),
      );
    },
    [dispatch],
  );

  useEffect(() => {
    /**
     * TODO VIC: Read from API to get Egg price
     */
    // if (data && storeData.packages?.length === 0) {
    //   const { priceInfo, sold, total } = data;
    //   updatePackages(priceInfo.discountMap, priceInfo.price);
    //   if (total) {
    //     dispatch(
    //       packagesDetailActions.updateSalesStats({
    //         sold: sold ?? 0,
    //         total,
    //       }),
    //     );
    //   }
    // }
  }, [dispatch, storeData, updatePackages]);

  useEffect(() => {
    updatePackages([], {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading: false, // !error && !data,
    isError: false, // error,
  };
};

export default useFetchEggPackages;
