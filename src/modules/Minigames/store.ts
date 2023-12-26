import { createSlice } from '@reduxjs/toolkit';

interface IModal {
  loading: boolean;
  open: boolean;
  currentGame?: string
}

const initialState: IModal = {
  loading: false,
  open: false,
  currentGame: undefined
};

const MinigamesModal = createSlice({
  name: 'MinigamesModal',
  initialState,
  reducers: {
    setLoading: (state: IModal, action) => {
      state.loading = action.payload;
    },
    showModal: (state: IModal) => {
      state.open = true;
    },
    hideModal: (state: IModal) => {
      state.open = false;
    },
    selectGame: (state: IModal, action) => {
      state.currentGame = action.payload;
      state.open = true;
    },
    deselectGame:(state: IModal) => {
      state.currentGame = undefined;
    },
  },
});

const { selectGame, deselectGame,setLoading, showModal, hideModal } = MinigamesModal.actions;

const MinigamesModalActions = {
  setLoading,
  showModal,
  hideModal,
  selectGame,
  deselectGame
};

export { MinigamesModalActions};
export default MinigamesModal.reducer;
