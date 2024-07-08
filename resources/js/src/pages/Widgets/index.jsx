import React from "react";
import PageTitle from "../../components/PageTitle";
import useWidgets from "../../hooks/pages/useWidgets";
import { QrcodeWidget } from "./QrcodeWidget";
import { RankingWidget } from "./RankingWidget";
import { LatestWidget } from "./LatestWidget";
import { AlertWidget } from "./AlertWidget";
import { MetaWidget } from "./MetaWidget";

const Widgets = ({}) => {
  const {
    widgets,
    createWidget,
    updateWidget,
    dispatchEvent,
    validationWidgetName,
  } = useWidgets();

  return (
    <>
      <PageTitle title="Widgets" />
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Widgets</h1>
      </div>

      <div className="container mt-3">
        <div className="row">
          <QrcodeWidget
            widget={widgets.filter((w) => w.type === "qrcode")[0] || null}
            createWidget={createWidget}
            updateWidget={updateWidget}
            dispatchEvent={dispatchEvent}
            validationWidgetName={validationWidgetName}
          />

          <hr className="mt-3 mb-3" />

          <AlertWidget
            widget={widgets.filter((w) => w.type === "alert")[0] || null}
            createWidget={createWidget}
            updateWidget={updateWidget}
            dispatchEvent={dispatchEvent}
            validationWidgetName={validationWidgetName}
          />

          <hr className="mt-3 mb-3" />

          <RankingWidget
            widget={widgets.filter((w) => w.type === "ranking_type")[0] || null}
            createWidget={createWidget}
            updateWidget={updateWidget}
            dispatchEvent={dispatchEvent}
            validationWidgetName={validationWidgetName}
          />

          <hr className="mt-3 mb-3" />

          <LatestWidget
            widget={
              widgets.filter((w) => w.type === "latestincentives")[0] || null
            }
            createWidget={createWidget}
            updateWidget={updateWidget}
            dispatchEvent={dispatchEvent}
            validationWidgetName={validationWidgetName}
          />

          <hr className="mt-3 mb-3" />

          <MetaWidget
            widget={widgets.filter((w) => w.type === "meta")[0] || null}
            createWidget={createWidget}
            updateWidget={updateWidget}
            dispatchEvent={dispatchEvent}
            validationWidgetName={validationWidgetName}
          />
        </div>
      </div>
    </>
  );
};

export default Widgets;
