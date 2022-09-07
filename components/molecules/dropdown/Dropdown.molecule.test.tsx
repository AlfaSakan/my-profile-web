import renderer from 'react-test-renderer';
import Dropdown from './Dropdown.molecule';

describe('Dropdown component test', () => {
  it('should render correctly', () => {
    const datas = [
      {
        user_id: '123',
        name: 'test',
      },
    ];
    const onChange = jest.fn();
    const tree = renderer
      .create(<Dropdown datas={datas} onChangeBox={onChange} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
