import React from "react";
import { Typography } from "antd";
import bg_logo from "../assets/bravegalloslogo.webp";

const { Title, Text } = Typography;

// displays a page header

export default function Header({ link, title, subTitle, ...props }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "1.2rem" }}>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, alignItems: "start" }}>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <div>
            <img width={200} src={bg_logo} alt="brave logo" />
          </div>
        </a>
        <Text type="secondary" style={{ textAlign: "left" }}>
          {subTitle}
        </Text>
      </div>
      {props.children}
    </div>
  );
}

Header.defaultProps = {
  link: "https://www.bravegallos.com/",
  title: "Brave Gallos 🐔 ",
  subTitle: "Brave Gallos Is The Private Club Building The Next Generation Of Gambling And Sports Bet.",
};
