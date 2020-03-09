const assert = require('assert');
class Eva {
  eval(exp) {
    if (isNumber(exp)) {
      return exp;
    }
    if (isString(exp)) {
      return exp.slice(1, -1);
    }
    if (exp[0] === '+') {
      let [exp1, exp2] = exp.slice(1);
      if (Array.isArray(exp1)) {
        exp1 = this.eval(exp1);
      }
      if (Array.isArray(exp2)) {
        exp2 = this.eval(exp2);
      }
      return exp1 + exp2;
    }
    throw 'Unimplemented';
  }
}

const eva = new Eva();

function isNumber(exp) {
  return typeof exp === 'number';
}

function isString(exp) {
  return typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"';
}
assert.strictEqual(eva.eval(1), 1);
assert.strictEqual(eva.eval('"hello"'), 'hello');
assert.strictEqual(eva.eval(['+', 1, 5]), 6);
assert.strictEqual(eva.eval(['+', ['+', 3, 2], 5]), 10);

console.log('All assertion passed');
