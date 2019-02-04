"use strict";

var _network = require("./network");

describe('Network', function () {
  describe('.current()', function () {
    it('defaults to the public network', function () {
      expect(_network.Network.current().networkPassphrase()).to.equal(_network.Networks.TESTNET);
    });
  });
  describe('.usePublicNetwork()', function () {
    beforeEach(function () {
      _network.Network.useDefault();
    });
    it('switches to the public network', function () {
      _network.Network.usePublicNetwork();

      expect(_network.Network.current().networkPassphrase()).to.equal(_network.Networks.PUBLIC);
    });
  });
});