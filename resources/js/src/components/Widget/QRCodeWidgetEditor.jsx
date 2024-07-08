import React, { useRef, useEffect } from "react";

const styles = {
  fieldset: {
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "10px",
    marginBottom: "20px",
  },
  legend: {
    fontWeight: "bold",
    fontSize: "1rem",
    marginBottom: "10px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "0.9rem",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  range: {
    width: "100%",
    marginBottom: "20px",
  },
  toggle: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  toggleLabel: {
    marginLeft: "10px",
    fontSize: "1rem",
    color: "#333",
  },
  switch: {
    position: "relative",
    display: "inline-block",
    width: "34px",
    height: "20px",
  },
  switchInput: {
    opacity: 0,
    width: 0,
    height: 0,
  },
  slider: {
    position: "absolute",
    cursor: "pointer",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#ccc",
    transition: ".4s",
    borderRadius: "34px",
  },
  sliderBefore: {
    position: "absolute",
    content: '""',
    height: "12px",
    width: "12px",
    left: "4px",
    bottom: "4px",
    backgroundColor: "white",
    transition: ".4s",
    borderRadius: "50%",
  },
  sliderChecked: {
    backgroundColor: "#2196F3",
  },
  sliderCheckedBefore: {
    transform: "translateX(14px)",
  },
};

function QRCodeWidgetEditor({ color, setColor, name, setName, duration, setDuration, interval, setInterval, enableDisplaySettings, setEnableDisplaySettings }) {
  return (
    <div>
      <fieldset style={styles.fieldset}>
        <legend style={styles.legend}>Customize seu QR Code</legend>
        <label style={styles.label} htmlFor="color">
          Cor do QR Code
        </label>
        <input
          id="color"
          type="color"
          style={styles.input}
          value={color || "#000000"}
          onChange={(e) => setColor(e.target.value)}
        />
        <label style={styles.label} htmlFor="Name">
          Nome do QR Code
        </label>
        <input
          id="Name"
          type="text"
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div style={styles.toggle}>
          <label style={styles.switch}>
            <input
              type="checkbox"
              checked={enableDisplaySettings}
              onChange={() => setEnableDisplaySettings(!enableDisplaySettings)}
              style={styles.switchInput}
            />
            <span
              style={{
                ...styles.slider,
                ...(enableDisplaySettings ? styles.sliderChecked : {}),
              }}
            >
              <span
                style={{
                  ...styles.sliderBefore,
                  ...(enableDisplaySettings ? styles.sliderCheckedBefore : {}),
                }}
              ></span>
            </span>
          </label>
          <span style={styles.toggleLabel}>Mostrar Configurações de Exibição</span>
        </div>
        {enableDisplaySettings && (
          <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>Configurações de Exibição</legend>
            <label style={styles.label} htmlFor="duration">
              Tempo de Exibição (segundos)
            </label>
            <input
              type="range"
              id="duration"
              min="1"
              max="300"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              style={styles.range}
            />
            <div>Tempo de exibição: {duration} segundos</div>
            <label style={styles.label} htmlFor="interval">
              Intervalo de Exibição (minutos)
            </label>
            <input
              type="range"
              id="interval"
              min="1"
              max="30"
              value={interval}
              onChange={(e) => setInterval(Number(e.target.value))}
              style={styles.range}
            />
            <div>Intervalo: {interval} minutos</div>
          </fieldset>
        )}
      </fieldset>
    </div>
  );
}

export default QRCodeWidgetEditor;