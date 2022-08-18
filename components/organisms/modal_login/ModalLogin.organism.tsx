import { Modal } from 'components/atoms';
import { Login } from 'components/molecules';
import { MouseEventHandler } from 'react';

interface IProps {
  isOpen: boolean;
  onClose?: () => void;
  onClickLogin?: MouseEventHandler<HTMLButtonElement>;
  onChangeName?: React.ChangeEventHandler<HTMLInputElement>;
  onChangePhoneNumber?: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
  textErrorName?: string;
  phoneNumber?: string;
  textErrorPhone?: string;
}

const ModalLogin: React.FC<IProps> = ({
  isOpen,
  onClose,
  onClickLogin,
  name,
  onChangeName,
  onChangePhoneNumber,
  phoneNumber,
  textErrorName,
  textErrorPhone,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Login
        onClose={onClose}
        onClickLogin={onClickLogin}
        onChangeName={onChangeName}
        name={name}
        onChangePhoneNumber={onChangePhoneNumber}
        phoneNumber={phoneNumber}
        textErrorName={textErrorName}
        textErrorPhone={textErrorPhone}
      />
    </Modal>
  );
};

export default ModalLogin;
