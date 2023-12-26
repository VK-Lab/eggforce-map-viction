import imgXP from '@/assets/images/icon--xp.png';
import GCommonTokenInput from '@/components/GCommonTokenInput';
import useSiteConfigurations from '@/hooks/useSiteConfigurations';
interface Props {
  value: number;
}

const GXPTokenInput = (props: Props) => {
  const { value } = props;
  const siteConfigs = useSiteConfigurations();
  const exchangeRate = siteConfigs.SNC_TO_XP_RATIO ?? 1;

  return (
    <GCommonTokenInput
      value={value}
      useMaxButton={false}
      viewOnly
      hasHeader
      leftInfo={<span className="exchange-rate">You'll get</span>}
      rightInfo={
        <span className="exchange-rate">
          Rate: <strong>1 SNC ≈ {exchangeRate} XP</strong>
        </span>
      }
      tokenInfo={{
        url: imgXP,
        name: 'XP',
      }}
    />
  );
};

export default GXPTokenInput;
