import CloseIcon from '@material-ui/icons/Close';
import { Button, Text } from 'components/atoms';
import { Participant } from 'models/participant/participant.model';
import { useState } from 'react';
import Dropdown from '../dropdown/Dropdown.molecule';
import InputField from '../input_field/InputField.molecule';

interface Props {
  onClose?(): void;
  onChangeName(_: string): void;
  nameVal: string;
  chatRoomError?: string;
  onClickSubmit?(): void;
  onChangeDescription(_: string): void;
  descVal: string;
  descError?: string;
  users?: Participant[];
  onChangeBox?(_: boolean, _value: string): void;
  addedUsers?: string[];
  userId?: string;
}

const ChatRoom: React.FC<Props> = ({
  onClose,
  onChangeName,
  nameVal,
  chatRoomError,
  onClickSubmit,
  onChangeDescription,
  descVal,
  descError,
  users = [
    {
      name: 'Dummy',
      user_id: '123123123',
    },
    {
      name: 'Dummy2',
      user_id: '123123',
    },
  ],
  onChangeBox = () => {},
  addedUsers = [],
  userId,
}) => {
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = (value: boolean) => setDropdown(value);

  return (
    <div
      className="bg-primary flex flex-col md:w-1/2 md:mx-0 h-1/2 rounded-2xl w-full mx-10"
      onClick={(e) => {
        toggleDropdown(false);
        e.stopPropagation();
      }}
    >
      <div className="flex items-center justify-between px-8 py-4 bg-secondary rounded-t-2xl">
        <Text.body1>Buat Chat Room Baru</Text.body1>
        <div onClick={onClose} className="cursor-pointer">
          <CloseIcon />
        </div>
      </div>
      <div className="flex flex-1 flex-col px-8 py-4 border-y justify-between">
        <InputField
          label="Nama Chat Room"
          onChange={onChangeName}
          value={nameVal}
          textError={chatRoomError}
        />
        <InputField
          label="Deskripsi"
          onChange={onChangeDescription}
          value={descVal}
          textError={descError}
        />
        <div className="flex flex-col relative">
          <Text.body1>Anggota</Text.body1>
          <div
            className="border py-3 px-4 bg-white rounded-md flex gap-2 items-center cursor-pointer h-12 mt-2"
            onClick={(e) => {
              toggleDropdown(!dropdown);
              e.stopPropagation();
            }}
          >
            {users.map((user) => {
              if (!addedUsers.includes(user.user_id)) return;

              return (
                <div
                  key={`${user.user_id} added`}
                  className={`flex items-center border px-1 rounded-md border-secondaryDark`}
                >
                  <div
                    className="cursor-pointer"
                    onClick={(e) => {
                      onChangeBox(false, user.user_id);
                      e.stopPropagation();
                    }}
                  >
                    <CloseIcon style={{ fontSize: 14 }} />
                  </div>
                  <Text.body1>{user.name}</Text.body1>
                </div>
              );
            })}
          </div>
          {dropdown && (
            <Dropdown
              datas={users}
              onChangeBox={onChangeBox}
              addedUsers={addedUsers}
              userId={userId}
            />
          )}
        </div>
      </div>
      <div className="flex items-center justify-end px-8 py-4">
        <Button onClick={onClickSubmit} text="Login" />
      </div>
    </div>
  );
};

export default ChatRoom;
