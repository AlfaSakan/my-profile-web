import { useAppDispatch } from 'app/hook/hook.app';
import { SESSION_ROUTE } from 'constants/route.constant';
import { Response } from 'models/response/response.model';
import { Session } from 'models/session/session.model';
import useFetchBase from 'services/api/api.service';
import { login, logout } from 'stores/session/session.store';

export interface LoginParams {
  phone_number: string;
  name: string;
}

const useSessionApi = () => {
  const { mutation, query } = useFetchBase();
  const dispatch = useAppDispatch();

  const postSession = async (body: LoginParams) => {
    try {
      const res = (await mutation(
        SESSION_ROUTE,
        'POST',
        body
      )) as Response<Session>;

      if (!res) return 400;

      const { access_token, refresh_token, session_id } = res.data;

      dispatch(
        login({ access_token, refresh_token, session_id, isLoggedIn: true })
      );

      return res.status;
    } catch (error) {
      console.log('useSessionApi postSession', error);
      return 400;
    }
  };

  const deleteSession = async (sessionId: number) => {
    try {
      const res = (await query(
        `${SESSION_ROUTE}/${sessionId}`,
        'DELETE'
      )) as Response<string>;

      if (!res) return 400;

      console.log('RESULT deleteSession => ', res);

      dispatch(logout());
      return 200;
    } catch (error) {
      console.log('useSessionApi deleteSession', error);
      return 400;
    }
  };

  return {
    postSession,
    deleteSession,
  };
};

export default useSessionApi;
