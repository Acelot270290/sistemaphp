import React from "react";
import AlertWidgetPreview from "../../components/Widget/Previews/AlertWidgetPreview";
import LatestIncentivesWidgetPreview from "../../components/Widget/Previews/LatestWidgetPreview";
import RankingWidgetPreview from "../../components/Widget/Previews/RankingWidgetPreview";
import QRCodeWidgetPreview from "../../components/Widget/Previews/QRCodeWidgetPreview";
import usePreviewWidget from "../../hooks/pages/usePreviewWidget";
import MetaWidgetPreview from "../../components/Widget/Previews/MetaWidgetPreview";

export function PreviewWidgets() {
  const { handlePusherEvent, donations, lastDonation, widgetData } =
    usePreviewWidget();

  if (!widgetData) return <div className="col-md-12">Carregando...</div>;

  const renderWidgetPreview = () => {
    if (!widgetData.variations || widgetData.variations.length === 0) {
      return <div>Configuração do widget não encontrada.</div>;
    }
    const { config, parameters } = widgetData.variations;

    switch (widgetData.type) {
      case "alert":
        return <AlertWidgetPreview />;
      case "latestincentives":
        return (
          <LatestIncentivesWidgetPreview
            widgetData={widgetData}
            handlePusherEvent={handlePusherEvent}
            color={parameters.color}
            donations={donations}
            direction={config?.rankingDirection}
            numberOfUsers={config?.numberOfUsers}
          />
        );
      case "qrcode":
        return (
          <QRCodeWidgetPreview
            widgetData={widgetData}
            handlePusherEvent={handlePusherEvent}
            value={`${import.meta.env.VITE_BASE_URL}donations/user/${
              widgetData?.user?.slug
            }`}
            color={parameters.color}
            name={widgetData?.name}
            url={`${import.meta.env.VITE_BASE_URL}donations/user/${
              widgetData?.user?.slug
            }`}
          />
        );
      case "ranking_type":
        return (
          <RankingWidgetPreview
            widgetData={widgetData}
            handlePusherEvent={handlePusherEvent}
            color={parameters.color}
            donations={donations}
            numberOfUsers={config?.numberOfUsers}
            rankingDirection={config?.rankingDirection}
            rankingPeriod={config?.rankingPeriod}
          />
        );
      case "meta":
        return (
          <MetaWidgetPreview
            widgetData={widgetData}
            handlePusherEvent={handlePusherEvent}
            color={parameters.color}
            name={widgetData?.name}
            targetAmount={config?.targetAmount}
            currentAmount={config?.currentAmount}
            endDate={config?.endDate}
            barColor={parameters.barColor}
            textColor={parameters.textColor}
            legendColor={parameters.legendColor}
            donations={donations}
          />
        );
      default:
        return null;
    }
  };

  const isMetaWidget = widgetData.type === "meta";

  return <div className={isMetaWidget ? "col-md-12" : ""}>{renderWidgetPreview()}</div>;
}

export default PreviewWidgets;
