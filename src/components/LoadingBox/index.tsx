import cn from 'classnames';
import Spinner from 'react-bootstrap/Spinner';

const LoadingBox = ({
  className,
  label = '',
  minHeight = 320,
  isHorizontal = false,
}: any) => (
  <div
    className={cn('global--loading-mini', className, {
      'is--horizontal': isHorizontal,
    })}
    style={{
      minHeight,
    }}
  >
    <div className="icon--loading">
      <Spinner style={{ fontSize: '1.25rem' }} animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      {label && <span className="label">{label}</span>}
    </div>
  </div>
);

export default LoadingBox;
