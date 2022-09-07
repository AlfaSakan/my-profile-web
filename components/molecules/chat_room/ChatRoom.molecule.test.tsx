import renderer from 'react-test-renderer';
import ChatRoom from './ChatRoom.molecule';

describe('ChatRoom component test', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <ChatRoom
          descVal="description"
          nameVal="name value"
          onChangeName={() => {}}
          onChangeDescription={() => {}}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
