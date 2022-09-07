import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import HeaderSideBar from './HeaderSideBar.organism';

describe('HeaderBody component test', () => {
  it('should render correctly', () => {
    const onClickMenu = jest.fn();

    const tree = renderer
      .create(<HeaderSideBar onClickMenu={onClickMenu} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should called onClickMenu', () => {
    const onClickMenu = jest.fn();

    render(<HeaderSideBar onClickMenu={onClickMenu} />);

    fireEvent.click(screen.getByTestId('header-side-bar-menu'));

    expect(onClickMenu).toHaveBeenCalled();
  });
});
