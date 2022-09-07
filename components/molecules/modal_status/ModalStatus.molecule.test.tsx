import renderer from 'react-test-renderer';
import ModalStatus from './ModalStatus.molecule';

describe('ModalStatus component test', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(<ModalStatus message="test message" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
