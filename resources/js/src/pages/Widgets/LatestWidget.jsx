import LatestIncentivesWidgetEditor from "../../components/Widget/LatestIncentivesWidgetEditor";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../store";
import LatestWidgetPreview from "../../components/Widget/Previews/LatestWidgetPreview";
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
`;

export function LatestWidget({
  widget,
  createWidget,
  updateWidget,
  dispatchEvent,
  validationWidgetName,
}) {
  const [color, setColor] = React.useState("#000000");
  const [name, setName] = React.useState("");
  const [rankingPeriod, setRankingPeriod] = React.useState("Todos");
  const loading = useAppSelector((state) => state.loading.show);
  const [rankingDirection, setRankingDirection] = React.useState("Vertical");
  const [numberOfUsers, setNumberOfUsers] = React.useState(5);
  const [donations, setDonations] = React.useState([
    { name: "Doador 1", amount: "1,00" },
    { name: "Doador 2", amount: "2,00" },
    { name: "Doador 3", amount: "3,00" },
  ]);

  useEffect(() => {
    if (widget) {
      const variations = widget.variations;
      setColor(variations ? variations.parameters.color : "#000000");
      setRankingPeriod(variations ? variations.config.rankingPeriod : "Todos");
      setRankingDirection(
        variations ? variations.config.rankingDirection : "Vertical"
      );
      setNumberOfUsers(variations ? variations.config.numberOfUsers : 5);
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
          rankingPeriod,
          rankingDirection,
          numberOfUsers,
          type: "latestincentives",
        };
        if (widget?.id) {
          updateWidget(widget.id, widgetData);
        } else {
          createWidget(widgetData, "latestincentives");
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
            <h5 className="card-title">
              {widget?.name || "Últimos incentivos"}
            </h5>
            <p className="card-text">
              {widget
                ? "Edite os últimos incentivos existentes."
                : "Lista dos últimos incentivos."}
            </p>
            {loading ? (
              <div className="spinner-border text-white" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>
                <Button className="btn btn-light" onClick={handleSubmit}>
                  {widget?.id ? "ATUALIZAR INCENTIVOS" : "SALVAR INCENTIVOS"}
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
        <LatestIncentivesWidgetEditor
          color={color}
          setColor={setColor}
          name={name}
          setName={setName}
          rankingPeriod={rankingPeriod}
          setRankingPeriod={setRankingPeriod}
          rankingDirection={rankingDirection}
          setRankingDirection={setRankingDirection}
          numberOfUsers={numberOfUsers}
          setNumberOfUsers={setNumberOfUsers}
        />
      </div>
      <div className="col-sm-6">
        <LatestWidgetPreview
          widgetData={widget}
          handlePusherEvent={() => {}}
          color={color}
          direction={rankingDirection}
          donations={donations}
          numberOfUsers={numberOfUsers}
        />
      </div>
    </>
  );
}
