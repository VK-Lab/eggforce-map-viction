import cn from 'classnames';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

interface NFTHeaderStatItemSpec {
  tooltipId: string;
  tooltipLabel: string;
  icon: string;
  value: number | string;
  className?: string;
}

const NFTHeaderStatItem = (props: NFTHeaderStatItemSpec) => {
  const { className, tooltipId, tooltipLabel, icon, value } = props;
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id={tooltipId}>{tooltipLabel}</Tooltip>}
    >
      <div className={cn('nft-header-item', className)}>
        <div className="icon-wrapper">
          <img loading="lazy" src={icon} alt={tooltipLabel} className="img" />
        </div>
        <span className="value">{value}</span>
      </div>
    </OverlayTrigger>
  );
};
export default NFTHeaderStatItem;
