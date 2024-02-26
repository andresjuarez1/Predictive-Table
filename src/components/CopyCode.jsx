import React, { useState, useEffect } from "react";

function CopyCode(props) {
  const [code, setCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setCode(props.code.toString());
  }, []);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <center>
      <div>
        <button onClick={handleCopyClick}>
          {isCopied ? "Copiar código" : "Copiar código"}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </center>
  );
}

export default CopyCode;
