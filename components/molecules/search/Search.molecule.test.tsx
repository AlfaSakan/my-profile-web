import renderer from 'react-test-renderer';
import Search from './Search.molecule';

describe('Search component test', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Search />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
