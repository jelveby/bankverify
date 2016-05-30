import Utils from './utils.js';

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
      errors.push(this.ERRORS.TOO_SHORT);
    }

    if (this.digits().length > 8) {
      errors.push(this.ERRORS.TOO_LONG);
    }

    if (this.getNumber().match(/[^\d -]/)) {
      errors.push(this.ERRORS.INVALID_CHARACTERS);
    }

    if (!Utils.mod10(this.digits())) {
      errors.push(this.ERRORS.BAD_CHECKSUM);
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
  },
  ERRORS: Object.freeze({
    TOO_SHORT: 'TOO_SHORT',
    TOO_LONG: 'TOO_LONG',
    INVALID_CHARACTERS: 'INVALID_CHARACTERS',
    BAD_CHECKSUM: 'BAD_CHECKSUM'
  })
};

export default Plusgiro;
