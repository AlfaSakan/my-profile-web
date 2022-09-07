import renderer from 'react-test-renderer';
import TextError from './TextError.atom';

describe('TextError component test', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<TextError errorMessage="error" />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
