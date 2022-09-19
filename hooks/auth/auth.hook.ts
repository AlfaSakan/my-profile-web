import useModalStatusHook from 'hooks/modal_status/modalStatus.hook';
import { useEffect, useState } from 'react';
import { userService } from 'services';
import sessionService, { LoginParams } from 'services/session/session.service';
import { sessionStorage } from 'storages';

const useAuthHook = () => {
  const { postSession } = sessionService();
  const { postUserService } = userService();

  const modalStatusHook = useModalStatusHook();

  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  const [loginForm, setLoginForm] = useState<LoginParams>({
    name: '',
    phone_number: '',
  });

  const [loginError, setLoginError] = useState<LoginParams>({
    name: '',
    phone_number: '',
  });

  const initialValue = () => {
    setLoginForm({
      name: '',
      phone_number: '',
    });
  };

  const stateHandler =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginForm((prev) => ({
        ...prev,
        [type]: e.target.value,
      }));
    };

  const stateErrorHandler = (type: string) => (text: string) => {
    setLoginError((prev) => ({
      ...prev,
      [type]: text,
    }));
  };

  const login = async () => {
    if (!loginForm.name) {
      setLoginError((prev) => ({ ...prev, name: 'Nama tidak boleh kosong' }));
      return;
    }

    if (!loginForm.phone_number) {
      setLoginError((prev) => ({
        ...prev,
        phone_number: 'Nomor Telepon tidak boleh kosong',
      }));
      return;
    }

    try {
      let session = await postSession(loginForm);

      if (!session) throw Error;

      if (session.status === 404) {
        modalStatusHook.setErrorModalMessage('Created new user');
        modalStatusHook.setIsError(false);
        modalStatusHook.onOpenModalStatus();
        const user = await postUserService({
          ...loginForm,
          country_code: '+62',
        });

        if (!user) throw Error;

        login();
      }

      sessionStorage.insertSessionStorage(session.data);
      setAccessToken(session.data.access_token);
      setRefreshToken(session.data.refresh_token);
      initialValue();
    } catch (error) {
      console.log('Error Login useAuthHook =>', error);
    }
  };

  const logout = () => {
    setAccessToken('');
    setRefreshToken('');
    sessionStorage.removeSessionStorage();
  };

  useEffect(() => {
    const { access_token, refresh_token } =
      sessionStorage.retrieveSessionStorage();

    if (access_token) {
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
    }
  }, []);

  useEffect(() => {
    if (loginForm.name) {
      setLoginError((prev) => ({ ...prev, name: '' }));
    }

    return () => {
      setLoginError({ name: '', phone_number: '' });
    };
  }, [loginForm.name]);

  useEffect(() => {
    if (loginForm.phone_number.length > 9) {
      setLoginError((prev) => ({ ...prev, phone_number: '' }));
    }
    return () => {
      setLoginError({ name: '', phone_number: '' });
    };
  }, [loginForm.phone_number]);

  return {
    loginForm,
    initialValue,
    stateHandler,
    loginError,
    stateErrorHandler,
    logout,
    login,
    accessToken,
    refreshToken,
  };
};

export default useAuthHook;
