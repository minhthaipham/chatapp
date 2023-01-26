import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as api from "../../api";
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
export default function UpdateUser({ handleClose }) {
  const { result } = JSON.parse(localStorage.getItem("user"));
  const [updateUser, setUpdateUser] = React.useState(false);
  const [userData, setUserData] = React.useState({
    fullName: "",
    avatar: "",
    phone: "",
    address: "",
  });
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [temp, setTemp] = React.useState("");
  React.useEffect(() => {
    if (result) {
      setUserData({
        fullName: result.fullName,
        avatar: result.avatar,
        phone: result.phone,
        address: result.address,
      });
    }
  }, []);

  // const handleImage = (e) => {
  //   // setuserData({ ...userData, avatar: URL.createObjectURL(e.target.files[0]) });
  //   setuserData({ ...userData, avatar: e.target.files[0] });
  //   setTemp(URL.createObjectURL(e.target.files[0]));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", userData.avatar);
    formData.append("upload_preset", "chat-app");
    formData.append("cloud_name", "dzttbzvs7");
    formData.append("folder", "chat-app");
    fetch("https://api.cloudinary.com/v1_1/dzttbzvs7/image/upload", {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data.url.toString());
        console.log(userData);
        try {
          const { data: results } = await api.update(
            {
              ...userData,
              avatar: data.url.toString(),
            },
            result?._id
          );
          // setUser({ ...user, result: results });
          // console.log(results);
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify({ result: results }));
          setUpdateUser(true);
          handleClose();
        } catch (error) {
          console.log(error);
        }
      });
  };
  return (
    <div>
      <DialogTitle id="alert-dialog-title" className="text-center">
        {"Edit Profile"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <form className="w-[400px]" onSubmit={handleSubmit}>
            <Avatar
              src={temp ? temp : userData.avatar}
              alt="avatar"
              sx={{
                width: "100px",
                height: "100px",
                margin: "0 auto",
              }}
            />
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              type="text"
              sx={{
                margin: "30px 0",
              }}
              name="fullName"
              value={userData.fullName}
              onChange={(e) =>
                setUserData({ ...userData, fullName: e.target.value })
              }
            />
            <input
              type="file"
              name="avatar"
              onChange={(e) =>
                setUserData({ ...userData, avatar: e.target.files[0] })
              }
              // onChange={handleImage}
            />
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              type="text"
              sx={{
                margin: "30px 0",
              }}
              name="phone"
              value={userData.phone}
              onChange={(e) => {
                // check type number
                if (isNaN(e.target.value) || e.target.value.length > 10) {
                  return;
                }

                setUserData({ ...userData, phone: e.target.value });
              }}
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              type="text"
              sx={{
                margin: "30px 0",
              }}
              name="address"
              value={userData.address}
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.value })
              }
            />
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button autoFocus type="submit">
                Agree
              </Button>
            </DialogActions>
          </form>
        </DialogContentText>
      </DialogContent>
    </div>
  );
}
