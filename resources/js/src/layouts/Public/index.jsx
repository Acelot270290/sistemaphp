import React, { useEffect } from "react";
import PropTypes from "prop-types";

export default function PublicLayout({ children }) {
  useEffect(() => {
    document.body.classList.add('text-center');

    return () => document.body.classList.remove('text-center');
  }, []);

  return (
    <>
    <div className="public-container">
      <main className="form-signin">
		{ children }
	  </main>
    </div>
    </>
  );
}

PublicLayout.propTypes = {
  children: PropTypes.element.isRequired
};
