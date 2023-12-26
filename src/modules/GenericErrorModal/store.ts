import { createSlice } from '@reduxjs/toolkit';
import React from 'react';

interface IModal {
  loading: boolean;
  open: boolean;
  title: string;
  body: string | React.ReactNode;
}

const initialState: IModal = {
  loading: false,
  open: false,
  title: "Oops! No worries, Selvyn is having a look.",
  body: undefined
};

const genericModalThunk = createSlice({
  name: 'genericModal',
  initialState,
  reducers: {
    setLoading: (state: IModal, action) => {
      state.loading = action.payload;
    },
    setModalState: (state: IModal, action) => {
      state.open = action.payload;
    },
    setTitle: (state: IModal, action) => {
      state.title = action.payload;
    },
    setBody: (state: IModal, action) => {
      state.body = action.payload;
    },
  },
});

const { setLoading, setModalState } = genericModalThunk.actions;
const genericModalActions = {
  ...genericModalThunk.actions
}
export {
  genericModalActions,
  setLoading as setGenericModalLoading,
  setModalState as setGenericModalState,
}

export default genericModalThunk.reducer;
