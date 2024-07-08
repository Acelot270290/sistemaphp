import React, { useEffect } from "react";
import PropTypes from "prop-types";

export default function AuthLayout({ children }) {
  useEffect(() => {
    document.body.classList.add('text-center');

    return () => document.body.classList.remove('text-center');
  }, []);

  return (
    <>
      <main className="form-signin">
		{ children }
	  </main>
    </>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired
};
