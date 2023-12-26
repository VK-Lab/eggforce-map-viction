import { useMemo } from 'react';
import cn from 'classnames';
import { Boxes, CheckCircleFill } from 'react-bootstrap-icons';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import configs from '@/constants/settings';
import MiddleTruncatedText from '../MiddleTruncatedText';

const NotificationItem = (props: any) => {
  const { hash, className } = props;
  const deployTransactionUrl = useMemo(() => {
    return `${configs.VIC_EXPLORER}/txs/${hash.hash}`;
  }, [hash]);

  const { icon, message } = useMemo(() => {
    let statusMessage = '';
    let icon = <Boxes />;
    switch (hash.status) {
      default:
        statusMessage = 'is completed.';
        icon = <CheckCircleFill />;
        statusMessage = '';
    }

    return {
      icon,
      message: (
        <div className="content">
          Deploy{' '}
          <span className="hash-text">
            <MiddleTruncatedText>{hash.hash}</MiddleTruncatedText>
          </span>{' '}
          {statusMessage}
        </div>
      ),
    };
  }, [hash]);

  return (
    <div className="notification-item--root">
      <a
        href={deployTransactionUrl}
        rel="nofollow noopener noreferrer"
        target="_blank"
        title={`View ${hash.hash} on Viction explorer`}
        className={cn('btn--view-hash-explorer--ignore', className)}
      >
        <div className={cn('notification-item--content is--completed')}>
          <div className="notification-item--type">
            <span>{icon}</span>
          </div>
          <div className="notification-item--body">
            {message}
            <div className="last-updated">
              {formatDistanceToNow(new Date(hash.createdAt), {
                addSuffix: true,
              })}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default NotificationItem;
