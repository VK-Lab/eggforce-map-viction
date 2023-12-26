import { Inbox } from 'react-bootstrap-icons';
import cn from 'classnames';

const EmptyDataPlaceholder = ({ className }: any) => (
  <div className={cn('empty-box-placeholder--root', className)}>
    <div className="empty-box--wrapper">
      <Inbox className="icon" />
      <p>It looks empty here.</p>
    </div>
  </div>
);

export default EmptyDataPlaceholder;
