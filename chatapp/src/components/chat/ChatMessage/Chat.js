import {
  ArrowBack,
  AttachFile,
  InsertEmoticon,
  Send,
} from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import React from "react";
import { GIFJSON } from "../../../constant";
import Message from "../../messages/Message";
import Lottie from "react-lottie";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/reducer/modalSlice";
import MessageLeft from "../../messages/MessageLeft";
import MessageRight from "../../messages/MessageRight";
import { useSocket } from "../../../context/SocketContext";
import EmojiPicker from "emoji-picker-react";
import * as api from "../../../api";
import { back } from "../../../redux/reducer/chatSlice";
import SideBarMenu from "../SideBar/SideBarMenu";
import ChatGroupMenu from "./ChatGroup/ChatGroupMenu";
const Chat = ({ idChat }) => {
  const socket = useSocket();

  const dispatch = useDispatch();
  const { result } = JSON.parse(localStorage.getItem("user"));
  const { isOpen } = useSelector((state) => state.modal);
  const [dataChat, setDataChat] = React.useState([]);
  const [textMessage, setTextMessage] = React.useState("");
  const [image, setImage] = React.useState(null);
  const { chats } = useSelector((state) => state.chat);
  const [typing, setTyping] = React.useState(false);
  const [typingTimeout, setTypingTimeout] = React.useState(null);
  const { check } = useSelector((state) => state.chat);
  const [nameGroup, setNameGroup] = React.useState(chats?.chatName);
  console.log(chats);
  const [showIcon, setShowIcon] = React.useState(false);
  const inputRef = React.useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (textMessage === "") {
      return;
    }
    const message = {
      idChat,
      content: textMessage,
      nameUser: result.fullName,
      image,
    };
    try {
      const { data } = await api.sendMessage(message);
      setDataChat([...dataChat, data]);
      socket.emit("sendMessage", { data, idChat });
      // socket.emit("sendMessage", { dataChat, idChat });
      setTextMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    socket.on("receiveMessage", (dataChat) => {
      // if (dataChat?.chat === idChat) {
      //   setDataChat((prev) => [...prev, dataChat]);
      // } else {
      // }
      if (dataChat?.chat === idChat) {
        setDataChat((prev) => [...prev, dataChat]);
      }
    });
  }, [socket]);

  const fetchDataMessage = async () => {
    try {
      const { data } = await api.getMessages(idChat);
      setDataChat(data);
      socket.emit("join", idChat);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchDataMessage();
  }, [idChat]);

  React.useEffect(() => {
    socket.on("typing-start-server", () => {
      setTyping(true);
    });
    socket.on("typing-end-server", () => {
      setTyping(false);
    });
  }, []);

  const handleChange = (e) => {
    setTextMessage(e.target.value);
    socket.emit("typing-start", idChat);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(
      setTimeout(() => {
        socket.emit("typing-end", idChat);
      }, 1000)
    );
  };
  const handleBack = () => {
    if (check) {
      dispatch(back());
    }
  };

  React.useEffect(() => {
    if (check) {
      inputRef.current.focus();
    }
  }, [check]);

  React.useEffect(() => {
    socket.on("reNameGroup", (data) => {
      setNameGroup(data);
    });
  }, []);

  const handleShowIcon = () => {
    setShowIcon(!showIcon);
  };
  const onEmojiClick = (event, emojiObject) => {
    setTextMessage(textMessage + event.emoji);
  };

  return (
    <div className="h-screen">
      {/* //header */}
      <div className="bg-slate-50 shadow-sm h-[70px]">
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center ">
            <div
              className="block md:hidden pr-2 cursor-pointer"
              onClick={handleBack}
            >
              <ArrowBack />
            </div>
            <Avatar
              src={
                chats?.image ||
                chats?.users.find((item) => item._id !== result._id)?.avatar
              }
              size={50}
              onClick={() => dispatch(closeModal())}
              className="cursor-pointer"
            />
            <h1 className="text-bold text-2xl  ml-2">
              {chats?.chatName ||
                chats?.users.find((item) => item._id !== result._id)?.fullName}
            </h1>
          </div>
          {/* <div>
          </div> */}
          <div className="flex items-center">
            <div>
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: GIFJSON.Call,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                height={45}
                width={45}
              />
            </div>
            <div>
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: GIFJSON.Video,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                height={45}
                width={45}
              />
            </div>
            <div>{chats?.isGroupChat && <ChatGroupMenu />}</div>
          </div>
        </div>
      </div>
      <div className="bg-blue-900 h-[calc(100%-70px-38px)] ">
        <div className="h-full overflow-y-auto bg-slate-300 flex flex-col-reverse">
          <div className="absolute ml-4"></div>
          <div className="w-full p-6  ">
            {dataChat?.map((item) => {
              if (item?.users?._id === result._id) {
                return <MessageRight key={item._id} item={item} />;
              } else {
                return <MessageLeft key={item._id} item={item} />;
              }
            })}
          </div>
        </div>

        <div className="absolute bottom-10 ml-4">
          {typing && (
            <div className="flex items-center">
              <div>
                <p className="text-white text-lg font-bold">
                  {
                    chats?.users.find((item) => item._id !== result._id)
                      ?.fullName
                  }{" "}
                </p>
              </div>
              <div>
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: GIFJSON.Typing,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                  height={50}
                  width={50}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="h-[30px] w-full flex items-center  ">
        <div className="w-full relative">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full h-full rounded-md p-3 focus:outline-none"
              placeholder="Type a message"
              value={textMessage}
              onChange={handleChange}
              ref={inputRef}
            />
            <div className="absolute right-0 top-[50%] transform -translate-y-1/2 cursor-pointer flex items-center h-full">
              <InsertEmoticon
                className=" rounded-md text-black mr-3"
                onClick={handleShowIcon}
              />
              {showIcon && (
                <div className="absolute bottom-[70%] right-[100%]">
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              )}
              <div className="relative">
                <input
                  type="file"
                  className="
                absolute top-0 left-0 w-[1.3rem] h-full  cursor-pointer opacity-0
                  "
                  onChange={handleUpload}
                />
                <AttachFile className="rounded-md text-black mr-3 w-[1rem]" />
              </div>
              <Button
                type="submit"
                variant="contained"
                endIcon={<Send />}
                // fullWidth
                sx={{
                  height: "100%",
                }}
              >
                Send
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
