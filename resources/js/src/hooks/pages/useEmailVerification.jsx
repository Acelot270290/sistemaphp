import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services";
import { showMessage, showResponseError } from "../../helpers";

export function useEmailVerification() {
  const { id, hash } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await api.get(`/email/verify/${id}/${hash}`);

        showMessage(response.data.message);

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        showResponseError(error);
        navigate("/login");
      }
    };

    if (id && hash) {
      verifyEmail();
    }
  }, [id, hash, navigate]);
}
