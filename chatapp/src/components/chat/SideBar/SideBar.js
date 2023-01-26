import {
  Add,
  ContactPage,
  MoreVert,
  PeopleOutline,
  PhoneBluetoothSpeaker,
  Restore,
  Search,
} from "@mui/icons-material";
import {
  Avatar,
  Drawer,
  Fab,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import ListUser from "../../user/ListUser";
import ListUserSearch from "../../user/ListUserSearch";
import SideBarMenu from "./SideBarMenu";
import SideBarSearchUser from "./SideBarSearchUser";
import { GIFJSON } from "../../../constant";
import Lottie from "react-lottie";
import TestDrawer from "../../TestDrawer";
import { Menu } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import * as api from "../../../api";
import { useSocket } from "../../../context/SocketContext";
const menu = [
  {
    id: 0,
    source: GIFJSON.History,
    width: 30,
    height: 30,
  },
  {
    id: 1,
    source: GIFJSON.People,
    width: 50,
    height: 50,
  },
  {
    id: 2,
    source: GIFJSON.Phone,
    width: 30,
    height: 30,
  },
];
const SideBar = ({ setDataTest }) => {
  const { result } = JSON.parse(localStorage.getItem("user")) || {};
  const socket = useSocket();
  const [open, setOpen] = React.useState(false);
  const { users } = useSelector((state) => state.auth);
  const [checkEmpty, setCheckEmpty] = React.useState(true);
  const [getListChats, setGetListChats] = React.useState([]);
  const [userChats, setUserChats] = React.useState(null);
  const { isOpenSideBar } = useSelector((state) => state.modal);
  const { chats } = useSelector((state) => state.chat);

  const [onlineUsers, setOnlineUsers] = React.useState([]);
  const [testOnline, setTestOnline] = React.useState([]);
  console.log("onlineUsers", testOnline);
  // console.log("onlineUsers", onlineUsers);
  // console.log("userChat", UserChat);
  React.useEffect(() => {
    const fetchChat = async () => {
      const { data } = await api.listChatOfUser();
      setGetListChats(data);
      // setDataTest(data);
    };
    fetchChat();
  }, [chats]);
  React.useEffect(() => {
    socket.emit("newUser", result?._id);
    socket.on("getUsers", (user) => {
      setOnlineUsers(user);
    });
  }, []);
  // React.useEffect(() => {
  //   socket.emit("newUser", result);
  //   socket.on("connected", (testUser) => {
  //     setTestOnline(testUser);
  //   });
  // }, []);
  return (
    <div className=" h-full w-full ">
      <div className="flex items-center justify-between px-6 pt-6">
        <div>
          <h1 className="text-white text-bold text-2xl cursor-pointer">
            {/* {user?.result?.fullName} */}
            {result?.fullName}
          </h1>
        </div>
        <div className="flex items-center">
          <Fab color="white" aria-label="add" size="small">
            <Add />
          </Fab>
          {/* <MoreVert className="ml-2" /> */}
          <SideBarMenu />
        </div>
      </div>
      <div className="mt-5 px-6">
        <SideBarSearchUser setCheckEmpty={setCheckEmpty} />
      </div>
      {isOpenSideBar ? (
        checkEmpty ? (
          users?.map((users, index) => (
            <ListUserSearch
              key={index}
              users={users}
              setUserChats={setUserChats}
              onlineUsers={onlineUsers}
            />
          ))
        ) : (
          <div></div>
        )
      ) : (
        // <TestDrawer open={open} setOpen={setOpen} />
        <div>
          <div className="mt-5 px-6">
            <div className="flex items-center justify-between">
              {menu.map((item, index) => (
                <div key={index}>
                  <Lottie
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: item.source,
                      rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice",
                      },
                    }}
                    height={item.height}
                    width={item.width}
                  />
                </div>
              ))}
              <ContactPage className="text-white" />
            </div>
          </div>
          {/* {data.map((user, index) => (
            <ListUser key={index} user={user} />
          ))} */}
          {/* {getChat?.map((user, index) =>
            user?.users?.map((user, index) => (
              <div key={index}>
                <h1>cc</h1>
              </div>
            ))
          )} */}
          {getListChats?.map((user, index) =>
            user?.users?.map(
              (user, index) =>
                user?._id !== result?._id && (
                  <ListUser
                    key={index}
                    user={user}
                    setUserChats={setUserChats}
                    onlineUsers={onlineUsers}
                  />
                )
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SideBar;