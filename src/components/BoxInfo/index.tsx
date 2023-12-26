import cn from 'classnames';
import { a } from 'react-spring';

interface IBoxInfo {
  label: string;
  value: string | React.ReactElement;
  className?: string;
  valueClassName?: string;
  isHorizontal?: boolean;
  useAnimated?: boolean;
  style?: any;
}

const BoxInfo = (props: IBoxInfo) => {
  const {
    valueClassName,
    label,
    value,
    className,
    isHorizontal = false,
    useAnimated = false,
    style = undefined,
  } = props;
  if (useAnimated) {
    return (
      <a.div
        style={style}
        className={cn('box-info--root', className, {
          'is-horizontal': isHorizontal,
        })}
      >
        <div className="label">{label}</div>
        <div className={cn('value', valueClassName)}>{value}</div>
      </a.div>
    );
  }
  return (
    <div
      className={cn('box-info--root', className, {
        'is-horizontal': isHorizontal,
      })}
    >
      <div className="label">{label}</div>
      <div className={cn('value', valueClassName)}>{value}</div>
    </div>
  );
};

export default BoxInfo;
