import {
  Add,
  ArrowBack,
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
import { useSelector, useDispatch } from "react-redux";
import * as api from "../../../api";
import { useSocket } from "../../../context/SocketContext";
import ModalSidebar from "./ModalSidebar";
import { back } from "../../../redux/reducer/chatSlice";
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
const SideBar = () => {
  const { result } = JSON.parse(localStorage.getItem("user")) || {};
  const dispatch = useDispatch();
  const socket = useSocket();
  const [open, setOpen] = React.useState(false);
  const { users } = useSelector((state) => state.auth);
  const [checkEmpty, setCheckEmpty] = React.useState(true);
  const [getListChats, setGetListChats] = React.useState([]);
  const [userChats, setUserChats] = React.useState(null);
  const { isOpenSideBar } = useSelector((state) => state.modal);
  const [onlineUsers, setOnlineUsers] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { chats } = useSelector((state) => state.chat);
  const { check } = useSelector((state) => state.chat);
  console.log("check", check);
  // const [open , setOpen] = React.useStateFopen

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
    socket.emit("online", result?._id);
    socket.on("getUsers", (user) => {
      setOnlineUsers(user);
    });
  }, []);
  const handleBack = () => {
    // back();
    if (check) {
      dispatch(back());
    }
    // alert("back");
  };
  // React.useEffect(() => {
  //   hanldeBack();
  // }, [check]);
  return (
    <div className=" h-full w-full ">
      <div className="flex items-center justify-between px-6 pt-6">
        <div onClick={handleBack}>
          <h1 className="text-white text-bold text-2xl cursor-pointer">
            {/* {user?.result?.fullName} */}
            {result?.fullName}
          </h1>
        </div>
        <div className="flex items-center">
          <Fab color="white" aria-label="add" size="small" onClick={handleOpen}>
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
          {getListChats?.map((item, index) =>
            !item?.isGroupChat ? (
              item?.users?.map(
                (user, index) =>
                  user?._id !== result?._id && (
                    <ListUser
                      key={index}
                      user={user}
                      onlineUsers={onlineUsers}
                      item={item}
                    />
                  )
              )
            ) : (
              <ListUser key={index} user={item} onlineUsers={onlineUsers} />
            )
          )}
        </div>
      )}
      <ModalSidebar open={open} handleClose={handleClose} />
    </div>
  );
};

export default SideBar;
