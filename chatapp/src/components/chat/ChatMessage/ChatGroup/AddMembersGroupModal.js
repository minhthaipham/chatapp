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
import * as api from "../../../../api";
import { searchGroup, searchUser } from "../../../../redux/reducer/authSlice";
import { addMembers as AddMembers } from "../../../../redux/reducer/chatSlice";
import { toast } from "react-toastify";
const item = ["React", "Angular", "Vue"];
const AddMembersGroupModal = ({ open, handleClose, chats }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);
  const [members, setMembers] = React.useState([]);
  const [addMembers, setAddMembers] = React.useState("");
  const [listUser, setListUser] = React.useState([]);
  const [timeOut, setTimeOut] = React.useState(null);
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
            const { data } = await api.searchUserGroup(
              e.target.value,
              chats?._id
            );
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

  const handleAddMembers = () => {
    const id = members.map((member) => member._id);
    const data = {
      chatId: chats?._id,
      userId: id,
    };
    dispatch(AddMembers({ data, toast }));
    handleClose();
    setListUser([]);
    setAddMembers("");
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
        <Avatar
          src={chats?.image}
          alt={chats?.chatName}
          sx={{
            width: 120,
            height: 120,
            margin: "10px auto",
          }}
        />
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
        <div className="flex items-center justify-between">
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginTop: 2,
            }}
            onClick={handleAddMembers}
          >
            Add members
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddMembersGroupModal;
