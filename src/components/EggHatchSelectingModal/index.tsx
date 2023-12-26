import { useCallback, useEffect, useState, useMemo } from 'react';
import Big from 'big.js';
import cn from 'classnames';
import isEmpty from 'lodash/isEmpty';
import Form from 'react-bootstrap/Form';
import LoadingBox from '@/components/LoadingBox';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import type { NFTItem } from '@/types/NFTItem';
import { NFTEggStatus, NFTTypeEnum } from '@/types/NFTItem';
import GModal from '@/components/GModal';
import Button from '@/components/GButton';
import useCurrentUser from '@/hooks/useCurrentUser';
import {
  useAppSelector as useSelector,
  useAppDispatch as useDispatch,
} from '@/app/hooks';
import { selectEggHatchingModal } from '@/modules/EggHatching/selectors';
import { eggHatchingSelectActions } from '@/modules/EggHatching/store';
import { showConnectCSModal } from '@/modules/CasperSigner/store';
import GValidatorSelect from '@/components/GValidatorSelect';
import GTokenInput from '@/components/GTokenInput';
import { ENTRY_POINT_DELEGATE, VOTE_FEE, TOKEN_SYMBOL } from '@/constants/key';
import { getNFTDetails } from '@/modules/NFTDetail/utils';
import useEggHatching from '@/hooks/useEggHatching';
import isEqual from 'lodash/isEqual';
import { selectValidatorsModule } from '@/modules/ValidatorsModule/selectors';
import { selectNFTCollections } from '@/modules/EggCollection/selectors';
import { selectNFTDetailModal } from '@/modules/NFTDetail/selectors';
import { getEggDetail } from '@/modules/NFTDetail/actions';
import NFTMedia from '@/components/NFTGridItem/NFTMedia';
import { startEggHatchingProcess } from '@/modules/EggHatching/actions';
import BoxInfo from '@/components/BoxInfo';
import { Heading } from '@/components/Typography';
import { toast, sharedToastProps } from '@/services/toast';
import NFTUniqueStrength from '@/components/NFTUniqueStrength';
import HelperHatch from '@/components/NFTDetailViewModal/HelperHatch';
import AccountMiniHeader from '@/components/AccountMiniHeader';
import EggHatchStatusModal from './EggHatchStatusModal';
import messages from './messages';
import commonMessages from '@/constants/commonMessages';
import { formatViction } from '@/helpers/balance';

