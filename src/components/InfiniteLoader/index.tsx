import React from 'react';
import PropTypes from 'prop-types';
import LoadingBox from '@/components/LoadingBox';
import { Waypoint } from 'react-waypoint';

const LoadingMore = ({ loading, hasMore, showEndOfList }: any) => {
  if (!hasMore && !loading && showEndOfList) {
    return <div>End of list</div>;
  }
  return null;
};

/**
 * Put this component at the end of vertial / horizonal list
 * When this component appears in view, fetchMore is called
 */
const InfiniteLoader = ({
  fetchMore,
  loading,
  hasMore,
  bottomOffset,
  horizontal,
  showEndOfList = true,
  showLoadingIndicator = true,
  scrollableAncestor,
}: any) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '100px',
        alignItems: 'center',
      }}
    >
      {loading ? (
        showLoadingIndicator ? (
          <div style={{ position: 'relative' }}>
            <LoadingBox />
          </div>
        ) : null
      ) : (
        <Waypoint
          horizontal={horizontal}
          scrollableAncestor={scrollableAncestor}
          onEnter={() => {
            if (hasMore) {
              fetchMore();
            }
          }}
          bottomOffset={bottomOffset}
        >
          <div>
            <LoadingMore hasMore={hasMore} showEndOfList={showEndOfList} />
          </div>
        </Waypoint>
      )}
    </div>
  );
};

InfiniteLoader.propTypes = {
  fetchMore: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  hasMore: PropTypes.bool.isRequired,
  horizontal: PropTypes.bool,
  bottomOffset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  scrollableAncestor: PropTypes.node,
  showEndOfList: PropTypes.bool,
  loadingIndicatorSize: PropTypes.number,
  showLoadingIndicator: PropTypes.bool,
};

export default InfiniteLoader;
