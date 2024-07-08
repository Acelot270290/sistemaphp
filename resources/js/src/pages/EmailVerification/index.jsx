import React from "react";
import { useEmailVerification } from "./../../hooks/pages/useEmailVerification";

function EmailVerification() {
  useEmailVerification();

  return (
    <div>
      <h1>Verificação de Email</h1>
      <p>Verificando o email...</p>
    </div>
  );
}

export default EmailVerification;
