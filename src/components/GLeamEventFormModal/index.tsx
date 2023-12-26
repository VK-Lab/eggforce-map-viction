import { useEffect, useCallback, useState } from 'react';
import cn from 'classnames';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'lodash/isEmpty';
import useDevice from '@/hooks/useDevice';
import useCurrentUser from '@/hooks/useCurrentUser';
import GModal from '@/components/GModal';
import Button from '@/components/GButton';
import { useAppDispatch as useDispatch } from '@/app/hooks';
import { Heading } from '@/components/Typography';
import GInput from '@/components/GInput';
import { purchasePackage } from '@/modules/WorldMint/actions';
import LoadingBox from '@/components/LoadingBox';
import { toast } from '@/services/toast';
import { InfoCircle } from 'react-bootstrap-icons';
interface IProps {
  open?: boolean;
  className?: string;
  onClose: () => void;
  onConfirm: () => void;
  skipToastOnConfirm?: boolean;
}

const GLeamEventFormModal = (props: IProps) => {
  const user = useCurrentUser();
  const dispatch = useDispatch();
  const isDevice = useDevice();
  const { onConfirm, onClose, open, skipToastOnConfirm = false } = props;

  const [fieldWalletValue, setFieldWallet] = useState<string>('');
  const [fieldEmailValue, setFieldEmail] = useState<string>('');
  const [fieldDiscordIdValue, setFieldDiscord] = useState<string>('');
  const [fieldTelegramValue, setFieldTelegram] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<undefined | any>(undefined);

  const onUseCurrentUserPublicKey = useCallback(() => {
    if (!user) {
      return;
    }

    // Need to store as separate variable to prevent value reference
    const key = user.activeKey;
    setFieldWallet(key);
    setFormErrors((prev: any) => ({
      ...prev,
      publicKey: '',
    }));
  }, [user]);
  const validate = useCallback(() => {
    let error: any = {};

    if (!isEmail(fieldEmailValue)) {
      error['email'] = 'Please enter valid email address';
    }

    return error;
  }, [fieldEmailValue]);
  const onConfirmHandler = useCallback(async () => {
    try {
      const postData = {
        publicKey: fieldWalletValue,
        email: fieldEmailValue,
        idDiscord: fieldDiscordIdValue,
        idTelegram: fieldTelegramValue,
        selectedPackage: 'custom',
      };
      const result = validate();

      if (isEmpty(result)) {
        setLoading(true);
        const serverResult = await dispatch(purchasePackage(postData)).unwrap();
        if (serverResult?.result === false) {
          throw new Error('Something went wrong');
        }
        if (serverResult?.result === true) {
          // @ts-ignore: TODO twq is injected from tag manager.
          twq('event', 'tw-oeheh-oeht1', {
            value: fieldWalletValue,
            status: 'subscribed',
            email_address: fieldEmailValue,
          });
          setTimeout(() => {
            onConfirm();

            if (!skipToastOnConfirm) {
              toast.success(
                `Successfully sent data. Selvynn has been notified, you can safely close this.`,
                {
                  toastId: `form--ad-hoc`,
                },
              );
            }
            setLoading(false);
          }, 1500);
        }
      } else {
        setFormErrors(result);
      }
    } catch (error: any) {
      console.log(`🚀 ~ onConfirmHandler ~ error`, error.message);
      onConfirm();
    }
  }, [
    fieldWalletValue,
    fieldEmailValue,
    fieldDiscordIdValue,
    fieldTelegramValue,
    validate,
    dispatch,
    onConfirm,
    skipToastOnConfirm,
  ]);
  const onFieldChangeHandler = useCallback(
    (fieldName: string, value: string, setter: (value: string) => void) => {
      setter(value);

      if (formErrors && formErrors[fieldName]) {
        setFormErrors((prev: any) => ({
          ...prev,
          [fieldName]: '',
        }));
      }
    },
    [formErrors],
  );

  useEffect(() => {
    if (open === false) {
      setFieldWallet('');
      setFieldEmail('');
      setFieldDiscord('');
      setFieldTelegram('');
      setFormErrors(undefined);
    }
  }, [open]);

  return (
    <GModal
      show={open}
      className={cn('purchase-custom-pack', {
        'is-mobile': isDevice,
        'is-loading': loading,
      })}
      onHide={onClose}
    >
      {loading && (
        <div className="purchase-custom-pack--overlay">
          <LoadingBox />
        </div>
      )}
      <div className="purchase-review--root purchase-custom-pack--root">
        <Heading h={3} className="mb-3 primary-heading">
          Whitelist Registration
        </Heading>
        <Heading h={5} className="secondary-heading">
          Account Detail
        </Heading>
        <div className="buyer--detail">
          <Form>
            <Container className="p-0">
              <Row>
                <Form.Group as={Col} xs={12} className="ginput-group mb-3">
                  <Form.Label>Casper wallet Address</Form.Label>
                  <GInput
                    value={fieldWalletValue}
                    onChange={(e) =>
                      onFieldChangeHandler(
                        'publicKey',
                        e.target.value,
                        setFieldWallet,
                      )
                    }
                    type="text"
                    placeholder="Please enter your Casper wallet address"
                    className={cn({
                      'is-invalid': formErrors?.publicKey,
                    })}
                    required
                  />
                  {formErrors?.publicKey && (
                    <Form.Control.Feedback type="invalid">
                      {formErrors.publicKey}
                    </Form.Control.Feedback>
                  )}
                  <div className="helper-field--wrapper">
                    <div className="helper-wrapper">
                      <p className="helper">
                        <InfoCircle className="icon--helper" />
                        The Whitelist will be sent to your Casper wallet address
                      </p>
                    </div>
                    {!isDevice && user && (
                      <div className="use-current-key--wrapper">
                        <Button
                          type="button"
                          ignoreShadowStyle
                          size="small"
                          onClick={onUseCurrentUserPublicKey}
                          className="use-current-key--button"
                        >
                          Use current key
                        </Button>
                      </div>
                    )}
                  </div>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} xs={12} className="ginput-group mb-3">
                  <Form.Label>Email (*)</Form.Label>
                  <GInput
                    value={fieldEmailValue}
                    onChange={(e) =>
                      onFieldChangeHandler(
                        'email',
                        e.target.value,
                        setFieldEmail,
                      )
                    }
                    type="text"
                    placeholder="Please enter your email"
                    className={cn({
                      'is-invalid': formErrors?.email,
                    })}
                    required
                  />
                  {formErrors?.email && (
                    <Form.Control.Feedback type="invalid">
                      {formErrors.email}
                    </Form.Control.Feedback>
                  )}
                  <div className="helper-wrapper" style={{ marginTop: 8 }}>
                    <p className="helper">
                      <InfoCircle className="icon--helper" />
                      Winner announcement will be sent via your email
                    </p>
                  </div>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  as={Col}
                  xs={12}
                  md="6"
                  className="ginput-group mb-3"
                >
                  <Form.Label>Discord Username (optional)</Form.Label>
                  <GInput
                    value={fieldDiscordIdValue}
                    onChange={(e) =>
                      onFieldChangeHandler(
                        'idDiscord',
                        e.target.value,
                        setFieldDiscord,
                      )
                    }
                    type="text"
                    placeholder="Discord Username"
                    className={cn({
                      'is-invalid': formErrors?.idDiscord,
                    })}
                  />
                  {formErrors?.idDiscord && (
                    <Form.Control.Feedback type="invalid">
                      {formErrors.idDiscord}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group
                  as={Col}
                  xs={12}
                  md="6"
                  className="ginput-group mb-3"
                >
                  <Form.Label>Telegram Id (optional)</Form.Label>
                  <GInput
                    value={fieldTelegramValue}
                    onChange={(e) =>
                      onFieldChangeHandler(
                        'idTelegram',
                        e.target.value,
                        setFieldTelegram,
                      )
                    }
                    type="text"
                    placeholder="Telegram Id"
                  />
                  {formErrors?.idTelegram && (
                    <Form.Control.Feedback type="invalid">
                      {formErrors.idTelegram}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Row>
            </Container>
          </Form>
        </div>
      </div>
      <div className="modal-footer--bottom">
        <Button
          fullWidth
          size="small"
          onClick={onConfirmHandler}
          btnStyle="1"
          style={{ textTransform: 'uppercase' }}
        >
          Send
        </Button>
      </div>
    </GModal>
  );
};

export default GLeamEventFormModal;
