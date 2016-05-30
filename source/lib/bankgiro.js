import Utils from './utils.js';

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
      errors.push(this.ERRORS.TOO_SHORT);
    }

    if (this.digits().length > 8) {
      errors.push(this.ERRORS.TOO_LONG);
    }

    if (this.getNumber().match(/[^\d -]/)) {
      errors.push(this.ERRORS.INVALID_CHARACTERS);
    }

    if (!Utils.validLuhn(this.digits())) {
      errors.push(this.ERRORS.BAD_CHECKSUM);
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
  },
  ERRORS: Object.freeze({
    TOO_SHORT: 'TOO_SHORT',
    TOO_LONG: 'TOO_LONG',
    INVALID_CHARACTERS: 'INVALID_CHARACTERS',
    BAD_CHECKSUM: 'BAD_CHECKSUM'
  })
};

export default Bankgiro;
