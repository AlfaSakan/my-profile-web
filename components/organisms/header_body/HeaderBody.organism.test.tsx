import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import HeaderBody from './HeaderBody.organism';

describe('HeaderBody component test', () => {
  it('should render correctly', () => {
    const onClickMenu = jest.fn();

    const tree = renderer
      .create(
        <HeaderBody
          isFocus
          name="test"
          onClickMenu={onClickMenu}
          status="status"
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should called onClickMenu', () => {
    const onClickMenu = jest.fn();

    render(
      <HeaderBody
        isFocus
        name="test"
        onClickMenu={onClickMenu}
        status="status"
      />
    );

    fireEvent.click(screen.getByTestId('header-body-menu'));

    expect(onClickMenu).toHaveBeenCalled();
  });
});
