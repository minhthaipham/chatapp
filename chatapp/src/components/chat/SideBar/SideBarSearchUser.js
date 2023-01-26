import { Search } from "@mui/icons-material";
import React from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import _ from "lodash";
import { closeSideBar } from "../../../redux/reducer/modalSlice";
import { searchUser } from "../../../redux/reducer/authSlice";
const SideBarSearchUser = ({ setCheckEmpty }) => {
  // const { user } = React.useContext(AppContext);
  // console.log(data);
  const [search, setSearch] = React.useState("");
  const timeout = React.useRef();
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

  const handleChange = (e) => {
    setSearch(e.target.value);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      console.log(e.target.value);
      // if e.target.value is empty, do nothing

      if (e.target.value === "") {
        setCheckEmpty(false);
      } else {
        dispatch(searchUser({ data: e.target.value }));
        setCheckEmpty(true);
      }
    }, 1000); // 500 là thời gian chờ trước khi gọi hàm xử lý sự kiện (tính bằng milisecond)
  };
  const handleCloseSideBar = () => {
    dispatch(closeSideBar());
  };
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        value={search}
        onClick={handleCloseSideBar}
        onChange={handleChange}
        className="bg-white rounded-full w-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
      />
      <Search className="absolute top-[50%] left-0 translate-y-[-50%] ml-2 " />
      {/* </form> */}
    </div>
  );
};

export default SideBarSearchUser;
