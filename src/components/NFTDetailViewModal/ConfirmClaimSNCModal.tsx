import { useMemo, useCallback } from 'react';
import cn from 'classnames';
import Balancer from 'react-wrap-balancer';
import { ArrowDownShort } from 'react-bootstrap-icons';
import { Form as FinalForm, Field } from 'react-final-form';
import GModal from '@/components/GModal';
import Button from '@/components/GButton';
import Big from 'big.js';
import useSiteConfigurations from '@/hooks/useSiteConfigurations';
import NetworkFeePanel from '@/components/NetworkFeePanel';
import { Heading } from '@/components/Typography';
import GSNCTokenInput from '@/components/GSNCTokenInput';
import {
  mustBeSmallerThan,
  mustBeGreaterThan,
  composeValidators,
  required,
} from '@/services/reactFinalFormServices';
import useCurrentUser from '@/hooks/useCurrentUser';
import GXPTokenInput from '@/components/GXPTokenInput';
import { formatViction } from '@/helpers/balance';

interface SNCClaimingFormSpec {
  sncAmount: string;
}

const ConfirmClaimSNCModal = ({
  open,
  onHide,
  onConfirm,
  disableConfirm = false,
}: any) => {
  const user = useCurrentUser();
  const siteConfigs = useSiteConfigurations();
  const exchangeRate = siteConfigs.SNC_TO_XP_RATIO ?? 1;
  const maxSNCValue = useMemo(() => {
    try {
      if (user === undefined || user.totalSnc === undefined) {
        return 0;
      }
      const currentSNC = BigInt(user.totalSnc);
      const pendingSNC = BigInt(user.pendingSnc ?? 0);
      const maxSNC = currentSNC - pendingSNC;
      return parseFloat(formatViction(maxSNC)); //currentSNC.minus(pendingSNC).toNumber();
    } catch (error: any) {
      return 0;
    }
  }, [user]);
  const initValues = useMemo(
    () => ({
      sncAmount: '',
    }),
    [],
  );

  const onSubmit = useCallback(
    (values: SNCClaimingFormSpec) => {
      const sncAmount = Big(values.sncAmount);
      onConfirm(sncAmount.toNumber());
    },
    [onConfirm],
  );

  if (!open) {
    return null;
  }

  return (
    <GModal
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      show={open}
      className={`compact-modal snc-swapping-modal`}
      disabledClose={disableConfirm}
    >
      <div className="snc-swapper--header mb-3">
        <Heading h={3} className={cn('text-center mb-0 primary-heading')}>
          SNC Swapping
        </Heading>
        <div className="helper-wrapper">
          <p className="helper">
            <Balancer ratio={0.125}>
              Swaping existing SNC token to your wallet account.
            </Balancer>
          </p>
        </div>
      </div>
      <FinalForm
        onHide={onHide}
        onSubmit={onSubmit}
        initialValues={initValues}
        render={(props) => {
          const { handleSubmit } = props;

          return (
            <form onSubmit={handleSubmit}>
              <div className="compact-modal--box success">
                <div className="body">
                  <Field
                    name="sncAmount"
                    validate={composeValidators(
                      required,
                      mustBeGreaterThan(0),
                      mustBeSmallerThan(maxSNCValue),
                    )}
                  >
                    {(props) => {
                      const {
                        meta,
                        input: { value, onChange },
                      } = props;
                      const valueXP = value
                        ? Big(value).mul(exchangeRate).toNumber()
                        : 0;
                      return (
                        <div>
                          <GSNCTokenInput
                            maxValue={maxSNCValue}
                            meta={meta}
                            value={value}
                            onChange={onChange}
                            placeholder="Enter SNC"
                            useMaxButton={maxSNCValue > 0}
                          />
                          <div className="token--arrow-between">
                            <ArrowDownShort />
                          </div>
                          <GXPTokenInput value={valueXP} />
                        </div>
                      );
                    }}
                  </Field>
                </div>
                <div className="compact-modal--network-fee-wrapper">
                  <NetworkFeePanel fee={siteConfigs.UPDATE_METADATA_FEE!} />
                </div>
                <div className="actions">
                  <Button
                    className="small"
                    type="submit"
                    disabled={disableConfirm}
                    btnStyle="6"
                    size="small"
                  >
                    Swap
                  </Button>
                </div>
              </div>
            </form>
          );
        }}
      />
    </GModal>
  );
};

export default ConfirmClaimSNCModal;
