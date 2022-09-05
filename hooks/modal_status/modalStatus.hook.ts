import { useState } from 'react';

const useModalStatusHook = () => {
  const [errorModalMessage, setErrorModalMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [openModalStatus, setOpenModalStatus] = useState(false);

  const onCloseModalStatus = () => setOpenModalStatus(false);

  const onOpenModalStatus = () => setOpenModalStatus(true);

  return {
    errorModalMessage,
    setErrorModalMessage,
    isError,
    setIsError,
    openModalStatus,
    onCloseModalStatus,
    onOpenModalStatus,
  };
};

export default useModalStatusHook;
