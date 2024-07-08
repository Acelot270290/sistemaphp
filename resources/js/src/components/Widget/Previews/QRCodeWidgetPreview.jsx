import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import PusherListener from "../../PusherListener";

const QRCodeWidgetPreview = ({
  name,
  value,
  widgetData,
  handlePusherEvent,
  url,
  color = "#000000",
  backgroundColor = "#ffffff",
  size = 256,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const config = widgetData?.variations?.config || {};

  useEffect(() => {
    let timer;
    if (config.enableDisplaySettings) {
      if (isVisible) {
        timer = setTimeout(() => {
          setIsVisible(false);
        }, config.duration * 1000);
      } else {
        timer = setTimeout(() => {
          setIsVisible(true);
        }, config.interval * 60 * 1000);
      }
    }
    return () => clearTimeout(timer);
  }, [isVisible, config.duration, config.interval, config.enableDisplaySettings]);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="card d-flex flex-column align-items-center justify-content-center"
            style={{ backgroundColor: color, color: "white", maxWidth: "20rem" }}
          >
            <div className="card-body">
              <h5 className="card-title text-center">{name}</h5>
              <div className="card p-1">
                <QRCode
                  value={value}
                  size={size}
                  bgColor={backgroundColor}
                  fgColor={color}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 text-center">
                <p>
                  Leia o qrcode usando a camera do celular para enviar sua mensagem
                  na live via pix.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {widgetData && (
        <PusherListener
          channelName={`channel-widget-${widgetData?.user?.slug}-${widgetData?.template}`}
          eventName={`event-widget-${widgetData?.user?.slug}-${widgetData?.template}`}
          onEvent={handlePusherEvent}
        />
      )}
    </>
  );
};

export default QRCodeWidgetPreview;
