import { Avatar, Tooltip } from "@mui/material";
import React from "react";
import moment from "moment";
import { useSocket } from "../../context/SocketContext";
const MessageLeft = ({ item }) => {
  const socket = useSocket();
  const [memberLeaveRoom, setMemberLeaveRoom] = React.useState("");
  const [checkMemberLeaveRoom, setCheckMemberLeaveRoom] = React.useState(false);
  React.useEffect(() => {
    socket.on("leaveRoom", (data) => {
      console.log("data", data);
      setCheckMemberLeaveRoom(true);
      setMemberLeaveRoom(data);
    });
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setCheckMemberLeaveRoom(false);
    }, 5000);
  }, [checkMemberLeaveRoom]);

  return (
    <div className="left">
      {checkMemberLeaveRoom && (
        <div className="absolute bottom-12 right-1/3 transform -translate-x-1/2 ">
          <div className="flex items-center">
            <div>
              <p className="text-white text-lg font-bold">
                {memberLeaveRoom} đã rời khỏi nhóm
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex max-w-[90%]">
        <Tooltip
          title={item?.users?.fullName}
          placement="top"
          className="cursor-pointer"
        >
          <Avatar src={item?.users?.avatar || item?.avatar} />
        </Tooltip>

        <div className="bg-white p-2 rounded-lg ml-2">
          <p className="text-black text-lg">{item.content}</p>
          <p className="text-black text-right text-sm">
            {moment(item.createdAt).format("hh:mm ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageLeft;
