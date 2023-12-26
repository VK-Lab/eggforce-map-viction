// import { ReactNode } from 'react';
// import cn from 'classnames';
import OptionItem from '@/components/OptionItem';
import Sample from '@/assets/images/dragon-doc 2.png';
import Sample2 from '@/assets/images/TR-08.png';

interface Props {
  className?: string;
  onSelected?: () => void
}

const GCheckbox = (props: Props) => {
  return (
    <div>
      <OptionItem text="CasperDash" src={undefined} />
      <OptionItem text="Dragon NFT" src={Sample} />
      <OptionItem text="Eggs" src={Sample2} />
      <OptionItem text="CasperDash" src={undefined} isVertical />
      <OptionItem text="Dragon NFT" src={Sample} isVertical />
      <OptionItem text="Eggs" src={Sample2} isVertical />
    </div>
  );
};

export default GCheckbox;
