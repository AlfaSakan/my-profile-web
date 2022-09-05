import { Message } from 'models/message/message.model';
import { useState } from 'react';
import useChatRoomApi from 'services/chat_room/chatRoom.service';
import { parseStringToMessage } from 'utils/parseString.util';

export const useWebsocket = (messageHandler: (_: Message) => void) => {
  const [websocket, setWebsocket] = useState<WebSocket>();
  const { getChatRoomByIdService } = useChatRoomApi();

  const connectingWebSocket = (user_id: string) => {
    const ws = new WebSocket(`ws://localhost:8081/v1/ws/chat-room/${user_id}`);

    ws.onopen = () => {
      console.log('Successfully connected');
    };

    ws.onclose = (event) => {
      console.log('Socket Closed Connection: ', event);
    };

    ws.onerror = (event) => {
      console.log('Socket Error Connection: ', event);
    };

    ws.onmessage = (msg) => {
      const data = msg.data as string;
      if (data.includes('\n')) {
        const arrMsg = data.split('\n');

        arrMsg.forEach((strMsg) => {
          checkTypeMessage(strMsg);
        });

        return;
      }

      checkTypeMessage(data);
    };

    setWebsocket(ws);
  };

  const checkTypeMessage = (msg: string) => {
    const message = parseStringToMessage(msg);

    switch (message.type) {
      case 'Created Room':
        wsOnMessageCreatedRoom(message);
        break;
      default:
        wsOnMessageUser(message);
        break;
    }
  };

  const wsOnMessageUser = (message: Message) => {
    assignToDispatch(message);
  };

  const wsOnMessageCreatedRoom = async (message: Message) => {
    try {
      const res = await getChatRoomByIdService(message.chat_room_id);
      if (!res) return;
    } catch (error) {
      console.log('ws on message created room =>', error);
    }
  };

  const assignToDispatch = (data: Message) => {
    if (data.type === 'noreply') return;

    messageHandler(data);
  };

  const sendingChat = (msg: Message) => {
    if (!websocket) return;

    assignToDispatch(msg);
    websocket.send(JSON.stringify(msg));
  };

  return {
    connectingWebSocket,
    sendingChat,
  };
};
