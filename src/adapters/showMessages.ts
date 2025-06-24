import { toast } from 'react-toastify';
import { Dialog } from '../components/Dialog';
export const showMessage = {
  sucess: (msg: string) => toast.success(msg, { toastId: crypto.randomUUID() }),
  error: (msg: string) => toast.error(msg, { toastId: crypto.randomUUID() }),
  warn: (msg: string) => toast.warn(msg, { toastId: crypto.randomUUID() }),
  warning: (msg: string) => toast.warning(msg, { toastId: crypto.randomUUID() }),
  info: (msg: string) => toast.info(msg, { toastId: crypto.randomUUID() }),
  dismiss: () => toast.dismiss(),
  confirm: (data: string, onClosing: (confirmation: boolean) => void) => {
    return toast(Dialog, {
      data: data,
      toastId: 'reset',
      draggable: false,
      autoClose: false,
      closeButton: false,
      closeOnClick: false,
      onClose: (confirmation) => {
        if (confirmation) return onClosing(true);
        return onClosing(false);
      },
    });
  },
};
