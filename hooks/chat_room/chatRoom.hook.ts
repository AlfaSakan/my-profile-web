/* eslint-disable react-hooks/exhaustive-deps */
import { ChatRoom } from 'models/chat_room/chatRoom.model';
import { Message } from 'models/message/message.model';
import { User } from 'models/user/user.model';
import { useEffect, useMemo, useState } from 'react';
import { chatRoomService, participantService } from 'services';

const useChatRoomHook = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [choosenChatRoom, setChoosenChatRoom] = useState<ChatRoom>(
    {} as ChatRoom
  );
  const [participants, setParticipants] = useState<User[]>([]);

  const { getChatRoomService } = chatRoomService();
  const { getListParticipant } = participantService();

  const chatRoomHandler = async () => {
    try {
      const res = await getChatRoomService();
      if (!res) return;

      setChatRooms(res.data);
    } catch (error) {
      console.log('chat room handler =>', error);
    }
  };

  const onClickChatRoom = async (chatRoom: ChatRoom, userId: string) => {
    if (chatRoom.chat_room_id === choosenChatRoom?.chat_room_id) return;

    const res = await getListParticipant(chatRoom.chat_room_id);

    if (!res) return;

    const exceptUser = res.data.filter((part) => part.user_id !== userId);

    setParticipants(exceptUser);

    if (!chatRoom.messages) {
      chatRoom.messages = [];
    }

    setChoosenChatRoom(chatRoom);
  };

  const participantNames = useMemo(
    () =>
      participants.reduce(
        (prevVal, currVal) => currVal.name + ', ' + prevVal,
        ''
      ),
    [participants]
  );

  const addMessageHandler = async (newMessage: Message) => {
    await chatRoomHandler();

    if (newMessage.chat_room_id === choosenChatRoom.chat_room_id) {
      setChoosenChatRoom((prev) => {
        if (!prev) return prev;

        return { ...prev, messages: [newMessage, ...prev.messages] };
      });
    }
  };

  const resetChatRoomHook = () => {
    setParticipants([]);
    setChatRooms([]);
    setChoosenChatRoom({} as ChatRoom);
  };

  const resetChoosenRoom = () => setChoosenChatRoom({} as ChatRoom);

  useEffect(() => {
    chatRoomHandler();

    return () => {
      setChatRooms([]);
    };
  }, []);

  return {
    onClickChatRoom,
    choosenChatRoom,
    participantNames,
    addMessageHandler,
    chatRooms,
    participants,
    chatRoomHandler,
    setChatRooms,
    resetChatRoomHook,
    resetChoosenRoom,
  };
};

export default useChatRoomHook;
