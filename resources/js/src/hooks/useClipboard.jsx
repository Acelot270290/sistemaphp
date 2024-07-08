import { useState } from "react";

const useClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text, setCopied);
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Falha ao copiar para a área de transferência:", err);
      });
  };

  return { copied, copyToClipboard };
};

const fallbackCopyTextToClipboard = (text, setCopied) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const success = document.execCommand("copy");
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      console.error("Cópia para área de transferência falhou.");
    }
  } catch (err) {
    console.error("Falha ao executar o comando de cópia:", err);
  }

  document.body.removeChild(textArea);
};

export default useClipboard;
