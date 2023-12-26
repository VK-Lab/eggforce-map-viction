import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { IModal } from '@/types/modal';

interface ledgerAccountsModal extends IModal {
  data: Array<string>;
  activeAccountIndex: string | null;
}
interface CasperWalletModuleSpec {
  unconnectedModal: IModal;
  ledgerAccountsModal: ledgerAccountsModal;
}

const initialState: CasperWalletModuleSpec = {
  unconnectedModal: {
    open: false,
    loading: false,
  },
  ledgerAccountsModal: {
    loading: false,
    open: false,
    data: [],
    activeAccountIndex: null,
  },
};

const connectCSWalletThunk = createSlice({
  name: 'connectCasperSignerModal',
  initialState,
  reducers: {
    show: (state: CasperWalletModuleSpec) => {
      state.unconnectedModal.open = true;
    },
    hide: (state: CasperWalletModuleSpec) => {
      state.unconnectedModal.open = false;
    },
    showLedgerAccountsModal: (state: CasperWalletModuleSpec) => {
      state.ledgerAccountsModal.open = true;
    },
    hideLedgerAccountsModal: (state: CasperWalletModuleSpec) => {
      state.ledgerAccountsModal.open = false;
    },
    setLedgerAccounts: (state: CasperWalletModuleSpec, action) => {
      state.ledgerAccountsModal.data = action.payload;
    },
    setLedgerAccountsLoading: (state: CasperWalletModuleSpec, action) => {
      state.ledgerAccountsModal.loading = action.payload;
    },
    saveSelectedLedgerAccount: (
      state: CasperWalletModuleSpec,
      action: PayloadAction<string>,
    ) => {
      state.ledgerAccountsModal.activeAccountIndex = action.payload;
    },
  },
});

const { show, hide } = connectCSWalletThunk.actions;
const connectWalletActions = {
  ...connectCSWalletThunk.actions,
};

export {
  connectWalletActions,
  show as showConnectCSModal,
  hide as hideConnectCSModal,
};

export default connectCSWalletThunk.reducer;
