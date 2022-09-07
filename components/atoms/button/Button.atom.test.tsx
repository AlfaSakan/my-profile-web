import renderer from 'react-test-renderer';
import Button from './Button.atom';

describe('buttom component test', () => {
  test('should render correctly', () => {
    const tree = renderer
      .create(<Button onClick={() => {}} text="Text" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render correctly', () => {
    const tree = renderer.create(<Button text="Text" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
