import Utils from '../lib/utils.js';
import { expect } from 'chai';

describe('Utils', () => {
  beforeEach(() => {
  });

  describe('mod10', () => {
    [
      '00',
      '18',
      '26',
      '34',
      '42',
      '59',
      '67',
      '75',
      '83',
      '91',
      '109',
      '117',
      '54029681'
    ].forEach(number => {
      it(`should allow valid numbers like ${number}`, () => {
        expect(Utils.mod10(number)).to.be.true;
      });
    });

    [
      '01',
      '118',
      '54029682'
    ].forEach(number => {
      it(`should not allow invalid numbers like ${number}`, () => {
        expect(Utils.mod10(number)).to.be.false;
      });
    });
  });

  describe('mod11', () => {
    [
      '91234567891',
      '71591293050',
      '21591293055'
    ].forEach(number => {
      it(`should allow valid numbers like ${number}`, () => {
        expect(Utils.mod11(number)).to.be.true;
      });
    });

    [
      '91234567892',
      '81591293050'
    ].forEach(number => {
      it(`should not allow invalid numbers like ${number}`, () => {
        expect(Utils.mod11(number)).to.be.false;
      });
    });
  });

});
