import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
const dataUser = [
  {
    id: 1,
    name: " A",
    avatar:
      "https://i.pinimg.com/564x/ae/6b/db/ae6bdb50b517aa9ba86dac1072214d55.jpg",
  },
  {
    id: 2,
    name: " B",
    avatar:
      "https://i.pinimg.com/564x/c4/4e/c5/c44ec537120e432a91764f8e6e22cd36.jpg",
  },
];
export default function TestDrawer() {
  const [selectedImage, setSelectedImage] = React.useState("");
  const [members, setMembers] = React.useState(dataUser);
  const handleImageSelection = (event) => {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };
  return (
    // <div>
    //   <div>
    //     <input type="file" onChange={handleImageSelection} />
    //     <img src={selectedImage} alt="Selected Image" />
    //   </div>
    // </div>
    <div className="flex items-center">
      {members.map((member) => (
        <div className="flex items-center mx-2">
          <div>
            <img
              src={member.avatar}
              alt={member.name}
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div>
            <h1>{member.name}</h1>
          </div>
        </div>
      ))}
    </div>
  );
}
