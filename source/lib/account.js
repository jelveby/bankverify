import Clearingnumber from './account/sv.clearingnumber.js';
import padLeft from 'pad-left';
import Utils from './utils.js';

const Account = {
  accountNumber: undefined,
  init (accountNumber) {
    this.accountNumber = accountNumber;
  },
  valid () {
    return !this.errors().length;
  },
  errors () {
    let errors = [];

    if (this.serialNumber().length < this.serialNumberLength().min) {
      errors.push(this.ERRORS.TOO_SHORT);
    }
    if (this.serialNumber().length > this.serialNumberLength().max) {
      errors.push(this.ERRORS.TOO_LONG);
    }
    if (this.getAccountNumber().match(/[^\d -]/)) {
      errors.push(this.ERRORS.INVALID_CHARACTERS);
    }

    if (this.luhnForSerial() && !Utils.validLuhn(this.serialNumber())) {
      errors.push(this.ERRORS.BAD_CHECKSUM);
    }

    if (this.bankData().name === undefined) {
      errors.push(this.ERRORS.UNKNOWN_CLEARING_NUMBER);
    }

    return errors;
  },
  getAccountNumber () {
    return this.accountNumber;
  },
  normalize () {
    if (this.valid()) {
      return [this.clearingNumber(), this.serialNumber()].join('-');
    } else {
      return this.getAccountNumber();
    }
  },
  bank () {
    return this.bankData().name;
  },
  bankData () {
    let clearingNumber = parseInt(this.digits().substr(0, 4), 10);

    let found = Clearingnumber.find(number => {
      let interval = number.interval.split('..');
      let lower = parseInt(interval[0], 10);
      let upper = parseInt(interval[1], 10);
      return lower <= clearingNumber && clearingNumber <= upper;
    });

    return found || {};
  },
  serialNumber () {
    let number = this.digits().slice(this.clearingNumberLength());

    return this.zeroFill() ? padLeft(number, this.serialNumberLength().min, 0) : number;
    // return number;
  },
  serialNumberLength () {
    return {
      min: this.bankData().minLength || this.DEFAULTS.MIN_LENGTH,
      max: this.bankData().maxLength || this.bankData().minLength || this.DEFAULTS.MAX_LENGTH
    };
  },
  luhnForSerial () {
    return this.bankData().luhnForSerial;
  },
  clearingNumber () {
    return [
      this.digits().substr(0, 4),
      this.checksumForClearing() ? this.digits().substr(4, 1) : null
    ].filter(function (e) { return e; }).join('-');
  },
  clearingNumberLength () {
    return this.checksumForClearing() ? 5 : 4;
  },
  checksumForClearing () {
    return this.bankData().checksumForClearing || false;
  },
  digits () {
    return this.getAccountNumber().replace(/\D/g, '');
  },
  zeroFill () {
    return this.bankData().zerofill || false;
  },
  'ERRORS': Object.freeze({
    TOO_SHORT: ':too_short',
    TOO_LONG: ':too_long',
    INVALID_CHARACTERS: ':invalid_characters',
    BAD_CHECKSUM: ':bad_checksum',
    UNKNOWN_CLEARING_NUMBER: ':unknown_clearing_number'
  }),
  'DEFAULTS': Object.freeze({
    MIN_LENGTH: 7,
    MAX_LENGTH: 7
  })
};

export default Account;
