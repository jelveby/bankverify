import Utils from './utils.js';
import Errors from './errors.js';

const Plusgiro = {
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

    if (this.digits().length < 2) {
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
      let [ pre, pairs, post ] = this.digits().split(/(\d{2,6})?(\d)$/);
      pairs = pairs || '';
      pairs = pairs.split(/(\d\d)/).filter(str => { return !!str.length; });
      return [pre, pairs.join(' '), '-', post].join('');
    }
    return this.getNumber();
  },
  fundraising() {
    return this.valid() && this.digits().search(/^90/) !== -1;
  },
  getNumber() {
    return this.number || '';
  },
  digits() {
    return this.getNumber().replace(/\D/g, '');
  }
};

export default Plusgiro;
