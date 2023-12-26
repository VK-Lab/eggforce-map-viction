import { useCallback, useEffect, useMemo } from 'react';
import useValidatorsLoader from '@/hooks/useValidatorsLoader';
import GSelect from '@/components/GSelect';
import {
  SingleValueComponent,
  IndicatorSeparator,
  InputValueComponent,
  OptionComponent,
} from './CustomComponents';

interface Props {
  className?: string;
  validator?: any;
  onChange?: (value: any) => void;
  defaultValue?: any;
  isDisabled?: boolean;
}

const GValidatorSelect = (props: Props) => {
  const { onChange, defaultValue = undefined, isDisabled = false } = props;
  const { data } = useValidatorsLoader();
  const options = data.map((val: any) => ({
    ...val,
    value: val.publicKey,
    label: val.name,
    isDisabled: val.isFull || !val.isActiveValidator,
  }));
  const findFirstValidValidator = useCallback(() => {
    let result = undefined;
    result = options.find(
      (option: any) => !option.isFull && option.isActiveValidator,
    );
    return result;
  }, [options]);
  const initValue = useMemo(() => {
    const initValue = findFirstValidValidator();
    let result = initValue ?? undefined;
    if (defaultValue && options?.length) {
      result = options.find((option) => option.value === defaultValue);
    }

    return result;
  }, [defaultValue, findFirstValidValidator, options]);

  useEffect(() => {
    if (defaultValue && initValue?.value === defaultValue) {
      return;
    }

    if (initValue && onChange) {
      onChange(initValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GSelect
      isDisabled={isDisabled}
      options={options as any}
      defaultValue={initValue}
      className="validators--selector"
      customComponents={{
        SingleValue: SingleValueComponent,
        Input: InputValueComponent,
        Option: OptionComponent,
        IndicatorSeparator,
        ...(isDisabled && {
          DropdownIndicator: () => null,
        }),
      }}
      onChange={onChange}
    />
  );
};

export default GValidatorSelect;
