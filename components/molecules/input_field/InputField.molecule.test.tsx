import renderer from 'react-test-renderer';
import InputField from './InputField.molecule';

describe('InputField component test', () => {
  it('should render correctly', () => {
    const onChange = jest.fn();
    const tree = renderer
      .create(
        <InputField
          label="input"
          onChange={onChange}
          value="test"
          textError="text error"
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
