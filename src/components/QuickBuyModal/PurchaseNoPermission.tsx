import React from "react";
import NFTUniqueStrength from '@/components/NFTUniqueStrength';
import { Heading } from '@/components/Typography';
import Button from '@/components/GButton';

const PurchaseNoPermission = ({ onClaimHandler, messages } : any) => {
  return (
    <React.Fragment>
      <NFTUniqueStrength useHammer skipText className="quickbuy--element" />
      <Heading h={5} className="mb-3 quickbuy--element-no-permission-label" innerHTML={messages.labelNoPermission.defaultMessage}>
      </Heading>
      <Button className="btn--claim-whitelist" onClick={onClaimHandler}>
        <span>CLAIM WHITELIST</span>
      </Button>
    </React.Fragment>
  )
};

export default PurchaseNoPermission;
