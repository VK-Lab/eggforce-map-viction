import { createAsyncThunk } from '@reduxjs/toolkit';
import { axios } from '@/services/axios';
import API from '@/constants/api';

export const putDeploy = createAsyncThunk(
  'wallet/putDeploy',
  async (signedDeploy: string) => {
    const { data } = await axios.post(API.deploy, signedDeploy);

    if (!data) {
      return;
    }

    return data;
  },
);
