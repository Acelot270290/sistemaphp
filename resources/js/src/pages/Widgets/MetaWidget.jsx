import MetaWidgetEditor from "../../components/Widget/MetaWidgetEditor";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../store";
import MetaWidgetPreview from "../../components/Widget/Previews/MetaWidgetPreview";
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
  background-color: #000000;
  color: white;
  margin-top: 20px;
  border-radius: 8px;
  padding: 20px;
`;

export function MetaWidget({
  widget,
  createWidget,
  updateWidget,
  dispatchEvent,
  validationWidgetName,
}) {
  const [color, setColor] = React.useState("#000000");
  const [name, setName] = React.useState("");
  const [targetAmount, setTargetAmount] = React.useState(0);
  const [currentAmount, setCurrentAmount] = React.useState(0);
  const [endDate, setEndDate] = React.useState("");
  const [barColor, setBarColor] = React.useState("#0000FF");
  const [textColor, setTextColor] = React.useState("#FFFFFF");
  const [legendColor, setLegendColor] = React.useState("#FFFFFF");

  const loading = useAppSelector((state) => state.loading.show);

  useEffect(() => {
    if (widget) {
      const variations = widget.variations;
      setColor(variations ? variations.parameters.color : "#000000");
      setName(widget.name);
      setTargetAmount(variations ? variations.config.targetAmount : 0);
      setCurrentAmount(variations ? variations.config.currentAmount : 0);
      setEndDate(variations ? variations.config.endDate : "");
      setBarColor(variations ? variations.parameters.barColor : "#0000FF");
      setTextColor(variations ? variations.parameters.textColor : "#FFFFFF");
      setLegendColor(variations ? variations.parameters.legendColor : "#FFFFFF");
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
          targetAmount,
          currentAmount,
          endDate,
          barColor,
          textColor,
          legendColor,
          type: "meta",
        };
        console.log(widgetData);
        if (widget?.id) {
          updateWidget(widget.id, widgetData);
        } else {
          createWidget(widgetData, "meta");
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

  const barraWidth = Math.min((currentAmount / targetAmount) * 100, 100);

  return (
    <>
      <div className="col-sm-6">
        <Card className="card">
          <div className="card-body">
            <h5 className="card-title">{widget?.name || "Meta"}</h5>
            <p className="card-text">
              {widget ? "Edite sua meta existente." : "Crie uma nova meta."}
            </p>
            {loading ? (
              <div className="spinner-border text-white" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>
                <Button className="btn btn-light" onClick={handleSubmit}>
                  {widget?.id ? "ATUALIZAR META" : "SALVAR META"}
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
        <MetaWidgetEditor
          color={color}
          setColor={setColor}
          name={name}
          setName={setName}
          targetAmount={targetAmount}
          setTargetAmount={setTargetAmount}
          currentAmount={currentAmount}
          setCurrentAmount={setCurrentAmount}
          endDate={endDate}
          setEndDate={setEndDate}
          barColor={barColor}
          setBarColor={setBarColor}
          textColor={textColor}
          setTextColor={setTextColor}
          legendColor={legendColor}
          setLegendColor={setLegendColor}
        />
      </div>
      <div className="col-sm-6">
        <MetaWidgetPreview
          widgetData={widget}
          color={color}
          name={name}
          targetAmount={targetAmount}
          currentAmount={currentAmount}
          endDate={endDate}
          barColor={barColor}
          textColor={textColor}
          legendColor={legendColor}
          barraWidth={barraWidth}
        />
      </div>
    </>
  );
}
