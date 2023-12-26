import React from 'react';
import { TwitterIcon, TwitterShareButton } from 'react-share';
import { Heading } from '@/components/Typography';

interface ISocialSharingProps {
  url: string;
  showLabel?: boolean;
}

const SocialSharing = ({
  url = 'https://eggforce.io',
  showLabel = true,
}: ISocialSharingProps) => {
  return (
    <React.Fragment>
      {showLabel && (
        <Heading className="text-gradient" h={4}>
          Share your Selvyn's Hammer now
        </Heading>
      )}
      <TwitterShareButton
        className="tw"
        title="🥳🥳🥳 Minted a #Selvyn #Hammer NFT from @EggForceNFT. Ready to break the genesis eggs."
        via=""
        hashtags={['NFT', 'CSPR', 'EggForce']}
        url={url}
      >
        <TwitterIcon size={46} round={true} className="icon" />
      </TwitterShareButton>
    </React.Fragment>
  );
};

export default SocialSharing;
