import { CSSObject } from '@emotion/serialize';
import cn from 'classnames';
import {
  components,
  MenuProps,
  ControlProps,
  MultiValueProps,
  MultiValueGenericProps,
  SingleValueProps,
  OptionProps,
} from 'react-select';
import { SelectOptionType } from './index';

const ControlComponent = (props: ControlProps<SelectOptionType>) => {
  return <components.Control {...props} className="react-select--control" />;
};

const MenuComponent = (props: MenuProps<SelectOptionType>) => {
  return (
    <components.Menu {...props} className="react-select--menu">
      {props.children}
    </components.Menu>
  );
};

const OptionComponent = (props: OptionProps<SelectOptionType>) => {
  return (
    <components.Option
      {...props}
      className={cn('option-item', {
        'is-disabled': props.isDisabled,
      })}
    >
      {props.children}
    </components.Option>
  );
};

const SingleValueComponent = (props: SingleValueProps<SelectOptionType>) => {
  return (
    <components.SingleValue {...props} className="single-value">
      {props.children}
    </components.SingleValue>
  );
};

const MultiValueComponent = (props: MultiValueProps<SelectOptionType>) => {
  return (
    <components.MultiValue {...props}>{props.children}</components.MultiValue>
  );
};

const MultiValueLabelComponent = (
  props: MultiValueGenericProps<SelectOptionType>,
) => {
  return (
    <components.MultiValueLabel {...props}>
      {props.children}
    </components.MultiValueLabel>
  );
};

const customStyles = {
  menu: (provided: CSSObject): CSSObject => ({
    ...provided,
    overflow: 'hidden',
  }),
  singleValue: (provided: CSSObject): CSSObject => ({
    ...provided,
    fontSize: '13px',
  }),
  multiValue: (provided: CSSObject): CSSObject => ({
    ...provided,
    fontSize: '13px',
    borderRadius: 20,
    color: '#fff',
    paddingLeft: 6,
    backgroundColor: '#071A52',
    alignItems: 'center',
  }),
  multiValueLabel: (provided: CSSObject): CSSObject => ({
    ...provided,
    color: '#fff',
    fontSize: 13,
  }),
  multiValueRemove: (provided: CSSObject): CSSObject => ({
    ...provided,
    height: 22,
    ':hover': {
      backgroundColor: '#B64168',
    },
  }),
  option: (provided: CSSObject): CSSObject => ({
    ...provided,
    backgroundColor: '#1c2d5b',
    fontSize: '13px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#EA735D',
    },
  }),
  placeholder: (provided: CSSObject): CSSObject => ({
    ...provided,
    fontSize: '13px',
  }),
  input: (provided: CSSObject): CSSObject => ({
    ...provided,
    fontSize: '13px',
  }),
};

export {
  ControlComponent,
  MenuComponent,
  OptionComponent,
  SingleValueComponent,
  MultiValueComponent,
  MultiValueLabelComponent,
  customStyles,
};
