function getUpperCaseIndexes(string) {
  //ClothingCoat / JacketDressIntimate ApparelBraOtherPastiesUnderwearLeggingsOnesiesOtherPantsRobeShortsShrug / BoleroSkirtSleepwearSoakersSweaterCardiganOtherPulloverSwimwearTopsOtherSleeveless TopStrapless TopTeeVest
  let indexesUpperCase = [];
  for (let i = 0; i < string.length; i++) {
    const letter = string[i];
    const tolowercase = letter.toLowerCase();
    if (letter !== tolowercase) {
      //letter is uppercase
      if (i === 0) {
        indexesUpperCase.push(i);
      } else if (string[i - 1] !== "-" && string[i - 1] !== "/") {
        indexesUpperCase.push(i);
      }
    }
  }
  return indexesUpperCase;
}

function joinString(string) {
  const joinFwdSlash = string.replaceAll(" / ", "/");
  const joinSpaces = joinFwdSlash.replaceAll(" ", "-");
  return joinSpaces;
}

function separateWords(string) {
  const joinedString = joinString(string);
  const upperCaseIndexes = getUpperCaseIndexes(joinedString);
  let categories = [];
  for (let i = 0; i < upperCaseIndexes.length; i++) {
    if (i === upperCaseIndexes.length - 1) {
      categories.push(joinedString.substring(upperCaseIndexes[i]));
    } else {
      categories.push(
        joinedString.substring(upperCaseIndexes[i], upperCaseIndexes[i + 1])
      );
    }
  }
  return categories;
}

function allcategories(array) {
  let folders = [];
  for (let i = 0; i < array.length; i++) {
    const currentstring = array[i];
    const cleanstring = separateWords(currentstring);
    folders.push(cleanstring);
  }
  return folders;
}
