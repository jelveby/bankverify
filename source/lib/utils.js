const Utils = {
  mod10(value) {
    if (/[^0-9-\s]+/.test(value)) { return false; }

    let len = value.length,
        arr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9],
        bit = 1,
        sum = 0,
        val;

    while (len) {
        val = parseInt(value.charAt(--len), 10);
        sum += (bit ^= 1) ? arr[val] : val;
    }

    return sum % 10 === 0;
  },
  mod11(value) {
    let result = false,
        weight = [1, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
        controlNumber = parseInt(value.slice(-1)),
        base = value.slice(0, -1);

    let total = base.split('').reduce((sum, digit, idx) => {
      return sum + (parseInt(digit, 10) * weight[idx]);
    }, 0);
    let remainder = total % 11;

    switch (remainder) {
      case 0:
        result = controlNumber === 0;
      break;
      case 1:
        result = false;
      break;
      default:
        result = controlNumber === (11 - remainder);
      break;
    }
    return result;
  }
};

export default Utils;
