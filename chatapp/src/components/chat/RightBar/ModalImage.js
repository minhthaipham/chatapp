import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Dialog, DialogContent, DialogContentText } from "@mui/material";

export default function ModalImage({ open, handleCloseModal, avatar }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          min-w-1/2 min-h-1/2 
            shadow-2xl  bg-white border-none rounded-md overflow-hidden
        "
        >
          <img
            src={avatar}
            alt=""
            className="w-full h-full object-cover border-none bg-white"
          />
        </div>
      </Modal>
    </div>
  );
}
