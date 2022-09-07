import renderer from 'react-test-renderer';
import Divider from './Divider.atom';

describe('divider component test', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Divider />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
