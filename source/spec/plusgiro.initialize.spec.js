import Plusgiro from '../lib/plusgiro.js';

describe('Plusgiro - Initialize', () => {
  let plusgiro;

  beforeEach(() => {
    plusgiro = Object.create(Plusgiro);
  });

  it('should initialize', () => {
    plusgiro.should.satisfy((giro) => {
      return Object.getPrototypeOf(giro) === Plusgiro;
    });
  });

  it('should initialize with a value', () => {
    plusgiro.init('4-2');
    plusgiro.number.should.eql('4-2');
  });
});
