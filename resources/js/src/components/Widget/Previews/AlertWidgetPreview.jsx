import React, { useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import FloatingAvatar from "./FloatingAvatar";
import { useAlertWidgetPreview } from "./hooks/useAlertWidgetPreview";


const AlertWidgetPreview = (props) => {
  const widgetId = useParams()?.widgetId || props?.widgetId;
  const { widgetData, currentMessage } = useAlertWidgetPreview({ widgetId });
  const location = useLocation();
  const isEmbed = location.pathname.includes("/embed/");
  const audioRef = useRef(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const notificationSound = `${baseUrl}audio/notification.mp3`;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume =
        (props.volume || widgetData?.variations?.config?.volume || 50) / 100;
      currentMessage && audioRef.current.play();
    }
  }, [currentMessage, widgetData]);

  if (!widgetData) return <div>Carregando...</div>;

  const messageToDisplay =
    currentMessage ||
    (!isEmbed && {
      data: {
        transaction_id: 1,
        name: props.name || "Doador Anônimo",
        message: "Obrigado pela doação!",
        amount: 0,
        duration: props.duration || 10,
      },
    });

  return (
    <AnimatePresence>
      {messageToDisplay && (
        <>
          <FloatingAvatar
            key={
              messageToDisplay.data.transaction_id ||
              "alert-widget-preview-key" + Math.floor(Math.random() * 999999)
            }
            color={
              props.color ||
              widgetData?.variations?.parameters?.color ||
              "#000000"
            }
            duration={messageToDisplay.data.duration || 10}
            name={messageToDisplay.data.name || "Doador Anônimo"}
            message={messageToDisplay.data.message || "Obrigado pela doação!"}
            amount={messageToDisplay.data.amount || 0}
          />
          {widgetData?.variations?.config?.enableSong === true && (
            <audio ref={audioRef}>
              <source src={notificationSound} type="audio/ogg" />
              Seu navegador não suporta o elemento de áudio.
            </audio>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default AlertWidgetPreview;
