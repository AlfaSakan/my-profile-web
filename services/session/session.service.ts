import { SESSION_ROUTE } from 'constants/route.constant';
import { Response } from 'models/response/response.model';
import { Session } from 'models/session/session.model';
import fetchBase from 'services/api/api.service';

export interface LoginParams {
  phone_number: string;
  name: string;
}

const sessionService = () => {
  const { mutation, query } = fetchBase();

  const postSession = async (body: LoginParams) => {
    try {
      const res = (await mutation(
        SESSION_ROUTE,
        'POST',
        body
      )) as Response<Session>;

      return res;
    } catch (error) {
      console.log('useSessionApi postSession error', error);
    }
  };

  const deleteSession = async (sessionId: number) => {
    try {
      const res = (await query(
        `${SESSION_ROUTE}/${sessionId}`,
        'DELETE'
      )) as Response<string>;

      return res;
    } catch (error) {
      console.log('useSessionApi deleteSession error', error);
    }
  };

  return {
    postSession,
    deleteSession,
  };
};

export default sessionService;
