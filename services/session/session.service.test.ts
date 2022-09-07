import { SESSION_ROUTE } from 'constants/route.constant';
import fetch from 'jest-fetch-mock';
import { Response } from 'models/response/response.model';
import { Session } from 'models/session/session.model';
import { BASE_URL, headerPost, HEADER_DELETE } from 'utils/test/envConstants';
import sessionService from './session.service';

beforeEach(() => {
  fetch.mockClear();
});

describe('session service test', () => {
  const { deleteSession, postSession } = sessionService();

  const login = { name: 'test', phone_number: '8123456789' };
  const session = {
    access_token: 'access token',
    refresh_token: 'refresh token',
    session_id: '1',
  };

  const response: Response<Session> = {
    data: session,
    message: 'OK',
    status: 201,
  };

  it('postSession', async () => {
    fetch.mockResponseOnce(JSON.stringify(response));

    const res = await postSession(login);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}${SESSION_ROUTE}`,
      headerPost(login)
    );
    expect(res?.data).toEqual(session);
  });

  it('deleteSession', async () => {
    fetch.mockResponseOnce(JSON.stringify({ status: 200, message: 'Deleted' }));

    const res = await deleteSession('1');

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}${SESSION_ROUTE}/1`,
      HEADER_DELETE
    );
    expect(res?.status).toEqual(200);
  });
});
