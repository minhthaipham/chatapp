import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logOutLocal } from "../../service/authService";
const ViewLogOut = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logOutLocal();
    navigate("/login");
  };
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <h2 className="text-4xl">
        Vui lòng đăng xuất trước khi tạo tài khoản mới
      </h2>
      <div className="mt-5 flex-row space-x-2">
        <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link to="/home">Trang chủ</Link>
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default ViewLogOut;
