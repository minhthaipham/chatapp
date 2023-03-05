import * as React from "react";
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { reNameGroup } from "../../../../redux/reducer/chatSlice";
import { useSocket } from "../../../../context/SocketContext";
export default function BasicModal({ open, handleClose, chats }) {
  const socket = useSocket();
  const [chatName, setChatName] = React.useState(chats?.chatName);
  const dispatch = useDispatch();
  const handleClick = () => {
    const data = {
      chatId: chats._id,
      chatName,
    };
    dispatch(reNameGroup(data));
    socket.emit("reNameGroup", data);
    handleClose();
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <h4 className="text-lg font-semibold mb-4">Rename group</h4>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>
              <div className="border-b-2 border-gray-300 "></div>
              <div className="flex items-center justify-center">
                <Avatar
                  // src="https://i.pinimg.com/564x/96/9a/6a/969a6ae6734ff144b888377007433f72.jpg"
                  src={chats?.image}
                  sx={{ width: 100, height: 100, mt: 2, mb: 2 }}
                />
              </div>
              <p className=" text-gray-500">
                This will change the name of the group for everyone in the
                group.
              </p>
              <TextField
                id="outlined-basic"
                // label="Group name"
                variant="outlined"
                sx={{ width: "100%", mt: 2 }}
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button> */}
          <button
            className="p-3 border-2 border-gray-300 rounded-lg hover:bg-gray-200"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className=" mr-[15px] p-3 border-2 border-sky-400 bg-sky-600 rounded-lg 
          text-white hover:bg-sky-500
          "
            onClick={handleClick}
          >
            Rename
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
