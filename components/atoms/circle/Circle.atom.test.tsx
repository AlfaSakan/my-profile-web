import renderer from 'react-test-renderer';
import Circle from './Circle.atom';

describe('circle component test', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <Circle>
          <p>test</p>
        </Circle>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
