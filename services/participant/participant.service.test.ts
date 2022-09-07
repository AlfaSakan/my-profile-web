import { PARTICIPANT_ROUTE } from 'constants/route.constant';
import fetch from 'jest-fetch-mock';
import { BASE_URL, HEADER } from 'utils/test/envConstants';
import { responseUsers } from 'utils/test/user.dummy';
import participantService from './participant.service';

beforeEach(() => {
  fetch.mockClear();
});

describe('participant service test', () => {
  const { getListParticipant } = participantService();
  it('getListParticipant', async () => {
    fetch.mockResponseOnce(JSON.stringify(responseUsers));

    const res = await getListParticipant('1');

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}${PARTICIPANT_ROUTE}/1`,
      HEADER
    );
    expect(res).toEqual(responseUsers);
  });
});
