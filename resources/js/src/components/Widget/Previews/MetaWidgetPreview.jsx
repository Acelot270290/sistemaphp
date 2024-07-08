import React, { useEffect, useState } from "react";
import PusherListener from "../../PusherListener";
import usePreviewWidget from "../../../hooks/pages/usePreviewWidget";
import 'bootstrap/dist/css/bootstrap.min.css';

const MetaWidgetPreview = ({
  widgetData,
  color,
  name,
  targetAmount,
  currentAmount,
  endDate,
  barColor,
  textColor,
  legendColor,
}) => {
  const { handlePusherEvent, donations } = usePreviewWidget();
  const [barraWidth, setBarraWidth] = useState(
    Math.min((currentAmount / targetAmount) * 100, 100)
  );
  const [goalAmount, setGoalAmount] = useState(targetAmount);
  const [totalDonations, setTotalDonations] = useState(currentAmount);
  const [goalAchieved, setGoalAchieved] = useState(false);
  const [endTime, setEndTime] = useState(endDate);

  useEffect(() => {
    setTotalDonations(donations?.total_donations ?? currentAmount);
    setGoalAmount(donations?.goal_amount ?? targetAmount);
    setGoalAchieved(donations?.goal_achieved ?? false);
    setEndTime(donations?.end_time ?? endDate);
    setBarraWidth(
      Math.min(
        ((donations?.total_donations ?? currentAmount) /
          (donations?.goal_amount ?? targetAmount)) *
        100,
        100
      )
    );
  }, [donations, currentAmount, targetAmount, endDate]);

  const percentage = isNaN(barraWidth) ? 0 : barraWidth;

  const calculateTimeRemaining = () => {
    const now = new Date();
    const end = new Date(endTime);
    const diffInMs = end - now;

    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInHours < 24) {
      return `${diffInHours} horas`;
    } else {
      return `${diffInDays} dias`;
    }
  };

  return (
    <div
      className="container mt-4 p-4 rounded"
      style={{
        backgroundColor: color,
        maxWidth: "600px",
      }}
    >
      <h2 style={{ color: textColor }}>{name}</h2>
      <div className="progress mb-3" style={{ height: "30px", borderRadius: "8px", backgroundColor: "#ddd" }}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${percentage}%`, backgroundColor: barColor }}
        >
          <span
            style={{
              width: "100%",
              textAlign: "center",
              color: textColor,
              fontWeight: "bold",
              lineHeight: "30px",
            }}
          >
            {percentage.toFixed(2)}%
          </span>
        </div>
      </div>
      <span style={{ color: legendColor }}>
        {name} (R$ {totalDonations.toLocaleString("pt-BR")}/R${" "}
        {goalAmount.toLocaleString("pt-BR")})
      </span>
      <div style={{ color: legendColor }}>
        {goalAchieved ? "Meta alcançada!" : "Meta não alcançada"}
      </div>
      {endTime && (
        <div style={{ color: legendColor }}>{calculateTimeRemaining()}</div>
      )}
      {widgetData && (
        <PusherListener
          channelName={`channel-widget-${widgetData?.user?.slug}-${widgetData?.template}`}
          eventName={`event-widget-${widgetData?.user?.slug}-${widgetData?.template}`}
          onEvent={handlePusherEvent}
        />
      )}
    </div>
  );
};

export default MetaWidgetPreview;
