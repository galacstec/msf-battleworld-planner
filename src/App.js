import React, { useState, useEffect } from "react";
import FileUploader from "./FileUploader";
import ZoneOperationSelector from "./ZoneOperationSelector";
import CharacterTable from "./CharacterTable";
import requirements from "./battleworld.json";
import { processCharacters } from "./helpers";
import "./App.css";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState([]);
  const [data, setData] = useState(null);
  const [diamondData, setDiamondData] = useState({});
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedOperation, setSelectedOperation] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("characters");
    if (storedData) {
      setCharacters(JSON.parse(storedData));
    }

    const storedInfoData = localStorage.getItem("info");
    if (storedInfoData) {
      setInfo(JSON.parse(storedInfoData));
    }

    const storedDiamondData = localStorage.getItem("diamondData");
    if (storedDiamondData) {
      setDiamondData(JSON.parse(storedDiamondData));
    }
  }, []);

  const handleFileUpload = (result, type) => {
    if (type === "roster") {
      setCharacters(result.data);
      localStorage.setItem("characters", JSON.stringify(result.data));
      processEvent(result.data, info);
    } else if (type === "info") {
      setInfo(result.data);
      localStorage.setItem("info", JSON.stringify(result.data));
      processEvent(characters, result.data);
    }
  };

  const processEvent = (characters, info) => {
    const result = processCharacters(
      characters,
      info,
      requirements,
      diamondData
    );
    setData(result);
  };

  const handleDiamondChange = (playerName, characterId, value) => {
    const updatedDiamondData = {
      ...diamondData,
      [`${playerName}-${characterId}`]: value,
    };
    setDiamondData(updatedDiamondData);
    localStorage.setItem("diamondData", JSON.stringify(updatedDiamondData));
  };

  useEffect(() => {
    if (characters.length > 0) {
      processEvent(characters, info);
    }
  }, [characters, diamondData, info]);

  const handleZoneChange = (zone) => {
    setSelectedZone(zone);
    setSelectedOperation("");
  };

  const handleOperationChange = (operation) => {
    setSelectedOperation(operation);
  };

  const filteredData = {};
  if (selectedZone && selectedOperation) {
    filteredData[selectedZone] = {
      [selectedOperation]: data[selectedZone][selectedOperation],
    };
  } else if (selectedZone) {
    filteredData[selectedZone] = data[selectedZone];
  } else if (selectedOperation) {
    Object.keys(data).forEach((zone) => {
      if (data[zone][selectedOperation]) {
        if (!filteredData[zone]) filteredData[zone] = {};
        filteredData[zone][selectedOperation] = data[zone][selectedOperation];
      }
    });
  } else {
    Object.assign(filteredData, data);
  }

  const uniqueOperations = Object.keys(
    requirements[Object.keys(requirements)[0]]
  );

  return (
    <div>
      <h1>Battleworld</h1>
      <FileUploader onFileUpload={handleFileUpload} />
      <ZoneOperationSelector
        selectedZone={selectedZone}
        selectedOperation={selectedOperation}
        onZoneChange={handleZoneChange}
        onOperationChange={handleOperationChange}
        uniqueOperations={uniqueOperations}
        requirements={requirements}
      />
      {Object.keys(filteredData).length > 0 && (
        <CharacterTable
          data={filteredData}
          handleDiamondChange={handleDiamondChange}
        />
      )}
    </div>
  );
};

export default App;
