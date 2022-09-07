import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Input from './Input.atom';

describe('input component test', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Input />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with props', () => {
    const tree = renderer.create(<Input value="test" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with props', () => {
    const onChange = jest.fn();
    const utils = render(<Input value={'val'} onChange={onChange} />);
    const input = utils.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'change' } });
    expect(onChange).toHaveBeenCalled();
  });
});
