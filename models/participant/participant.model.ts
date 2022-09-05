import { User } from 'models/user/user.model';

export interface Participant extends User {
  isFriend?: boolean;
}
