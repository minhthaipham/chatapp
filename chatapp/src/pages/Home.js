import React from "react";
import SideBar from "../components/chat/SideBar/SideBar";
import Chat from "../components/chat/ChatMessage/Chat";
import Detail from "../components/chat/RightBar/Detail";
import { useSelector, useDispatch } from "react-redux";
import Lottie from "react-lottie";
import { GIFJSON } from "../constant";
import { closeSideBar } from "../redux/reducer/modalSlice";
import decode from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import { checkTokenLocal, logOutLocal } from "../service/authService";
import * as api from "../api";
import { useSocket } from "../context/SocketContext";
const Home = () => {
  const socket = useSocket();
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const { user: cc } = useSelector((state) => state.auth);
  // console.log("result", cc);
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen } = useSelector((state) => state.modal);
  const [dataSearch, setDataSearch] = React.useState([]);
  const [idUSerChat, setIdUSerChat] = React.useState([]);
  const [getChat, setGetChat] = React.useState([]);
  const [dataTest, setDataTest] = React.useState([]);
  const [online, setOnline] = React.useState([]);
  const { chats } = useSelector((state) => state.chat);
  const otherUser = chats?.users?.find(
    (users) => users._id !== user?.result._id
  );
  const [sendMessage, setSendMessage] = React.useState(null);
  const [receiveMessage, setReceiveMessage] = React.useState(null);
  const { isOpenSideBar } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const dataUsers = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Nguyễn Văn B",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
  ];
  // React.useEffect(() => {
  //   if (sendMessage !== null) {
  //     socket.emit("sendMessage", sendMessage);
  //   }
  // }, [sendMessage]);

  // React.useEffect(() => {
  //   socket.on("receiveMessage", (data) => {
  //     setReceiveMessage(data);
  //     console.log("data", data);
  //   });
  // }, []);

  const handleClick = () => {
    //   dispatch(closeSideBar());
    if (isOpenSideBar) {
      dispatch(closeSideBar());
    }
  };
  React.useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logOutLocal();
    }
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [location]);

  const Navigate = () => {
    navigate("/login");
  };

  return (
    <div className="home">
      {!user ? (
        <Navigate />
      ) : (
        <div className="grid grid-cols-4 " onClick={handleClick}>
          <div
            // className="col-span-4 md:col-span-1 h-screen  bg-blue-400 "
            className={
              chats
                ? "col-span-1 md:col-span-1 h-screen  bg-blue-400 "
                : "col-span-4 md:col-span-1 h-screen  bg-blue-400 "
            }
          >
            <SideBar setDataTest={setDataTest} />
          </div>
          <div
            className={
              isOpen && chats
                ? "col-span-2 md:block hidden"
                : "col-span-3 md:block "
            }
          >
            {chats ? (
              <Chat
                idChat={chats?._id}
                // setSendMessage={setSendMessage}
                // receiveMessage={receiveMessage}
              />
            ) : (
              <div className="flex justify-center items-center h-screen flex-col">
                <h1 className="text-2xl font-bold text-gray-700">
                  Click on the user to start chatting
                </h1>

                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: GIFJSON.Welcome,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                  height={200}
                  width={200}
                />

                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: GIFJSON.Robot,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                  height={300}
                  width={300}
                />
              </div>
            )}
          </div>
          <div className={isOpen ? "col-span-1 md:block hidden" : "hidden"}>
            <Detail otherUser={otherUser} />
          </div>
        </div>
      )}
    </div>
    // <TestChat />
  );
};

export default Home;
