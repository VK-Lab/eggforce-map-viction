import { ReactNode } from 'react';
import cn from "classnames";
import CustomScroll from 'react-custom-scroll';
import 'react-custom-scroll/dist/customScroll.css';

interface Props {
  children: ReactNode;
  isAlwaysVisible?: boolean
}

const CustomScrollbar = (props: Props) => {
  const { children, isAlwaysVisible = false } = props;
  return (
    <CustomScroll
      heightRelativeToParent="100%"
      className={cn(`eggforce-custom-scrollbar--root`, {
        "is--always-visible": isAlwaysVisible
      })}
    >
      {children}
    </CustomScroll>
  );
};

export default CustomScrollbar;
