import { ReactNode } from 'react';
import cn from 'classnames';
import { FormProps } from 'react-bootstrap/Form';
import GInput from '@/components/GInput/index';

interface Props extends FormProps {
  children?: ReactNode;
  placeholder?: string;
}

const GSearch = (props: Props) => {
  const { placeholder = 'Search...' } = props;
  return (
    <div className={cn('gsearch--root')}>
      <GInput className="gsearch--input" placeholder={placeholder} />
      <button className="gsearch--search-btn"></button>
    </div>
  );
};

export default GSearch;
