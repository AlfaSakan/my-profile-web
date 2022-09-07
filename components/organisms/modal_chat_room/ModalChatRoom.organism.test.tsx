import renderer from 'react-test-renderer';
import ModalChatRoom from './ModalChatRoom.organism';

describe('HeaderBody component test', () => {
  it('should render correctly', () => {
    const onChangeName = jest.fn();
    const onChangeDescription = jest.fn();
    const onClickSubmit = jest.fn();
    const onClose = jest.fn();

    const tree = renderer
      .create(
        <ModalChatRoom
          descVal="description"
          nameVal="name value"
          onChangeName={onChangeName}
          onChangeDescription={onChangeDescription}
          isOpen
          onClickSubmit={onClickSubmit}
          onClose={onClose}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
