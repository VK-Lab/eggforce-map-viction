import { ReactNode, useCallback } from 'react';
import cn from 'classnames';
import isFunction from 'lodash/isFunction';
import { FormControlProps } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import useCurrentUser from '@/hooks/useCurrentUser';
import GInput from '@/components/GInput/index';
import { VOTE_FEE } from '@/constants/key';
import logoChain from '@/assets/images/logo--viction-white.svg';
import { NumericFormat } from 'react-number-format';
import {
  calculateMaximumStakingValue,
  parseViction,
  formatViction,
} from '@/helpers/balance';
interface Props extends FormControlProps {
  children?: ReactNode;
  type?: string;
  onInputChange?: (value: number) => void;
  className?: string;
  formErrors?: any;
  min?: number;
  hideMaxButton?: boolean;
  useCompactLogo?: boolean;
  placeholder?: string;
}

const GTokenInput = (props: Props) => {
  const user = useCurrentUser();
  const {
    formErrors,
    value,
    onInputChange,
    className,
    placeholder = '',
    min = undefined,
    hideMaxButton = false,
    useCompactLogo = false,
  } = props;
  const onChangeHandler = useCallback(
    (values: any) => {
      if (onInputChange && isFunction(onInputChange)) {
        onInputChange(values.value);
      }
    },
    [onInputChange],
  );
  const onClickMaxHandler = useCallback(() => {
    if (!user?.balance || !onInputChange) {
      return;
    }

    const { balance } = user;
    const delegateFee = parseViction(VOTE_FEE.toString());
    const balanceBig = BigInt(balance);

    if (balanceBig > delegateFee) {
      const newValue = parseFloat(
        formatViction(calculateMaximumStakingValue(balanceBig, delegateFee)),
      );
      console.log(`🚀 ~ onClickMaxHandler ~ newValue:`, newValue);

      onInputChange(newValue);
    }
  }, [onInputChange, user]);

  return (
    <div className={cn('gtoken-input--root')}>
      <NumericFormat
        min={min}
        type="text"
        value={value as number}
        valueIsNumericString={true}
        allowLeadingZeros={false}
        allowNegative={false}
        decimalSeparator="."
        thousandSeparator=","
        displayType="input"
        className={cn('gtoken-input--input', className)}
        customInput={GInput}
        decimalScale={5}
        placeholder={placeholder}
        onValueChange={onChangeHandler}
      />
      {formErrors?.amount && (
        <Form.Control.Feedback type="invalid">
          {formErrors.amount}
        </Form.Control.Feedback>
      )}
      {formErrors?.balance && (
        <Form.Control.Feedback type="invalid">
          {formErrors.balance}
        </Form.Control.Feedback>
      )}
      <div className="gtoken-input--right-section">
        {!hideMaxButton && (
          <button onClick={onClickMaxHandler} className="gtoken-input--max-btn">
            MAX
          </button>
        )}
        <span
          className={cn('gtoken-input--icon cspr', {
            'is--compact-version': useCompactLogo,
          })}
        >
          <img src={logoChain} className="logo" alt="Account Balance" />
          {!useCompactLogo && <span>VIC</span>}
        </span>
      </div>
    </div>
  );
};

export default GTokenInput;
