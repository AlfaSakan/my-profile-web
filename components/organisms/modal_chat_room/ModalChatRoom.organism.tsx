import { Modal } from 'components/atoms';
import { ChatRoom } from 'components/molecules';
import { Participant } from 'models/participant/participant.model';

interface Props {
  isOpen: boolean;
  onClose(): void;
  onChangeName(_: string): void;
  nameVal: string;
  onClickSubmit(): void;
  descVal: string;
  onChangeDescription(_: string): void;
  users?: Participant[];
  onChangeBox?(_: boolean, _value: string): void;
  addedUsers?: string[];
  userId?: string;
}

const ModalChatRoom: React.FC<Props> = ({
  isOpen,
  onClose,
  onChangeName,
  nameVal,
  onClickSubmit,
  descVal,
  onChangeDescription,
  onChangeBox,
  users,
  addedUsers,
  userId,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ChatRoom
        onClose={onClose}
        onChangeName={onChangeName}
        nameVal={nameVal}
        onClickSubmit={onClickSubmit}
        descVal={descVal}
        onChangeDescription={onChangeDescription}
        onChangeBox={onChangeBox}
        users={users}
        addedUsers={addedUsers}
        userId={userId}
      />
    </Modal>
  );
};

export default ModalChatRoom;
