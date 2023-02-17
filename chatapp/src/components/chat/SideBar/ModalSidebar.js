import { Box, Chip, Modal, TextField, Typography } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ModalSidebar = ({ open, handleClose }) => {
  const [members, setMembers] = React.useState([]);
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
        {/* <Chip
          label="Add members"
          variant="outlined"
          sx={{
            marginTop: 2,
            borderColor: "#c4c4c4",
            color: "#c4c4c4",
            "&:hover": {
              borderColor: "#c4c4c4",
              color: "#c4c4c4",
            },
          }}
        /> */}
        <TextField
          label="Group name"
          variant="outlined"
          fullWidth
          sx={{
            marginTop: 2,
          }}
        />
        <TextField
          label="Add members"
          variant="outlined"
          fullWidth
          sx={{
            marginTop: 2,
          }}
        />
      </div>
    </Modal>
  );
};

export default ModalSidebar;
