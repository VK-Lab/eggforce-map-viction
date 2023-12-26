import Select, { PropsValue } from 'react-select';
import cn from 'classnames';
import {
  OptionComponent,
  ControlComponent,
  MenuComponent,
  SingleValueComponent,
  MultiValueComponent,
  MultiValueLabelComponent,
  customStyles,
} from './CustomComponents';

export type SelectOptionType = {
  value: string;
  label: string;
};

// export type NewValueType =  SingleValue<SelectOptionType> | MultiValue<SelectOptionType> | null;
export type NewValueType = PropsValue<SelectOptionType>;

interface Props {
  className?: string;
  onChange?: (option: NewValueType) => void;
  options?: SelectOptionType[];
  defaultValue?: any;
  isMulti?: boolean;
  customComponents?: any;
  isDisabled?: boolean;
}

const GSelect = (props: Props) => {
  const {
    isDisabled,
    customComponents = undefined,
    className,
    isMulti,
    options,
    onChange,
    defaultValue,
  } = props;
  return (
    <Select
      isDisabled={isDisabled}
      isMulti={isMulti}
      className={cn('react-select--root', className)}
      defaultValue={defaultValue}
      onChange={onChange}
      options={options}
      isOptionDisabled={(option) => option.isDisabled} // disable an option
      components={{
        Option: OptionComponent,
        MultiValueLabel: MultiValueLabelComponent,
        MultiValue: MultiValueComponent,
        SingleValue: SingleValueComponent,
        Menu: MenuComponent,
        Control: ControlComponent,
        ...(customComponents && { ...customComponents }),
      }}
      styles={customStyles}
      theme={(theme) => ({
        ...theme,
        borderRadius: 24,
      })}
    />
  );
};

export default GSelect;
