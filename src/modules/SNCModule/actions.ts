import { createAsyncThunk } from '@reduxjs/toolkit';
import { axios } from '@/services/axios';
import API from '@/constants/api';

export const registerSNCAirdrop = createAsyncThunk(
  'SNCModule/registerSNCAirdrop',
  async (formValues: any) => {
    const apiParams = {
      email: formValues.email,
      publicKey: formValues.walletAddress,
      idDiscord: formValues?.idDiscord,
      idTelegram: formValues?.idTelegram,
      selectedPackage: 'custom',
    };
    const { data } = await axios.post(API.registerSNCAirdrop, {
      ...apiParams,
    });

    if (!data) {
      return;
    }

    return data;
    // return {
    //   result: true,
    //   code: 'DUC-123',
    // };
  },
);
