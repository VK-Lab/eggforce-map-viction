import React, { useMemo } from 'react';
import Balancer from 'react-wrap-balancer';
import ConfirmModal from '@/components/ConfirmModal';
import useSiteConfigurations from '@/hooks/useSiteConfigurations';
import NetworkFeePanel from '@/components/NetworkFeePanel';

const ConfirmUnhatchModal = ({
  shouldUndelegate,
  open,
  onHide,
  onConfirm,
  onCheckboxChange,
  disableConfirm = false,
}: any) => {
  const siteConfigs = useSiteConfigurations();
  const confirmMessage = useMemo(() => {
    return shouldUndelegate ? (
      <span>
        Are you sure you want to <strong>stop incubating current egg</strong>{' '}
        and <strong>undelegate VIC staking amount</strong>?
      </span>
    ) : (
      <span>
        Are you sure you want to <strong>stop incubating current egg</strong>?
      </span>
    );
  }, [shouldUndelegate]);

  if (!open) {
    return null;
  }

  return (
    <ConfirmModal
      backdrop="static"
      keyboard={false}
      modalClassname="confirm-unhatch-undelegate-modal"
      open={open}
      showIcon={false}
      onHide={onHide}
      onConfirm={onConfirm}
      disableConfirm={disableConfirm}
      disableCancel={disableConfirm}
    >
      <Balancer ratio={0}>{confirmMessage}</Balancer>
      <div className="content">
        {shouldUndelegate && (
          <div className="compact-modal--network-fee-wrapper">
            <NetworkFeePanel fee={siteConfigs.STOP_ONLY_FEE!} />
          </div>
        )}
      </div>
    </ConfirmModal>
  );
};

export default ConfirmUnhatchModal;
