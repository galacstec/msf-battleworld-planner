import React from "react";
import "./CharacterTable.css";

const CharacterTable = ({ data, handleDiamondChange }) => {
  const playerNames = [
    ...new Set(
      Object.values(data).flatMap((zone) =>
        Object.values(zone).flatMap((operation) =>
          Object.values(operation.characters).flatMap((character) =>
            Object.keys(character.eligiblePlayers)
          )
        )
      )
    ),
  ];

  const getGearTierColor = (gearTier) => {
    if (gearTier === 15) return "orange";
    if (gearTier === 17) return "teal";
    if (gearTier === 19) return "crimson";
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Personagem</th>
          {playerNames.map((playerName) => (
            <th key={playerName}>{playerName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.keys(data).map((zone) =>
          Object.keys(data[zone]).map((operation) =>
            Object.keys(data[zone][operation].characters).map((characterId) => {
              const requirement = data[zone][operation].requirement;
              return (
                <tr key={characterId}>
                  <th>
                    {characterId}{" "}
                    {requirement.requiredStars ? (
                      <span className="fa-stack">
                        <i
                          className="fas fa-star fa-stack-1x"
                          style={{ color: "gold" }}
                        ></i>
                        <strong className="fa-stack-1x">
                          {requirement.requiredStars}
                        </strong>
                      </span>
                    ) : requirement.requiredGearTier ? (
                      <span className="fa-stack">
                        <i
                          className="fas fa-shirt fa-stack-1x"
                          style={{
                            color: getGearTierColor(
                              requirement.requiredGearTier
                            ),
                          }}
                        ></i>
                        <strong className="fa-stack-1x">
                          {requirement.requiredGearTier}
                        </strong>
                      </span>
                    ) : requirement.requiredRedStars ? (
                      <span className="fa-stack">
                        <i
                          className="fas fa-star fa-stack-1x"
                          style={{ color: "red" }}
                        ></i>
                        <strong className="fa-stack-1x">
                          {requirement.requiredRedStars}
                        </strong>
                      </span>
                    ) : (
                      <span className="fa-stack">
                        <i
                          className="fas fa-gem fa-stack-1x"
                          style={{ color: "cyan" }}
                        ></i>
                        <strong className="fa-stack-1x">
                          {requirement.requiredDiamond}
                        </strong>
                      </span>
                    )}
                  </th>
                  {playerNames.map((playerName) => (
                    <td
                      key={playerName}
                      style={
                        data[zone][operation].characters[characterId]
                          .eligiblePlayers[playerName] === "unknown"
                          ? { backgroundColor: "lightgray" }
                          : {}
                      }
                    >
                      {requirement.requiredDiamond ? (
                        <input
                          type="checkbox"
                          checked={
                            data[zone][operation].characters[characterId]
                              .eligiblePlayers[playerName]
                          }
                          onChange={(e) =>
                            handleDiamondChange(
                              playerName,
                              characterId,
                              e.target.checked
                            )
                          }
                        />
                      ) : data[zone][operation].characters[characterId]
                          .eligiblePlayers[playerName] === "unknown" ? (
                        "❓"
                      ) : data[zone][operation].characters[characterId]
                          .eligiblePlayers[playerName] ? (
                        "✔️"
                      ) : (
                        "❌"
                      )}
                    </td>
                  ))}
                </tr>
              );
            })
          )
        )}
      </tbody>
    </table>
  );
};

export default CharacterTable;
