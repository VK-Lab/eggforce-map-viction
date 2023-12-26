import { toast } from 'react-toastify';

const sharedToastProps: any = {
  position: 'bottom-left',
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
  className: 'eggForce-toast--container',
};

export { toast, sharedToastProps };
