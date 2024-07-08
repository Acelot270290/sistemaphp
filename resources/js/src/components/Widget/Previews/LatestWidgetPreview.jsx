import React from "react";
import PusherListener from "../../PusherListener";
import 'bootstrap/dist/css/bootstrap.min.css';

const LatestWidgetPreview = ({
  color,
  direction,
  donations,
  numberOfUsers,
  widgetData,
  handlePusherEvent,
}) => {
  const displayedDonations = donations.slice(0, numberOfUsers);

  return (
    <>
      <div
        className={`d-flex ${direction === "Vertical" ? "flex-column" : "flex-row"} ${direction === "Horizontal" ? "flex-wrap" : ""}`}
        style={{
          color: color,
          fontSize: "1.5rem",
          background: "transparent",
          marginTop: "50%",
          fontWeight: "bold",
          minWidth: "350px",
        }}
      >
        {displayedDonations.map((donation, index) => (
          <div
            key={index}
            className="d-flex justify-content-between align-items-center p-2 mb-2 border rounded bg-white"
          >
            {donation.name}
            <span className="badge bg-primary rounded-pill">
              R$ {donation.amount}
            </span>
          </div>
        ))}
      </div>
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

export default LatestWidgetPreview;
