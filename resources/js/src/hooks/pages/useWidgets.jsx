import { useEffect, useState } from "react";
import api from "../../services";
import { useAppDispatch } from "../../store";
import { setHideLoading, setShowLoading } from "../../reducers";
import { showMessage, showResponseError } from "../../helpers";
import * as Yup from "yup";

export default function useWidgets() {
  const [widgets, setWidgets] = useState([]);
  const dispatch = useAppDispatch();
  const [donations, setDonations] = useState([]);

  const validationWidgetName = Yup.object({
    name: Yup.string().required("O nome é obrigatório"),
  });

  useEffect(() => {
    fetchWidgets();
  }, []);

  const createWidget = async (widgetData, type) => {
    try {
      dispatch(setShowLoading());

      widgetData.type = type;

      const { data } = await api.post("/widgets", widgetData);

      setWidgets(data);
      dispatch(setHideLoading());

      showMessage("Widget criado com sucesso!", "success");
    } catch (error) {
      dispatch(setHideLoading());
      showResponseError(error);
      throw error;
    }
  };

  const updateWidget = async (widgetId, widgetData) => {
    try {
      dispatch(setShowLoading());

      const { data } = await api.patch(`/widgets/${widgetId}`, widgetData);

      setWidgets(data);
      dispatch(setHideLoading());

      showMessage("Widget criado com sucesso!", "success");
    } catch (error) {
      dispatch(setHideLoading());
      showResponseError(error);
      throw error;
    }
  };

  const fetchWidgets = async () => {
    try {
      dispatch(setShowLoading());

      const { data } = await api.get("/widgets");

      setWidgets(data);
      dispatch(setHideLoading());
    } catch (error) {
      dispatch(setHideLoading());
      showResponseError(error);
      throw error;
    }
  };

  const dispatchEvent = async (widgetId) => {
    try {
      dispatch(setShowLoading());
      await api.post(`/widgets/trigger-event/${widgetId}`);
      showMessage("Prewview criado com sucesso!", "success");
      dispatch(setHideLoading());
    } catch (error) {
      showResponseError(error);
      dispatch(setHideLoading());
    }
  };

  const fetchWidgetById = async (widgetId) => {
    try {
      const { data } = await api.get(`/widgets/${widgetId}`);
      return data;
    } catch (error) {
      showResponseError(error);
      return null;
    }
  };

  const fetchLatestDonations = async (userSlug) => {
    try {
      dispatch(setShowLoading());

      const { data } = await api.get(`/donations/${userSlug}`);

      setDonations(data.data);

      dispatch(setHideLoading());
    } catch (error) {
      dispatch(setHideLoading());
      showResponseError(error);
      return [];
    }
  };

  return {
    widgets,
    createWidget,
    updateWidget,
    dispatchEvent,
    fetchWidgetById,
    fetchLatestDonations,
    donations,
    validationWidgetName,
  };
}
