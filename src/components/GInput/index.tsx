import { ReactNode } from 'react';
import cn from 'classnames';
import Form from 'react-bootstrap/Form';
import { FormControlProps } from 'react-bootstrap';
interface Props extends FormControlProps {
  children?: ReactNode;
  type?: string;
  required?: boolean;
  placeholder?: string;
}

const GInput = (props: Props) => {
  const {
    required,
    className,
    type = 'text',
    placeholder,
    onChange,
    value,
  } = props;

  if (typeof value === 'string' || typeof value === 'number') {
    return (
      <Form.Control
        required={required}
        onChange={onChange}
        value={value}
        className={cn('ginput--root', className)}
        type={type}
        placeholder={placeholder}
      />
    );
  }

  return (
    <Form.Control
      onChange={onChange}
      className={cn('ginput--root', className)}
      type={type}
      placeholder={placeholder}
    />
  );
};

const GInputField = (props: any) => {
  const { input, label, meta } = props;
  const isInvalid = Boolean(meta.error && meta.touched);
  return (
    <div>
      {label && <Form.Label>{label}</Form.Label>}
      <GInput
        {...props.input}
        className={cn({
          'is-invalid': isInvalid,
        })}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          input.onChange(e.target.value);
        }}
      />
      {isInvalid && (
        <Form.Control.Feedback type="invalid">
          {meta.error}
        </Form.Control.Feedback>
      )}
    </div>
  );
};

export { GInputField };

export default GInput;
