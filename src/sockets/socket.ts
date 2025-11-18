import { io } from "socket.io-client";

export const initSocket = (token: string) => {
  return io(import.meta.env.VITE_SOCKET_URL, {
    auth: { token },
  });
};
