/* eslint-disable react-hooks/exhaustive-deps */
import { User } from 'models/user/user.model';
import { useEffect, useState } from 'react';
import useUserApi from 'services/user/user.service';

const useSearchHook = () => {
  const [search, setSearch] = useState('');
  const [foundUsers, setFoundUsers] = useState<User[]>([]);

  const searchHandler = (val: string) => setSearch(val);

  const userApi = useUserApi();

  const submitSearch = async () => {
    try {
      const users = await userApi.searchUserService(search);

      if (!users?.data) return;

      setFoundUsers(users.data);
    } catch (error) {
      console.log('ERROR SUBMIT SEARCH => ', error);
    }
  };

  useEffect(() => {
    if (search) {
      submitSearch();
    }
  }, [search]);

  return {
    search,
    searchHandler,
    foundUsers,
  };
};

export default useSearchHook;
