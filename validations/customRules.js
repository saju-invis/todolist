exports.checkForAllowedChars = (value, inputType) => {
  if (value) {
    let allowedChars;
    switch (inputType) {
      case 'name':
        allowedChars = /^[a-z0-9 .]+$/i;
        break;
      case 'filename':
        allowedChars = /^[a-zA-Z0-9-]+$/i;
        break;
    }
    return allowedChars.test(value);
  } else {
    return true;
  }
};

exports.checkPwStrength = (pw) => {
  const reg1 = /[0-9]+/;
  let err = '';
  if (reg1.test(pw) === false) {
    err += 'Password must contain at least one digit';
  }

  const reg2 = /[a-zA-Z]+/;
  if (reg2.test(pw) === false) {
    err += '\nPassword must contain at least one alphabet';
  }

  return err;
};
