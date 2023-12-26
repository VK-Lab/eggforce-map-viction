import { createSlice } from '@reduxjs/toolkit';
import type { ValidatorType } from '@/types/validator'; 

interface IValidatorsModule {
  validators: ValidatorType[];
  loading?: boolean;
}

const initialState: IValidatorsModule = {
  validators: [],
  loading: false
};

const validatorsModuleThunk = createSlice({
  name: 'validatorsModule',
  initialState,
  reducers: {
    setLoading: (state: IValidatorsModule, action) => {
      state.loading = action.payload;
    },
    bindData: (state: IValidatorsModule, action) => {
      state.validators = action.payload;
    },
  },
});

const validatorssStoreActions = {
  ...validatorsModuleThunk.actions,
};

export { validatorssStoreActions };

export default validatorsModuleThunk.reducer;
