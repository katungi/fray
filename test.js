const modules = new Map();

const define = (name, moduleFactory) => {
    modules.set(name, moduleFactory);
}

const moduleCache = new Map();
const requireModule = (name) => {
    if (moduleCache.has(name)) {
        return moduleCache.get(name).exports;
    }
    const moduleFactory = modules.get(name);
    const module = {
        exports: {},
    };
    moduleCache.set(name, module);
    moduleFactory(requireModule, module, module.exports);
    
    return module.exports;
}

define(8, function(require, module, exports) {
"use strict";

module.exports = 'tomato';});
define(7, function(require, module, exports) {
"use strict";

module.exports = 'melon';});
define(4, function(require, module, exports) {
"use strict";

console.log('I am a Kiwi at kiwi.js');
module.exports = 'kiwi ' + require(7) + ' ' + require(8);});
define(2, function(require, module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = 'banana ' + require(4);});
define(1, function(require, module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _banana = _interopRequireDefault(require(2));
var _kiwi = _interopRequireDefault(require(4));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = 'apple ' + _banana.default + ' ' + _kiwi.default;});
define(0, function(require, module, exports) {
"use strict";

var _apple = _interopRequireDefault(require(1));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
console.log(_apple.default);});
requireModule(0)