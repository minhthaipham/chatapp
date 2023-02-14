import { Avatar, Tooltip } from "@mui/material";
import React from "react";
import moment from "moment";
const MessageRight = ({ item }) => {
  return (
    <div className="right">
      <div className="flex  max-w-[90%]">
        <div className="bg-cyan-100 p-2 rounded-lg mr-2">
          <p className="text-black text-lg">
            {/* 😯 Trở thành lập trình viên chỉ sau 6 tháng học Online
            hoànsaddddddddddddddddddddddddddddddddddddddddddddd
            toànsadddddddddddddddddddddddddd MIỄN PHÍ 👉 Tìm hiểu ngay:
            https://bit.ly/funixhoclaptrinhmienphi 💻 😯 Trở thành lập trình
            viên chỉ sau 6 tháng học Online
            hoànsaddddddddddddddddddddddddddddddddddddddddddddd
            toànsadddddddddddddddddddddddddd MIỄN PHÍ 👉 Tìm hiểu ngay:
            https://bit.ly/funixhoclaptrinhmienphi casdas right */}
            {item.content}
          </p>
          <p className="text-black text-right text-sm">
            {moment(item.createdAt).format("hh:mm ")}
          </p>
        </div>
        <Tooltip
          title={item?.users?.fullName}
          placement="top"
          className="cursor-pointer"
        >
          <Avatar
            //  src="https://i.pinimg.com/236x/19/23/6a/19236afdd84bc24253fa074bc27c9b64.jpg"
            src={item?.users?.avatar || item?.avatar}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default MessageRight;
