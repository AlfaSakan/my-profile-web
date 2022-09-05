/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import {
  useAuthHook,
  useChatRoomHook,
  useContactHook,
  useMessageHook,
  useModalLoginHook,
  useModalRoomHook,
  useModalStatusHook,
  useSearchHook,
  useUserDataHook,
  useUserHook,
  useWebsocketHook,
} from 'hooks';
import { Participant } from 'models/participant/participant.model';
import { User } from 'models/user/user.model';
import { userService } from 'services';

const useHomeViewModel = () => {
  const [loading, setLoading] = useState(false);

  const contactHook = useContactHook();
  const messageHook = useMessageHook();
  const searchHook = useSearchHook();
  const authHook = useAuthHook();
  const modalStatusHook = useModalStatusHook();
  const modalLoginHook = useModalLoginHook();
  const userHook = useUserHook();
  const chatRoomHook = useChatRoomHook();
  const userDataHook = useUserDataHook();
  const modalRoomHook = useModalRoomHook();

  const { connectingWebSocket, sendingChat } = useWebsocketHook(
    chatRoomHook.addMessageHandler
  );

  const { findOneUserService } = userService();

  const insertUserDataFromContact = async () => {
    for (const cont of contactHook.contacts) {
      if (!userDataHook.ids.includes(cont.friend_id)) {
        const res = await findOneUserService(cont.friend_id);
        if (!res) continue;

        const user: Participant = res.data;
        user.isFriend = true;

        userDataHook.addUserData([user]);
      }
    }
  };

  const onClickAddNewFriend =
    (newFriend: User, isFriend: boolean) => async () => {
      if (isFriend) return;

      try {
        await contactHook.addFriendSubmit(newFriend);
        userDataHook.addNewFriend(newFriend);
      } catch (error) {
        console.log('addNewFriend =>', error);
      }
    };

  const onClickMenu = () => {
    authHook.logout();
    searchHook.searchHandler('');
    chatRoomHook.resetChatRoomHook();
  };

  useEffect(() => {
    if (authHook.accessToken) {
      modalLoginHook.onCloseModal();
      chatRoomHook.chatRoomHandler();
      userHook.userRequest();
    } else {
      modalLoginHook.onOpenModal();
    }
  }, [authHook.accessToken]);

  useEffect(() => {
    if (userHook.user.user_id) {
      connectingWebSocket(userHook.user.user_id);
    }
  }, [userHook.user.user_id]);

  useEffect(() => {
    if (chatRoomHook.participants.length !== 0) {
      userDataHook.addUserData(chatRoomHook.participants);
    }
  }, [chatRoomHook.participants.length]);

  useEffect(() => {
    if (contactHook.contacts.length !== 0) {
      insertUserDataFromContact();
    }

    return () => {
      userDataHook.resetData();
    };
  }, [contactHook.contacts.length]);

  return {
    onClickMenu,
    modalRoomHook,
    searchHook,
    sendingChat,
    authHook,
    modalStatusHook,
    modalLoginHook,
    userHook,
    chatRoomHook,
    loading,
    setLoading,
    messageHook,
    contactHook,
    userDataHook,
    onClickAddNewFriend,
  };
};

export default useHomeViewModel;
