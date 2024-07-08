import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services";
import { showResponseError } from "../../helpers";

export default function usePreviewWidget() {
  const { widgetId } = useParams();
  const [widgetData, setWidgetData] = useState(null);
  const [lastDonation, setLastDonation] = useState(null);
  const [donations, setDonations] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (widgetId) {
      fetchWidgetById(widgetId);
    }
  }, [widgetId]);

  const fetchWidgetById = async (widgetId) => {
    try {
      const { data } = await api.get(`/widgets/${widgetId}`);
      setWidgetData(data);

      if (data && data.type === "meta") {
        const donationResponse = await api.get(`/meta-donations/${data.user?.slug}`);
        setDonations(donationResponse.data);
      }

    } catch (error) {
      showResponseError(error);
    }
  };

  const handlePusherEvent = async (data) => {
    try {
      if (widgetData && widgetData.type === "alert") {
        setLastDonation(data);
        setIsVisible(false);
        setTimeout(() => {
          setIsVisible(true);
        }, 100);
      }

      if (widgetData && widgetData.type === "meta") {
        const { data } = await api.get(`/meta-donations/${widgetData.user?.slug}`);
        setDonations(data);
      }
      if (widgetData && widgetData.type === "latestincentives") {
        const { data } = await api.get(`/donations/${widgetData.user?.slug}`);

        const transformedData = data?.data.map((donation) => ({
          name: donation.name,
          amount: new Intl.NumberFormat({
            style: "currency",
            currency: "BRL",
          }).format(parseFloat(donation.amount)),
        }));

        setDonations(transformedData);
      }

      if (widgetData && widgetData.type === "ranking_type") {
        const { data } = await api.get(
          `/ranking-donations/${widgetData.user?.slug}`
        );

        const transformedData = data?.data.map((donation) => ({
          name: donation.name,
          amount: new Intl.NumberFormat({
            style: "currency",
            currency: "BRL",
          }).format(parseFloat(donation.amount)),
        }));

        setDonations(transformedData);
      }
    } catch (error) {
      showResponseError(error);
    }
  };

  return {
    handlePusherEvent,
    donations,
    lastDonation,
    widgetData,
    isVisible,
    setIsVisible,
  };
}
