import { USER_ROUTE } from 'constants/route.constant';
import { Response } from 'models/response/response.model';
import { User } from 'models/user/user.model';
import fetchBase from 'services/api/api.service';

interface UserParams {
  name: string;
  country_code: string;
  phone_number: string;
  image_url?: string;
  status?: string;
}

const userService = () => {
  const { mutation, query } = fetchBase();

  const searchUserService = async (name: string) => {
    try {
      const res = (await query(`${USER_ROUTE}/${name}`, 'GET')) as Response<
        User[]
      >;

      return res;
    } catch (error) {
      console.log('useUserApi getUserService error', error);
    }
  };

  const getUserService = async () => {
    try {
      const res = (await query(USER_ROUTE, 'GET')) as Response<User>;

      return res;
    } catch (error) {
      console.log('useUserApi getUserService error', error);
    }
  };

  const findOneUserService = async (user_id: string) => {
    try {
      const res = (await query(
        `${USER_ROUTE}/find/${user_id}`,
        'GET'
      )) as Response<User>;

      return res;
    } catch (error) {
      console.log('useUserApi getUserService error', error);
    }
  };

  const postUserService = async (body: UserParams) => {
    try {
      const res = (await mutation(USER_ROUTE, 'POST', body)) as Response<User>;

      return res;
    } catch (error) {
      console.log('useUserApi postUserService error', error);
    }
  };

  const patchUserService = async (body: Partial<User>) => {
    try {
      const res = (await mutation(
        USER_ROUTE,
        'PATCH',
        body
      )) as Response<string>;

      return res;
    } catch (error) {
      console.log('useUserApi patchUserService error', error);
    }
  };

  return {
    getUserService,
    patchUserService,
    postUserService,
    searchUserService,
    findOneUserService,
  };
};

export default userService;
