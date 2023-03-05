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
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/reducer/authSlice";
import { checkTokenLocal } from "../../service/authService";
import ViewLogOut from "./ViewLogOut";
const Register = () => {
  const navigate = useNavigate();
  // const [file, setFile] = React.useState("");
  // console.log(file);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = React.useState(false);
  const [status, setStatus] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const phoneRegex = /^\d{10}$/;
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [userData, setUserData] = React.useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", userData.avatar);
    formData.append("upload_preset", "chat-app");
    formData.append("cloud_name", "dzttbzvs7");
    fetch("https://api.cloudinary.com/v1_1/dzttbzvs7/image/upload", {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        // setUserData({ ...userData, avatar: data.url.toString() });
        if (
          userData.fullName === "" ||
          userData.email === "" ||
          userData.password === "" ||
          userData.address === "" ||
          userData.phone === ""
        ) {
          toast.warn("Please enter all the required fields");
          return;
        }

        dispatch(
          register({
            data: { ...userData, avatar: data.url.toString() },
            toast,
            navigate,
          })
        );
        console.log(userData);
        console.log(data.url.toString());
      });
  };

  React.useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  React.useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (checkTokenLocal()) {
        // setIsLoading(true);
        setStatus(true);
        setIsLoading(false);
      } else {
        // setIsLoading(false);
        // setStatus(true);
        setStatus(false);
        setIsLoading(false);
      }
    }, 1000);
  }, [navigate]);
  return isLoading ? (
    <div></div>
  ) : status ? (
    <ViewLogOut />
  ) : (
    <div className="min-h-screen flex items-center justify-center px-36  py-8 ">
      <div className="bg-slate-50 w-full h-full px-16 flex items-center py-8 min-w-[400px] rounded-lg">
        <div className="w-full md:w-1/2 md:mx-10">
          <h1 className="text-3xl font-bold text-gray-700 text-center">
            Register
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
                  Full Name
                </InputLabel>
                <FilledInput
                  type="text"
                  name="fullName"
                  value={userData.fullName}
                  onChange={handleChange}
                  className="w-full"
                />
              </FormControl>
            </div>
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
              <input
                type="file"
                onChange={(e) => {
                  setUserData({ ...userData, avatar: e.target.files[0] });
                }}
              />
            </div>
            <div className="mb-10">
              <FormControl
                sx={{ width: "100%" }}
                variant="filled"
                className="w-full"
              >
                <InputLabel htmlFor="filled-adornment-password">
                  Address
                </InputLabel>
                <FilledInput
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  className="w-full"
                />
              </FormControl>
            </div>
            <div className="mb-10">
              <FormControl
                sx={{ width: "100%" }}
                variant="filled"
                className="w-full"
              >
                <InputLabel htmlFor="filled-adornment-password">
                  Phone
                </InputLabel>
                <FilledInput
                  // type phoneNumber
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={(e) => {
                    // check type number
                    if (isNaN(e.target.value) || e.target.value.length > 10) {
                      return;
                    }

                    setUserData({ ...userData, phone: e.target.value });
                  }}
                  className="w-full"
                />
              </FormControl>
            </div>
            <div className="mb-10">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:text-blue-600">
                  Login
                </Link>
              </p>
            </div>
            <div className="mb-10">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 hover:shadow-lg"
                // className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 hover:shadow-lg"
              >
                Register
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
  );
};

export default Register;
