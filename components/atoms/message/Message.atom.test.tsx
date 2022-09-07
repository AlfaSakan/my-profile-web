import renderer from 'react-test-renderer';
import Message from './Message.atom';

describe('message component test', () => {
  it('render correctly', () => {
    const tree = renderer
      .create(
        <Message
          message="message test"
          time={123456789}
          sender={{
            country_code: '+62',
            user_id: '1',
            name: 'admin',
            created_at: 123456789,
            image_url: '',
            phone_number: '8123456789',
            status: '',
            updated_at: 1213456789,
          }}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
