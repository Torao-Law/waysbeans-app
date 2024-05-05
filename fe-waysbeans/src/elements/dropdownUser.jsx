import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import Img from "../assets/robin.jpg";
import { Link } from "react-router-dom";
import React from "react";
import { UserContext } from "../stores/userContext";

export default function UserDropdown() {
  const [_, dispatch] = React.useContext(UserContext);

  return (
    <Menu>
      <MenuHandler>
        <div className="border-4 border-isPrimary rounded-full">
          <img
            src={Img}
            className="rounded-full w-8 h-8 object-contain"
            alt="avatar"
          />
        </div>
      </MenuHandler>
      <MenuList>
        <Link to="/profile">
          <MenuItem>Profile</MenuItem>
        </Link>

        <Link to="/history">
          <MenuItem>Purchase History</MenuItem>
        </Link>
        <MenuItem
          className="text-red-800 font-bold"
          onClick={() => dispatch({ type: "LOGOUT" })}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
