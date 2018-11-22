"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

var _Object$keys = require("@babel/runtime-corejs2/core-js/object/keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _blobs = require("./blobs");

_Object$keys(_blobs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _blobs[key];
    }
  });
});

var _wallets = require("./wallets");

_Object$keys(_wallets).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _wallets[key];
    }
  });
});

var _factors = require("./factors");

_Object$keys(_factors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _factors[key];
    }
  });
});

var _users = require("./users");

_Object$keys(_users).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _users[key];
    }
  });
});

var _documents = require("./documents");

_Object$keys(_documents).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _documents[key];
    }
  });
});

var _kyc_entities = require("./kyc_entities");

_Object$keys(_kyc_entities).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _kyc_entities[key];
    }
  });
});