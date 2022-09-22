import { Button, Input, Text, TextError } from 'components/atoms';
import { MouseEventHandler } from 'react';

interface IProps {
  onClickLogin?: MouseEventHandler<HTMLButtonElement>;
  onChangeName?: React.ChangeEventHandler<HTMLInputElement>;
  onChangePhoneNumber?: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
  textErrorName?: string;
  phoneNumber?: string;
  textErrorPhone?: string;
}

const Login: React.FC<IProps> = ({
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
      className="md:w-1/2 md:mx-0 h-1/2 w-full mx-10 rounded-2xl flex flex-col overflow-hidden bg-white"
    >
      <div className="flex items-center justify-between px-8 py-4 bg-secondary">
        <Text.body1>Login / Register</Text.body1>
      </div>
      <div className="flex flex-1 flex-col px-8 py-4 border-y gap-8">
        <div>
          <Text.body1>Nama</Text.body1>
          <Input
            className="border py-3 mt-2"
            onChange={onChangeName}
            value={name}
          />
          {textErrorName && <TextError errorMessage={textErrorName} />}
        </div>
        <div>
          <Text.body1>Nomor Handphone</Text.body1>
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
