import cn from 'classnames';
import imgSNC from '@/assets/images/icon--snc.png';
import { formatViction } from '@/helpers/balance';
import logoVICWhite from '@/assets/images/logo--viction-white.svg';

/**
 * TODO VIC: Remove any components using CSPRValue
 */
export const VICValue = ({
  value,
  reverse = false,
  className = '',
  shouldFormat = true, // by default this value is in MOTE
  hasLogo = true,
}: any) => {
  return (
    <span
      className={cn('token-value--root', className, {
        reverse,
      })}
    >
      <span className="text">
        {hasLogo && <img className="icon" src={logoVICWhite} alt="VIC" />}
        {shouldFormat ? formatViction(value) : value}{' '}
        <span className="cspr-label">VIC</span>
      </span>
    </span>
  );
};

export const SNCValue = ({
  value,
  reverse = false,
  className = '',
  shouldFormat = true, // by default this value is in MOTE
  hasLogo = true,
}: any) => {
  return (
    <span
      className={cn('token-value--root', className, {
        reverse,
      })}
    >
      <span className="text">
        {hasLogo && <img className="icon" src={imgSNC} alt="SNC" />}
        {value}
        <span className="cspr-label">SNC</span>
      </span>
    </span>
  );
};

export default VICValue;
