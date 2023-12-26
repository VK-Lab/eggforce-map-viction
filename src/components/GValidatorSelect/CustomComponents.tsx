import cn from 'classnames';
import {
  InputProps,
  components,
  SingleValueProps,
  OptionProps,
} from 'react-select';
import MiddleTruncatedText from '@/components/MiddleTruncatedText';
import type { SelectOptionType } from '@/components/GSelect';
export const IndicatorSeparator = () => null;
export const InputValueComponent = (props: InputProps) => {
  return (
    <components.Input
      {...props}
      className="validator-selector--search-input custom"
    />
  );
};
export const SingleValueComponent = (props: SingleValueProps) => {
  const selected: any = props.getValue()[0];
  const {
    icon: { url },
    name,
    publicKey,
    verified,
  } = selected;

  return (
    <components.SingleValue
      {...props}
      className={cn('validator-selector--root single-value')}
    >
      <div className="validator-selector--icon">
        <img loading="lazy" className="icon" src={url} alt={name} />
      </div>
      <div className="validator-selector--body">
        <div className="validator-item--upper">
          <div
            className={cn('validator-item--name', {
              verified: verified,
            })}
          >
            {name}
          </div>
        </div>
        <div className="validator-item--lower">
          <MiddleTruncatedText>{publicKey}</MiddleTruncatedText>
        </div>
      </div>
    </components.SingleValue>
  );
};

export const OptionComponent = (props: OptionProps<SelectOptionType>) => {
  return (
    <components.Option
      {...props}
      className={cn('option-item', {
        'is-disabled': props.isDisabled,
      })}
    >
      {props.children}
      {props.isDisabled && <span className="tag--full">Full</span>}
    </components.Option>
  );
};
