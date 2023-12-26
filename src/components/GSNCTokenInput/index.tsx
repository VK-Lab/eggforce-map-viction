import { ReactNode } from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';
import imgSNC from '@/assets/images/icon--snc.png';
import GCommonTokenInput from '@/components/GCommonTokenInput';
import { formatXPValue } from '@/modules/NFTDetail/utils';
interface Props {
  children?: ReactNode;
  type?: string;
  onChange?: (value: number) => void;
  className?: string;
  value: number;
  placeholder?: string;
  maxValue?: number;
  meta: any;
  useMaxButton?: boolean;
  usePercentageButtons?: boolean;
  hasHeader?: boolean;
}

const GSNCTokenInput = (props: Props) => {
  const user = useCurrentUser();

  return (
    <GCommonTokenInput
      {...props}
      hasHeader
      leftInfo={<span className="exchange-rate">Amount</span>}
      rightInfo={
        <span className="exchange-rate">
          Available: <strong>{formatXPValue(user.totalSnc) ?? 0} SNC</strong> /
          Locked: <strong>{user?.pendingSnc ?? 0} SNC</strong>
        </span>
      }
      tokenInfo={{
        url: imgSNC,
        name: 'SNC',
      }}
    />
  );
};

export default GSNCTokenInput;
