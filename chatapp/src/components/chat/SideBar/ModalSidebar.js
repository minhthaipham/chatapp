import { Close } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../../../api";
import { searchUser } from "../../../redux/reducer/authSlice";
import { toast } from "react-toastify";
import FileBase from "react-file-base64";
import { createGroup } from "../../../redux/reducer/chatSlice";
import Lottie from "react-lottie";
import { GIFJSON } from "../../../constant";

const dataUser = [
  {
    id: 1,
    fullName: " A",
    avatar:
      "https://i.pinimg.com/564x/ae/6b/db/ae6bdb50b517aa9ba86dac1072214d55.jpg",
  },
  {
    id: 2,
    fullName: " B",
    avatar:
      "https://i.pinimg.com/564x/c4/4e/c5/c44ec537120e432a91764f8e6e22cd36.jpg",
  },
];

const item = ["React", "Angular", "Vue"];
const ModalSidebar = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);
  const [members, setMembers] = React.useState([]);
  const [chatName, setChatName] = React.useState("");
  const [addMembers, setAddMembers] = React.useState("");
  const [listUser, setListUser] = React.useState([]);
  const [timeOut, setTimeOut] = React.useState(null);
  const [image, setImage] = React.useState("");
  const handleChange = (e) => {
    setAddMembers(e.target.value);
    if (timeOut) {
      clearTimeout(timeOut);
    }
    setTimeOut(
      setTimeout(async () => {
        if (e.target.value === "") {
          setListUser([]);
        } else {
          try {
            const { data } = await api.getUser(e.target.value);
            setListUser(data);
          } catch (error) {
            console.log(error);
          }
        }
      }, 1000)
    );
  };

  const handleChangeCheckbox = (event) => {
    const { name, checked } = event.target;

    const user = JSON.parse(name);
    const { _id, fullName, avatar } = user;

    if (checked) {
      setMembers((prev) => [...prev, { _id, fullName, avatar }]);
    }
    if (!checked) {
      setMembers((prev) => prev.filter((s) => s._id !== _id));
    }
  };

  const handleSubmit = async () => {
    const id = members.map((member) => member._id);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "chat-app");
    formData.append("cloud_name", "dzttbzvs7");
    formData.append("folder", "chat-app");
    fetch("https://api.cloudinary.com/v1_1/dzttbzvs7/image/upload", {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((dt) => {
        const data = {
          id,
          image: dt.url.toString(),
          chatName,
        };
        dispatch(createGroup({ data, toast }));
        handleClose();
        setMembers([]);
        setChatName("");
        setAddMembers("");
        setListUser([]);
        setImage("");
      });

    //clear
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        className="absolute 
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        w-[500px] bg-white  rounded-md shadow-24 p-4 
      "
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          textAlign="center"
        >
          Create a new group
        </Typography>
        <div className="flex items-center">
          {members.map((member) => (
            <div
              className="flex items-center mx-2 bg-slate-200 p-2 rounded-lg min-w-[100px]"
              key={member?._id}
            >
              <div>
                <Avatar
                  src={member?.avatar}
                  alt={member?.fullName}
                  sx={{
                    width: 32,
                    height: 32,
                    marginRight: 1,
                  }}
                />
              </div>
              <div>
                <Typography>{member?.fullName}</Typography>
              </div>
              <div>
                <Close
                  fontSize="small"
                  sx={{
                    marginLeft: 1,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setMembers((prev) =>
                      prev.filter((s) => s._id !== member._id)
                    );
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center">
          <div className="relative">
            {/* <img
              src="https://i.pinimg.com/564x/bd/5f/0a/bd5f0aa1ffc4f70564920ef63d68904b.jpg"
              alt="avatar"
              className="rounded-full w-20 h-20 object-cover "
            /> */}
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: GIFJSON.Camera,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              height={50}
              width={50}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              name="image"
              className="absolute top-0 left-0 w-full h-full opacity-0  cursor-pointer"
            />
            {/* <div
              className="absolute top-0 left-0 w-full h-full opacity-0  cursor-pointer 
            "
            >
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => setImage(base64)}
              />
            </div> */}
          </div>

          <TextField
            label="Group name"
            variant="standard"
            fullWidth
            sx={{
              marginTop: 2,
              marginLeft: 2,
            }}
            onChange={(e) => setChatName(e.target.value)}
            value={chatName}
          />
        </div>
        <TextField
          label="Add members"
          variant="outlined"
          fullWidth
          sx={{
            marginTop: 2,
          }}
          onChange={handleChange}
        />

        <div className="flex flex-wrap  mt-2">
          <FormControl fullWidth>
            <FormGroup>
              {listUser.map((items, index) => {
                return (
                  <FormControlLabel
                    className="hover:bg-[#f3f5f6] cursor-pointer rounded-sm py-2 my-2 h-12"
                    key={index}
                    control={
                      <Checkbox
                        // checked={members.includes(items._id)}
                        checked={members.some((s) => s._id === items._id)}
                        onChange={handleChangeCheckbox}
                        // name={name}
                        // name={items._id}
                        //get all value in object
                        name={JSON.stringify(items)}
                      />
                    }
                    label={
                      <div className="flex items-center ">
                        <Avatar
                          // src="https://i.pinimg.com/564x/ab/bc/76/abbc76d6a519f10caf2ce9d67343133f.jpg "
                          src={items.avatar}
                          className="mr-2"
                        />

                        <Typography>{items.fullName}</Typography>
                      </div>
                    }
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginTop: 2,
            }}
            onClick={handleSubmit}
          >
            Create group
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSidebar;
