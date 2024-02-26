import React, { useState } from "react";
import Monaco from "@monaco-editor/react";
import Example from "../components/Example";

function Home() {
  const [codigo, setCodigo] = useState("");
  const [resul, setResul] = useState([]);
  const [esValido, setEsValido] = useState(null);

  function handleValidarClick() {
    analizarCodigo();
  }

  const analizarCodigo = () => {
    const cadenaS = codigo.replace(/\s/g, "");
    const { esValida, infoPila } = validacion(cadenaS);
    setEsValido(esValida);
    setResul(infoPila);
  };

  function setEditorTheme(monaco) {
    monaco.editor.defineTheme("predictiva", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
      },
    });
  }
  return (
    <>
      <Example />
      <div className="area">
        <Monaco
          beforeMount={setEditorTheme}
          width="800"
          height="40vh"
          theme="predictiva"
          value={codigo}
          options={{
            selectOnLineNumbers: false,
            mouseStyle: "text",
            acceptSuggestionOnEnter: "off",
            quickSuggestions: false,
          }}
          onChange={(newValue) => {
            console.log("Valor:", newValue);
            setCodigo(newValue);
          }}
        />

        <center>
          <div className="line-validator">
            <button onClick={handleValidarClick}>Verificar</button>
            {esValido !== null && <p>{esValido ? "EXITOSO" : "ALGO FALLÓ"}</p>}
          </div>
        </center>
      </div>
      <center>
        <div style={{ marginLeft: "5px" }}>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {resul.map((info, index) => (
              <li key={index} style={{ marginTop: "1cm" }}>
                {info}
              </li>
            ))}
          </ul>
        </div>
      </center>
    </>
  );
}

function validacion(codigo) {
  let pila = ["$"];
  let contador = 0;
  let infoPila = [];
  pila[1] = "S";

  const pushInfo = (X) => {
    infoPila.push(`Push: ${X} -- ${codigo.slice(contador)}`);
  };
  const popInfo = (X) => {
    infoPila.push(`Pop: ${X} --  ${codigo.slice(contador)}`);
  };
  while (pila.length > 0) {
    const X = pila.pop();
    if (!X) {
      break;
    }
    const a = codigo[contador];

    if (X === "$") {
      infoPila.push("TERMINADO");
      break;
    }

    if (X === a) {
      contador++;
    } else if (esNoTerminal(X)) {
      const produccion = obtenerProduccion(X, a);

      if (produccion) {
        pushInfo(X);
        if (produccion[0] !== "ε") {
          for (let i = produccion.length - 1; i >= 0; i--) {
            pila.push(produccion[i]);
          }
        }
      } else {
        infoPila.push(
          `Error: No encontró algo válido para ${X}.`
        );
        return { esValida: false, infoPila };
      }
    } else {
      popInfo(X);
      return { esValida: false, infoPila };
    }
  }
  return { esValida: contador === codigo.length, infoPila };
}

// automata estado: 3 - 123 ; inicio: 1; aceptacion : 2123;
function esNoTerminal(simbolo) {
  const terminales = ["automata", "estado", ";", "[", ",", "]"];
  return !terminales.includes(simbolo);
}
function obtenerProduccion(noTerminal, siguiente) {
  console.log("Siguiente:", siguiente);

  const producciones = {
    S: ["A", "B", ":", "D", "-", "C", ";", "Q", ":", "D", ";", "P", ":", "C", ";"],
    A: ["a", "u", "t", "o", "m", "a", "t", "a"],
    B: ["e", "s", "t", "a", "d", "o"],
    D: /[0-9]/.test(siguiente) ? [siguiente] : null,
    C: /[0-9]/.test(siguiente) ? ["D", "C"] : ["ε"],
    Q: ["i", "n", "i", "c", "i", "o"],
    P: ["a", "c", "e", "p", "t", "a", "c", "i", "o", "n"],
  };

  return producciones[noTerminal];
}

export default Home;