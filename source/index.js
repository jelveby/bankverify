import Account from './lib/account.js';
import Bankgiro from './lib/bankgiro.js';
import Plusgiro from './lib/plusgiro.js';

if (typeof Object.create !== 'function') {
	Object.create = (function() {
		var Temp = function() {};
		return function (prototype) {
			if (arguments.length > 1) {
				throw Error('Second argument not supported');
			}
			if (prototype !== Object(prototype) && prototype !== null) {
				throw new TypeError('Argument must be an object or null');
			}
			if (prototype === null) {
				throw Error('null [[Prototype]] not supported');
			}
			Temp.prototype = prototype;
			var result = new Temp();
			Temp.prototype = null;
			return result;
		};
	})();
}
export {
  Account,
  Bankgiro,
  Plusgiro
};
