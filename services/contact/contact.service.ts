import { CONTACT_ROUTE } from 'constants/route.constant';
import { Contact } from 'models/contact/contact.model';
import { Response } from 'models/response/response.model';
import fetchBase from 'services/api/api.service';
import userService from 'services/user/user.service';

interface ContactParam {
  friend_id: string;
  status?: string;
}

const contactService = () => {
  const { mutation, query } = fetchBase();
  const { findOneUserService } = userService();

  const getContactsUser = async () => {
    try {
      const res = (await query(CONTACT_ROUTE, 'GET')) as Response<Contact[]>;

      return res;
    } catch (error) {
      console.log('userContactApi getContactsUser Error', error);
    }
  };

  const postContactUser = async (body: ContactParam) => {
    try {
      const res = (await mutation(
        CONTACT_ROUTE,
        'POST',
        body
      )) as Response<Contact>;

      if (res.status !== 201) throw Error;

      const resUser = await findOneUserService(res.data.friend_id);
      if (!resUser) return;

      return res;
    } catch (error) {
      console.log('userContactApi postContactUser Error', error);
    }
  };

  return {
    getContactsUser,
    postContactUser,
  };
};

export default contactService;
