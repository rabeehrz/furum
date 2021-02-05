const isEmail = (email) => {
  const emailRegex = /\w+@\w+\.+\w+/;
  return emailRegex.test(email);
};

module.exports = isEmail;
