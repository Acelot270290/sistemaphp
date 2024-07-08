import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./../services/";
import { useAppDispatch } from "../store";
import { removeUser } from "../reducers";
import { showResponseError } from "../helpers";

export function useLogout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const onLogout = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      await api.post("/logout", {});

      dispatch(removeUser());
      setLoading(false);

      navigate("/login");
    } catch (error) {
      showResponseError(error);
      setLoading(false);
    }
  };

  return {
    loading,
    onLogout,
  };
}
