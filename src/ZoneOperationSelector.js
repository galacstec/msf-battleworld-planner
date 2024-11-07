import React from "react";

const ZoneOperationSelector = ({
  selectedZone,
  selectedOperation,
  onZoneChange,
  onOperationChange,
  uniqueOperations,
  requirements,
}) => (
  <div
    style={{
      margin: "20px 0",
      display: "flex",
      justifyContent: "space-evenly",
    }}
  >
    <label>
      Zona:
      <select
        value={selectedZone}
        onChange={(e) => onZoneChange(e.target.value)}
      >
        <option value="">Selecione uma zona</option>
        {Object.keys(requirements).map((zone) => (
          <option key={zone} value={zone}>
            {zone}
          </option>
        ))}
      </select>
    </label>

    <label>
      Operação:
      <select
        value={selectedOperation}
        onChange={(e) => onOperationChange(e.target.value)}
      >
        <option value="">Selecione uma operação</option>
        {uniqueOperations.map((operation) => (
          <option key={operation} value={operation}>
            {operation}
          </option>
        ))}
      </select>
    </label>
    <button
      className="diamondForm"
      onClick={(event) => {
        navigator.clipboard.writeText(localStorage.getItem("diamondData"));
        event.target.insertAdjacentHTML(
          "afterend",
          '<span style="color: green;">Copiado!</span>'
        );
        setTimeout(() => {
          event.target.nextElementSibling.remove();
        }, 1000);
      }}
    >
      Copiar informação dos diamantes
    </button>
    <span>
      <textarea placeholder="cole aqui"></textarea>
      <button
        className="diamondForm"
        onClick={() => {
          try {
            JSON.parse(document.querySelector("textarea").value);
            localStorage.setItem(
              "diamondData",
              document.querySelector("textarea").value
            );
            document.querySelector("textarea").value = "Sucesso!";
            setTimeout(() => {
              document.querySelector("textarea").value = "";
            }, 1000);
          } catch (error) {
            document.querySelector("textarea").value = "Inválido!";
            setTimeout(() => {
              document.querySelector("textarea").value = "";
            }, 1000);
          }
        }}
      >
        Carregar informação dos diamantes
      </button>
    </span>
  </div>
);

export default ZoneOperationSelector;
