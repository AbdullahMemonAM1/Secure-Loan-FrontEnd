import React from "react";
import lap from "../images/lap.png";
const Card3 = (props) => {
  return (
    <div
      style={{ marginRight: "1vw" }}
      class="max-w-sm rounded overflow-hidden shadow-lg transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-grey duration-300 ..."
    >
      <img
        style={{ width: "100%", height: "30vh" }}
        class="w-full"
        src={props.image}
        alt="Sunset in the mountains"
      />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{props.h1}</div>
        <p class="text-gray-700 text-base">{props.des}</p>
      </div>
    </div>
  );
};

export default Card3;
