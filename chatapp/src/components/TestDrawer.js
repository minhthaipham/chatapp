import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export default function TestDrawer() {
  const [selectedImage, setSelectedImage] = React.useState("");

  const handleImageSelection = (event) => {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <div>
      <div>
        <input type="file" onChange={handleImageSelection} />
        <img src={selectedImage} alt="Selected Image" />
      </div>
    </div>
  );
}
