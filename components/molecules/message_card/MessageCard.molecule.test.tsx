import renderer from 'react-test-renderer';
import MessageCard from './MessageCard.molecule';

describe('MessageCard component test', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <MessageCard dateUnix={123456789} lastMessage="new group" name="alfa" />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
