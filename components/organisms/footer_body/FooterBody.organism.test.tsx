import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import FooterBody from './FooterBody.organism';

describe('FooterBody component test', () => {
  it('should render correctly', () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    const tree = renderer
      .create(
        <FooterBody
          messageValue="value"
          onChange={onChange}
          onSubmitMessage={onSubmit}
          isLoading
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    const tree = renderer
      .create(
        <FooterBody
          messageValue="value"
          onChange={onChange}
          onSubmitMessage={onSubmit}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should cannot called submit when loading', () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    render(
      <FooterBody
        messageValue="value"
        onChange={onChange}
        onSubmitMessage={onSubmit}
        isLoading
      />
    );

    fireEvent.click(screen.getByTestId('footer-body-submit'));

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
