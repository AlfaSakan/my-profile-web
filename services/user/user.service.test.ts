import { USER_ROUTE } from 'constants/route.constant';
import fetch from 'jest-fetch-mock';
import {
  BASE_URL,
  HEADER,
  headerPatch,
  headerPost,
} from 'utils/test/envConstants';
import { responseUser, responseUsers, user1 } from 'utils/test/user.dummy';
import userService from './user.service';

beforeEach(() => {
  fetch.mockClear();
});

describe('user service test', () => {
  const {
    findOneUserService,
    getUserService,
    patchUserService,
    postUserService,
    searchUserService,
  } = userService();
  it('findOneUserService', async () => {
    fetch.mockResponseOnce(JSON.stringify(responseUser));

    const res = await findOneUserService(user1.user_id);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}${USER_ROUTE}/find/1`,
      HEADER
    );
    expect(res).toEqual(responseUser);
  });

  it('getUserService', async () => {
    fetch.mockResponseOnce(JSON.stringify(responseUser));

    const res = await getUserService();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${USER_ROUTE}`, HEADER);
    expect(res).toEqual(responseUser);
  });

  it('patchUserService', async () => {
    const changeObj = { ...responseUser, name: 'change name' };
    fetch.mockResponseOnce(JSON.stringify(changeObj));

    const res = await patchUserService({ name: 'change name' });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}${USER_ROUTE}`,
      headerPatch({ name: 'change name' })
    );
    expect(res?.status).toEqual(200);
  });

  it('postUserService', async () => {
    fetch.mockResponseOnce(JSON.stringify(responseUser));
    const res = await postUserService(user1);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}${USER_ROUTE}`,
      headerPost(user1)
    );
    expect(res?.data).toEqual(user1);
  });

  it('searchUserService', async () => {
    fetch.mockResponseOnce(JSON.stringify(responseUsers));
    const res = await searchUserService('user');

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${USER_ROUTE}/user`, HEADER);
    expect(res).toEqual(responseUsers);
  });
});
