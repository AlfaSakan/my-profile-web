import renderer from 'react-test-renderer';
import Login from './Login.molecule';

describe('Login component test', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Login />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
