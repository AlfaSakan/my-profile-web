import { useAppDispatch } from 'app/hook/hook.app';
import { PARTICIPANT_ROUTE } from 'constants/route.constant';
import { Response } from 'models/response/response.model';
import { User } from 'models/user/user.model';
import useFetchBase from 'services/api/api.service';
import { insertParticipant } from 'stores/participant/participant.store';

const useParticipantApi = () => {
  const { query } = useFetchBase();
  const dispatch = useAppDispatch();

  const getListParticipant = async (chatRoomId: number) => {
    try {
      const res = (await query(
        `${PARTICIPANT_ROUTE}/${chatRoomId}`,
        'GET'
      )) as Response<User[]>;

      if (res.status !== 200 || res.data === null) {
        return;
      }

      dispatch(insertParticipant(res.data));
    } catch (error) {
      console.log('useParticipantApi getListParticipant', error);
    }
  };

  return {
    getListParticipant,
  };
};

export default useParticipantApi;
