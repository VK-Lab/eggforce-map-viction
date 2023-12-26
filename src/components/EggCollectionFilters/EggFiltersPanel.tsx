import React, { useCallback, useMemo } from 'react';
import { Form, Field } from 'react-final-form';
import { selectNFTCollectionModal } from '@/modules/EggCollection/selectors';
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from '@/app/hooks';
import { selectNFTCollectionsFiltersState } from '@/modules/EggCollection/selectors';
import { NFTCollectionModalActions } from '@/modules/EggCollection/store';
import { Heading } from '@/components/Typography';
import { InputRadioField } from '@/components/GInputRadio';
import { NFTTypeEnum } from '@/types/NFTItem';

const EggFiltersPanel = () => {
  const dispatch = useDispatch();
  const nftFiltersModal = useSelector(selectNFTCollectionsFiltersState);
  const nftCollectionModalState = useSelector(selectNFTCollectionModal);
  const { viewMode } = nftCollectionModalState;
  const { configs } = nftFiltersModal;

  const elementalOptions = useMemo(() => {
    return [
      {
        value: 'all',
        label: 'All Types',
      },
      {
        value: 'Water',
        label: 'Water',
      },
      {
        value: 'Fire',
        label: 'Fire',
      },
      {
        value: 'Wood',
        label: 'Wood',
      },
      {
        value: 'Earth',
        label: 'Earth',
      },
      {
        value: 'Metal',
        label: 'Metal',
      },
    ];
  }, []);

  const eggHatchingStatus = useMemo(() => {
    return [
      {
        value: 'all',
        label: 'All Statuses',
      },
      {
        value: 'minting',
        label: 'Minting',
      },
      {
        value: 'minted',
        label: 'Minted',
      },
      {
        value: 'incubating',
        label: 'Incubating',
      },
      {
        value: 'stopped',
        label: 'Stopped',
      },
      {
        value: 'failed',
        label: 'Failed',
      },
    ];
  }, []);

  const onSubmit = useCallback(
    (values: any) => {
      dispatch(NFTCollectionModalActions.setFiltersConfigs(values));
    },
    [dispatch],
  );

  const onRadioChanged = useCallback(
    ({ value, name }: { value: string; name: string }) => {
      dispatch(
        NFTCollectionModalActions.setFiltersConfigs({
          ...configs,
          [name]: value,
        }),
      );
    },
    [configs, dispatch],
  );

  return (
    <div>
      <Heading className="primary--heading" h={4}>
        NFTs Filters
      </Heading>
      <div className="form-filters--wrapper">
        <Form onSubmit={onSubmit} initialValues={configs}>
          {(props) => {
            return (
              <form onSubmit={props.handleSubmit}>
                <div className="egg-collection-filters--wrapper">
                  <div className="filters--block filters--element">
                    <Heading h={5}>Element Types</Heading>
                    <div className="filters-data">
                      {elementalOptions.map((item) => (
                        <Field
                          name="element"
                          type="radio"
                          key={`element-type--${item.value}`}
                          component={InputRadioField}
                          label={item.label}
                          value={item.value}
                          onRadioChanged={onRadioChanged}
                          isButtonLike
                        />
                      ))}
                    </div>
                  </div>
                  {viewMode === NFTTypeEnum.EGG && (
                    <React.Fragment>
                      <div className="filters--block filters--hatch-status">
                        <Heading h={5}>Incubation Status</Heading>
                        <div className="filters-data">
                          {eggHatchingStatus.map((item) => (
                            <Field
                              name="hatchStatus"
                              type="radio"
                              key={`egg-hatch-status--${item.value}`}
                              component={InputRadioField}
                              label={item.label}
                              value={item.value}
                              onRadioChanged={onRadioChanged}
                              isButtonLike
                            />
                          ))}
                        </div>
                      </div>
                    </React.Fragment>
                  )}
                </div>
              </form>
            );
          }}
        </Form>
      </div>
    </div>
  );
};

export default EggFiltersPanel;
