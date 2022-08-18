import { Divider } from 'components/atoms';
import { MessageCard, ModalStatus, Search } from 'components/molecules';
import {
  FooterBody,
  HeaderBody,
  HeaderSideBar,
  MainBody,
  ModalLogin,
} from 'components/organisms';
import type { NextPage } from 'next';
import useHomeViewModel from 'view_model/home.viewModel';

const Home: NextPage = () => {
  const {
    login,
    stateHandler,
    openModal,
    setOpenModal,
    submitLogin,
    chatRooms,
    onClickChatRoom,
    onClickMenu,
    loginError,
    openModalStatus,
    onCloseModalStatus,
    errorModalMessage,
    isError,
    choosenChatRoom,
    participantNames,
    user_id,
    messageHandler,
    onSubmitMessage,
    message,
  } = useHomeViewModel();

  return (
    <div className="flex h-screen w-screen">
      {/* #region SIDEBAR */}
      <div className="flex flex-col shrink grow-[0.2]">
        <HeaderSideBar />
        <div className="p-2 border-b bg-secondary">
          <Search />
        </div>
        <div className="flex flex-col flex-1">
          {chatRooms.map((room, index) => {
            const messages = room.messages;

            let lastMessage = '';

            if (messages.length === 0) {
              lastMessage = 'New Group';
            } else {
              lastMessage = messages[messages.length - 1].message;
            }

            return (
              <div
                key={`chat room ${room.chat_room_id} ${index}`}
                onClick={() => onClickChatRoom(room)}
                className="flex flex-col"
              >
                <MessageCard
                  name={room.name}
                  dateUnix={room.updated_at}
                  lastMessage={lastMessage}
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
          isFocus={choosenChatRoom !== undefined}
          name={choosenChatRoom?.name}
          status={participantNames}
        />
        <MainBody messages={choosenChatRoom?.messages} userId={user_id} />
        {choosenChatRoom && (
          <FooterBody
            onChange={messageHandler}
            onSubmitMessage={onSubmitMessage(
              user_id,
              choosenChatRoom.chat_room_id
            )}
            messageValue={message}
          />
        )}
      </div>
      {/* #endregion MAINBAR */}
      <ModalLogin
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        name={login.name}
        phoneNumber={login.phone_number}
        onChangeName={stateHandler('name')}
        onChangePhoneNumber={stateHandler('phone_number')}
        onClickLogin={submitLogin}
        textErrorName={loginError.name}
        textErrorPhone={loginError.phone_number}
      />
      <ModalStatus
        isOpen={openModalStatus}
        onClose={onCloseModalStatus}
        message={errorModalMessage}
        isError={isError}
      />
    </div>
  );
};

export default Home;
