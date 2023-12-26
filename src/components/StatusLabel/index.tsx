import cn from 'classnames';
import SNCBoosterIcon from '@/components/SNCBoosterIcon';

const statuses = [
  {
    value: 'minting',
    label: 'Minting',
  },
  {
    value: 'minted',
    label: 'Minted',
  },
  {
    value: 'incubating',
    label: 'Incubating',
  },
  {
    value: 'stopped',
    label: 'Stopped',
  },
  {
    value: 'failed',
    label: 'Failed',
  },
];

const StatusLabel = ({
  value,
  booster = undefined,
  className = '',
}: {
  value: string;
  booster?: number;
  className?: string;
}) => {
  const viewValue = statuses.find((item) => item.value === value);
  if (!viewValue) {
    return null;
  }
  return (
    <div className={cn('status--root status', `is-${value}`, className)}>
      {viewValue.label}
      {booster && <SNCBoosterIcon value={booster} />}
    </div>
  );
};

export default StatusLabel;
