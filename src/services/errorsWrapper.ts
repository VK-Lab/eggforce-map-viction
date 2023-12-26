import { toast } from 'react-toastify';

const executeErrorMessage = (error: any) => {
  let errorMessage = error.message;

  if (error?.response?.status === 400 && error?.response?.data?.message) {
    errorMessage = error.response?.data?.message;
  }
  console.error(`🚀 ~ error:`, errorMessage);
  toast.error(errorMessage, {
    isLoading: false,
    autoClose: 5000,
  });
};

export { executeErrorMessage };
