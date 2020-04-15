"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.KEY_VALUE_KEYS = void 0;

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/freeze"));

var KEY_VALUE_KEYS = (0, _freeze.default)({
  issuanceTasks: 'issuance_tasks',
  preIssuanceTasks: 'preissuance_tasks',
  assetCreateTasks: 'asset_create_tasks',
  saleCreateTasks: 'sale_create_tasks:*',
  withdrawalTasks: 'withdrawal_tasks',
  amlAlertTasks: 'aml_alert_tasks',
  atomicSwapBidTasks: 'atomic_swap_bid_tasks:*',
  atomicSwapAskTasks: 'atomic_swap_ask_tasks',
  paymentCreateTasks: 'payment_tasks:*',
  createPollTasks: 'create_poll_tasks:*',
  change_role_tasks: 'change_role_tasks:*:*',
  kycRecoveryEnabled: 'kyc_recovery_enabled',
  kycRecoverySignerRole: 'kyc_recovery_signer_role',
  createKycRecoveryTasks: 'create_kyc_recovery_tasks',
  createOfferTasks: 'create_offer_tasks',
  removeOfferTasks: 'remove_offer_tasks',
  redemptionTasks: 'redemption_tasks'
});
exports.KEY_VALUE_KEYS = KEY_VALUE_KEYS;