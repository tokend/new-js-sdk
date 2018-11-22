"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Network = exports.Networks = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _hashing = require("./hashing");

/**
* Contains passphrases for common networks:
* * `Networks.PUBLIC`: `Public Global Stellar Network ; September 2015`
* * `Networks.TESTNET`: `Test SDF Network ; September 2015`
* @type {{PUBLIC: string, TESTNET: string}}
*/
var Networks = {
  PUBLIC: 'Public Global Stellar Network ; September 2015',
  TESTNET: 'Test SDF Network ; September 2015'
};
exports.Networks = Networks;

var _current;

var Network =
/*#__PURE__*/
function () {
  /**
    * The Network class provides helper methods to get the passphrase or id for different
    * stellar networks.  It also provides the {@link Network.current} class method that returns the network
    * that will be used by this process for the purposes of generating signatures.
    *
    * The test network is the default, but you can also override the default by using the `use`,
    * `usePublicNetwork` and `useTestNetwork` helper methods.
    *
    * Creates a new `Network` object.
    * @constructor
    * @param {string} networkPassphrase Network passphrase
    */
  function Network(networkPassphrase) {
    (0, _classCallCheck2.default)(this, Network);
    this._networkPassphrase = networkPassphrase;
  }
  /**
    * Use default network (right now default network is `testnet`).
    */


  (0, _createClass2.default)(Network, [{
    key: "networkPassphrase",

    /**
      * Returns network passphrase.
      * @returns {string}
      */
    value: function networkPassphrase() {
      return this._networkPassphrase;
    }
    /**
      * Returns Network ID. Network ID is SHA-256 hash of network passphrase.
      * @returns {string}
      */

  }, {
    key: "networkId",
    value: function networkId() {
      return (0, _hashing.hash)(this.networkPassphrase());
    }
  }], [{
    key: "useDefault",
    value: function useDefault() {
      this.useTestNetwork();
    }
    /**
      * Use Stellar Public Network
      */

  }, {
    key: "usePublicNetwork",
    value: function usePublicNetwork() {
      this.use(new Network(Networks.PUBLIC));
    }
    /**
      * Use test network.
      */

  }, {
    key: "useTestNetwork",
    value: function useTestNetwork() {
      this.use(new Network(Networks.TESTNET));
    }
    /**
      * Use network defined by Network object.
      * @param {Network} network Network to use
      */

  }, {
    key: "use",
    value: function use(network) {
      _current = network;
    }
    /**
      * Returns currently selected network.
      * @returns {Network}
      */

  }, {
    key: "current",
    value: function current() {
      return _current;
    }
  }]);
  return Network;
}();

exports.Network = Network;
Network.useDefault();