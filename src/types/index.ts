export interface WaitlistUser {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  platform: string;
  followers: string;
  goals: string;
  iris_id: string;
  user_color: string;
  user_emoji: string;
  position: number;
}

export interface Message {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  user_role: string;
  user_color: string;
  message: string;
  reply_to: string | null;
  reply_user_name: string | null;
  reply_message: string | null;
  reply_avatar: string | null;
}

export interface DatabaseNotification {
  id: string;
  created_at: string;
  recipient_id: string;
  message_id: string;
  is_read: boolean;
  message?: {
    user_name: string;
    user_avatar: string;
    message: string;
  };
}

export interface Referral {
  id: string;
  created_at: string;
  referrer_id: string;
  referred_id: string;
  status: string;
}

export interface ReplyNotification {
  id: string;
  fromUser: string;
  message: string;
  timestamp: string;
  originalMessage: string;
  messageId: string;
} 
