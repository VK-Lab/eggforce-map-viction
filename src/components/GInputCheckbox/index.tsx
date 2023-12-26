import cn from 'classnames';
import { useMemo, useState, useCallback } from 'react';
import { CheckCircle, Circle } from 'react-bootstrap-icons';
import isFunction from 'lodash/isFunction';

interface IInputCheckboxProps {
  label?: string | React.ReactNode;
  value?: boolean;
  isControlled?: boolean;
  onChange?: (value: boolean) => void;
  className?: string;
  disabled?: boolean;
}

const InputCheckbox = ({
  label,
  isControlled = false,
  value = false,
  onChange,
  className,
  disabled = false,
}: IInputCheckboxProps) => {
  const [isChecked, setChecked] = useState<boolean>(
    isControlled ? value : false,
  );
  const isCheckedMemo = useMemo(() => {
    if (isControlled) {
      return value;
    }

    return isChecked;
  }, [isChecked, isControlled, value]);

  const onCheckHandler = useCallback(() => {
    if (isControlled && isFunction(onChange)) {
      onChange(!value);
      return;
    }

    if (!isControlled) {
      setChecked((prev) => !prev);
    }
  }, [isControlled, onChange, value]);

  return (
    <button
      disabled={disabled}
      className={cn('btn--checkbox-type', className)}
      onClick={onCheckHandler}
    >
      <span className="icon ignore">
        {isCheckedMemo ? (
          <CheckCircle style={{ color: '#F9F871' }} />
        ) : (
          <Circle />
        )}
      </span>
      <span className="label">{label}</span>
    </button>
  );
};

export default InputCheckbox;
