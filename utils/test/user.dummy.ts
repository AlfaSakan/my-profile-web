import { Response } from 'models/response/response.model';
import { User } from 'models/user/user.model';

export const user1: User = {
  country_code: '+62',
  created_at: 123,
  image_url: '',
  name: 'user 1',
  phone_number: '8123456789',
  status: 'status',
  updated_at: 1234,
  user_id: '1',
};

export const user2: User = {
  country_code: '+62',
  created_at: 123,
  image_url: '',
  name: 'user 2',
  phone_number: '8123456789',
  status: 'status',
  updated_at: 1234,
  user_id: '1',
};

export const users: User[] = [user1, user2];

export const responseUser: Response<User> = {
  data: user1,
  message: 'OK',
  status: 200,
};

export const responseUsers: Response<User[]> = {
  data: users,
  message: 'OK',
  status: 200,
};
