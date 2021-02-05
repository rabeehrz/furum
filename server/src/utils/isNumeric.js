const isNumeric = (number) => {
  const numberRegex = /^\d+$/;
  return numberRegex.test(number);
};

module.exports = isNumeric;