const EggHatchSelectingModal = () => {
  const fee = VOTE_FEE;
  const entryPoint = ENTRY_POINT_DELEGATE;

  const dispatch = useDispatch();
  const { validators } = useSelector(selectValidatorsModule, isEqual);
  const nfts = useSelector(selectNFTCollections, isEqual);
  const eggHatchSelectModal = useSelector(selectEggHatchingModal);
  const NFTDetailStore = useSelector(selectNFTDetailModal);
  const { hatch, validate, isDeploying } = useEggHatching();
  const [isHatchLoading, setHatchLoading] = useState<boolean>(false);
  const {
    data: dataDetail,
    open: isOpeningNFTDetailModal,
    loading,
  } = NFTDetailStore;

  const {
    open,
    selectedNFT: selectedNFT_ID,
    selectedValidator,
  } = eggHatchSelectModal;
  const defaultValidatorValue = useMemo(() => {
    if (
      dataDetail?.egg?.validator &&
      typeof dataDetail?.egg?.validator === 'string'
    ) {
      return dataDetail?.egg?.validator;
    }

    return selectedValidator;
  }, [dataDetail, selectedValidator]);
  const shouldDisableHatchButton = useMemo(() => {
    if (dataDetail?.egg?.isProcessing || isHatchLoading) {
      return true;
    }

    /**
     * TODO VIS: set isActiveValidator true
     */
    // eslint-disable-next-line
    const hasNoActiveValidators = validators.every(
      (validator) => validator.isActiveValidator === false,
    );
    /**
     * TODO VIC: allow all validatros valid
     */
    return hasNoActiveValidators;
    // return false; //hasNoActiveValidators;
  }, [dataDetail, isHatchLoading, validators]);
  const {
    description,
    image,
    token_uri,
    name: nftType = '',
    level,
    classNFT,
  } = useMemo(() => {
    if (!selectedNFT_ID) {
      return {
        metadata: [],
        name: '',
      };
    }

    const nft = nfts.find(({ tokenId, name }) => {
      return (
        tokenId === selectedNFT_ID.tokenId && selectedNFT_ID.nftType === name
      );
    });
    const eggData = getNFTDetails(nft);

    return {
      description: eggData.description,
      image: eggData.image,
      token_uri: eggData.token_uri,
      name: eggData.nftType,
      level: eggData.level,
      classNFT: eggData.classNFT,
    };
  }, [nfts, selectedNFT_ID]);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [onHatchingResultOpen, setHatchingResultOpen] =
    useState<boolean>(false);
  const [isHatchingSuccess, setHatchingStatus] = useState<boolean | undefined>(
    undefined,
  );
  const [formErrors, setFormErrors] = useState<undefined | any>(undefined);

  const [currValidator, setValidator] = useState<any>(undefined);

  const user = useCurrentUser();
  const shouldDisableValidatorSelect = useMemo(() => {
    if (!dataDetail?.egg) {
      return false;
    }

    const { egg: eggStatusDetail } = dataDetail as Partial<NFTItem>;
    if (eggStatusDetail.status === NFTEggStatus.incubating) {
      return true;
    }

    return false;
  }, [dataDetail]);
  const minAmount = shouldDisableValidatorSelect ? 10 : 100;

  const onClose = useCallback(() => {
    dispatch(eggHatchingSelectActions.hideModal());
  }, [dispatch]);
  const onSelectValidator = useCallback((data: any) => {
    setValidator(data);
  }, []);
  const onChangeTokenAmount = useCallback(
    (value: number) => {
      setAmount(value);

      if (formErrors) {
        setFormErrors(undefined);
      }
    },
    [formErrors],
  );
  const onCloseStatusModal = useCallback(() => {
    setHatchingResultOpen(false);
    onClose();
  }, [onClose]);
  const onGetEggDetail = useCallback(async () => {
    if (!selectedNFT_ID) {
      return;
    }

    await dispatch(getEggDetail({ tokenId: selectedNFT_ID.tokenId }));
  }, [dispatch, selectedNFT_ID]);

  const onStakeHandler = useCallback(async () => {
    if (!user?.activeKey) {
      dispatch(showConnectCSModal());
      return;
    }

    try {
      if (!currValidator) {
        throw new Error('Invalid validator selected');
      }

      if (!selectedNFT_ID) {
        throw new Error('Invalid NFT selected');
      }

      setHatchLoading(true);
      const preparingFormData = {
        fee,
        amount,
        minAmount,
        selectedValidator: currValidator,
        tokenSymbol: TOKEN_SYMBOL,
      };
      const validateResult = validate(preparingFormData);

      if (!isEmpty(validateResult)) {
        setFormErrors(validateResult);
        return;
      }

      const stakeDetails = {
        fromAddress: user.activeKey,
        validator: currValidator.publicKey,
        amount: Big(amount ?? minAmount).toNumber(),
        fee,
        entryPoint,
      };

      const result: any = await dispatch(
        startEggHatchingProcess({
          tokenId: selectedNFT_ID.tokenId,
          hatch,
          hatchDetails: {
            ...stakeDetails,
          },
        }),
      ).unwrap();
      console.log(`🚀 ~ onStakeHandler ~ result:`, result);

      if (result) {
        setHatchingStatus(true);
        setHatchingResultOpen(true);

        /**
         * Only reload NFT detail if NFT detail is previously openned
         */
        if (isOpeningNFTDetailModal) {
          onGetEggDetail();
        }
      }
    } catch (err: any) {
      toast.warn(messages.hatchFailed.defaultMessage, {
        ...sharedToastProps,
        autoClose: true,
      });
      console.error(`onStakeHandler::error `, err.message);
    } finally {
      setHatchLoading(false);
    }
  }, [
    amount,
    currValidator,
    dispatch,
    entryPoint,
    fee,
    hatch,
    isOpeningNFTDetailModal,
    minAmount,
    onGetEggDetail,
    selectedNFT_ID,
    user,
    validate,
  ]);

  useEffect(() => {
    if (!open && selectedNFT_ID) {
      dispatch(eggHatchingSelectActions.selectNFT(null));
    }
  }, [dispatch, open, selectedNFT_ID]);

  useEffect(() => {
    if (!open) {
      setAmount(undefined);
      formErrors && setFormErrors(undefined);
    }
  }, [formErrors, open]);

  useEffect(() => {
    onGetEggDetail();
  }, [onGetEggDetail, selectedNFT_ID]);

  /**
   * Reselect default validator after User has clicked Start Incubating
   * from validator card
   */
  useEffect(() => {
    if (defaultValidatorValue) {
      const result = validators.find(
        (option) => option.publicKey === defaultValidatorValue,
      );
      if (result) {
        onSelectValidator({
          ...result,
          label: result.name,
          value: result.publicKey,
        });
      }
    }
  }, [defaultValidatorValue, onSelectValidator, validators]);

  if (!open || !selectedNFT_ID) {
    return null;
  }

  return (
    <GModal show={open} className={'egg-hatching--modal'} onHide={onClose}>
      {loading && (
        <div className="egg-hatching--overlay">
          <LoadingBox />
        </div>
      )}
      <AccountMiniHeader />
      <div>
        <NFTUniqueStrength
          skipText
          forHatching
          backgroundElement={classNFT?.value ?? ''}
          renderMedia={
            <NFTMedia
              isDetailView
              className="for--hatching"
              nftType={nftType}
              media={nftType === NFTTypeEnum.EGG ? token_uri : image}
              description={nftType === NFTTypeEnum.EGG ? '' : description.value}
            />
          }
        />
      </div>
      <Container className="p-0">
        <Row className="row--validator">
          <Form.Group as={Col} xs={12} className="ginput-group mb-3">
            <GValidatorSelect
              isDisabled={shouldDisableValidatorSelect}
              defaultValue={defaultValidatorValue}
              onChange={onSelectValidator}
            />
          </Form.Group>
          {shouldDisableValidatorSelect && <HelperHatch />}
        </Row>
        <Row className="row--amount">
          <Form.Group as={Col} xs={12} className="ginput-group mb-3">
            <Form.Label>Staking amount</Form.Label>
            <GTokenInput
              className={cn({
                'is-invalid': formErrors?.amount || formErrors?.balance,
              })}
              value={amount}
              onInputChange={onChangeTokenAmount}
              formErrors={formErrors}
              placeholder={`Minimum amount is ${minAmount} VIC`}
              min={minAmount}
            />
          </Form.Group>
        </Row>
      </Container>
      <div className="panel inside egg-hatching-panel">
        {shouldDisableValidatorSelect && (
          <div className="egg-hatching-panel--box">
            <Heading h={4} className="fullwidth">
              Incubation Information
            </Heading>
            <BoxInfo
              label="Status"
              value={dataDetail?.egg.status}
              isHorizontal={false}
            />
            <BoxInfo
              label="Incubating amount"
              value={`${formatViction(dataDetail?.egg?.stakedAmount ?? 0)} VIC`}
              isHorizontal={false}
            />
            <BoxInfo
              label="Accumulated SNC"
              value={`${dataDetail?.egg?.accumulatedSnc ?? 0} SNC`}
              isHorizontal={false}
            />
            <BoxInfo
              label="Egg Level"
              value={`${level?.value ?? ''}`}
              isHorizontal={false}
            />
          </div>
        )}
        <div className="egg-hatching-panel--box">
          <Heading h={4} className="fullwidth">
            Transaction Information
          </Heading>
          <BoxInfo label="Network" value={`Viction`} isHorizontal={false} />
          <BoxInfo
            label="Network Fee"
            value={`${fee} VIC`}
            isHorizontal={false}
          />
          <BoxInfo
            label="Minimum amount"
            value={`${minAmount} VIC`}
            isHorizontal={false}
          />
        </div>
      </div>
      <Button
        disabled={shouldDisableHatchButton || isDeploying}
        className="btn--hatch-selecting-modal"
        type="button"
        size="small"
        onClick={onStakeHandler}
        btnStyle="5"
      >
        {commonMessages.labelDelegate.defaultMessage}
      </Button>
      <EggHatchStatusModal
        open={onHatchingResultOpen}
        onClose={onCloseStatusModal}
        isSuccess={isHatchingSuccess}
      />
    </GModal>
  );
};

export default EggHatchSelectingModal;
