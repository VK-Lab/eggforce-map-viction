import React, { ReactNode } from 'react';
import cn from 'classnames';
interface Props {
  children: ReactNode;
  isRegularPage?: boolean;
  isJourneyPage?: boolean;
  // any props that come into the component
}

const MasterLayoutBody = ({
  children,
  isJourneyPage = false,
  isRegularPage = false,
}: Props) => (
  <div
    className={cn('layout-body--root fullwidth', {
      'is--regular-page': isRegularPage,
      'use--common-background': isRegularPage,
      'use--dragon-background': isJourneyPage,
    })}
  >
    {children}
  </div>
);

export default MasterLayoutBody;
