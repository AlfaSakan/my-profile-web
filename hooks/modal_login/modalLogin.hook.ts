import { useState } from 'react';

const useModalLoginHook = () => {
  const [openLogin, setOpenLogin] = useState(true);

  const onCloseModal = () => setOpenLogin(false);
  const onOpenModal = () => setOpenLogin(true);

  return {
    openLogin,
    onCloseModal,
    onOpenModal,
  };
};

export default useModalLoginHook;
