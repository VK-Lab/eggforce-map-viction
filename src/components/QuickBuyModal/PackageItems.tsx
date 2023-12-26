import cn from 'classnames';
import configs from '@/constants/settings';
import MODULES_PERMISSION from '@/constants/modulesPermission';
import Button from '@/components/GButton';
import eggPackage1 from '@/assets/images/TR-12.png';
import eggPackage2 from '@/assets/images/TR-09.png';
import eggPackage3 from '@/assets/images/TR-08.png';
import eggPackage4 from '@/assets/images/TR-06.png';
import imgEggSSR from '@/assets/short-terms/ama-casper-1.png';
import { Heading } from '@/components/Typography';
import { formatVIC } from '@/helpers/balance';
import { useCallback } from 'react';

export type DiscountPackageItemType = {
  name: string;
  amount: number;
  discount: number | string;
};
export type PackageClientItemType = {
  id: number;
  name: string;
  amount: number;
  percent: number;
  priceDefault: string;
  priceSale: string;
};
interface IProps {
  onSelect: (index: number) => void;
  onSelectCustomPack: () => void;
  packages: PackageClientItemType[];
  formatter?: string;
  isDeploying?: boolean;
}

const PackageItems = (props: IProps) => {
  const { isDeploying, packages, onSelect, formatter, onSelectCustomPack } =
    props;

  const getImageURI = useCallback((amount: number) => {
    if (amount >= 15) {
      return eggPackage4;
    }

    if (amount >= 5) {
      return eggPackage3;
    }

    if (amount > 1) {
      return eggPackage2;
    }

    return eggPackage1;
  }, []);

  return (
    <div className="quickbuy-package--packages-wrapper">
      {packages.map((eachPackage, index: number) => {
        const hasDiscountPrice = Boolean(eachPackage.percent > 0);
        const priceInUse = hasDiscountPrice
          ? eachPackage.priceSale
          : eachPackage.priceDefault;
        console.log(`🚀 ~ {packages.map ~ priceInUse:`, typeof priceInUse);

        return (
          <div
            key={`package-item--${eachPackage.id}`}
            className={`package-item package-item--root package-${index + 1}`}
            onClick={() => {
              onSelect(eachPackage.id);
            }}
          >
            {isDeploying && <div className="package-item--disabled" />}
            <div className="package-item--name">
              <Heading h={4}>{eachPackage.name}</Heading>
            </div>
            <div className="package-item--info">
              <div className="package-item--quantity">
                <div className="package-item--egg">
                  <img
                    src={getImageURI(eachPackage.amount)}
                    alt={eachPackage.name}
                  />
                </div>
                <div className="package-item--amount">
                  <span className="label">x</span>
                  <span className="value">{eachPackage.amount}</span>
                </div>
              </div>
            </div>
            <div className="package-item--price-wrapper">
              <Button className="package-item--price">
                <span className="package-item--price-default">
                  {priceInUse === '0'
                    ? 'FREE'
                    : `${formatVIC(priceInUse.toString(), formatter)} VIC`}
                </span>
                {hasDiscountPrice && (
                  <span className="package-item--price-sale">
                    {formatVIC(eachPackage.priceDefault.toString(), formatter)}{' '}
                    VIC
                  </span>
                )}
              </Button>
            </div>
          </div>
        );
      })}
      {!configs.HIDE_CUSTOM_PACK && (
        <div
          className="package-item package-item--root package-custom"
          onClick={onSelectCustomPack}
        >
          {isDeploying && <div className="package-item--disabled" />}
          <div className="package-item--name">
            <Heading h={4}>Custom Pack</Heading>
          </div>
          <div className="package-item--info">
            <div className="package-item--quantity">
              <div className="package-item--egg">
                <img
                  src={
                    MODULES_PERMISSION.USE_HAPPY_HOUR ? imgEggSSR : eggPackage3
                  }
                  alt="Custom pack"
                  className={cn({
                    smaller: MODULES_PERMISSION.USE_HAPPY_HOUR,
                  })}
                />
              </div>
              <div className="package-item--amount">
                <span className="label">x</span>
                <span className="value">?</span>
              </div>
            </div>
          </div>
          <div className="package-item--price-wrapper package-custom">
            <Button className="package-item--price">
              <span className="package-item--price-custom">
                Want more eggs? Contact us for the best deal!
              </span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageItems;
