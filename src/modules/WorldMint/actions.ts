import { createAsyncThunk } from '@reduxjs/toolkit';
import { axios } from '@/services/axios';
import API from '@/constants/api';

export const purchasePackage = createAsyncThunk(
  'packagesDetailStore/purchasePackage',
  async (dataPackage: any) => {
    const { data } = await axios.post(API.purchasePackage, dataPackage);

    if (!data) {
      return;
    }

    return data;
  },
);