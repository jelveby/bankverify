const Utils = {
  mod10(value) {
    let sum = 0;
    let base = value.split('').reverse();

    base.forEach((digit, idx) => {
      let weight = (idx + 1) % 2 === 0 ? 2 : 1;
      let tmp = parseInt(digit, 10) * weight;
      if (tmp > 9) { tmp -= 9; }
      sum += tmp;
    });

    return (sum % 10) === 0;
  },
  mod11(value) {
    if (value.length > 11) { return false; }

    const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1];
    let sum = 0;
    let base = value.split('').reverse();

    base.forEach((digit, idx) => {
      sum += parseInt(digit, 10) * weights[idx];
    });

    return (sum % 11) === 0;
  }
};

export default Utils;
