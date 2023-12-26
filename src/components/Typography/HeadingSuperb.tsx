import { ReactNode } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

interface Props {
  children?: ReactNode;
  className?: any;
  // any props that come into the component
}

const HeadingSuperb = ({ className, children }: Props) => {
  return <h1 className={cn('heading-superb', className)}>{children}</h1>;
};

HeadingSuperb.propTypes = {
  children: PropTypes.node,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default HeadingSuperb;
