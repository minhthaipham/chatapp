import React from "react";
import { useNavigate } from "react-router-dom";
import ViewerWay from "../components/ViewerWay";
import { checkTokenLocal } from "../service/authService";
const Auth = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    setUpData();
  }, []);

  const setUpData = () => {
    // const userData = await JSON.parse(localStorage.getItem("user"));
    // if (userData) {
    //   userData?.token ? navigate("/home") : navigate("/login");
    // }
    const token = checkTokenLocal();
    setTimeout(() => {
      if (token) {
        navigate("/home");
      } else {
        navigate("/login");
      }
    }, 1000);
  };

  return <ViewerWay />;
};

export default Auth;
