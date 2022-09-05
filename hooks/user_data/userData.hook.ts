import { Participant } from 'models/participant/participant.model';
import { User } from 'models/user/user.model';
import { useCallback, useMemo, useState } from 'react';

const useUserDataHook = () => {
  const [userData, setUserData] = useState<Participant[]>([]);
  const ids = useMemo(() => userData.map((part) => part.user_id), [userData]);

  const resetData = () => setUserData([]);

  const addUserData = useCallback(
    (participants: Participant[]) => {
      const data = participants.filter((part) => !ids.includes(part.user_id));

      setUserData((prev) => [...prev, ...data]);
    },
    [ids]
  );

  const addNewFriend = (newFriend: User) => {
    if (!ids.includes(newFriend.user_id)) {
      addUserData([newFriend]);
      return;
    }

    const data = userData.map((ud) => {
      if (ud.user_id !== newFriend.user_id) return ud;

      ud.isFriend = true;
      return ud;
    });

    setUserData(data);
  };

  const checkIsFriend = useCallback(
    (userId: string) => {
      if (userData.length === 0) return false;

      const found = userData.find((ud) => ud.user_id === userId);

      if (!found) return false;

      return found.isFriend;
    },
    [userData]
  );

  return {
    userData,
    addUserData,
    addNewFriend,
    checkIsFriend,
    resetData,
    ids,
  };
};

export default useUserDataHook;
