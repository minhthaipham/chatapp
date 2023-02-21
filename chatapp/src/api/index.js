import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }
  return req;
});

// auth
export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);
export const update = (data, id) => API.patch(`/auth/update/${id}`, data, id);
// chat
export const getUser = (data) => API.get(`/chat/user?fullName=${data}`);
export const listChatOfUser = () => API.get(`/chat`);
export const accessChat = (data) => API.post(`/chat`, data);
export const getChat = (id) => API.get(`/chat/getChat/${id}`);

// group

export const createGroup = (data) => API.post(`/chat/create`, data);

// message
export const sendMessage = (data) => API.post(`/message/sendMessage`, data);
export const getMessages = (id) => API.get(`/message/getMessages/${id}`, id);
export const reNameGroup = (data) => API.put(`/chat/rename`, data);
