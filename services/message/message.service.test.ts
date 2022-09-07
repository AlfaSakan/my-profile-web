import { MESSAGE_ROUTE } from 'constants/route.constant';
import fetch from 'jest-fetch-mock';
import { BASE_URL, HEADER, headerPost } from 'utils/test/envConstants';
import {
  message1,
  responseMessage1,
  responseMessages,
} from 'utils/test/message.dummy';
import messageService from './message.service';

beforeEach(() => {
  fetch.mockClear();
});

describe('message service test', () => {
  const { getMessages, postMessage } = messageService();

  it('getMessages', async () => {
    fetch.mockResponseOnce(JSON.stringify(responseMessages));

    const res = await getMessages('1');

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${MESSAGE_ROUTE}/1`, HEADER);
    expect(res).toEqual(responseMessages);
  });

  it('postMessage', async () => {
    fetch.mockResponseOnce(JSON.stringify(responseMessage1));

    const res = await postMessage(message1);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}${MESSAGE_ROUTE}`,
      headerPost(message1)
    );
    expect(res).toEqual(responseMessage1);
  });
});
