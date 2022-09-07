import { CHAT_ROOM_ROUTE } from 'constants/route.constant';
import fetch from 'jest-fetch-mock';
import {
  chatRoom1,
  chatRoom1Updated,
  response1,
  response2,
} from 'utils/test/chatRoom.dummy';
import { BASE_URL, HEADER } from 'utils/test/envConstants';
import chatRoomService from './chatRoom.service';

beforeEach(() => {
  fetch.resetMocks();
});

describe('first', () => {
  const crs = chatRoomService();

  it('getChatRoomByIdService', async () => {
    fetch.mockResponseOnce(JSON.stringify(response1));

    const res = await crs.getChatRoomByIdService('123');

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}${CHAT_ROOM_ROUTE}/123`,
      HEADER
    );
    expect(res).toEqual(response1);
  });

  it('getChatRoomService', async () => {
    fetch.mockResponseOnce(JSON.stringify(response2));

    const expected = { ...response2 };

    expected.data.sort((a, b) => b.updated_at - a.updated_at);

    const res = await crs.getChatRoomService();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${CHAT_ROOM_ROUTE}`, HEADER);
    // expect(res).not.toEqual(response2);
    expect(res).toEqual(expected);
  });

  it('patchChatRoomService', async () => {
    const resp = { ...response1 };
    resp.data = chatRoom1Updated;

    fetch.mockResponseOnce(JSON.stringify(resp));

    const res = await crs.patchChatRoomService(
      chatRoom1Updated,
      chatRoom1.chat_room_id
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(res).toEqual(resp);
  });
});
