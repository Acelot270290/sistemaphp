import React, { useState, useEffect } from "react";
import styled from "styled-components";
import QRCodeWidgetEditor from "../../components/Widget/QRCodeWidgetEditor";
import QRCodeWidgetPreview from "../../components/Widget/Previews/QRCodeWidgetPreview";
import { useAppSelector } from "../../store";
import { showResponseError } from "../../helpers";

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Label = styled.label`
  padding-top: 20px;
  display: block;
  margin-bottom: 5px;
  color: #333;
`;

const Button = styled.button`
  margin-left: 5px;
`;

const Card = styled.div`
  background-color: #6c5ce7;
  color: white;
`;

const QrCodeStyleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 4px;
  margin-top: 50px;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ToggleLabel = styled.span`
  margin-left: 10px;
  font-size: 1rem;
  color: #333;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 12px;
    width: 12px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
`;

const SliderChecked = styled(Slider)`
  background-color: #2196F3;
  
  &:before {
    transform: translateX(14px);
  }
`;

const styles = {
  fieldset: {
    border: "none",
    padding: "20px",
    margin: "0 0 20px 0",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  legend: {
    fontSize: "1.2rem",
    marginBottom: "10px",
    color: "#333",
    fontWeight: "bold",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#333",
  },
  range: {
    width: "100%",
    marginBottom: "20px",
  },
};

export function QrcodeWidget({
  widget,
  createWidget,
  updateWidget,
  dispatchEvent,
  validationWidgetName,
}) {
  const [color, setColor] = useState("#000000");
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(10);
  const [interval, setInterval] = useState(5);
  const [enableDisplaySettings, setEnableDisplaySettings] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const loading = useAppSelector((state) => state.loading.show);
  const user = useAppSelector((state) => state.auth.userData);

  useEffect(() => {
    if (widget) {
      const variations = widget.variations;
      setColor(variations ? variations.parameters.color : "#000000");
      setName(widget.name);
      setDuration(variations ? variations.config.duration : 10);
      setInterval(variations ? variations.config.interval : 5);
      setEnableDisplaySettings(variations ? variations.config.enableDisplaySettings : false);
    }
  }, [widget]);

  useEffect(() => {
    if (widget) {
      const variations = widget.variations;
      setColor(variations ? variations.parameters.color : "#000000");
      setName(widget.name);
    }
  }, [widget]);

  const handleSubmit = (e) => {
    e.preventDefault();

    validationWidgetName
      .validate({ name }, { abortEarly: false })
      .then(() => {
        const widgetData = {
          color,
          name,
          type: "qrcode",
          duration,
          interval,
          enableDisplaySettings,
        };

        if (widget?.id) {
          updateWidget(widget.id, widgetData);
        } else {
          createWidget(widgetData, "qrcode");
        }
      })
      .catch((error) => {
        showResponseError({
          response: {
            status: 422,
            data: { errors: error.errors },
          },
        });
      });
  };

  const handleEventTrigger = (e) => {
    e.preventDefault();
    if (widget?.id) {
      dispatchEvent(widget.template);
    }
  };

  return (
    <>
      <div className="col-sm-6">
        <Card className="card">
          <div className="card-body">
            <h5 className="card-title">{widget?.name || "QRCode"}</h5>
            <p className="card-text">
              {widget
                ? "Edite seu QRCode existente."
                : "Divulgue seu link de pagamento em sua transmissão para atrair seu público."}
            </p>
            {loading ? (
              <div className="spinner-border text-white" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>
                <Button className="btn btn-light" onClick={handleSubmit}>
                  {widget?.id ? "ATUALIZAR QRCODE" : "SALVAR QRCODE"}
                </Button>
                {widget?.id && (
                  <Button
                    className="btn btn-light pl-2"
                    onClick={handleEventTrigger}
                  >
                    CARREGAR PREVIEW
                  </Button>
                )}
              </>
            )}
          </div>
        </Card>
        {widget?.url_embed && (
          <>
            <Label htmlFor="rankingPeriod">Embed</Label>
            <Input readOnly value={widget?.url_embed} name="embed" />
          </>
        )}
        <QRCodeWidgetEditor
          color={color}
          setColor={setColor}
          name={name}
          setName={setName}
          duration={duration}
          setDuration={setDuration}
          interval={interval}
          setInterval={setInterval}
          enableDisplaySettings={enableDisplaySettings}
          setEnableDisplaySettings={setEnableDisplaySettings}
        />
      </div>
      <QrCodeStyleContainer className="col-sm-6">
        {isVisible && (
          <QRCodeWidgetPreview
            widgetData={widget}
            handlePusherEvent={() => {}}
            value={`${import.meta.env.VITE_BASE_URL}donations/user/${user.slug}`}
            color={color || "#000000"}
            size={256}
            bgColor={"#ffffff"}
            name={name}
            setName={setName}
          />
        )}
      </QrCodeStyleContainer>
    </>
  );
}
