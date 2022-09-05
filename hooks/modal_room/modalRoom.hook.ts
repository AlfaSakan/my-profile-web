import { useState } from 'react';
import useChatRoomApi from 'services/chat_room/chatRoom.service';

interface ChatRoomParams {
  name: string;
  participants: string[];
  description: string;
}

type ChatRoomKey = 'name' | 'description';

const useModalRoomHook = () => {
  const [modalChatRoom, setModalChatRoom] = useState(false);
  const [chatRoomField, setChatRoomField] = useState<ChatRoomParams>({
    name: '',
    participants: [],
    description: '',
  });

  const { postChatRoomService } = useChatRoomApi();

  const closeModalChatRoom = () => setModalChatRoom(false);

  const openModalChatRoom = () => setModalChatRoom(true);

  const chatRoomHandler = (field: ChatRoomKey) => (value: string) =>
    setChatRoomField((prev) => ({ ...prev, [field]: value }));

  const createChatRoom = async () => {
    try {
      await postChatRoomService({
        name: chatRoomField.name,
        description: chatRoomField.description,
        participants_id: chatRoomField.participants,
      });

      setChatRoomField({ description: '', name: '', participants: [] });
    } catch (error) {
      console.log('ERROR CREATE CHAT ROOM', error);
    }
  };

  const checkboxHandler = (checked: boolean, value: string) => {
    const dataSet = new Set([...chatRoomField.participants, value]);

    if (!checked) {
      dataSet.delete(value);
    }

    const dataArr = Array.from(dataSet);

    setChatRoomField((prev) => ({ ...prev, participants: [...dataArr] }));
  };

  return {
    modalChatRoom,
    closeModalChatRoom,
    openModalChatRoom,
    chatRoomField,
    chatRoomHandler,
    createChatRoom,
    checkboxHandler,
  };
};

export default useModalRoomHook;
