import { useMemo, useCallback, useState } from 'react';
import Button from '@/components/GButton';
import { PlusLg, DashLg } from 'react-bootstrap-icons';
import useCurrentUser from '@/hooks/useCurrentUser';
import { Heading } from '@/components/Typography';
import CONFIG from '@/constants/settings';
import { toast, sharedToastProps } from '@/services/toast';
import useBlockMinting from '@/hooks/useBlockMinting';

const PurchaseCounter = ({
  formatter = '0,0[.]00',
  pricePerEgg,
  onBuyProcessHandler,
  messages,
  isDeploying,
}: any) => {
  const [value, setValue] = useState<number>(5);
  const MIN_QUANTITY = CONFIG.MINIMUM_MINT_QUANTITY;
  const MAX_QUANTITY = CONFIG.MAXMIMUM_MINT_QUANTITY;
  // const totalAmount = value * pricePerEgg; // in CSPR
  const user = useCurrentUser();
  const { maxEggRemaining } = user;
  const { shouldDisable } = useBlockMinting({ isDeploying });
  // const maxEggRemaining = 0;
  // const totalAmount = value * pricePerEgg; // in CSPR

  const { shouldDisableMintButton, labelMintButton } = useMemo(() => {
    if (shouldDisable) {
      return {
        shouldDisableMintButton: true,
        labelMintButton: messages.labelStartMinting.defaultMessage,
      };
    }

    const disable = Boolean(
      !maxEggRemaining || (maxEggRemaining && maxEggRemaining < value),
    );
    return {
      shouldDisableMintButton: disable,
      labelMintButton: messages.labelStartMint.defaultMessage,
    };
  }, [
    maxEggRemaining,
    messages.labelStartMint.defaultMessage,
    messages.labelStartMinting.defaultMessage,
    shouldDisable,
    value,
  ]);

  const onIncrease = () =>
    setValue((prevValue) => {
      const newValue = prevValue + 1;
      if (newValue > MAX_QUANTITY) {
        toast.info(messages.errMaxAmount.defaultMessage, {
          ...sharedToastProps,
          toastId: messages.errMaxAmount.id,
        });
      }
      return newValue > MAX_QUANTITY ? MAX_QUANTITY : newValue;
    });
  const onDecrease = () =>
    setValue((prevValue) => {
      const newValue = prevValue - 1;
      if (newValue < MIN_QUANTITY) {
        toast.info(messages.errMinAmount.defaultMessage, {
          ...sharedToastProps,
          toastId: messages.errMinAmount.id,
        });
      }
      return newValue < MIN_QUANTITY ? MIN_QUANTITY : newValue;
    });
  const onManuallyBuyHandler = useCallback(async () => {
    // await onBuyProcessHandler(totalAmount, value);
    await onBuyProcessHandler(value - 1);
  }, [onBuyProcessHandler, value]);

  const renderEggReminaing = useMemo(() => {
    if (maxEggRemaining === undefined) {
      return null;
    }
    if (maxEggRemaining === 0) {
      return (
        <div className="egg-remaining">
          (Out of Egg allocated for this account)
        </div>
      );
    }

    if (maxEggRemaining > 0) {
      return (
        <div className="egg-remaining">
          ( Maximum Eggs Remaining: {maxEggRemaining})
        </div>
      );
    }
  }, [maxEggRemaining]);

  return (
    <div className="purchase-counter--wrapper">
      {/* <NFTUniqueStrength skipText className="quickbuy--element" /> */}
      <Heading h={4} className="mb-3">
        {messages.labelEggAmount.defaultMessage}
      </Heading>
      <div className="quickbuy-number-input--wrapper">
        <div className="quickbuy-number--change">
          <Button
            disabled={isDeploying || value === MIN_QUANTITY}
            onClick={onDecrease}
            className="quickbuy-number--change-button plus"
          >
            <DashLg />
          </Button>
        </div>
        <div className="quickbuy-number--value">
          <div className="quickbuy-number--input-value">{value}</div>
        </div>
        <div className="quickbuy-number--change">
          <Button
            disabled={isDeploying || value === MAX_QUANTITY}
            onClick={onIncrease}
            className="quickbuy-number--change-button minus"
          >
            <PlusLg />
          </Button>
        </div>
      </div>
      {renderEggReminaing}
      {/* <div className="quickbuy-number-total">
        <div className="quickbuy-number-total--label">
          <img
            src={logoChain}
            alt={`Total ${formatCSPR(totalAmount, formatter)} CSPR`}
          />
        </div>
        <div className="quickbuy-number-total--value">
          {formatCSPR(totalAmount, formatter)} CSPR
        </div>
      </div> */}
      <Button
        disabled={shouldDisableMintButton}
        onClick={onManuallyBuyHandler}
        className="btn--start-minting counter"
      >
        <span>{labelMintButton}</span>
      </Button>
    </div>
  );
};

export default PurchaseCounter;
