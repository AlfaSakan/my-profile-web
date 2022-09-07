import renderer from 'react-test-renderer';
import Modal from './Modal.atom';

describe('modal component test', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <Modal isOpen>
          <p>mlampclmspc</p>
        </Modal>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
