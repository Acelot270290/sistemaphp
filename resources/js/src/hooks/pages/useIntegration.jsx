import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../../services";
import { useAppDispatch, useAppSelector } from "../../store";
import { setHideLoading, setShowLoading } from "../../reducers";
import { showMessage, showResponseError } from "../../helpers";

export function useIntegration() {
  const loading = useAppSelector((state) => state.loading.show);
  const [streamlabs_integration, setStreamlabsIntegration] = useState(null);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    getStreamlabsIntegration();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const message = queryParams.get("message");
    const error = queryParams.get("error");
    if (message) {
      showMessage(message, "success");
    } else if (error) {
      showResponseError(error);
    }
  }, [location]);

  const getStreamlabsIntegration = async () => {
    dispatch(setShowLoading());

    try {
      const response = await api.get("/integrations/streamlabs/search");

      setStreamlabsIntegration(response.data);

      dispatch(setHideLoading());
    } catch (error) {
      showResponseError(error);
      dispatch(setHideLoading());
    }
  };

  const handleStreamlbsIntegration = async () => {
    dispatch(setShowLoading());
    try {
      const response = await api.get("/integrations/initiate");

      const authorizationUrl = response.data.authorization_url;

      dispatch(setHideLoading());

      window.location.href = authorizationUrl;
    } catch (error) {
      showResponseError(error);
    } finally {
      dispatch(setHideLoading());
    }
  };

  const handleStreamlbsRemoveIntegration = async () => {
    try {
      dispatch(setShowLoading());

      await api.delete(`/integrations/${streamlabs_integration?.id}`);

      getStreamlabsIntegration();
      showMessage("Integração Streamlabs removida com sucesso!");
    } catch (error) {
      showResponseError(error);
      dispatch(setHideLoading());
    }
  };

  return {
    loading,
    streamlabs_integration,
    handleStreamlbsIntegration,
    handleStreamlbsRemoveIntegration,
  };
}
