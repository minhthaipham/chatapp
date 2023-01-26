import React from "react";
import Lottie from "react-lottie";
import { GIFJSON } from "../constant";
const ViewerWay = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: GIFJSON.LoadingChat,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        height={400}
        width={400}
      />
    </div>
  );
};

export default ViewerWay;
