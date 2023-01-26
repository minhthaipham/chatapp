import { Avatar } from "@mui/material";
import React from "react";

const Message = ({ item }) => {
  return (
    // <div className={item?.isMe ? "left" : "right"}>
    <div className="right">
      <div className="flex  ">
        <Avatar src="https://i.pinimg.com/236x/19/23/6a/19236afdd84bc24253fa074bc27c9b64.jpg" />
        <div className="bg-gray-400 p-2 rounded-lg ml-2">
          <p className="text-white text-lg">
            {/* 😯 Trở thành lập trình viên chỉ sau 6 tháng học Online
            hoànsaddddddddddddddddddddddddddddddddddddddddddddd
            toànsadddddddddddddddddddddddddd MIỄN PHÍ 👉 Tìm hiểu ngay:
            https://bit.ly/funixhoclaptrinhmienphi 💻 😯 Trở thành lập trình
            viên chỉ sau 6 tháng học Online
            hoànsaddddddddddddddddddddddddddddddddddddddddddddd
            toànsadddddddddddddddddddddddddd MIỄN PHÍ 👉 Tìm hiểu ngay:
            https://bit.ly/funixhoclaptrinhmienphi casdas */}
            {/* {item.message} */}
          </p>
          <p className="text-white text-right text-sm">10.06 p.m</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
