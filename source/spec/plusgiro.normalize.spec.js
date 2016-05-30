import Plusgiro from '../lib/plusgiro.js';

describe('Plusgiro - Normalize', () => {
  let plusgiro;

  beforeEach(() => {
    plusgiro = Object.create(Plusgiro);
  });

  it('should normalize short numbers to the format N-N', () => {
    plusgiro.init(' 4- 2').normalize().should.eql('4-2');
  });

  it('should normalize odd-length numbers to the format NN NN NN-N', () => {
    plusgiro.init('2865434').normalize().should.eql('28 65 43-4');
  });

  it('should normalize even-length numbers to the format NNN NN NN-N', () => {
    plusgiro.init('41054685').normalize().should.eql('410 54 68-5');
  });

  it('should not attempt to normalize invalid numbers', () => {
    plusgiro.init(' 1-2-3 ').normalize().should.eql(' 1-2-3 ');
  });

});
