import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { showMessage, showResponseError } from "../../helpers";

const IntegrationStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const message = queryParams.get("message");
    const success = queryParams.get("success");

    if (message) {
      showMessage(message, success === "true" ? "success" : "error");
    }

    const timeout = setTimeout(() => {
      navigate("/integrations");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [location, navigate]);

  return <div>Verificando status da integração...</div>;
};

export default IntegrationStatus;
