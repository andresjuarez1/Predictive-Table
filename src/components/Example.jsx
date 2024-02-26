import CodeExamples from "./Card";

function Example() {
  const ExamplesCodes = [
    {
      content: [
        {
          subtitle:"EJEMPLO",
          code: `automata estado: 3 - 123 ; inicio: 1; aceptacion : 2123;`,  
        },
      ],
    },
  ];

  return (
    <>
      <div>
        <div>
          {ExamplesCodes.map((example, index) => {
            return (
              <CodeExamples
                key={index}
                title={example.title}
                content={example.content}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Example;
