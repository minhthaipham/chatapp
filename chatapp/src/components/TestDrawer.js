import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EmojiPicker from "emoji-picker-react";
import { SuggestionMode } from "emoji-picker-react";
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
  const [image, setImage] = React.useState(null);
  const [showIcon, setShowIcon] = React.useState(false);
  const [chosenEmoji, setChosenEmoji] = React.useState(null);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleShowIcon = () => {
    setShowIcon(!showIcon);
  };
  const handleEmojiClick = (event, emojiObject) => {
    setChosenEmoji(event.emoji);
  };
  const handle = (emojiData, event) => {};
  return (
    <div className="flex items-center h-screen justify-center">
      <div>
        <EmojiPicker onEmojiClick={handleEmojiClick} height={500} width={400} />
      </div>
      <div>
        {chosenEmoji ? (
          <span>You chose: {chosenEmoji}</span>
        ) : (
          <span>No emoji chosen yet.</span>
        )}
      </div>
    </div>
  );
}
