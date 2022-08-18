/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hook/hook.app';

import { SESSION_KEY, USER_KEY } from 'constants/storage.constant';

import { ChatRoom } from 'models/chat_room/chatRoom.model';
import { User } from 'models/user/user.model';

import useChatRoomApi from 'services/chat_room/chatRoom.service';
import useMessageApi, { MessageParams } from 'services/message/message.service';
import useParticipantApi from 'services/participant/participant.service';
import useSessionApi, { LoginParams } from 'services/session/session.service';
import useUserApi from 'services/user/user.service';

import { deleteChatRoom } from 'stores/chat_room/chatRoom.store';
import { deleteMessageStore } from 'stores/message/message.store';
import {
  deleteParticipant,
  getParticipantStorage,
} from 'stores/participant/participant.store';
import { login, logout, SessionStore } from 'stores/session/session.store';
import { deleteUser, getUser, UserStore } from 'stores/user/user.store';

const useLoginState = () => {
  const [login, setLogin] = useState<LoginParams>({
    name: '',
    phone_number: '',
  });

  const [loginError, setLoginError] = useState<LoginParams>({
    name: '',
    phone_number: '',
  });

  const initialValue = () => {
    setLogin({
      name: '',
      phone_number: '',
    });
  };

  const stateHandler =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setLogin((prev) => ({
        ...prev,
        [type]: e.target.value,
      }));
    };

  const stateErrorHandler = (type: string) => (text: string) => {
    setLoginError((prev) => ({
      ...prev,
      [type]: text,
    }));
  };

  return { login, initialValue, stateHandler, loginError, stateErrorHandler };
};

const useMessageState = () => {
  const [message, setMessage] = useState('');

  const { postMessage } = useMessageApi();

  const messageHandler = (value: string) => {
    setMessage(value);
  };

  const onSubmitMessage =
    (sender_id: number, chat_room_id: number, type?: string) => async () => {
      try {
        const messageRequest: MessageParams = {
          message,
          chat_room_id,
          sender_id,
          type,
        };

        await postMessage(messageRequest);
        setMessage('');
      } catch (error) {
        console.log('onSubmitMessage', error);
      }
    };

  return {
    message,
    messageHandler,
    onSubmitMessage,
  };
};

const useFirstRender = () => {
  const dispatch = useAppDispatch();
  const userApi = useUserApi();

  const getSessionStorage = async () => {
    const sessionStorage = localStorage.getItem(SESSION_KEY);

    if (!sessionStorage) return;

    const session = JSON.parse(sessionStorage) as SessionStore;

    dispatch(login(session));
  };

  const getUserStorage = async () => {
    try {
      const userStorage = localStorage.getItem(USER_KEY);

      if (!userStorage) {
        await userApi.getUserService();
        return;
      }

      const user = JSON.parse(userStorage) as UserStore;

      dispatch(getUser(user));
    } catch (error) {
      console.log('useFirstRender getUserStorage', error);
    }
  };

  const findParticipantStorage = () => {
    dispatch(getParticipantStorage());
  };

  return {
    getSessionStorage,
    getUserStorage,
    findParticipantStorage,
  };
};

const useChooseChatRoom = () => {
  const [choosenChatRoom, setChoosenChatRoom] = useState<ChatRoom>();
  const [participants, setParticipants] = useState<User[]>([]);

  const participantsStore = useAppSelector((state) => state.participant);

  const participantApi = useParticipantApi();

  const onClickChatRoom = async (chatRoom: ChatRoom) => {
    if (chatRoom.chat_room_id === choosenChatRoom?.chat_room_id) return;

    await participantApi.getListParticipant(chatRoom.chat_room_id);

    let chatRoomSortedMessage = chatRoom;
    if (chatRoom.messages.length > 0) {
      chatRoomSortedMessage = {
        ...chatRoom,
        messages: [...chatRoom.messages].reverse(),
      };
    }
    setChoosenChatRoom(chatRoomSortedMessage);

    const participantFiltered = participantsStore.filter((part) =>
      chatRoom.participants_id.includes(part.user_id)
    );

    setParticipants(participantFiltered);
  };

  const participantNames = participants.reduce(
    (prevVal, currVal) => currVal.name + ', ' + prevVal,
    ''
  );

  return {
    onClickChatRoom,
    choosenChatRoom,
    participants,
    participantNames,
  };
};

const useLogout = () => {
  const dispatch = useAppDispatch();

  const onLogoutHandler = () => {
    dispatch(deleteChatRoom());
    dispatch(deleteParticipant());
    dispatch(deleteUser());
    dispatch(deleteMessageStore());
    dispatch(logout());
  };

  return {
    onLogoutHandler,
  };
};

const useHomeViewModel = () => {
  const [openModal, setOpenModal] = useState(true);
  const [openModalStatus, setOpenModalStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState('');

  const { access_token } = useAppSelector((state) => state.session);
  const chatRooms = useAppSelector((state) => state.chatRoom);
  const { user_id } = useAppSelector((state) => state.user);

  const loginState = useLoginState();
  const messageState = useMessageState();

  const sessionApi = useSessionApi();
  const chatRoomApi = useChatRoomApi();

  const firstRender = useFirstRender();
  const chooseChatRoom = useChooseChatRoom();
  const { onLogoutHandler } = useLogout();

  const submitLogin = async () => {
    try {
      setLoading(true);
      const status = await sessionApi.postSession(loginState.login);

      if (status === 400) {
        setErrorModalMessage('User not found!');
        setIsError(true);
        setOpenModalStatus(true);
      }
    } catch (error) {
      console.log('submitLogin Error => ', error);
    } finally {
      setLoading(false);
    }
  };

  const onCloseModalStatus = () => setOpenModalStatus(false);

  const onClickMenu = () => {
    onLogoutHandler();
  };

  useEffect(() => {
    console.log('USE EFFECT');
    firstRender.getSessionStorage();
  }, []);

  useEffect(() => {
    console.log('USE EFFECT access_token');

    if (access_token) {
      firstRender.getUserStorage();
      chatRoomApi.getChatRoomService();
      firstRender.findParticipantStorage();
      setOpenModal(false);
    } else {
      setOpenModal(true);
    }
  }, [access_token]);

  return {
    openModal,
    setOpenModal,
    submitLogin,
    loading,
    chatRooms,
    onClickMenu,
    openModalStatus,
    onCloseModalStatus,
    isError,
    errorModalMessage,
    user_id,
    ...loginState,
    ...messageState,
    ...chooseChatRoom,
  };
};

export default useHomeViewModel;
