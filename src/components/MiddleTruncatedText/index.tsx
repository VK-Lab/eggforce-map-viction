import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import cn from "classnames";
import { getEndString } from '@/helpers/format';
import { Placement } from 'react-bootstrap/esm/types';
import './MiddleTruncatedText.scss';

interface IMiddleTruncatedText {
  children: string,
  end?: string | number,
  placement?: Placement
}

const MiddleTruncatedText = ({ children, end = 5, placement = 'top' }: IMiddleTruncatedText) => {
	const endString = getEndString(children, end);
	const beginString = !endString ? children : children.slice(0, children.length - endString.length);
	return (
		<OverlayTrigger placement={placement} overlay={<Tooltip>{children}</Tooltip>}>
			<div className={cn("truncated-text")}>
				<div className="content--fluid">{beginString}</div>
				<div className="content--static">{endString}</div>
			</div>
		</OverlayTrigger>
	);
};

export default MiddleTruncatedText;
