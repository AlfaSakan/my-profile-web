import { Divider } from 'components/atoms';
import {
  MessageCard,
  ModalStatus,
  Search,
  UserCard,
} from 'components/molecules';
import {
  FooterBody,
  HeaderBody,
  HeaderSideBar,
  MainBody,
  ModalChatRoom,
  ModalLogin,
} from 'components/organisms';
import type { NextPage } from 'next';
import useHomeViewModel from 'view_model/home.viewModel';

interface IProps {}

const Home: NextPage<IProps> = () => {
  const {
    modalLoginHook,
    modalStatusHook,
    authHook,
    userHook,
    onClickMenu,
    searchHook,
    chatRoomHook,
    messageHook,
    userDataHook,
    modalRoomHook,
    contactHook,

    sendingChat,
    loading,
    setLoading,
    onClickAddNewFriend,
  } = useHomeViewModel();

  return (
    <div className="flex h-screen w-screen">
      {/* #region SIDEBAR */}
      <div className="flex flex-col shrink grow-[0.2]">
        <HeaderSideBar
          onClickMenu={modalRoomHook.openModalChatRoom}
          name={userHook.user.name}
          status={userHook.user.status}
          imgUrl="https://image.winudf.com/v2/image/Y29tLmJhbGVmb290Lk1vbmtleURMdWZmeVdhbGxwYXBlcl9zY3JlZW5fMF8xNTI0NTE5MTEwXzAyOA/screen-0.jpg?fakeurl=1&type=.webp"
        />
        <div className="p-2 border-b bg-secondary">
          <Search
            value={searchHook.search}
            onChange={searchHook.searchHandler}
          />
        </div>
        <div className="flex flex-col flex-1 overflow-y-scroll">
          {searchHook.search
            ? searchHook.foundUsers.map((user) => {
                if (user.user_id === userHook.user.user_id) return;

                const isFriend = contactHook.checkIsFriend(user.user_id);

                return (
                  <div
                    key={`${user.user_id} contact`}
                    onClick={onClickAddNewFriend(user, isFriend)}
                    className="flex flex-col"
                  >
                    <UserCard user={user} isFriend={isFriend} />
                    <Divider />
                  </div>
                );
              })
            : chatRoomHook.chatRooms.map((room, index) => {
                const { messages } = room;

                return (
                  <div
                    key={`chat room ${room.chat_room_id} ${index}`}
                    onClick={() => {
                      chatRoomHook.onClickChatRoom(room, userHook.user.user_id);
                      messageHook.messageHandler('');
                    }}
                    className={`flex flex-col ${
                      chatRoomHook.choosenChatRoom.chat_room_id ===
                      room.chat_room_id
                        ? 'bg-secondary'
                        : 'bg-white'
                    }`}
                  >
                    <MessageCard
                      name={room.name}
                      dateUnix={room.updated_at}
                      lastMessage={messages[0]?.message || 'New Group'}
                      imgUrl={room.image_url}
                    />
                    <Divider />
                  </div>
                );
              })}
        </div>
      </div>
      {/* #endregion SIDEBAR */}
      {/* #region MAINBAR */}
      <div className="bg-primary flex flex-col h-full flex-1">
        <HeaderBody
          onClickMenu={onClickMenu}
          name={chatRoomHook.choosenChatRoom?.name}
          status={chatRoomHook.participantNames}
        />
        <MainBody
          messages={chatRoomHook.choosenChatRoom?.messages}
          userId={userHook.user.user_id}
          userData={userDataHook.userData}
        />
        {chatRoomHook.choosenChatRoom && (
          <FooterBody
            onChange={messageHook.messageHandler}
            onSubmitMessage={async () => {
              try {
                setLoading(true);
                const res = await messageHook.onSubmitMessage(
                  userHook.user.user_id,
                  chatRoomHook.choosenChatRoom?.chat_room_id || ''
                )();

                if (res) {
                  sendingChat(res.data);
                }
              } catch (error) {
                console.log('SENDING CHAT ERROR', error);
              } finally {
                setLoading(false);
              }
            }}
            messageValue={messageHook.message}
            isLoading={loading}
          />
        )}
      </div>
      {/* #endregion MAINBAR */}
      <ModalLogin
        isOpen={modalLoginHook.openLogin}
        name={authHook.loginForm.name}
        phoneNumber={authHook.loginForm.phone_number}
        onChangeName={authHook.stateHandler('name')}
        onChangePhoneNumber={authHook.stateHandler('phone_number')}
        onClickLogin={authHook.login}
        textErrorName={authHook.loginError.name}
        textErrorPhone={authHook.loginError.phone_number}
      />
      <ModalStatus
        isOpen={modalStatusHook.openModalStatus}
        onClose={modalStatusHook.onCloseModalStatus}
        message={modalStatusHook.errorModalMessage}
        isError={modalStatusHook.isError}
      />
      <ModalChatRoom
        isOpen={modalRoomHook.modalChatRoom}
        onClose={modalRoomHook.closeModalChatRoom}
        nameVal={modalRoomHook.chatRoomField.name}
        onChangeName={modalRoomHook.chatRoomHandler('name')}
        onClickSubmit={modalRoomHook.createChatRoom}
        descVal={modalRoomHook.chatRoomField.description}
        onChangeDescription={modalRoomHook.chatRoomHandler('description')}
        onChangeBox={modalRoomHook.checkboxHandler}
        addedUsers={modalRoomHook.chatRoomField.participants}
        users={userDataHook.userData}
        userId={userHook.user.user_id}
      />
    </div>
  );
};

export default Home;
