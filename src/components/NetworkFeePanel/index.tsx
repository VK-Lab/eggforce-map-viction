import isNumber from 'lodash/isNumber';
import { Heading } from '@/components/Typography';
import { VICValue } from '@/components/CSPRValue';
import BoxInfo from '@/components/BoxInfo';
import { csprToMote } from '@/helpers/balance';

const NetworkFeePanel = ({
  fee = undefined,
  isMote = true,
  hasHeading = true,
}: {
  isMote?: boolean;
  fee: any;
  hasHeading?: boolean;
}) => {
  if (!isNumber(fee)) {
    return <></>;
  }
  return (
    <div className="egg-hatching-panel--box">
      {hasHeading && (
        <Heading h={4} className="fullwidth">
          Transaction Information
        </Heading>
      )}
      <BoxInfo label="Network" value={`Casper`} isHorizontal={false} />
      <BoxInfo
        label="Network Fee"
        value={
          <VICValue
            className="total-amount"
            value={isMote ? fee : csprToMote(fee)}
          />
        }
        isHorizontal={false}
      />
    </div>
  );
};

export default NetworkFeePanel;
