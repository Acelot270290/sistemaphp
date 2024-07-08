import React, { useEffect } from "react";
import styled from "styled-components";
import RankingWidgetEditor from "../../components/Widget/RankingWidgetEditor";
import { useAppSelector } from "../../store";
import RankingWidgetPreview from "../../components/Widget/Previews/RankingWidgetPreview";
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

export function RankingWidget({
  widget,
  createWidget,
  updateWidget,
  dispatchEvent,
  validationWidgetName,
}) {
  const [color, setColor] = React.useState("#000000");
  const [name, setName] = React.useState("");
  const [rankingPeriod, setRankingPeriod] = React.useState("Todos");
  const [rankingDirection, setRankingDirection] = React.useState("Vertical");
  const [numberOfUsers, setNumberOfUsers] = React.useState(5);
  const loading = useAppSelector((state) => state.loading.show);
  const [donations] = React.useState([
    { name: "Doador 1 ", amount: "750,00" },
    { name: "Doador 2 ", amount: "200,00" },
    { name: "Doador 2 ", amount: "50,00" },
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

  const handleSubmitRaking = (e) => {
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
          type: "ranking_type",
        };
        if (widget?.id) {
          updateWidget(widget.id, widgetData);
        } else {
          createWidget(widgetData, "ranking_type");
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
      dispatchEvent(widget?.template);
    }
  };

  return (
    <>
      <div className="col-sm-6">
        <Card className="card">
          <div className="card-body">
            <h5 className="card-title">
              {widget?.name || "Ranking incentivos"}
            </h5>
            <p className="card-text">
              {widget ? "Edite o Ranking." : "Ranking dos maiores incentivos."}
            </p>
            {loading ? (
              <div className="spinner-border text-white" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>
                <Button className="btn btn-light" onClick={handleSubmitRaking}>
                  {widget?.id ? "ATUALIZAR RANKING" : "SALVAR RANKING"}
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
        <RankingWidgetEditor
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
        <RankingWidgetPreview
          widgetData={widget}
          handlePusherEvent={() => {}}
          color={color}
          name={name}
          rankingPeriod={rankingPeriod}
          rankingDirection={rankingDirection}
          numberOfUsers={numberOfUsers}
          donations={donations}
        />
      </div>
    </>
  );
}
