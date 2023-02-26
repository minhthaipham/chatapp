import { Avatar, Badge, styled } from "@mui/material";
import React from "react";
// import Lottie from "lottie-react";
import { GIFJSON } from "../../constant";
import * as api from "../../api";
import { accessChat, getCurrentChat } from "../../redux/reducer/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../context/SocketContext";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
const ListUser = ({ user, onlineUsers, item }) => {
  const socket = useSocket();
  const { result } = JSON.parse(localStorage.getItem("user"));
  const [noti, setNoti] = React.useState(0);
  const { check } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const handleGetChat = (id) => {
    // try {
    const data = {
      ida: result._id,
      idb: id,
    };

    dispatch(getCurrentChat(id));
  };

  const LatestMessage = () => {
    if (item?.latestMessage) {
      if (
        item?.latestMessage?.users === result?._id ||
        user?.latestMessage?.users === result?._id
      ) {
        return (
          "Bạn : " + item?.latestMessage?.content ||
          user?.latestMessage?.content
        );
      } else {
        return (
          item?.latestMessage?.nameUser +
            " : " +
            item?.latestMessage?.content ||
          user?.latestMessage?.nameUser + " : " + user?.latestMessage?.content
        );
      }
    } else {
      return "";
    }
  };

  React.useEffect(() => {
    socket.on("notify", (data) => {
      if (
        data?.users?._id === user?._id &&
        (item?._id === data?.chat || user?._id === data?.chat)
      ) {
        setNoti((prev) => prev + 1);
      }
    });
  }, [socket, user?._id]);

  return (
    <div
      className="mt-3 cursor-pointer hover:bg-[rgba(0,0,0,0.1)] px-6 py-2"
      // onClick={() => {
      //   handleGetChat(user._id);
      // }}
      onClick={() => {
        handleGetChat(item?._id || user?._id);
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {onlineUsers?.find(
            (userOnline) => userOnline?.userId === user?._id
          ) ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
              className="mr-2"
            >
              <Avatar src={user?.avatar || user?.image} />
            </StyledBadge>
          ) : (
            <Avatar src={user?.avatar || user?.image} className="mr-2" />
          )}
          {/* <h1 className="text-white text-bold text-xl">{user?.fullName}</h1> */}
          <div className="flex flex-col">
            <p className="text-white text-bold text-xl  ">
              {user?.fullName || user?.chatName}
            </p>
            <p className="text-white text-bold text-sm  opacity-[0.7]">
              {LatestMessage()}
            </p>
          </div>
        </div>
        {/* {noti > 0 && (
          <div
            className="rounded-full  w-[25px] h-[25px] bg-red-500 
          flex items-center justify-center text-white font-bold text-[18px]
        "
          >
            {noti}
          </div>
        )} */}

        {!check && noti > 0 ? (
          <div
            className="rounded-full  w-[25px] h-[25px] bg-red-500
          flex items-center justify-center text-white font-bold text-[18px]
        "
          >
            {noti}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ListUser;
