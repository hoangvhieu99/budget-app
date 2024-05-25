import React from "react";
import { menuItems } from "../../utils/menuItems";
import { useSelector } from "react-redux";
import { signout } from "../../utils/Icons";
export default function Navigation({ active, setActive }) {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="column-left">
      <div className="user-icon">
        <img
          src={currentUser.profilePicture}
          alt=""
          className="h-7 w-7 rounded-full object-cover "
        />
        <div className="text">
          <p>Tiền của</p>
          <h2>{currentUser.username}</h2>
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={active === item.id ? "active" : ""}
            >
              {item.icon}
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
      <div className="bottom-nav">
        <li>{signout} Sign Out</li>
      </div>
    </div>
  );
}
