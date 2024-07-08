import React, { useState, useRef, useEffect } from "react";

const baseUrl = import.meta.env.VITE_BASE_URL;
const notificationSound = `${baseUrl}audio/notification.mp3`;

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

function AlertWidgetEditor({
  color,
  setColor,
  name,
  setName,
  duration,
  setDuration,
  volume,
  setVolume,
  durationSong,
  setDurationSong,
  enableSong,
  setEnableSong,
}) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  return (
    <div>
      <fieldset style={styles.fieldset}>
        <legend style={styles.legend}>Customize seu alerta</legend>

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

        <label style={styles.label} htmlFor="duration">
          Tempo de Duração
        </label>
        <input
          id="duration"
          type="range"
          min="1"
          max="30"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          style={styles.range}
        />
        <div id="sliderValue">Tempo em segundos: {duration}</div>

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

        <legend style={styles.legend}>Som de alerta</legend>

        <div style={styles.toggle}>
          <label style={styles.switch}>
            <input
              type="checkbox"
              checked={enableSong}
              onChange={() => setEnableSong(!enableSong)}
              style={styles.switchInput}
            />
            <span
              style={{
                ...styles.slider,
                ...(enableSong ? styles.sliderChecked : {}),
              }}
            >
              <span
                style={{
                  ...styles.sliderBefore,
                  ...(enableSong ? styles.sliderCheckedBefore : {}),
                }}
              ></span>
            </span>
          </label>
          <span style={styles.toggleLabel}>
            Tocar som de alerta ao receber uma notificação
          </span>
        </div>

        {enableSong && enableSong === true && (
          <>
            <div>
              <label style={styles.label} htmlFor="audio">
                Audio
              </label>
              <audio controls ref={audioRef}>
                <source src={notificationSound} type="audio/mp3" />
                Seu navegador não suporta o elemento de áudio.
              </audio>
            </div>

            <label style={styles.label} htmlFor="volume">
              Volume
            </label>
            <input
              id="volume"
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              style={styles.range}
            />
            <div>Volume do som de alerta: {volume}%</div>

            <label style={styles.label} htmlFor="duration_song">
              Duração do Som
            </label>
            <input
              id="duration_song"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={durationSong}
              onChange={(e) => setDurationSong(Number(e.target.value))}
              style={styles.range}
            />
            <div>Tempo de duração: {durationSong} segundos</div>
          </>
        )}
      </fieldset>
    </div>
  );
}

export default AlertWidgetEditor;
