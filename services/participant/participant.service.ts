import { PARTICIPANT_ROUTE } from 'constants/route.constant';
import { Response } from 'models/response/response.model';
import { User } from 'models/user/user.model';
import fetchBase from 'services/api/api.service';

const participantService = () => {
  const { query } = fetchBase();

  const getListParticipant = async (chatRoomId: string) => {
    try {
      const res = (await query(
        `${PARTICIPANT_ROUTE}/${chatRoomId}`,
        'GET'
      )) as Response<User[]>;

      if (res.status !== 200 || res.data === null) {
        return;
      }

      return res;
    } catch (error) {
      console.log('useParticipantApi getListParticipant error', error);
    }
  };

  return {
    getListParticipant,
  };
};

export default participantService;
