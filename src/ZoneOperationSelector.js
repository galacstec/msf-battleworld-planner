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
      justifyContent: "center",
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
  </div>
);

export default ZoneOperationSelector;
