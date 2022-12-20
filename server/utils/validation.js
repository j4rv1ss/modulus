export const isEmail = function (email) {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };
  export const isPassword = function (password) {
    let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
    return passwordRegex.test(password);
  };

  export const isPhone = function (number) {
    let phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    return phoneRegex.test(number);
  };
  export const isZipcode = function (pin) {
    if (/^[1-9][0-9]{5}$/.test(pin)) return true;
    else return false;
  };

