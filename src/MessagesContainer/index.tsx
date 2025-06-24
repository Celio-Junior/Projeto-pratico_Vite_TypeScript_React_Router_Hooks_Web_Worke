import { JSX, ReactNode } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';

type MessagesContainerProps = {
  children: ReactNode;
};
export default function MessagesContainer({ children }: MessagesContainerProps): JSX.Element {
  return (
    <>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}
