// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../package.json":[function(require,module,exports) {
module.exports = {
  "name": "makerlog-cli",
  "version": "0.1.1",
  "description": "An unoffical command line tool for Makerlog.",
  "license": "MIT",
  "bin": {
    "makerlog": "./build/cli.js"
  },
  "engines": {
    "node": ">=8"
  },
  "scripts": {
    "dev": "pastel dev",
    "build": "pastel build",
    "prepare": "pastel build"
  },
  "author": "Mihai Voinea <hi@voinea.me>",
  "repository": {
    "type": "git",
    "url": "https://github.com/MihaiVoinea/makerlog-cli.git"
  },
  "files": ["build"],
  "dependencies": {
    "configstore": "^4.0.0",
    "ink": "^2.2.0",
    "ink-spinner": "^3.0.1",
    "pasteljs": "^1.0.1",
    "phin": "^3.3.0",
    "prop-types": "^15.7.2",
    "react": "^16.8.6"
  }
};
},{}],"../config/store.config.js":[function(require,module,exports) {
const configStore = require("configstore");

const packageJson = require("../package.json"); // Create a Configstore instance


module.exports = new configStore(packageJson.name);
},{"../package.json":"../package.json"}],"../config/phin.config.js":[function(require,module,exports) {
const p = require("phin");

const store = require("./store.config");

let options = {
  parse: "json",
  core: {
    headers: {
      "Content-Type": "application/json"
    }
  }
};
if (store.has("token")) options.core.headers.Authorization = "Token " + store.get("token");
module.exports = p.defaults(options);
},{"./store.config":"../config/store.config.js"}],"../components/loader.js":[function(require,module,exports) {
"use strict";

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _inkSpinner = _interopRequireDefault(require("ink-spinner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

module.exports = () => _react.default.createElement(_react.Fragment, null, _react.default.createElement(_ink.Color, {
  green: true
}, _react.default.createElement(_inkSpinner.default, {
  type: "dots"
})), " Loading");
},{}],"done.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _store = _interopRequireDefault(require("../config/store.config"));

var _phin = _interopRequireDefault(require("../config/phin.config"));

var _loader = _interopRequireDefault(require("../components/loader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/// Add a new done task
class Done extends _react.Component {
  render() {
    return _react.default.createElement(_ink.Text, null, this.state.message || _react.default.createElement(_loader.default, null));
  }

  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  async componentDidMount() {
    if (!_store.default.has("token")) return this.setState({
      message: "You are not logged in."
    });
    let content = this.props.inputArgs[1];
    if (!content) return this.setState({
      message: "You must add something to log."
    });

    try {
      const res = await (0, _phin.default)({
        url: "https://api.getmakerlog.com/tasks/",
        method: "POST",
        data: {
          content,
          done: true
        }
      });

      if (res.statusCode === 200 || res.statusCode === 201) {
        const message = _react.default.createElement(_react.Fragment, null, _react.default.createElement(_ink.Color, {
          bgHex: "#009056"
        }, " DONE "), " " + res.body.content);

        return this.setState({
          message: message
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

}

Done.propTypes = {
  inputArgs: _propTypes.default.array
};
var _default = Done;
exports.default = _default;
},{"../config/store.config":"../config/store.config.js","../config/phin.config":"../config/phin.config.js","../components/loader":"../components/loader.js"}]},{},["done.js"], null)
//# sourceMappingURL=/done.js.map