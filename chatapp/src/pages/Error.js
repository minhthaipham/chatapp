import { ErrorOutline } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";
const Error = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <img
        src="https://img.freepik.com/free-vector/glitch-error-404-page-background_23-2148090410.jpg?w=2000"
        alt="404"
        className="w-1/2"
      />
    </div>
  );
};

export default Error;
