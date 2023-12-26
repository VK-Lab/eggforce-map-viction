import { useMemo, ReactNode, useCallback } from 'react';
import cn from 'classnames';
import isFunction from 'lodash/isFunction';
import Form from 'react-bootstrap/Form';
import useCurrentUser from '@/hooks/useCurrentUser';
import GInput from '@/components/GInput/index';
import { NumericFormat } from 'react-number-format';

interface Props {
  children?: ReactNode;
  type?: string;
  onChange?: (value: number) => void;
  className?: string;
  value: number;
  placeholder?: string;
  maxValue?: number;
  meta?: any;
  useMaxButton?: boolean;
  usePercentageButtons?: boolean;
  hasHeader?: boolean;
  tokenInfo?: {
    url: string;
    name: string;
  };
  leftInfo?: ReactNode;
  rightInfo?: ReactNode;
  viewOnly?: boolean;
}

const GCommonTokenInput = (props: Props) => {
  const user = useCurrentUser();
  const {
    meta = undefined,
    maxValue = undefined,
    value,
    onChange,
    className,
    placeholder = '',
    useMaxButton = true,
    hasHeader = false,
    tokenInfo = undefined,
    rightInfo = undefined,
    leftInfo = undefined,
    viewOnly = false,
  } = props;
  const hasError = useMemo(() => meta && meta.error && meta.touched, [meta]);
  const onChangeHandler = useCallback(
    (values: any) => {
      if (onChange && isFunction(onChange)) {
        onChange(values.value);
      }
    },
    [onChange],
  );
  const onClickMaxHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (viewOnly || !onChange || !user) {
        return;
      }

      if (maxValue !== undefined) {
        onChange(maxValue);
        return;
      }
    },
    [maxValue, onChange, user, viewOnly],
  );

  return (
    <div className={cn('gtoken-input--root')}>
      {hasHeader && (
        <div className="gtoken-input--header">
          <div className="left-info">{leftInfo}</div>
          <div className="right-info">{rightInfo}</div>
        </div>
      )}
      <div className="gtoken-input--body">
        <NumericFormat
          disabled={viewOnly}
          type="text"
          value={value as number}
          valueIsNumericString={true}
          allowLeadingZeros={false}
          allowNegative={false}
          decimalSeparator="."
          thousandSeparator=","
          displayType="input"
          className={cn('gtoken-input--input', className, {
            'is-invalid': hasError,
            'read-only': viewOnly,
          })}
          customInput={GInput}
          decimalScale={5}
          placeholder={placeholder}
          onValueChange={onChangeHandler}
        />
        {hasError && (
          <Form.Control.Feedback type="invalid">
            {meta.error}
          </Form.Control.Feedback>
        )}
        <div className="gtoken-input--right-section">
          {useMaxButton && (
            // eslint-disable-next-line jsx-a11y/no-redundant-roles
            <button
              role="button"
              onClick={onClickMaxHandler}
              className="gtoken-input--max-btn"
            >
              MAX
            </button>
          )}
          {tokenInfo && (
            <span
              className={cn(
                `gtoken-input--icon ${tokenInfo.name.toLowerCase()}`,
              )}
            >
              <img src={tokenInfo.url} className="logo" alt="Account Balance" />
              <span>{tokenInfo.name}</span>
            </span>
          )}
        </div>
      </div>
      <div className="gtoken-input--percentage"></div>
      <div className="gtoken-input--footer"></div>
    </div>
  );
};

export default GCommonTokenInput;
