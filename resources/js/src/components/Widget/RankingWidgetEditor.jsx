import React from "react";

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
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    background: "white",
    fontSize: "1rem",
  },
  range: {
    width: "100%",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    background: "#5cb85c",
    color: "white",
    fontSize: "1rem",
    cursor: "pointer",
    outline: "none",
  },
};

function RankingWidgetEditor( { color, setColor, name, setName,rankingPeriod, setRankingPeriod, rankingDirection, setRankingDirection, numberOfUsers, setNumberOfUsers } ) {
  return (
    <div>
      <fieldset style={styles.fieldset}>
        <legend style={styles.legend}>Customize seu Ranking</legend>

        <label style={styles.label} htmlFor="textColor">
          Cor do texto
        </label>
        <input
          id="textColor"
          type="color"
          style={styles.input}
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <label style={styles.label} htmlFor="rankingPeriod">
          Período
        </label>
        <select
          id="rankingPeriod"
          value={rankingPeriod}
          onChange={(e) => setRankingPeriod(e.target.value)}
          style={styles.select}
        >
          <option value="Todos">Todos</option>
          <option value="Semanal">Semanal</option>
          <option value="Mensal">Mensal</option>
        </select>

        <label style={styles.label} htmlFor="rankingDirection">
          Direção
        </label>
        <select
          id="rankingDirection"
          value={rankingDirection}
          onChange={(e) => setRankingDirection(e.target.value)}
          style={styles.select}
        >
          <option value="Vertical">Vertical</option>
          <option value="Horizontal">Horizontal</option>
        </select>

        <label style={styles.label} htmlFor="numberOfUsers">
          Número de usuários
        </label>
        <input
          id="numberOfUsers"
          type="range"
          min="1"
          max="10"
          value={numberOfUsers}
          onChange={(e) => setNumberOfUsers(Number(e.target.value))}
          style={styles.range}
        />
        <div id="sliderValue">Número de usuários: {numberOfUsers}</div>
        <label style={styles.label} htmlFor="widgetName">
          Nome do widget
        </label>
        <input
          id="widgetName"
          type="text"
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </fieldset>
    </div>
  );
}

export default RankingWidgetEditor;
