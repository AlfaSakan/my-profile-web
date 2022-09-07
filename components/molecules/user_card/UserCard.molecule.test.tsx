import renderer from 'react-test-renderer';
import UserCard from './UserCard.molecule';

describe('UserCard component test', () => {
  const user = {
    country_code: '+62',
    user_id: '1',
    name: 'admin',
    created_at: 123456789,
    image_url: '',
    phone_number: '8123456789',
    status: '',
    updated_at: 1213456789,
  };

  it('should render correctly', () => {
    const tree = renderer.create(<UserCard user={user} isFriend />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const tree = renderer.create(<UserCard user={user} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
