export interface Message {
  message_id: string;
  chat_room_id: string;
  sender_id: string;
  status: string;
  type: string;
  message: string;
  created_at: number;
}
