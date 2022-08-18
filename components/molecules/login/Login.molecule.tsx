import CloseIcon from '@material-ui/icons/Close';
import { Button, Input, TextError } from 'components/atoms';
import { MouseEventHandler } from 'react';

interface IProps {
  onClose?: () => void;
  onClickLogin?: MouseEventHandler<HTMLButtonElement>;
  onChangeName?: React.ChangeEventHandler<HTMLInputElement>;
  onChangePhoneNumber?: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
  textErrorName?: string;
  phoneNumber?: string;
  textErrorPhone?: string;
}

const Login: React.FC<IProps> = ({
  onClose,
  onClickLogin,
  onChangeName,
  onChangePhoneNumber,
  name,
  phoneNumber,
  textErrorPhone,
  textErrorName,
}) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-1/2 h-1/2 rounded-2xl flex flex-col overflow-hidden bg-white"
    >
      <div className="flex items-center justify-between px-8 py-4 bg-secondary">
        <p>Login / Register</p>
        <div onClick={onClose} className="cursor-pointer">
          <CloseIcon />
        </div>
      </div>
      <div className="flex flex-1 flex-col px-8 py-4 border-y gap-8">
        <div>
          <p>Nama</p>
          <Input
            className="border py-3 mt-2"
            onChange={onChangeName}
            value={name}
          />
          {textErrorName && <TextError errorMessage={textErrorName} />}
        </div>
        <div>
          <p>Nomor Handphone</p>
          <Input
            className="border py-3 mt-2"
            onChange={onChangePhoneNumber}
            value={phoneNumber}
          />
          {textErrorPhone && <TextError errorMessage={textErrorPhone} />}
        </div>
      </div>
      <div className="flex items-center justify-end px-8 py-4">
        <Button onClick={onClickLogin} text="Login" />
      </div>
    </div>
  );
};

export default Login;
