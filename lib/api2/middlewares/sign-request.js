"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signRequest = signRequest;

var _lodash = _interopRequireDefault(require("lodash"));

var _urijs = _interopRequireDefault(require("urijs"));

var _base = require("../../base");

var HEADER_SIGNATURE = 'signature';
var HEADER_REQUEST_TARGET = '(request-target)';
var HEADERS_TO_SIGN = [HEADER_REQUEST_TARGET];
/**
 * @param {object} requestConfig - the axios config of the request
 * @param {Keypair} signerKp - keypair to sign with
 *
 * @return {object} requestConfig - modified config with header signature
 */

function signRequest(requestConfig, signerKp) {
  if (!_base.Keypair.isValidSecretKey(signerKp.secret())) {
    throw new Error('Invalid keypair provided');
  }

  var config = _lodash.default.cloneDeep(requestConfig);

  var url = getRequestUrl(config);
  var digest = getRequestDigest(url, config, HEADERS_TO_SIGN);
  var signature = signerKp.sign(digest).toString('base64');
  var signatureHeader = getSignatureHeader(signerKp.accountId(), HEADERS_TO_SIGN, signature);
  config.headers = config.headers || {};
  config.headers[HEADER_SIGNATURE] = signatureHeader;
  return config;
}

function getRequestUrl(config) {
  var fullUrl = (0, _urijs.default)(config.url);

  if (config.params) {
    fullUrl = fullUrl.addQuery(config.params);
  }

  return fullUrl.toString();
}

function getRequestDigest(url, config, headersToSign) {
  var toSign = headersToSign.map(function (header) {
    header = header.toLowerCase();

    switch (header) {
      case HEADER_REQUEST_TARGET:
        return "".concat(HEADER_REQUEST_TARGET, ": ").concat(config.method.toLowerCase(), " ").concat(url);

      default:
        return "".concat(header, ": ").concat(config.headers[header]);
    }
  });
  return (0, _base.hash)(toSign.join('\n'));
}

function getSignatureHeader(keyId, signedHeaders, signature) {
  var algorithm = 'ed25519-sha256';
  return "keyId=\"".concat(keyId, "\",algorithm=\"").concat(algorithm, "\",headers=\"").concat(signedHeaders.join(' '), "\",signature=\"").concat(signature, "\"");
}