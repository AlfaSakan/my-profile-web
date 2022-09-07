import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Checkbox from './Checkbox.atom';

describe('buttom component test', () => {
  test('should render correctly', () => {
    const tree = renderer
      .create(
        <Checkbox
          onChange={() => {}}
          data={{ checked: true, label: 'Label', value: 'label' }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render correctly', () => {
    const tree = renderer
      .create(
        <Checkbox
          onChange={() => {}}
          data={{ checked: false, label: 'Label', value: 'label' }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should onclick called', () => {
    const onClick = jest.fn();
    render(
      <Checkbox
        onChange={onClick}
        data={{ checked: false, label: 'Label', value: 'label' }}
      />
    );
    fireEvent.click(screen.getByText('Label'));
    expect(onClick).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
