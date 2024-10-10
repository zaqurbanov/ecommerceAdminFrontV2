import React from "react";
import { FaStar } from "react-icons/fa";

const RatingStar = ({ rating }) => {
  const totalStar = 5;
  const starsArray = [];
  for (let i = 1; i <= totalStar; i++) {
    starsArray.push(
      <FaStar
        key={i}
        className={i <= rating ? "text-yellow-400" : "text-gray-400"} // Sarı və ya boz rəng
      />
    );
  }

  return <div className="flex">{starsArray}</div>;
};

export default RatingStar;
