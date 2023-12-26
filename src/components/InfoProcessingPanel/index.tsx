import cn from 'classnames';
import iconTreeSelvyn from '@/assets/images/icon--treeSelvyn.webp';
import { CSSProperties } from 'react';

const InfoProcessingPanel = ({
  style = {},
  message = undefined,
  className = '',
}: {
  className?: string;
  message: any;
  style?: CSSProperties;
}) => {
  if (!message) {
    return null;
  }
  return (
    <div className={cn('tip--egg-is-processing', className)} style={style}>
      <div className="icon">
        <img src={iconTreeSelvyn} alt="Tip" />
      </div>
      <div className="content">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default InfoProcessingPanel;
