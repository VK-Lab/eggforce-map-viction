import { useSignMessage, useSignTypedData } from 'wagmi';

const useSigners = () => {
  const { signMessage, signMessageAsync } = useSignMessage();
  const { signTypedData: sign, signTypedDataAsync: signAsync } =
    useSignTypedData();

  return {
    signMessage,
    signMessageAsync,
    sign,
    signAsync,
  };
};

export default useSigners;
