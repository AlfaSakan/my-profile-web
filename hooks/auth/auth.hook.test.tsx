import { fireEvent, render, screen } from '@testing-library/react';
import fetch from 'jest-fetch-mock';
import { ChangeEvent } from 'react';
import useAuthHook from './auth.hook';

const testId = {
  'stateHandler-name': 'stateHandler-name',
  'stateHandler-phone_number': 'stateHandler-phone_number',
  'stateErrorHandler-name': 'stateErrorHandler-name',
  'stateErrorHandler-phone_number': 'stateErrorHandler-phone_number',
  'reset-form': 'reset-form',
  login: 'login',
};

const setup = () => {
  function TestComponent() {
    const {
      accessToken,
      initialValue,
      login,
      loginError,
      loginForm,
      logout,
      refreshToken,
      stateErrorHandler,
      stateHandler,
    } = useAuthHook();

    return (
      <div>
        <p>{accessToken}</p>
        <p>{refreshToken}</p>
        <p>{loginForm.name}</p>
        <p>{loginError.name}</p>
        <p>{loginForm.phone_number}</p>
        <p>{loginError.phone_number}</p>
        <button data-testid={testId['reset-form']} onClick={initialValue}>
          <p>reset form</p>
        </button>
        <button onClick={login} data-testid={testId.login}>
          <p>login</p>
        </button>
        <button onClick={logout}>
          <p>logout</p>
        </button>
        <button
          onClick={() =>
            stateHandler('name')({
              target: { value: 'test name' },
            } as ChangeEvent<HTMLInputElement>)
          }
          data-testid={testId['stateHandler-name']}
        >
          <p>stateHandler name</p>
        </button>
        <button
          onClick={() =>
            stateHandler('phone_number')({
              target: { value: 'test phone' },
            } as ChangeEvent<HTMLInputElement>)
          }
          data-testid={testId['stateHandler-phone_number']}
        >
          <p>stateHandler phone number</p>
        </button>
        <button
          onClick={() => stateErrorHandler('name')('error name')}
          data-testid={testId['stateErrorHandler-name']}
        >
          <p>stateErrorHandler name</p>
        </button>
        <button
          onClick={() =>
            stateErrorHandler('phone_number')('error phone number')
          }
          data-testid={testId['stateErrorHandler-phone_number']}
        >
          <p>stateErrorHandler phone number</p>
        </button>
      </div>
    );
  }
  return render(<TestComponent />);
};

beforeEach(() => {
  fetch.mockClear();
});

describe('useAuthHook', () => {
  it('should change LoginForm state', async () => {
    const setupElement = setup();

    fireEvent.click(setupElement.getByTestId(testId['stateHandler-name']));
    fireEvent.click(
      setupElement.getByTestId(testId['stateHandler-phone_number'])
    );

    expect(() => screen.getByText('test name')).not.toThrow();
    expect(() => screen.getByText('test phone')).not.toThrow();

    fireEvent.click(setupElement.getByTestId(testId['reset-form']));
    expect(() => screen.getByText('test name')).toThrow();
    expect(() => screen.getByText('test phone')).toThrow();
  });

  it('should change LoginError state', async () => {
    const setupElement = setup();

    fireEvent.click(setupElement.getByTestId(testId['stateErrorHandler-name']));
    fireEvent.click(
      setupElement.getByTestId(testId['stateErrorHandler-phone_number'])
    );

    expect(() => screen.getByText('error name')).not.toThrow();
    expect(() => screen.getByText('error phone number')).not.toThrow();
  });

  // const response = {
  //   data: { access_token: 'access_token', refresh_token: 'refresh_token' },
  //   message: 'created',
  //   status: 200,
  // };

  // it('should submit login and change access and refresh token', async () => {
  //   fetch.mockResponseOnce(JSON.stringify(response));

  //   const setupElement = setup();

  //   fireEvent.click(setupElement.getByTestId(testId['stateHandler-name']));
  //   fireEvent.click(
  //     setupElement.getByTestId(testId['stateHandler-phone_number'])
  //   );
  //   fireEvent.click(setupElement.getByTestId(testId.login));

  //   expect(() => screen.getByText(response.data.access_token)).not.toThrow();
  //   expect(() => screen.getByText(response.data.refresh_token)).not.toThrow();
  // });
});
