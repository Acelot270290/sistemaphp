import React, { useEffect } from "react";
import styled from "styled-components";
import AlertWidgetEditor from "../../components/Widget/AlertWidgetEditor";
import { useAppSelector } from "../../store";
import AlertWidgetPreview from "../../components/Widget/Previews/AlertWidgetPreview";
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
  background-color: #006400;
  color: white;
`;

export function AlertWidget({
  widget,
  createWidget,
  updateWidget,
  dispatchEvent,
  validationWidgetName,
}) {
  const [color, setColor] = React.useState("#000000");
  const [name, setName] = React.useState("");
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(50);
  const [durationSong, setDurationSong] = React.useState(1);
  const [enableSong, setEnableSong] = React.useState(false);
  const loading = useAppSelector((state) => state.loading.show);

  useEffect(() => {
    if (widget) {
      const variations = widget.variations;
      setColor(
        variations && variations?.parameters?.color
          ? variations.parameters.color
          : "#000000"
      );
      setDuration(
        variations && variations?.config?.duration
          ? variations.config.duration
          : 0
      );
      setName(widget?.name || "");
      setEnableSong(
        variations && variations?.config?.enableSong
          ? variations.config.enableSong
          : false
      );
      setVolume(
        variations && variations?.config?.volume ? variations.config.volume : 50
      );
      setDurationSong(
        variations && variations?.config?.durationSong
          ? variations.config.durationSong
          : 1
      );
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
          duration,
          enableSong,
          volume,
          durationSong,
          type: "alert",
        };
        if (widget?.id) {
          updateWidget(widget.id, widgetData);
        } else {
          createWidget(widgetData, "alert");
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
            <h5 className="card-title">{widget?.name || "Alerta"}</h5>
            <p className="card-text">
              {widget ? "Edite seu Alerta existente." : "Crie um novo Alerta."}
            </p>
            {loading ? (
              <div className="spinner-border text-white" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>
                <Button className="btn btn-light" onClick={handleSubmit}>
                  {widget?.id ? "ATUALIZAR ALERTA" : "SALVAR ALERTA"}
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
        <AlertWidgetEditor
          color={color}
          setColor={setColor}
          name={name}
          setName={setName}
          duration={duration}
          setDuration={setDuration}
          volume={volume}
          setVolume={setVolume}
          durationSong={durationSong}
          setDurationSong={setDurationSong}
          enableSong={enableSong}
          setEnableSong={setEnableSong}
        />
      </div>
      <div className="col-sm-6">
        <AlertWidgetPreview
          widgetId={widget?.template}
          color={color}
          name={name}
          duration={duration}
          volume={volume}
          durationSong={durationSong}
        />
      </div>
    </>
  );
}
