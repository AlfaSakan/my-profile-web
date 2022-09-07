import { CONTACT_ROUTE } from 'constants/route.constant';
import fetch from 'jest-fetch-mock';
import { contact1, response, response1 } from 'utils/test/contact.dummy';
import { BASE_URL, HEADER, headerPost } from 'utils/test/envConstants';
import { user1 } from 'utils/test/user.dummy';
import contactService from './contact.service';

beforeEach(() => {
  fetch.mockClear();
});

describe('contact service test', () => {
  const { getContactsUser, postContactUser } = contactService();

  it('getContactsUser', async () => {
    fetch.mockResponseOnce(JSON.stringify(response));

    const res = await getContactsUser();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${CONTACT_ROUTE}`, HEADER);
    expect(res).toEqual(response);
  });

  it('postContactUser', async () => {
    fetch.mockResponses(JSON.stringify(response1), JSON.stringify(user1));

    const res = await postContactUser(contact1);

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}${CONTACT_ROUTE}`,
      headerPost(contact1)
    );

    expect(res).toEqual(response1);
  });
});
