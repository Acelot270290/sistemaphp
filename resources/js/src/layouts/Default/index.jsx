import React from "react";
import PropTypes from "prop-types";

import Header from "../includes/Header";
import SideBar from "../includes/SideBar";

export default function DefaultLayout({ children }) {
  return (
    <>
      <Header />

      <div className="container-fluid">
      	<div className="row">      	  
      	  <SideBar />

      	  <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
			{ children }
		  </main>
		</div>
	  </div>

    </>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired
};