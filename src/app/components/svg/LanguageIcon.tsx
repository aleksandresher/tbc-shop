import React from "react";

const LanguageIcon: React.FC = () => {
  return (
    <svg
      width="25px"
      height="25px"
      viewBox="0 0 24 24"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      color="#000000"
      className="fill-[#fff] dark:fill-[#000] stroke-black dark:stroke-white"
    >
      {" "}
      <title id="languageIconTitle">Language</title>{" "}
      <circle cx="12" cy="12" r="10" />{" "}
      <path
        strokeLinecap="round"
        d="M12,22 C14.6666667,19.5757576 16,16.2424242 16,12 C16,7.75757576 14.6666667,4.42424242 12,2 C9.33333333,4.42424242 8,7.75757576 8,12 C8,16.2424242 9.33333333,19.5757576 12,22 Z"
      />{" "}
      <path strokeLinecap="round" d="M2.5 9L21.5 9M2.5 15L21.5 15" />{" "}
    </svg>
  );
};

export default LanguageIcon;
