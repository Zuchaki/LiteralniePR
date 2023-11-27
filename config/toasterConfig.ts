import type { DefaultToastOptions } from "react-hot-toast";

export const toastConfig: DefaultToastOptions = {
  className: "!bg-primary-100",
  error: {
    className: "!bg-secondary-100",
  },
};

export default toastConfig;
