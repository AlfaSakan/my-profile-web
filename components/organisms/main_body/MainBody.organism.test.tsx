import { Message } from 'models/message/message.model';
import { Participant } from 'models/participant/participant.model';
import renderer from 'react-test-renderer';
import MainBody from './MainBody.organism';

describe('HeaderBody component test', () => {
  const messages: Message[] = [
    {
      chat_room_id: '1',
      created_at: 123456789,
      message: '123456789',
      message_id: '1',
      sender_id: '1',
      status: 'chat',
      type: '',
    },
  ];

  const userData: Participant[] = [
    {
      country_code: '+62',
      user_id: '1',
      name: 'admin',
      created_at: 123456789,
      image_url: '',
      phone_number: '8123456789',
      status: '',
      updated_at: 1213456789,
    },
  ];

  it('should render correctly', () => {
    const tree = renderer
      .create(<MainBody userId="1" messages={messages} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const tree = renderer
      .create(<MainBody userId="1" messages={messages} userData={userData} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
