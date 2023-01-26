import React, { createContext, useContext } from "react";
import { io } from "socket.io-client";
const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ url, children }) => {
  const socket = io(url);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
