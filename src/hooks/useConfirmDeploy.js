import { useState } from 'react';

//This hook is using for toasting message during deploy progress
const useConfirmDeploy = () => {
  const [isDeploying] = useState(false);
  const [isError] = useState(false);

  return { isDeploying, isError };
};

export default useConfirmDeploy;
