import type { DefaultToastOptions } from 'react-hot-toast';

export const toastConfig: DefaultToastOptions = {
  className: '!bg-primary-100',
  error: {
    className: '!bg-error-light',
  },
};

export default toastConfig;
