import Clearingnumber from './account/sv.clearingnumber.js';
import AccountType from './account/accountType.js';
import padLeft from 'pad-left';
import Utils from './utils.js';

const Account = {
  accountNumber: undefined,
  init (accountNumber) {
    this.accountNumber = accountNumber;
    return this;
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
    if (this.getAccountNumber().match(/[^\d -\.]/)) {
      errors.push(this.ERRORS.INVALID_CHARACTERS);
    }

    if (this.shouldValidate() && !this.validateSerial()) {
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
  },
  serialNumberLength () {
    return {
      min: this.bankData().minLength || this.DEFAULTS.MIN_LENGTH,
      max: this.bankData().maxLength || this.bankData().minLength || this.DEFAULTS.MAX_LENGTH
    };
  },
  shouldValidate() {
    return this.bankData().type && !!this.bankData().type.algorithm;
  },
  validateSerial() {
    if (this.bankData().type.algorithm === 'mod10' && !Utils.mod10(this.validationNumbers())) {
      return false;
    } else if (this.bankData().type.algorithm === 'mod11' && !Utils.mod11(this.validationNumbers())) {
      return false;
    }

    return true;
  },
  validationNumbers() {
    let length = this.bankData().type.weightedNumbers;
    let type = this.bankData().type;
    let numbers;

    if (type === AccountType.TYPE1 || type === AccountType.TYPE2) {
      numbers = this.digits().slice(-length);
    }

    if (type === AccountType.TYPE3 || type === AccountType.TYPE4 || type === AccountType.TYPE5) {
      numbers = this.serialNumber().slice(-length);
    }

    return numbers;
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
  ERRORS: Object.freeze({
    TOO_SHORT: 'TOO_SHORT',
    TOO_LONG: 'TOO_LONG',
    INVALID_CHARACTERS: 'INVALID_CHARACTERS',
    BAD_CHECKSUM: 'BAD_CHECKSUM',
    UNKNOWN_CLEARING_NUMBER: 'UNKNOWN_CLEARING_NUMBER'
  }),
  DEFAULTS: Object.freeze({
    MIN_LENGTH: 7,
    MAX_LENGTH: 7
  })
};

export default Account;
