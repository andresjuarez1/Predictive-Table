import React from "react";
import CopyCode from "./CopyCode";

function CodeExamples(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      {props.content.map((example, index) => (
        <div key={index}>
          <h3>{example.subtitle}</h3>
          <CopyCode code={example.code} />
        </div>
      ))}
    </div>
  );
}

export default CodeExamples;
