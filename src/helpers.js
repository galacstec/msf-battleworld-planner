export const processCharacters = (
  characters,
  info,
  requirements,
  diamondData
) => {
  const result = {};
  const playerNames = [
    ...new Set([
      ...characters.map((character) => character.name),
      ...info.map((player) => player.name),
    ]),
  ];

  Object.keys(requirements).forEach((zone) => {
    result[zone] = {};

    Object.keys(requirements[zone]).forEach((operation) => {
      result[zone][operation] = {
        requirement: requirements[zone][operation],
        characters: {},
      };

      requirements[zone][operation].characters.forEach((characterId) => {
        result[zone][operation].characters[characterId] = {
          eligiblePlayers: {},
        };

        playerNames.forEach((playerName) => {
          const playerCharacters = characters.filter(
            (character) => character.name === playerName
          );
          const matchingCharacter = playerCharacters.find(
            (character) => character.characterId === characterId
          );
          const playerInfo = info.find((player) => player.name === playerName);

          if (
            matchingCharacter &&
            isCharacterEligible(
              matchingCharacter,
              requirements[zone][operation]
            )
          ) {
            result[zone][operation].characters[characterId].eligiblePlayers[
              playerName
            ] = true;
          } else if (requirements[zone][operation].requiredDiamond) {
            result[zone][operation].characters[characterId].eligiblePlayers[
              playerName
            ] = diamondData[`${playerName}-${characterId}`] || false;
          } else if (playerInfo && playerInfo.rosterShare === "") {
            result[zone][operation].characters[characterId].eligiblePlayers[
              playerName
            ] = "unknown";
          } else {
            result[zone][operation].characters[characterId].eligiblePlayers[
              playerName
            ] = false;
          }
        });
      });
    });
  });

  return result;
};

const isCharacterEligible = (character, operationRequirements) => {
  if (operationRequirements.requiredDiamond) {
    return false;
  }
  return (
    character.stars >= (operationRequirements.requiredStars || 0) &&
    character.gearTier >= (operationRequirements.requiredGearTier || 0) &&
    character.redStars >= (operationRequirements.requiredRedStars || 0)
  );
};
