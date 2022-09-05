/* eslint-disable react-hooks/exhaustive-deps */
import { Contact } from 'models/contact/contact.model';
import { User } from 'models/user/user.model';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useContactApi from 'services/contact/contact.service';

const useContactHook = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const contactsId = useMemo(
    () => contacts.map((cont) => cont.friend_id),
    [contacts]
  );

  const contactApi = useContactApi();

  const addFriendSubmit = async (newFriend: User) => {
    try {
      const res = await contactApi.postContactUser({
        friend_id: newFriend.user_id,
      });

      if (!res) return;

      setContacts((prev) => [...prev, res.data]);
    } catch (error) {
      console.log('useContact addFriendSubmit Error =>', error);
    }
  };

  const getListContact = useCallback(async () => {
    try {
      const res = await contactApi.getContactsUser();

      if (!res) throw Error;

      setContacts(res.data);
    } catch (error) {
      console.log('get list contact =>', error);
    }
  }, []);

  const checkIsFriend = useCallback(
    (userId: string) => {
      if (contacts.length === 0) return false;

      for (const cont of contacts) {
        if (cont.friend_id === userId) {
          return true;
        }
      }

      return false;
    },
    [contacts]
  );

  useEffect(() => {
    getListContact();

    return () => {
      setContacts([]);
    };
  }, [getListContact]);

  return {
    addFriendSubmit,
    getListContact,
    contacts,
    checkIsFriend,
    contactsId,
  };
};

export default useContactHook;
