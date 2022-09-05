import { exportEnv } from 'configs/env/env.config';
import { sessionStorage } from 'storages';

type MethodType = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

type HeadersType = {
  Authorization: string;
  'X-Refresh': string;
};

const fetchBase = () => {
  const { BASE_URL } = exportEnv;
  const { access_token, refresh_token } =
    sessionStorage.retrieveSessionStorage();

  const headers: HeadersType = {
    Authorization: access_token,
    'X-Refresh': refresh_token,
  };

  const mutation = async (route: string, method: MethodType, body: object) => {
    try {
      const res = await fetch(`${BASE_URL}${route}`, {
        method,
        body: JSON.stringify(body),
        headers,
      });

      if (res.status === 401) {
        sessionStorage.removeSessionStorage();

        throw Error('Unauthorized');
      }

      const resJson = await res.json();

      if (resJson.status >= 400) {
        throw Error(resJson.message);
      }

      return resJson;
    } catch (error) {
      console.log('useFetchBase mutation error', error);
    }
  };

  const query = async (route: string, method: MethodType) => {
    const res = await fetch(`${BASE_URL}${route}`, {
      method,
      headers,
    });

    if (res.status === 401) {
      sessionStorage.removeSessionStorage();

      throw new Error('Unauthorized');
    }

    const resJson = await res.json();

    return resJson;
  };

  return {
    mutation,
    query,
  };
};

export default fetchBase;
