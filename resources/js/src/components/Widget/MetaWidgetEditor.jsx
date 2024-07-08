import React from "react";

const styles = {
  fieldset: {
    border: "none",
    padding: "20px",
    margin: "0 0 20px 0",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
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
    backgroundColor: "#fff",
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
  progressBar: {
    width: "100%",
    height: "20px",
    marginBottom: "10px",
  },
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const parseCurrency = (value) => {
  return Number(value.replace(/\D/g, '')) / 100;
};

function MetaWidgetEditor({
  color,
  setColor,
  name,
  setName,
  targetAmount,
  setTargetAmount,
  currentAmount,
  setCurrentAmount,
  endDate,
  setEndDate,
  barColor,
  setBarColor,
  textColor,
  setTextColor,
  legendColor,
  setLegendColor,
}) {
  const handleTargetAmountChange = (e) => {
    const value = parseCurrency(e.target.value);
    setTargetAmount(value);
  };

  const handleCurrentAmountChange = (e) => {
    const value = parseCurrency(e.target.value);
    setCurrentAmount(value);
  };

  const progress = isNaN((currentAmount / targetAmount) * 100) || targetAmount === 0 ? 0 : (currentAmount / targetAmount) * 100;
  

  return (
    <div>
      <fieldset style={styles.fieldset}>
        <legend style={styles.legend}>Customize sua Meta</legend>

        <label style={styles.label} htmlFor="colorbackgroundMeta">
          Cor do fundo da meta
        </label>
        <input
          id="colorbackgroundMeta"
          type="color"
          style={styles.input}
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <label style={styles.label} htmlFor="barColor">
          Cor da barra
        </label>
        <input
          id="barColor"
          type="color"
          style={styles.input}
          value={barColor}
          onChange={(e) => setBarColor(e.target.value)}
        />

        <label style={styles.label} htmlFor="textColorMeta">
          Cor do texto
        </label>
        <input
          id="textColorMeta"
          type="color"
          style={styles.input}
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
        />

        <label style={styles.label} htmlFor="legendColor">
          Cor da legenda
        </label>
        <input
          id="legendColor"
          type="color"
          style={styles.input}
          value={legendColor}
          onChange={(e) => setLegendColor(e.target.value)}
        />

        <label style={styles.label} htmlFor="nameMeta">
          Nome da Meta
        </label>
        <input
          id="nameMeta"
          type="text"
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label style={styles.label} htmlFor="targetAmountMeta">
          Valor da meta
        </label>
        <input
          id="targetAmountMeta"
          type="text"
          style={styles.input}
          value={formatCurrency(targetAmount)}
          onChange={handleTargetAmountChange}
        />

        <label style={styles.label} htmlFor="currentAmountMeta">
          Valor atual
        </label>
        <input
          id="currentAmountMeta"
          type="text"
          style={styles.input}
          value={formatCurrency(currentAmount)}
          onChange={handleCurrentAmountChange}
        />

        <progress
          id="progressBar"
          style={styles.progressBar}
          value={currentAmount}
          max={targetAmount}
        ></progress>
        <label style={styles.label} htmlFor="progressBar">
          Progresso: {Math.min(progress, 100).toFixed(2)}%
        </label>

        <label style={styles.label} htmlFor="endDateMeta">
          Data limite
        </label>
        <input
          id="endDateMeta"
          type="datetime-local"
          style={styles.input}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </fieldset>
    </div>
  );
}

export default MetaWidgetEditor;
