export const API = {
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/register",
    PROFILE: "/auth/profile",
  },
  CHAT: {
    CHATS: "/chat",
    MESSAGES: (chatId: string) => `/chat/${chatId}/messages`,
    CREATE: "/chat",
    SEND: "/chat/send-message",
  },
};
