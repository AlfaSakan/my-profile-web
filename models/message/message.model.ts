export interface Message {
  message_id: number;
  chat_room_id: number;
  sender_id: number;
  status: string;
  type: string;
  message: string;
  created_at: number;
}
