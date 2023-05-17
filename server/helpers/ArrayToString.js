const arrayToString = (array) => {
  try {
    let stringText = "";
    for (let i = 0; i < array.length; i++) {
      stringText += ` ${array[i].name} as a ${array[i].position}.`;
    }
    return stringText;
  } catch (error) {
    throw error;
  }
};

module.exports = arrayToString;
