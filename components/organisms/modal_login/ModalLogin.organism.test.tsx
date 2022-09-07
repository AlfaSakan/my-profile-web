import renderer from 'react-test-renderer';
import ModalLogin from './ModalLogin.organism';

describe('HeaderBody component test', () => {
  it('should render correctly', () => {
    const onChangePhoneNumber = jest.fn();
    const onChangeName = jest.fn();
    const onClickLogin = jest.fn();

    const tree = renderer
      .create(
        <ModalLogin
          name="name"
          onChangePhoneNumber={onChangePhoneNumber}
          isOpen
          onChangeName={onChangeName}
          phoneNumber="8123456789"
          onClickLogin={onClickLogin}
          textErrorName="textErrorName"
          textErrorPhone="textErrorPhone"
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
