const Utils = {
  validLuhn: function (value) {
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

    return sum && sum % 10 === 0;
  }
};

export default Utils;
