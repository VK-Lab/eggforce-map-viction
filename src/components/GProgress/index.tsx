import cn from 'classnames';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

interface Props {
  percent?: number | string;
  className?: string;
  value?: number | string;
  remaining?: number | string;
  leftLabel?: string | React.ReactNode;
  rightLabel?: string | React.ReactNode;
  leftTopLabel?: string | React.ReactNode;
  rightTopLabel?: string | React.ReactNode;
  tooltipLabel?: string;
}

const GProgress = (props: Props) => {
  const {
    leftLabel,
    rightLabel,
    tooltipLabel,
    leftTopLabel,
    rightTopLabel,
    percent,
    className,
  } = props;
  return (
    <div className={cn('gprogress--root', className)}>
      <div className="gprogress--header">
        {leftTopLabel}
        {rightTopLabel}
      </div>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id={`tooltip-xp-progress`}>{tooltipLabel}</Tooltip>}
      >
        <div className="gprogress--body">
          <div
            className="gprogress-slide"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </OverlayTrigger>
      <div className="gprogress--footer">
        <div className="gprogress-footer--content">
          <div className="gprogress-footer--content__left">{leftLabel}</div>
          <div className="gprogress-footer--content__right">{rightLabel}</div>
        </div>
      </div>
    </div>
  );
};

export default GProgress;
