import { useAppDispatch } from 'app/hook/hook.app';
import { USER_ROUTE } from 'constants/route.constant';
import { Response } from 'models/response/response.model';
import { User } from 'models/user/user.model';
import useFetchBase from 'services/api/api.service';
import { getUser, patchUser } from 'stores/user/user.store';

interface UserParams {
  name: string;
  country_code: string;
  phone_number: string;
  image_url?: string;
  status?: string;
}

const useUserApi = () => {
  const dispatch = useAppDispatch();
  const { mutation, query } = useFetchBase();

  const getUserService = async () => {
    try {
      const res = (await query(USER_ROUTE, 'GET')) as Response<User>;

      console.log('RES NIH', res);

      if (res.message === 'OK') {
        dispatch(getUser(res.data));
      }
    } catch (error) {
      console.log('useUserApi getUserService', error);
    }
  };

  const postUserService = async (body: UserParams) => {
    try {
      const res = (await mutation(USER_ROUTE, 'POST', body)) as Response<User>;

      if (res.message === 'OK') {
        dispatch(getUser(res.data));
      }
    } catch (error) {
      console.log('useUserApi postUserService', error);
    }
  };

  const patchUserService = async (body: Partial<User>) => {
    try {
      const res = (await mutation(
        USER_ROUTE,
        'PATCH',
        body
      )) as Response<string>;

      if (res.message === 'OK') {
        dispatch(patchUser(body));
      }
    } catch (error) {
      console.log('useUserApi patchUserService', error);
    }
  };

  return {
    getUserService,
    patchUserService,
    postUserService,
  };
};

export default useUserApi;
