import { Contact } from 'models/contact/contact.model';
import { Response } from 'models/response/response.model';

export const contact1 = {
  friend_id: '2',
  status: 'active',
  user_id: '1',
};

export const contact2 = {
  friend_id: '1',
  status: 'active',
  user_id: '2',
};

export const contacts: Contact[] = [contact1, contact2];

export const response: Response<Contact[]> = {
  data: contacts,
  message: 'OK',
  status: 200,
};

export const response1: Response<Contact> = {
  data: contact1,
  message: 'OK',
  status: 201,
};
