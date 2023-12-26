import cn from 'classnames';

interface InputRadioProps {
  input: any;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string | React.ReactNode;
  className?: string;
  disabled?: boolean;
  isButtonLike?: boolean;
}

const GInputRadio = ({
  input,
  label,
  className,
  disabled = false,
  isButtonLike = false,
  onChange,
}: InputRadioProps) => {
  return (
    <div
      className={cn('radio', {
        'is-button-like': isButtonLike,
      })}
    >
      <label>
        <input type="radio" {...input} onChange={onChange} />
        <span className="custom-radio">
          <i className="icon-radio-check"></i>
        </span>
        <span className="custom-radio-text">{label}</span>
      </label>
    </div>
  );
};

const InputRadioField = (props: any) => {
  const { input } = props;
  return (
    <GInputRadio
      {...props}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        props?.onRadioChanged?.({
          value: e.target.value,
          name: input.name,
        });
        input.onChange(e);
      }}
    />
  );
};

export { InputRadioField };
export default GInputRadio;
