import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Tab,
  Tabs,
  TextField,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/reducer/authSlice";
import Lottie from "react-lottie";
import { GIFJSON } from "../../constant";
import { checkTokenLocal } from "../../service/authService";
const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.email === "" || userData.password === "") {
      toast.warn("Please enter all the required fields");
      return;
    }

    dispatch(
      login({
        data: userData,
        toast,
        navigate,
      })
    );
  };
  React.useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  React.useEffect(() => {
    if (checkTokenLocal()) {
      navigate("/home");
    }
    setIsLoading(true);
  }, [navigate]);

  return !isLoading ? (
    <div></div>
  ) : (
    <div className="login">
      (
      <div className="flex items-center justify-center px-36  pt-[7rem] ">
        <div className="bg-slate-50 w-full h-full px-16 flex items-center py-8 min-w-[400px] rounded-lg">
          <div className="w-full md:w-1/2 md:mx-10">
            <h1 className="text-3xl font-bold text-gray-700 text-center">
              Login
            </h1>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%", marginTop: "10px" },
              }}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className="mb-10">
                <FormControl
                  sx={{ width: "100%" }}
                  variant="filled"
                  className="w-full"
                >
                  <InputLabel htmlFor="filled-adornment-password">
                    Email
                  </InputLabel>
                  <FilledInput
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="w-full"
                  />
                </FormControl>
              </div>
              <div className="mb-10">
                <FormControl sx={{ width: "100%" }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">
                    Password
                  </InputLabel>
                  <FilledInput
                    id="filled-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={userData.password}
                    onChange={handleChange}
                    name="password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <div className="mb-10">
                <p>
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Register
                  </Link>
                </p>
              </div>
              <div className="mb-10">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 hover:shadow-lg"
                >
                  Login
                </button>
              </div>
            </Box>
          </div>
          <div className="md:w-1/2 hidden md:block">
            <img
              src="https://static.vecteezy.com/system/resources/previews/000/561/500/original/chat-app-logo-icon-vector.jpg"
              alt="logo"
              className=" object-cover rounded-md"
            />
          </div>
        </div>
      </div>
      )
    </div>
  );
};

export default Login;
