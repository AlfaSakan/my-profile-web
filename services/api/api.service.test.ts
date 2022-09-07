import fetch from 'jest-fetch-mock';
import fetchBase from './api.service';

beforeEach(() => {
  fetch.mockClear();
});

describe('api service test', () => {
  const { query, mutation } = fetchBase();

  it('query get', async () => {
    fetch.mockResponseOnce(JSON.stringify({ test: 100 }));

    const res = await query('localhost:1234', 'GET');

    expect(res).toEqual({ test: 100 });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('mutation post', async () => {
    fetch.mockResponseOnce(JSON.stringify({ name: 'alfa' }));

    const res = await mutation('localhost:1234', 'POST', {});

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(res).toEqual({ name: 'alfa' });
  });
});
