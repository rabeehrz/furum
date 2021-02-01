const pick = (object, keys) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});

module.exports = pick;
