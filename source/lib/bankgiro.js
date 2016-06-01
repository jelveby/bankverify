import Utils from './utils.js';
import Errors from './errors.js';

const Bankgiro = {
  number: undefined,
  init(number) {
    this.number = number;
    return this;
  },
  valid() {
    return !this.errors().length;
  },
  errors() {
    let errors = [];

    if (this.digits().length < 7) {
      errors.push(Errors.TOO_SHORT);
    }

    if (this.digits().length > 8) {
      errors.push(Errors.TOO_LONG);
    }

    if (this.getNumber().match(/[^\d -]/)) {
      errors.push(Errors.INVALID_CHARACTERS);
    }

    if (!Utils.mod10(this.digits())) {
      errors.push(Errors.BAD_CHECKSUM);
    }

    return errors;
  },
  normalize() {
    if (this.valid()) {
      return this.digits().split(/(\d{4})$/).slice(0, 2).join('-');
    } else {
      return this.getNumber();
    }
  },
  fundraising() {
    return this.valid() && this.digits().search(/^90[0-4]/) !== -1;
  },
  getNumber() {
    return this.number || '';
  },
  digits() {
    return this.getNumber().replace(/\D/g, '');
  }
};

export default Bankgiro;
