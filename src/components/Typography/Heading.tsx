import { useMemo, ReactNode } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { getSafeHTML } from '@/helpers/html';
import isString from 'lodash/isString';

interface Props {
  children?: ReactNode;
  className?: any;
  h?: number | string;
  innerHTML?: any;
  hasArrow?: boolean;
  // any props that come into the component
}

const Heading = ({
  h = 1,
  innerHTML = undefined,
  className,
  children,
  hasArrow = false,
}: Props) => {
  const customHTMLString = innerHTML
    ? {
        dangerouslySetInnerHTML: getSafeHTML(innerHTML),
      }
    : undefined;
  const heading = isString(h) ? parseInt(h, 10) : h;

  const finalClassnames = useMemo(() => {
    return cn(`heading heading-common`, className, {
      [`heading-${heading}`]: true,
      'has-arrow': hasArrow,
    });
  }, [heading, className, hasArrow]);

  if (heading > 6) {
    console.warn(
      'Heading::h prop should be one of [1,2,3,4,5,6]. Fallback to 1 as default.',
    );
  }
  if (heading === 2) {
    return (
      <h2
        {...(innerHTML && { ...customHTMLString })}
        className={finalClassnames}
      >
        {children}
      </h2>
    );
  }

  if (heading === 3) {
    return (
      <h3
        {...(innerHTML && { ...customHTMLString })}
        className={finalClassnames}
      >
        {children}
      </h3>
    );
  }

  if (heading === 4) {
    return (
      <h4
        {...(innerHTML && { ...customHTMLString })}
        className={finalClassnames}
      >
        {children}
      </h4>
    );
  }

  if (heading === 5) {
    return (
      <h5
        {...(innerHTML && { ...customHTMLString })}
        className={finalClassnames}
      >
        {children}
      </h5>
    );
  }

  if (heading === 6) {
    return (
      <h6
        {...(innerHTML && { ...customHTMLString })}
        className={finalClassnames}
      >
        {children}
      </h6>
    );
  }

  return (
    <h1 {...(innerHTML && { ...customHTMLString })} className={finalClassnames}>
      {children}
    </h1>
  );
};

Heading.propTypes = {
  children: PropTypes.node,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default Heading;
