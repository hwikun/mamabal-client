import React from "react";
import { Link } from "react-router-dom";

interface INavigationProps {
  userObj: any | null;
}

const Navigation: React.FC<INavigationProps> = ({ userObj }) => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">{userObj.displayName}</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
