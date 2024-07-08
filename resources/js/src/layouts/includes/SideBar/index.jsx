import React from "react";
import { Home, File, ShoppingCart, Plus } from "react-feather";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../store";

export default function SideBar() {
  const userData = useAppSelector((state) => state.auth.userData);
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">
              <Home className="feather" /> Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/integrations">
              <File className="feather" />
              Integração
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              target="_blank"
              to={`/donations/user/${userData?.slug}`}
            >
              <ShoppingCart className="feather" />
              Doação
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/widgets">
              <Plus className="feather" />
              Widgets
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
