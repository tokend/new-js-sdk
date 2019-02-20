// revision: f710477e73ba20bbd3c19f49a274fc7668d19ff4
// branch:   master
// Automatically generated on 2019-02-20T14:43:26+00:00
// DO NOT EDIT or your changes may be overwritten

/* jshint maxstatements:2147483647  */
/* jshint esnext:true  */

import * as XDR from 'js-xdr';


var types = XDR.config(xdr => {

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("PendingStatisticsEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct PendingStatisticsEntry
//   {
//       uint64 statisticsID;
//       uint64 requestID;
//       uint64 amount;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("PendingStatisticsEntry", [
  ["statisticsId", xdr.lookup("Uint64")],
  ["requestId", xdr.lookup("Uint64")],
  ["amount", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("PendingStatisticsEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("BalanceEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct BalanceEntry
//   {
//       BalanceID balanceID;
//   	// sequenctial ID - unique identifier of the balance, used by ingesting applications to 
//   	// identify account, while keeping size of index small 
//       uint64 sequentialID;
//       AssetCode asset;
//       AccountID accountID;
//       uint64 amount;
//       uint64 locked;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("BalanceEntry", [
  ["balanceId", xdr.lookup("BalanceId")],
  ["sequentialId", xdr.lookup("Uint64")],
  ["asset", xdr.lookup("AssetCode")],
  ["accountId", xdr.lookup("AccountId")],
  ["amount", xdr.lookup("Uint64")],
  ["locked", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("BalanceEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (OperationType type)
//       {
//       case CREATE_ACCOUNT:
//           CreateAccountOp createAccountOp;
//   	case CREATE_ISSUANCE_REQUEST:
//   		CreateIssuanceRequestOp createIssuanceRequestOp;
//       case SET_FEES:
//           SetFeesOp setFeesOp;
//   	case CREATE_WITHDRAWAL_REQUEST:
//   		CreateWithdrawalRequestOp createWithdrawalRequestOp;
//   	case MANAGE_BALANCE:
//   		ManageBalanceOp manageBalanceOp;
//       case MANAGE_ASSET:
//           ManageAssetOp manageAssetOp;
//       case CREATE_PREISSUANCE_REQUEST:
//           CreatePreIssuanceRequestOp createPreIssuanceRequest;
//       case MANAGE_LIMITS:
//           ManageLimitsOp manageLimitsOp;
//   	case MANAGE_ASSET_PAIR:
//   		ManageAssetPairOp manageAssetPairOp;
//   	case MANAGE_OFFER:
//   		ManageOfferOp manageOfferOp;
//       case MANAGE_INVOICE_REQUEST:
//           ManageInvoiceRequestOp manageInvoiceRequestOp;
//   	case REVIEW_REQUEST:
//   		ReviewRequestOp reviewRequestOp;
//   	case CREATE_SALE_REQUEST:
//   		CreateSaleCreationRequestOp createSaleCreationRequestOp;
//   	case CHECK_SALE_STATE:
//   		CheckSaleStateOp checkSaleStateOp;
//   	case PAYOUT:
//   	    PayoutOp payoutOp;
//   	case CREATE_AML_ALERT:
//   	    CreateAMLAlertRequestOp createAMLAlertRequestOp;
//   	case MANAGE_KEY_VALUE:
//   	    ManageKeyValueOp manageKeyValueOp;
//   	case CREATE_CHANGE_ROLE_REQUEST:
//   		CreateChangeRoleRequestOp createChangeRoleRequestOp;
//       case MANAGE_EXTERNAL_SYSTEM_ACCOUNT_ID_POOL_ENTRY:
//           ManageExternalSystemAccountIdPoolEntryOp manageExternalSystemAccountIdPoolEntryOp;
//       case BIND_EXTERNAL_SYSTEM_ACCOUNT_ID:
//           BindExternalSystemAccountIdOp bindExternalSystemAccountIdOp;
//       case PAYMENT_V2:
//           PaymentOpV2 paymentOpV2;
//       case MANAGE_SALE:
//           ManageSaleOp manageSaleOp;
//       case CREATE_MANAGE_LIMITS_REQUEST:
//           CreateManageLimitsRequestOp createManageLimitsRequestOp;
//       case MANAGE_CONTRACT_REQUEST:
//           ManageContractRequestOp manageContractRequestOp;
//       case MANAGE_CONTRACT:
//           ManageContractOp manageContractOp;
//       case CANCEL_SALE_REQUEST:
//           CancelSaleCreationRequestOp cancelSaleCreationRequestOp;
//       case CREATE_ASWAP_BID_REQUEST:
//           CreateASwapBidCreationRequestOp createASwapBidCreationRequestOp;
//       case CANCEL_ASWAP_BID:
//           CancelASwapBidOp cancelASwapBidOp;
//       case CREATE_ASWAP_REQUEST:
//           CreateASwapRequestOp createASwapRequestOp;
//       case MANAGE_ACCOUNT_ROLE:
//           ManageAccountRoleOp manageAccountRoleOp;
//       case MANAGE_ACCOUNT_RULE:
//           ManageAccountRuleOp manageAccountRuleOp;
//       case MANAGE_SIGNER:
//           ManageSignerOp manageSignerOp;
//       case MANAGE_SIGNER_ROLE:
//           ManageSignerRoleOp manageSignerRoleOp;
//       case MANAGE_SIGNER_RULE:
//           ManageSignerRuleOp manageSignerRuleOp;
//       }
//
// ===========================================================================
xdr.union("OperationBody", {
  switchOn: xdr.lookup("OperationType"),
  switchName: "type",
  switches: [
    ["createAccount", "createAccountOp"],
    ["createIssuanceRequest", "createIssuanceRequestOp"],
    ["setFee", "setFeesOp"],
    ["createWithdrawalRequest", "createWithdrawalRequestOp"],
    ["manageBalance", "manageBalanceOp"],
    ["manageAsset", "manageAssetOp"],
    ["createPreissuanceRequest", "createPreIssuanceRequest"],
    ["manageLimit", "manageLimitsOp"],
    ["manageAssetPair", "manageAssetPairOp"],
    ["manageOffer", "manageOfferOp"],
    ["manageInvoiceRequest", "manageInvoiceRequestOp"],
    ["reviewRequest", "reviewRequestOp"],
    ["createSaleRequest", "createSaleCreationRequestOp"],
    ["checkSaleState", "checkSaleStateOp"],
    ["payout", "payoutOp"],
    ["createAmlAlert", "createAmlAlertRequestOp"],
    ["manageKeyValue", "manageKeyValueOp"],
    ["createChangeRoleRequest", "createChangeRoleRequestOp"],
    ["manageExternalSystemAccountIdPoolEntry", "manageExternalSystemAccountIdPoolEntryOp"],
    ["bindExternalSystemAccountId", "bindExternalSystemAccountIdOp"],
    ["paymentV2", "paymentOpV2"],
    ["manageSale", "manageSaleOp"],
    ["createManageLimitsRequest", "createManageLimitsRequestOp"],
    ["manageContractRequest", "manageContractRequestOp"],
    ["manageContract", "manageContractOp"],
    ["cancelSaleRequest", "cancelSaleCreationRequestOp"],
    ["createAswapBidRequest", "createASwapBidCreationRequestOp"],
    ["cancelAswapBid", "cancelASwapBidOp"],
    ["createAswapRequest", "createASwapRequestOp"],
    ["manageAccountRole", "manageAccountRoleOp"],
    ["manageAccountRule", "manageAccountRuleOp"],
    ["manageSigner", "manageSignerOp"],
    ["manageSignerRole", "manageSignerRoleOp"],
    ["manageSignerRule", "manageSignerRuleOp"],
  ],
  arms: {
    createAccountOp: xdr.lookup("CreateAccountOp"),
    createIssuanceRequestOp: xdr.lookup("CreateIssuanceRequestOp"),
    setFeesOp: xdr.lookup("SetFeesOp"),
    createWithdrawalRequestOp: xdr.lookup("CreateWithdrawalRequestOp"),
    manageBalanceOp: xdr.lookup("ManageBalanceOp"),
    manageAssetOp: xdr.lookup("ManageAssetOp"),
    createPreIssuanceRequest: xdr.lookup("CreatePreIssuanceRequestOp"),
    manageLimitsOp: xdr.lookup("ManageLimitsOp"),
    manageAssetPairOp: xdr.lookup("ManageAssetPairOp"),
    manageOfferOp: xdr.lookup("ManageOfferOp"),
    manageInvoiceRequestOp: xdr.lookup("ManageInvoiceRequestOp"),
    reviewRequestOp: xdr.lookup("ReviewRequestOp"),
    createSaleCreationRequestOp: xdr.lookup("CreateSaleCreationRequestOp"),
    checkSaleStateOp: xdr.lookup("CheckSaleStateOp"),
    payoutOp: xdr.lookup("PayoutOp"),
    createAmlAlertRequestOp: xdr.lookup("CreateAmlAlertRequestOp"),
    manageKeyValueOp: xdr.lookup("ManageKeyValueOp"),
    createChangeRoleRequestOp: xdr.lookup("CreateChangeRoleRequestOp"),
    manageExternalSystemAccountIdPoolEntryOp: xdr.lookup("ManageExternalSystemAccountIdPoolEntryOp"),
    bindExternalSystemAccountIdOp: xdr.lookup("BindExternalSystemAccountIdOp"),
    paymentOpV2: xdr.lookup("PaymentOpV2"),
    manageSaleOp: xdr.lookup("ManageSaleOp"),
    createManageLimitsRequestOp: xdr.lookup("CreateManageLimitsRequestOp"),
    manageContractRequestOp: xdr.lookup("ManageContractRequestOp"),
    manageContractOp: xdr.lookup("ManageContractOp"),
    cancelSaleCreationRequestOp: xdr.lookup("CancelSaleCreationRequestOp"),
    createASwapBidCreationRequestOp: xdr.lookup("CreateASwapBidCreationRequestOp"),
    cancelASwapBidOp: xdr.lookup("CancelASwapBidOp"),
    createASwapRequestOp: xdr.lookup("CreateASwapRequestOp"),
    manageAccountRoleOp: xdr.lookup("ManageAccountRoleOp"),
    manageAccountRuleOp: xdr.lookup("ManageAccountRuleOp"),
    manageSignerOp: xdr.lookup("ManageSignerOp"),
    manageSignerRoleOp: xdr.lookup("ManageSignerRoleOp"),
    manageSignerRuleOp: xdr.lookup("ManageSignerRuleOp"),
  },
});

// === xdr source ============================================================
//
//   struct Operation
//   {
//       // sourceAccount is the account used to run the operation
//       // if not set, the runtime defaults to "sourceAccount" specified at
//       // the transaction level
//       AccountID* sourceAccount;
//   
//       union switch (OperationType type)
//       {
//       case CREATE_ACCOUNT:
//           CreateAccountOp createAccountOp;
//   	case CREATE_ISSUANCE_REQUEST:
//   		CreateIssuanceRequestOp createIssuanceRequestOp;
//       case SET_FEES:
//           SetFeesOp setFeesOp;
//   	case CREATE_WITHDRAWAL_REQUEST:
//   		CreateWithdrawalRequestOp createWithdrawalRequestOp;
//   	case MANAGE_BALANCE:
//   		ManageBalanceOp manageBalanceOp;
//       case MANAGE_ASSET:
//           ManageAssetOp manageAssetOp;
//       case CREATE_PREISSUANCE_REQUEST:
//           CreatePreIssuanceRequestOp createPreIssuanceRequest;
//       case MANAGE_LIMITS:
//           ManageLimitsOp manageLimitsOp;
//   	case MANAGE_ASSET_PAIR:
//   		ManageAssetPairOp manageAssetPairOp;
//   	case MANAGE_OFFER:
//   		ManageOfferOp manageOfferOp;
//       case MANAGE_INVOICE_REQUEST:
//           ManageInvoiceRequestOp manageInvoiceRequestOp;
//   	case REVIEW_REQUEST:
//   		ReviewRequestOp reviewRequestOp;
//   	case CREATE_SALE_REQUEST:
//   		CreateSaleCreationRequestOp createSaleCreationRequestOp;
//   	case CHECK_SALE_STATE:
//   		CheckSaleStateOp checkSaleStateOp;
//   	case PAYOUT:
//   	    PayoutOp payoutOp;
//   	case CREATE_AML_ALERT:
//   	    CreateAMLAlertRequestOp createAMLAlertRequestOp;
//   	case MANAGE_KEY_VALUE:
//   	    ManageKeyValueOp manageKeyValueOp;
//   	case CREATE_CHANGE_ROLE_REQUEST:
//   		CreateChangeRoleRequestOp createChangeRoleRequestOp;
//       case MANAGE_EXTERNAL_SYSTEM_ACCOUNT_ID_POOL_ENTRY:
//           ManageExternalSystemAccountIdPoolEntryOp manageExternalSystemAccountIdPoolEntryOp;
//       case BIND_EXTERNAL_SYSTEM_ACCOUNT_ID:
//           BindExternalSystemAccountIdOp bindExternalSystemAccountIdOp;
//       case PAYMENT_V2:
//           PaymentOpV2 paymentOpV2;
//       case MANAGE_SALE:
//           ManageSaleOp manageSaleOp;
//       case CREATE_MANAGE_LIMITS_REQUEST:
//           CreateManageLimitsRequestOp createManageLimitsRequestOp;
//       case MANAGE_CONTRACT_REQUEST:
//           ManageContractRequestOp manageContractRequestOp;
//       case MANAGE_CONTRACT:
//           ManageContractOp manageContractOp;
//       case CANCEL_SALE_REQUEST:
//           CancelSaleCreationRequestOp cancelSaleCreationRequestOp;
//       case CREATE_ASWAP_BID_REQUEST:
//           CreateASwapBidCreationRequestOp createASwapBidCreationRequestOp;
//       case CANCEL_ASWAP_BID:
//           CancelASwapBidOp cancelASwapBidOp;
//       case CREATE_ASWAP_REQUEST:
//           CreateASwapRequestOp createASwapRequestOp;
//       case MANAGE_ACCOUNT_ROLE:
//           ManageAccountRoleOp manageAccountRoleOp;
//       case MANAGE_ACCOUNT_RULE:
//           ManageAccountRuleOp manageAccountRuleOp;
//       case MANAGE_SIGNER:
//           ManageSignerOp manageSignerOp;
//       case MANAGE_SIGNER_ROLE:
//           ManageSignerRoleOp manageSignerRoleOp;
//       case MANAGE_SIGNER_RULE:
//           ManageSignerRuleOp manageSignerRuleOp;
//       }
//       body;
//   };
//
// ===========================================================================
xdr.struct("Operation", [
  ["sourceAccount", xdr.option(xdr.lookup("AccountId"))],
  ["body", xdr.lookup("OperationBody")],
]);

// === xdr source ============================================================
//
//   enum MemoType
//   {
//       MEMO_NONE = 0,
//       MEMO_TEXT = 1,
//       MEMO_ID = 2,
//       MEMO_HASH = 3,
//       MEMO_RETURN = 4
//   };
//
// ===========================================================================
xdr.enum("MemoType", {
  memoNone: 0,
  memoText: 1,
  memoId: 2,
  memoHash: 3,
  memoReturn: 4,
});

// === xdr source ============================================================
//
//   union Memo switch (MemoType type)
//   {
//   case MEMO_NONE:
//       void;
//   case MEMO_TEXT:
//       string text<28>;
//   case MEMO_ID:
//       uint64 id;
//   case MEMO_HASH:
//       Hash hash; // the hash of what to pull from the content server
//   case MEMO_RETURN:
//       Hash retHash; // the hash of the tx you are rejecting
//   };
//
// ===========================================================================
xdr.union("Memo", {
  switchOn: xdr.lookup("MemoType"),
  switchName: "type",
  switches: [
    ["memoNone", xdr.void()],
    ["memoText", "text"],
    ["memoId", "id"],
    ["memoHash", "hash"],
    ["memoReturn", "retHash"],
  ],
  arms: {
    text: xdr.string(28),
    id: xdr.lookup("Uint64"),
    hash: xdr.lookup("Hash"),
    retHash: xdr.lookup("Hash"),
  },
});

// === xdr source ============================================================
//
//   struct TimeBounds
//   {
//       uint64 minTime;
//       uint64 maxTime; // 0 here means no maxTime
//   };
//
// ===========================================================================
xdr.struct("TimeBounds", [
  ["minTime", xdr.lookup("Uint64")],
  ["maxTime", xdr.lookup("Uint64")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("TransactionExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct Transaction
//   {
//       // account used to run the transaction
//       AccountID sourceAccount;
//   
//       Salt salt;
//   
//       // validity range (inclusive) for the last ledger close time
//       TimeBounds timeBounds;
//   
//       Memo memo;
//   
//       Operation operations<100>;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("Transaction", [
  ["sourceAccount", xdr.lookup("AccountId")],
  ["salt", xdr.lookup("Salt")],
  ["timeBounds", xdr.lookup("TimeBounds")],
  ["memo", xdr.lookup("Memo")],
  ["operations", xdr.varArray(xdr.lookup("Operation"), 100)],
  ["ext", xdr.lookup("TransactionExt")],
]);

// === xdr source ============================================================
//
//   struct TransactionEnvelope
//   {
//       Transaction tx;
//       DecoratedSignature signatures<20>;
//   };
//
// ===========================================================================
xdr.struct("TransactionEnvelope", [
  ["tx", xdr.lookup("Transaction")],
  ["signatures", xdr.varArray(xdr.lookup("DecoratedSignature"), 20)],
]);

// === xdr source ============================================================
//
//   enum OperationResultCode
//   {
//       opINNER = 0, // inner object result is valid
//   
//       opBAD_AUTH = -1,      // too few valid signatures / wrong network
//       opNO_ACCOUNT = -2,    // source account was not found
//   	opNOT_ALLOWED = -3,   // operation is not allowed for this type of source account
//   	opACCOUNT_BLOCKED = -4, // account is blocked
//       opNO_COUNTERPARTY = -5,
//       opCOUNTERPARTY_BLOCKED = -6,
//       opCOUNTERPARTY_WRONG_TYPE = -7,
//       opBAD_AUTH_EXTRA = -8,
//       opNO_ROLE_PERMISSION = -9, // not allowed for this role of source account
//       opNO_ENTRY = -10,
//       opNOT_SUPPORTED = -11
//   };
//
// ===========================================================================
xdr.enum("OperationResultCode", {
  opInner: 0,
  opBadAuth: -1,
  opNoAccount: -2,
  opNotAllowed: -3,
  opAccountBlocked: -4,
  opNoCounterparty: -5,
  opCounterpartyBlocked: -6,
  opCounterpartyWrongType: -7,
  opBadAuthExtra: -8,
  opNoRolePermission: -9,
  opNoEntry: -10,
  opNotSupported: -11,
});

// === xdr source ============================================================
//
//   union switch (OperationType type)
//       {
//       case CREATE_ACCOUNT:
//           CreateAccountResult createAccountResult;
//   	case CREATE_ISSUANCE_REQUEST:
//   		CreateIssuanceRequestResult createIssuanceRequestResult;
//       case SET_FEES:
//           SetFeesResult setFeesResult;
//       case CREATE_WITHDRAWAL_REQUEST:
//   		CreateWithdrawalRequestResult createWithdrawalRequestResult;
//       case MANAGE_BALANCE:
//           ManageBalanceResult manageBalanceResult;
//       case MANAGE_ASSET:
//           ManageAssetResult manageAssetResult;
//       case CREATE_PREISSUANCE_REQUEST:
//           CreatePreIssuanceRequestResult createPreIssuanceRequestResult;
//       case MANAGE_LIMITS:
//           ManageLimitsResult manageLimitsResult;
//   	case MANAGE_ASSET_PAIR:
//   		ManageAssetPairResult manageAssetPairResult;
//   	case MANAGE_OFFER:
//   		ManageOfferResult manageOfferResult;
//   	case MANAGE_INVOICE_REQUEST:
//   		ManageInvoiceRequestResult manageInvoiceRequestResult;
//   	case REVIEW_REQUEST:
//   		ReviewRequestResult reviewRequestResult;
//   	case CREATE_SALE_REQUEST:
//   		CreateSaleCreationRequestResult createSaleCreationRequestResult;
//   	case CHECK_SALE_STATE:
//   		CheckSaleStateResult checkSaleStateResult;
//   	case PAYOUT:
//   	    PayoutResult payoutResult;
//   	case CREATE_AML_ALERT:
//   	    CreateAMLAlertRequestResult createAMLAlertRequestResult;
//   	case MANAGE_KEY_VALUE:
//   	    ManageKeyValueResult manageKeyValueResult;
//   	case CREATE_CHANGE_ROLE_REQUEST:
//   	    CreateChangeRoleRequestResult createChangeRoleRequestResult;
//       case MANAGE_EXTERNAL_SYSTEM_ACCOUNT_ID_POOL_ENTRY:
//           ManageExternalSystemAccountIdPoolEntryResult manageExternalSystemAccountIdPoolEntryResult;
//       case BIND_EXTERNAL_SYSTEM_ACCOUNT_ID:
//           BindExternalSystemAccountIdResult bindExternalSystemAccountIdResult;
//       case PAYMENT_V2:
//           PaymentV2Result paymentV2Result;
//       case MANAGE_SALE:
//           ManageSaleResult manageSaleResult;
//       case CREATE_MANAGE_LIMITS_REQUEST:
//           CreateManageLimitsRequestResult createManageLimitsRequestResult;
//       case MANAGE_CONTRACT_REQUEST:
//           ManageContractRequestResult manageContractRequestResult;
//       case MANAGE_CONTRACT:
//           ManageContractResult manageContractResult;
//       case CANCEL_SALE_REQUEST:
//           CancelSaleCreationRequestResult cancelSaleCreationRequestResult;
//       case CREATE_ASWAP_BID_REQUEST:
//           CreateASwapBidCreationRequestResult createASwapBidCreationRequestResult;
//       case CANCEL_ASWAP_BID:
//           CancelASwapBidResult cancelASwapBidResult;
//       case CREATE_ASWAP_REQUEST:
//           CreateASwapRequestResult createASwapRequestResult;
//       case MANAGE_ACCOUNT_ROLE:
//           ManageAccountRoleResult manageAccountRoleResult;
//       case MANAGE_ACCOUNT_RULE:
//           ManageAccountRuleResult manageAccountRuleResult;
//       case MANAGE_SIGNER:
//           ManageSignerResult manageSignerResult;
//       case MANAGE_SIGNER_ROLE:
//           ManageSignerRoleResult manageSignerRoleResult;
//       case MANAGE_SIGNER_RULE:
//           ManageSignerRuleResult manageSignerRuleResult;
//       }
//
// ===========================================================================
xdr.union("OperationResultTr", {
  switchOn: xdr.lookup("OperationType"),
  switchName: "type",
  switches: [
    ["createAccount", "createAccountResult"],
    ["createIssuanceRequest", "createIssuanceRequestResult"],
    ["setFee", "setFeesResult"],
    ["createWithdrawalRequest", "createWithdrawalRequestResult"],
    ["manageBalance", "manageBalanceResult"],
    ["manageAsset", "manageAssetResult"],
    ["createPreissuanceRequest", "createPreIssuanceRequestResult"],
    ["manageLimit", "manageLimitsResult"],
    ["manageAssetPair", "manageAssetPairResult"],
    ["manageOffer", "manageOfferResult"],
    ["manageInvoiceRequest", "manageInvoiceRequestResult"],
    ["reviewRequest", "reviewRequestResult"],
    ["createSaleRequest", "createSaleCreationRequestResult"],
    ["checkSaleState", "checkSaleStateResult"],
    ["payout", "payoutResult"],
    ["createAmlAlert", "createAmlAlertRequestResult"],
    ["manageKeyValue", "manageKeyValueResult"],
    ["createChangeRoleRequest", "createChangeRoleRequestResult"],
    ["manageExternalSystemAccountIdPoolEntry", "manageExternalSystemAccountIdPoolEntryResult"],
    ["bindExternalSystemAccountId", "bindExternalSystemAccountIdResult"],
    ["paymentV2", "paymentV2Result"],
    ["manageSale", "manageSaleResult"],
    ["createManageLimitsRequest", "createManageLimitsRequestResult"],
    ["manageContractRequest", "manageContractRequestResult"],
    ["manageContract", "manageContractResult"],
    ["cancelSaleRequest", "cancelSaleCreationRequestResult"],
    ["createAswapBidRequest", "createASwapBidCreationRequestResult"],
    ["cancelAswapBid", "cancelASwapBidResult"],
    ["createAswapRequest", "createASwapRequestResult"],
    ["manageAccountRole", "manageAccountRoleResult"],
    ["manageAccountRule", "manageAccountRuleResult"],
    ["manageSigner", "manageSignerResult"],
    ["manageSignerRole", "manageSignerRoleResult"],
    ["manageSignerRule", "manageSignerRuleResult"],
  ],
  arms: {
    createAccountResult: xdr.lookup("CreateAccountResult"),
    createIssuanceRequestResult: xdr.lookup("CreateIssuanceRequestResult"),
    setFeesResult: xdr.lookup("SetFeesResult"),
    createWithdrawalRequestResult: xdr.lookup("CreateWithdrawalRequestResult"),
    manageBalanceResult: xdr.lookup("ManageBalanceResult"),
    manageAssetResult: xdr.lookup("ManageAssetResult"),
    createPreIssuanceRequestResult: xdr.lookup("CreatePreIssuanceRequestResult"),
    manageLimitsResult: xdr.lookup("ManageLimitsResult"),
    manageAssetPairResult: xdr.lookup("ManageAssetPairResult"),
    manageOfferResult: xdr.lookup("ManageOfferResult"),
    manageInvoiceRequestResult: xdr.lookup("ManageInvoiceRequestResult"),
    reviewRequestResult: xdr.lookup("ReviewRequestResult"),
    createSaleCreationRequestResult: xdr.lookup("CreateSaleCreationRequestResult"),
    checkSaleStateResult: xdr.lookup("CheckSaleStateResult"),
    payoutResult: xdr.lookup("PayoutResult"),
    createAmlAlertRequestResult: xdr.lookup("CreateAmlAlertRequestResult"),
    manageKeyValueResult: xdr.lookup("ManageKeyValueResult"),
    createChangeRoleRequestResult: xdr.lookup("CreateChangeRoleRequestResult"),
    manageExternalSystemAccountIdPoolEntryResult: xdr.lookup("ManageExternalSystemAccountIdPoolEntryResult"),
    bindExternalSystemAccountIdResult: xdr.lookup("BindExternalSystemAccountIdResult"),
    paymentV2Result: xdr.lookup("PaymentV2Result"),
    manageSaleResult: xdr.lookup("ManageSaleResult"),
    createManageLimitsRequestResult: xdr.lookup("CreateManageLimitsRequestResult"),
    manageContractRequestResult: xdr.lookup("ManageContractRequestResult"),
    manageContractResult: xdr.lookup("ManageContractResult"),
    cancelSaleCreationRequestResult: xdr.lookup("CancelSaleCreationRequestResult"),
    createASwapBidCreationRequestResult: xdr.lookup("CreateASwapBidCreationRequestResult"),
    cancelASwapBidResult: xdr.lookup("CancelASwapBidResult"),
    createASwapRequestResult: xdr.lookup("CreateASwapRequestResult"),
    manageAccountRoleResult: xdr.lookup("ManageAccountRoleResult"),
    manageAccountRuleResult: xdr.lookup("ManageAccountRuleResult"),
    manageSignerResult: xdr.lookup("ManageSignerResult"),
    manageSignerRoleResult: xdr.lookup("ManageSignerRoleResult"),
    manageSignerRuleResult: xdr.lookup("ManageSignerRuleResult"),
  },
});

// === xdr source ============================================================
//
//   union OperationResult switch (OperationResultCode code)
//   {
//   case opINNER:
//       union switch (OperationType type)
//       {
//       case CREATE_ACCOUNT:
//           CreateAccountResult createAccountResult;
//   	case CREATE_ISSUANCE_REQUEST:
//   		CreateIssuanceRequestResult createIssuanceRequestResult;
//       case SET_FEES:
//           SetFeesResult setFeesResult;
//       case CREATE_WITHDRAWAL_REQUEST:
//   		CreateWithdrawalRequestResult createWithdrawalRequestResult;
//       case MANAGE_BALANCE:
//           ManageBalanceResult manageBalanceResult;
//       case MANAGE_ASSET:
//           ManageAssetResult manageAssetResult;
//       case CREATE_PREISSUANCE_REQUEST:
//           CreatePreIssuanceRequestResult createPreIssuanceRequestResult;
//       case MANAGE_LIMITS:
//           ManageLimitsResult manageLimitsResult;
//   	case MANAGE_ASSET_PAIR:
//   		ManageAssetPairResult manageAssetPairResult;
//   	case MANAGE_OFFER:
//   		ManageOfferResult manageOfferResult;
//   	case MANAGE_INVOICE_REQUEST:
//   		ManageInvoiceRequestResult manageInvoiceRequestResult;
//   	case REVIEW_REQUEST:
//   		ReviewRequestResult reviewRequestResult;
//   	case CREATE_SALE_REQUEST:
//   		CreateSaleCreationRequestResult createSaleCreationRequestResult;
//   	case CHECK_SALE_STATE:
//   		CheckSaleStateResult checkSaleStateResult;
//   	case PAYOUT:
//   	    PayoutResult payoutResult;
//   	case CREATE_AML_ALERT:
//   	    CreateAMLAlertRequestResult createAMLAlertRequestResult;
//   	case MANAGE_KEY_VALUE:
//   	    ManageKeyValueResult manageKeyValueResult;
//   	case CREATE_CHANGE_ROLE_REQUEST:
//   	    CreateChangeRoleRequestResult createChangeRoleRequestResult;
//       case MANAGE_EXTERNAL_SYSTEM_ACCOUNT_ID_POOL_ENTRY:
//           ManageExternalSystemAccountIdPoolEntryResult manageExternalSystemAccountIdPoolEntryResult;
//       case BIND_EXTERNAL_SYSTEM_ACCOUNT_ID:
//           BindExternalSystemAccountIdResult bindExternalSystemAccountIdResult;
//       case PAYMENT_V2:
//           PaymentV2Result paymentV2Result;
//       case MANAGE_SALE:
//           ManageSaleResult manageSaleResult;
//       case CREATE_MANAGE_LIMITS_REQUEST:
//           CreateManageLimitsRequestResult createManageLimitsRequestResult;
//       case MANAGE_CONTRACT_REQUEST:
//           ManageContractRequestResult manageContractRequestResult;
//       case MANAGE_CONTRACT:
//           ManageContractResult manageContractResult;
//       case CANCEL_SALE_REQUEST:
//           CancelSaleCreationRequestResult cancelSaleCreationRequestResult;
//       case CREATE_ASWAP_BID_REQUEST:
//           CreateASwapBidCreationRequestResult createASwapBidCreationRequestResult;
//       case CANCEL_ASWAP_BID:
//           CancelASwapBidResult cancelASwapBidResult;
//       case CREATE_ASWAP_REQUEST:
//           CreateASwapRequestResult createASwapRequestResult;
//       case MANAGE_ACCOUNT_ROLE:
//           ManageAccountRoleResult manageAccountRoleResult;
//       case MANAGE_ACCOUNT_RULE:
//           ManageAccountRuleResult manageAccountRuleResult;
//       case MANAGE_SIGNER:
//           ManageSignerResult manageSignerResult;
//       case MANAGE_SIGNER_ROLE:
//           ManageSignerRoleResult manageSignerRoleResult;
//       case MANAGE_SIGNER_RULE:
//           ManageSignerRuleResult manageSignerRuleResult;
//       }
//       tr;
//   case opNO_ENTRY:
//       LedgerEntryType entryType;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("OperationResult", {
  switchOn: xdr.lookup("OperationResultCode"),
  switchName: "code",
  switches: [
    ["opInner", "tr"],
    ["opNoEntry", "entryType"],
  ],
  arms: {
    tr: xdr.lookup("OperationResultTr"),
    entryType: xdr.lookup("LedgerEntryType"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   enum TransactionResultCode
//   {
//       txSUCCESS = 0, // all operations succeeded
//   
//       txFAILED = -1, // one of the operations failed (none were applied)
//   
//       txTOO_EARLY = -2,         // ledger closeTime before minTime
//       txTOO_LATE = -3,          // ledger closeTime after maxTime
//       txMISSING_OPERATION = -4, // no operation was specified
//   
//       txBAD_AUTH = -5,                   // too few valid signatures / wrong network
//       txNO_ACCOUNT = -6,                 // source account not found
//       txBAD_AUTH_EXTRA = -7,             // unused signatures attached to transaction
//       txINTERNAL_ERROR = -8,             // an unknown error occurred
//       txACCOUNT_BLOCKED = -9,            // account is blocked and cannot be source of tx
//       txDUPLICATION = -10,               // if timing is stored
//       txINSUFFICIENT_FEE = -11,          // the actual total fee amount is greater than the max total fee amount, provided by the source
//       txSOURCE_UNDERFUNDED = -12,        // not enough tx fee asset on source balance
//       txCOMMISSION_LINE_FULL = -13,      // commission tx fee asset balance amount overflow
//       txFEE_INCORRECT_PRECISION = -14,   // fee amount is incompatible with asset precision
//       txNO_ROLE_PERMISSION = -15         // account role has not rule that allows send transaction
//   };
//
// ===========================================================================
xdr.enum("TransactionResultCode", {
  txSuccess: 0,
  txFailed: -1,
  txTooEarly: -2,
  txTooLate: -3,
  txMissingOperation: -4,
  txBadAuth: -5,
  txNoAccount: -6,
  txBadAuthExtra: -7,
  txInternalError: -8,
  txAccountBlocked: -9,
  txDuplication: -10,
  txInsufficientFee: -11,
  txSourceUnderfunded: -12,
  txCommissionLineFull: -13,
  txFeeIncorrectPrecision: -14,
  txNoRolePermission: -15,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("OperationFeeExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct OperationFee
//   {
//       OperationType operationType;
//       uint64 amount;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("OperationFee", [
  ["operationType", xdr.lookup("OperationType")],
  ["amount", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("OperationFeeExt")],
]);

// === xdr source ============================================================
//
//   union switch (TransactionResultCode code)
//       {
//       case txSUCCESS:
//       case txFAILED:
//           OperationResult results<>;
//       default:
//           void;
//       }
//
// ===========================================================================
xdr.union("TransactionResultResult", {
  switchOn: xdr.lookup("TransactionResultCode"),
  switchName: "code",
  switches: [
    ["txSuccess", "results"],
    ["txFailed", "results"],
  ],
  arms: {
    results: xdr.varArray(xdr.lookup("OperationResult"), 2147483647),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("TransactionResultExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct TransactionResult
//   {
//       int64 feeCharged; // actual fee charged for the transaction
//   
//       union switch (TransactionResultCode code)
//       {
//       case txSUCCESS:
//       case txFAILED:
//           OperationResult results<>;
//       default:
//           void;
//       }
//       result;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("TransactionResult", [
  ["feeCharged", xdr.lookup("Int64")],
  ["result", xdr.lookup("TransactionResultResult")],
  ["ext", xdr.lookup("TransactionResultExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ChangeRoleRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ChangeRoleRequest
//   {
//   	AccountID destinationAccount;
//   	uint64 accountRoleToSet;
//   
//   	// Sequence number increases when request is rejected
//   	uint32 sequenceNumber;
//   
//       longstring creatorDetails; // details set by requester
//   
//       // Reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ChangeRoleRequest", [
  ["destinationAccount", xdr.lookup("AccountId")],
  ["accountRoleToSet", xdr.lookup("Uint64")],
  ["sequenceNumber", xdr.lookup("Uint32")],
  ["creatorDetails", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("ChangeRoleRequestExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreateASwapRequestOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateASwapRequestOp
//   {
//       ASwapRequest request;
//   
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("CreateASwapRequestOp", [
  ["request", xdr.lookup("ASwapRequest")],
  ["ext", xdr.lookup("CreateASwapRequestOpExt")],
]);

// === xdr source ============================================================
//
//   enum CreateASwapRequestResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       INVALID_BASE_AMOUNT = -1,
//       INVALID_QUOTE_ASSET = -2,
//       BID_NOT_FOUND = -3,
//       QUOTE_ASSET_NOT_FOUND = -4,
//       BID_UNDERFUNDED = -5, // bid has not enough base amount available for lock
//       ATOMIC_SWAP_TASKS_NOT_FOUND = -6,
//       NOT_ALLOWED_BY_ASSET_POLICY = -7,
//       BID_IS_CANCELLED = -8,
//       CANNOT_CREATE_ASWAP_REQUEST_FOR_OWN_BID = -9
//   };
//
// ===========================================================================
xdr.enum("CreateASwapRequestResultCode", {
  success: 0,
  invalidBaseAmount: -1,
  invalidQuoteAsset: -2,
  bidNotFound: -3,
  quoteAssetNotFound: -4,
  bidUnderfunded: -5,
  atomicSwapTasksNotFound: -6,
  notAllowedByAssetPolicy: -7,
  bidIsCancelled: -8,
  cannotCreateAswapRequestForOwnBid: -9,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreateASwapRequestSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateASwapRequestSuccess
//   {
//       uint64 requestID;
//       AccountID bidOwnerID;
//   
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("CreateASwapRequestSuccess", [
  ["requestId", xdr.lookup("Uint64")],
  ["bidOwnerId", xdr.lookup("AccountId")],
  ["ext", xdr.lookup("CreateASwapRequestSuccessExt")],
]);

// === xdr source ============================================================
//
//   union CreateASwapRequestResult switch (CreateASwapRequestResultCode code)
//   {
//   case SUCCESS:
//       CreateASwapRequestSuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("CreateASwapRequestResult", {
  switchOn: xdr.lookup("CreateASwapRequestResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("CreateASwapRequestSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreateAmlAlertRequestOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateAMLAlertRequestOp
//   {
//       string64 reference;
//       AMLAlertRequest amlAlertRequest;
//   
//       uint32* allTasks;
//       
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   
//   };
//
// ===========================================================================
xdr.struct("CreateAmlAlertRequestOp", [
  ["reference", xdr.lookup("String64")],
  ["amlAlertRequest", xdr.lookup("AmlAlertRequest")],
  ["allTasks", xdr.option(xdr.lookup("Uint32"))],
  ["ext", xdr.lookup("CreateAmlAlertRequestOpExt")],
]);

// === xdr source ============================================================
//
//   enum CreateAMLAlertRequestResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//       BALANCE_NOT_EXIST = 1, // balance doesn't exist
//       INVALID_REASON = 2, //invalid reason for request
//       UNDERFUNDED = 3, //when couldn't lock balance
//       REFERENCE_DUPLICATION = 4, // reference already exists
//       INVALID_AMOUNT = 5, // amount must be positive
//       INCORRECT_PRECISION = 6,
//   
//       //codes considered as "failure" for the operation
//       AML_ALERT_TASKS_NOT_FOUND = -1
//   
//   };
//
// ===========================================================================
xdr.enum("CreateAmlAlertRequestResultCode", {
  success: 0,
  balanceNotExist: 1,
  invalidReason: 2,
  underfunded: 3,
  referenceDuplication: 4,
  invalidAmount: 5,
  incorrectPrecision: 6,
  amlAlertTasksNotFound: -1,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreateAmlAlertRequestSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateAMLAlertRequestSuccess {
//   	uint64 requestID;
//       bool fulfilled;
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CreateAmlAlertRequestSuccess", [
  ["requestId", xdr.lookup("Uint64")],
  ["fulfilled", xdr.bool()],
  ["ext", xdr.lookup("CreateAmlAlertRequestSuccessExt")],
]);

// === xdr source ============================================================
//
//   union CreateAMLAlertRequestResult switch (CreateAMLAlertRequestResultCode code)
//   {
//       case SUCCESS:
//           CreateAMLAlertRequestSuccess success;
//       default:
//           void;
//   };
//
// ===========================================================================
xdr.union("CreateAmlAlertRequestResult", {
  switchOn: xdr.lookup("CreateAmlAlertRequestResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("CreateAmlAlertRequestSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ContractRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ContractRequest
//   {
//       AccountID customer;
//       AccountID escrow;
//       longstring creatorDetails; // details set by requester
//   
//       uint64 startTime;
//       uint64 endTime;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ContractRequest", [
  ["customer", xdr.lookup("AccountId")],
  ["escrow", xdr.lookup("AccountId")],
  ["creatorDetails", xdr.lookup("Longstring")],
  ["startTime", xdr.lookup("Uint64")],
  ["endTime", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("ContractRequestExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("WithdrawalRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct WithdrawalRequest {
//   	BalanceID balance; // balance id from which withdrawal will be performed
//       uint64 amount; // amount to be withdrawn
//       uint64 universalAmount; // amount in stats asset
//   	Fee fee; // expected fee to be paid
//       longstring creatorDetails; // details set by requester
//   
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("WithdrawalRequest", [
  ["balance", xdr.lookup("BalanceId")],
  ["amount", xdr.lookup("Uint64")],
  ["universalAmount", xdr.lookup("Uint64")],
  ["fee", xdr.lookup("Fee")],
  ["creatorDetails", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("WithdrawalRequestExt")],
]);

// === xdr source ============================================================
//
//   enum ManageSignerRuleAction
//   {
//       CREATE = 0,
//       UPDATE = 1,
//       REMOVE = 2
//   };
//
// ===========================================================================
xdr.enum("ManageSignerRuleAction", {
  create: 0,
  update: 1,
  remove: 2,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreateSignerRuleDataExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateSignerRuleData
//   {
//       SignerRuleResource resource;
//       SignerRuleAction action;
//       bool isForbid;
//       bool isDefault;
//       bool isReadOnly;
//       longstring details;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("CreateSignerRuleData", [
  ["resource", xdr.lookup("SignerRuleResource")],
  ["action", xdr.lookup("SignerRuleAction")],
  ["isForbid", xdr.bool()],
  ["isDefault", xdr.bool()],
  ["isReadOnly", xdr.bool()],
  ["details", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("CreateSignerRuleDataExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("UpdateSignerRuleDataExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct UpdateSignerRuleData
//   {
//       uint64 ruleID;
//       SignerRuleResource resource;
//       SignerRuleAction action;
//       bool isForbid;
//       bool isDefault;
//       longstring details;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("UpdateSignerRuleData", [
  ["ruleId", xdr.lookup("Uint64")],
  ["resource", xdr.lookup("SignerRuleResource")],
  ["action", xdr.lookup("SignerRuleAction")],
  ["isForbid", xdr.bool()],
  ["isDefault", xdr.bool()],
  ["details", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("UpdateSignerRuleDataExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("RemoveSignerRuleDataExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct RemoveSignerRuleData
//   {
//       uint64 ruleID;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("RemoveSignerRuleData", [
  ["ruleId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("RemoveSignerRuleDataExt")],
]);

// === xdr source ============================================================
//
//   union switch (ManageSignerRuleAction action)
//       {
//       case CREATE:
//           CreateSignerRuleData createData;
//       case UPDATE:
//           UpdateSignerRuleData updateData;
//       case REMOVE:
//           RemoveSignerRuleData removeData;
//       }
//
// ===========================================================================
xdr.union("ManageSignerRuleOpData", {
  switchOn: xdr.lookup("ManageSignerRuleAction"),
  switchName: "action",
  switches: [
    ["create", "createData"],
    ["update", "updateData"],
    ["remove", "removeData"],
  ],
  arms: {
    createData: xdr.lookup("CreateSignerRuleData"),
    updateData: xdr.lookup("UpdateSignerRuleData"),
    removeData: xdr.lookup("RemoveSignerRuleData"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageSignerRuleOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageSignerRuleOp
//   {
//       union switch (ManageSignerRuleAction action)
//       {
//       case CREATE:
//           CreateSignerRuleData createData;
//       case UPDATE:
//           UpdateSignerRuleData updateData;
//       case REMOVE:
//           RemoveSignerRuleData removeData;
//       } data;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageSignerRuleOp", [
  ["data", xdr.lookup("ManageSignerRuleOpData")],
  ["ext", xdr.lookup("ManageSignerRuleOpExt")],
]);

// === xdr source ============================================================
//
//   enum ManageSignerRuleResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       NOT_FOUND = -1, // does not exists or owner mismatched
//       RULE_IS_USED = -2,
//       INVALID_DETAILS = -3
//   };
//
// ===========================================================================
xdr.enum("ManageSignerRuleResultCode", {
  success: 0,
  notFound: -1,
  ruleIsUsed: -2,
  invalidDetail: -3,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//               {
//               case EMPTY_VERSION:
//                   void;
//               }
//
// ===========================================================================
xdr.union("ManageSignerRuleResultSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//               uint64 ruleID;
//   
//               // reserved for future use
//               union switch (LedgerVersion v)
//               {
//               case EMPTY_VERSION:
//                   void;
//               }
//               ext;
//           }
//
// ===========================================================================
xdr.struct("ManageSignerRuleResultSuccess", [
  ["ruleId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("ManageSignerRuleResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   union ManageSignerRuleResult switch (ManageSignerRuleResultCode code)
//   {
//       case SUCCESS:
//           struct {
//               uint64 ruleID;
//   
//               // reserved for future use
//               union switch (LedgerVersion v)
//               {
//               case EMPTY_VERSION:
//                   void;
//               }
//               ext;
//           } success;
//       case RULE_IS_USED:
//           uint64 roleIDs<>;
//       default:
//           void;
//   };
//
// ===========================================================================
xdr.union("ManageSignerRuleResult", {
  switchOn: xdr.lookup("ManageSignerRuleResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
    ["ruleIsUsed", "roleIDs"],
  ],
  arms: {
    success: xdr.lookup("ManageSignerRuleResultSuccess"),
    roleIDs: xdr.varArray(xdr.lookup("Uint64"), 2147483647),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CancelASwapBidOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CancelASwapBidOp
//   {
//       uint64 bidID;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("CancelASwapBidOp", [
  ["bidId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("CancelASwapBidOpExt")],
]);

// === xdr source ============================================================
//
//   enum CancelASwapBidResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       NOT_FOUND = -1, // atomic swap bid does not exist
//       ALREADY_CANCELLED = -2 // atomic swap bid already cancelled
//   };
//
// ===========================================================================
xdr.enum("CancelASwapBidResultCode", {
  success: 0,
  notFound: -1,
  alreadyCancelled: -2,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CancelASwapBidResultSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CancelASwapBidResultSuccess
//   {
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("CancelASwapBidResultSuccess", [
  ["ext", xdr.lookup("CancelASwapBidResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   union CancelASwapBidResult switch (CancelASwapBidResultCode code)
//   {
//   case SUCCESS:
//       CancelASwapBidResultSuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("CancelASwapBidResult", {
  switchOn: xdr.lookup("CancelASwapBidResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("CancelASwapBidResultSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   enum ManageAccountRoleAction
//   {
//       CREATE = 0,
//       UPDATE = 1,
//       REMOVE = 2
//   };
//
// ===========================================================================
xdr.enum("ManageAccountRoleAction", {
  create: 0,
  update: 1,
  remove: 2,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreateAccountRoleDataExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateAccountRoleData
//   {
//       longstring details;
//       uint64 accountRuleIDs<>;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("CreateAccountRoleData", [
  ["details", xdr.lookup("Longstring")],
  ["accountRuleIDs", xdr.varArray(xdr.lookup("Uint64"), 2147483647)],
  ["ext", xdr.lookup("CreateAccountRoleDataExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("UpdateAccountRoleDataExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct UpdateAccountRoleData
//   {
//       uint64 roleID;
//       longstring details;
//       uint64 accountRuleIDs<>;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("UpdateAccountRoleData", [
  ["roleId", xdr.lookup("Uint64")],
  ["details", xdr.lookup("Longstring")],
  ["accountRuleIDs", xdr.varArray(xdr.lookup("Uint64"), 2147483647)],
  ["ext", xdr.lookup("UpdateAccountRoleDataExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("RemoveAccountRoleDataExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct RemoveAccountRoleData
//   {
//       uint64 accountRoleID;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("RemoveAccountRoleData", [
  ["accountRoleId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("RemoveAccountRoleDataExt")],
]);

// === xdr source ============================================================
//
//   union switch (ManageAccountRoleAction action)
//       {
//       case CREATE:
//           CreateAccountRoleData createData;
//       case UPDATE:
//           UpdateAccountRoleData updateData;
//       case REMOVE:
//           RemoveAccountRoleData removeData;
//       }
//
// ===========================================================================
xdr.union("ManageAccountRoleOpData", {
  switchOn: xdr.lookup("ManageAccountRoleAction"),
  switchName: "action",
  switches: [
    ["create", "createData"],
    ["update", "updateData"],
    ["remove", "removeData"],
  ],
  arms: {
    createData: xdr.lookup("CreateAccountRoleData"),
    updateData: xdr.lookup("UpdateAccountRoleData"),
    removeData: xdr.lookup("RemoveAccountRoleData"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageAccountRoleOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageAccountRoleOp
//   {
//       union switch (ManageAccountRoleAction action)
//       {
//       case CREATE:
//           CreateAccountRoleData createData;
//       case UPDATE:
//           UpdateAccountRoleData updateData;
//       case REMOVE:
//           RemoveAccountRoleData removeData;
//       } data;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageAccountRoleOp", [
  ["data", xdr.lookup("ManageAccountRoleOpData")],
  ["ext", xdr.lookup("ManageAccountRoleOpExt")],
]);

// === xdr source ============================================================
//
//   enum ManageAccountRoleResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       NOT_FOUND = -1,
//       ROLE_IS_USED = -2,
//       INVALID_DETAILS = -3,
//       NO_SUCH_RULE = -4,
//       RULE_ID_DUPLICATION = -5
//   };
//
// ===========================================================================
xdr.enum("ManageAccountRoleResultCode", {
  success: 0,
  notFound: -1,
  roleIsUsed: -2,
  invalidDetail: -3,
  noSuchRule: -4,
  ruleIdDuplication: -5,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//               {
//               case EMPTY_VERSION:
//                   void;
//               }
//
// ===========================================================================
xdr.union("ManageAccountRoleResultSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//               uint64 roleID;
//   
//               // reserved for future use
//               union switch (LedgerVersion v)
//               {
//               case EMPTY_VERSION:
//                   void;
//               }
//               ext;
//           }
//
// ===========================================================================
xdr.struct("ManageAccountRoleResultSuccess", [
  ["roleId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("ManageAccountRoleResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   union ManageAccountRoleResult switch (ManageAccountRoleResultCode code)
//   {
//       case SUCCESS:
//           struct {
//               uint64 roleID;
//   
//               // reserved for future use
//               union switch (LedgerVersion v)
//               {
//               case EMPTY_VERSION:
//                   void;
//               }
//               ext;
//           } success;
//       case RULE_ID_DUPLICATION:
//       case NO_SUCH_RULE:
//           uint64 ruleID;
//       default:
//           void;
//   };
//
// ===========================================================================
xdr.union("ManageAccountRoleResult", {
  switchOn: xdr.lookup("ManageAccountRoleResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
    ["ruleIdDuplication", "ruleId"],
    ["noSuchRule", "ruleId"],
  ],
  arms: {
    success: xdr.lookup("ManageAccountRoleResultSuccess"),
    ruleId: xdr.lookup("Uint64"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("PayoutOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct PayoutOp
//   {
//       AssetCode asset; // asset, which holders will receive dividends
//       BalanceID sourceBalanceID; // balance, from which payout will be performed
//   
//       uint64 maxPayoutAmount; // max amount of asset, that owner wants to pay out
//       uint64 minPayoutAmount; // min tokens amount which will be payed for one balance;
//       uint64 minAssetHolderAmount; // min tokens amount for which holder will received dividends
//   
//       Fee fee;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("PayoutOp", [
  ["asset", xdr.lookup("AssetCode")],
  ["sourceBalanceId", xdr.lookup("BalanceId")],
  ["maxPayoutAmount", xdr.lookup("Uint64")],
  ["minPayoutAmount", xdr.lookup("Uint64")],
  ["minAssetHolderAmount", xdr.lookup("Uint64")],
  ["fee", xdr.lookup("Fee")],
  ["ext", xdr.lookup("PayoutOpExt")],
]);

// === xdr source ============================================================
//
//   enum PayoutResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,    // payout successfully completed
//   
//       // codes considered as "failure" for the operation
//       INVALID_AMOUNT = -1, // max payout amount can not be zero
//       INVALID_ASSET = -2,
//       ASSET_NOT_FOUND = -3,
//       ASSET_NOT_TRANSFERABLE = -4, // asset must have policy transferable
//       BALANCE_NOT_FOUND = -5,
//       INSUFFICIENT_FEE_AMOUNT = -6,
//       FEE_EXCEEDS_ACTUAL_AMOUNT = -7,
//       TOTAL_FEE_OVERFLOW = -8,
//       UNDERFUNDED = -9, // not enough amount on source balance
//       HOLDERS_NOT_FOUND = -10, // there is no holders of such asset
//       MIN_AMOUNT_TOO_BIG = -11, // there is no appropriate holders balances
//       LINE_FULL = -12, // destination balance amount overflows
//       STATS_OVERFLOW = -13, // source statistics overflow
//       LIMITS_EXCEEDED = -14, // source account limit exceeded
//       INCORRECT_PRECISION = -15 // asset does not allow amounts with such precision
//   };
//
// ===========================================================================
xdr.enum("PayoutResultCode", {
  success: 0,
  invalidAmount: -1,
  invalidAsset: -2,
  assetNotFound: -3,
  assetNotTransferable: -4,
  balanceNotFound: -5,
  insufficientFeeAmount: -6,
  feeExceedsActualAmount: -7,
  totalFeeOverflow: -8,
  underfunded: -9,
  holdersNotFound: -10,
  minAmountTooBig: -11,
  lineFull: -12,
  statsOverflow: -13,
  limitsExceeded: -14,
  incorrectPrecision: -15,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("PayoutResponseExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct PayoutResponse
//   {
//       AccountID receiverID;
//       BalanceID receiverBalanceID;
//       uint64 receivedAmount;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("PayoutResponse", [
  ["receiverId", xdr.lookup("AccountId")],
  ["receiverBalanceId", xdr.lookup("BalanceId")],
  ["receivedAmount", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("PayoutResponseExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("PayoutSuccessResultExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct PayoutSuccessResult
//   {
//       PayoutResponse payoutResponses<>;
//       uint64 actualPayoutAmount;
//       Fee actualFee;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("PayoutSuccessResult", [
  ["payoutResponses", xdr.varArray(xdr.lookup("PayoutResponse"), 2147483647)],
  ["actualPayoutAmount", xdr.lookup("Uint64")],
  ["actualFee", xdr.lookup("Fee")],
  ["ext", xdr.lookup("PayoutSuccessResultExt")],
]);

// === xdr source ============================================================
//
//   union PayoutResult switch (PayoutResultCode code)
//   {
//       case SUCCESS:
//           PayoutSuccessResult success;
//       default:
//           void;
//   };
//
// ===========================================================================
xdr.union("PayoutResult", {
  switchOn: xdr.lookup("PayoutResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("PayoutSuccessResult"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   	{
//   	case EMPTY_VERSION:
//   		void;
//   	}
//
// ===========================================================================
xdr.union("CreateManageLimitsRequestOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateManageLimitsRequestOp
//   {
//       LimitsUpdateRequest manageLimitsRequest;
//   
//   	uint32* allTasks;
//       uint64 requestID;
//   
//   
//   	// reserved for future use
//   	union switch (LedgerVersion v)
//   	{
//   	case EMPTY_VERSION:
//   		void;
//   	}
//   	ext;
//   
//   };
//
// ===========================================================================
xdr.struct("CreateManageLimitsRequestOp", [
  ["manageLimitsRequest", xdr.lookup("LimitsUpdateRequest")],
  ["allTasks", xdr.option(xdr.lookup("Uint32"))],
  ["requestId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("CreateManageLimitsRequestOpExt")],
]);

// === xdr source ============================================================
//
//   enum CreateManageLimitsRequestResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//   	MANAGE_LIMITS_REQUEST_REFERENCE_DUPLICATION = -1,
//       MANAGE_LIMITS_REQUEST_NOT_FOUND = -2,
//       INVALID_DETAILS = -3, // details must be valid json
//   	LIMITS_UPDATE_TASKS_NOT_FOUND = -5,
//       NOT_ALLOWED_TO_SET_TASKS_ON_UPDATE = -6, // can't set allTasks on request update
//       LIMITS_UPDATE_ZERO_TASKS_NOT_ALLOWED = -7
//   
//   };
//
// ===========================================================================
xdr.enum("CreateManageLimitsRequestResultCode", {
  success: 0,
  manageLimitsRequestReferenceDuplication: -1,
  manageLimitsRequestNotFound: -2,
  invalidDetail: -3,
  limitsUpdateTasksNotFound: -5,
  notAllowedToSetTasksOnUpdate: -6,
  limitsUpdateZeroTasksNotAllowed: -7,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("CreateManageLimitsRequestResultSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//           uint64 manageLimitsRequestID;
//   		bool fulfilled;
//   		// reserved for future use
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	}
//
// ===========================================================================
xdr.struct("CreateManageLimitsRequestResultSuccess", [
  ["manageLimitsRequestId", xdr.lookup("Uint64")],
  ["fulfilled", xdr.bool()],
  ["ext", xdr.lookup("CreateManageLimitsRequestResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   union CreateManageLimitsRequestResult switch (CreateManageLimitsRequestResultCode code)
//   {
//   case SUCCESS:
//       struct {
//           uint64 manageLimitsRequestID;
//   		bool fulfilled;
//   		// reserved for future use
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	} success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("CreateManageLimitsRequestResult", {
  switchOn: xdr.lookup("CreateManageLimitsRequestResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("CreateManageLimitsRequestResultSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   typedef opaque Value<>;
//
// ===========================================================================
xdr.typedef("Value", xdr.varOpaque());

// === xdr source ============================================================
//
//   struct SCPBallot
//   {
//       uint32 counter; // n
//       Value value;    // x
//   };
//
// ===========================================================================
xdr.struct("ScpBallot", [
  ["counter", xdr.lookup("Uint32")],
  ["value", xdr.lookup("Value")],
]);

// === xdr source ============================================================
//
//   enum SCPStatementType
//   {
//       PREPARE = 0,
//       CONFIRM = 1,
//       EXTERNALIZE = 2,
//       NOMINATE = 3
//   };
//
// ===========================================================================
xdr.enum("ScpStatementType", {
  prepare: 0,
  confirm: 1,
  externalize: 2,
  nominate: 3,
});

// === xdr source ============================================================
//
//   struct SCPNomination
//   {
//       Hash quorumSetHash; // D
//       Value votes<>;      // X
//       Value accepted<>;   // Y
//   };
//
// ===========================================================================
xdr.struct("ScpNomination", [
  ["quorumSetHash", xdr.lookup("Hash")],
  ["votes", xdr.varArray(xdr.lookup("Value"), 2147483647)],
  ["accepted", xdr.varArray(xdr.lookup("Value"), 2147483647)],
]);

// === xdr source ============================================================
//
//   struct
//           {
//               Hash quorumSetHash;       // D
//               SCPBallot ballot;         // b
//               SCPBallot* prepared;      // p
//               SCPBallot* preparedPrime; // p'
//               uint32 nC;                // c.n
//               uint32 nH;                // h.n
//           }
//
// ===========================================================================
xdr.struct("ScpStatementPrepare", [
  ["quorumSetHash", xdr.lookup("Hash")],
  ["ballot", xdr.lookup("ScpBallot")],
  ["prepared", xdr.option(xdr.lookup("ScpBallot"))],
  ["preparedPrime", xdr.option(xdr.lookup("ScpBallot"))],
  ["nC", xdr.lookup("Uint32")],
  ["nH", xdr.lookup("Uint32")],
]);

// === xdr source ============================================================
//
//   struct
//           {
//               SCPBallot ballot;   // b
//               uint32 nPrepared;   // p.n
//               uint32 nCommit;     // c.n
//               uint32 nH;          // h.n
//               Hash quorumSetHash; // D
//           }
//
// ===========================================================================
xdr.struct("ScpStatementConfirm", [
  ["ballot", xdr.lookup("ScpBallot")],
  ["nPrepared", xdr.lookup("Uint32")],
  ["nCommit", xdr.lookup("Uint32")],
  ["nH", xdr.lookup("Uint32")],
  ["quorumSetHash", xdr.lookup("Hash")],
]);

// === xdr source ============================================================
//
//   struct
//           {
//               SCPBallot commit;         // c
//               uint32 nH;                // h.n
//               Hash commitQuorumSetHash; // D used before EXTERNALIZE
//           }
//
// ===========================================================================
xdr.struct("ScpStatementExternalize", [
  ["commit", xdr.lookup("ScpBallot")],
  ["nH", xdr.lookup("Uint32")],
  ["commitQuorumSetHash", xdr.lookup("Hash")],
]);

// === xdr source ============================================================
//
//   union switch (SCPStatementType type)
//       {
//       case PREPARE:
//           struct
//           {
//               Hash quorumSetHash;       // D
//               SCPBallot ballot;         // b
//               SCPBallot* prepared;      // p
//               SCPBallot* preparedPrime; // p'
//               uint32 nC;                // c.n
//               uint32 nH;                // h.n
//           } prepare;
//       case CONFIRM:
//           struct
//           {
//               SCPBallot ballot;   // b
//               uint32 nPrepared;   // p.n
//               uint32 nCommit;     // c.n
//               uint32 nH;          // h.n
//               Hash quorumSetHash; // D
//           } confirm;
//       case EXTERNALIZE:
//           struct
//           {
//               SCPBallot commit;         // c
//               uint32 nH;                // h.n
//               Hash commitQuorumSetHash; // D used before EXTERNALIZE
//           } externalize;
//       case NOMINATE:
//           SCPNomination nominate;
//       }
//
// ===========================================================================
xdr.union("ScpStatementPledges", {
  switchOn: xdr.lookup("ScpStatementType"),
  switchName: "type",
  switches: [
    ["prepare", "prepare"],
    ["confirm", "confirm"],
    ["externalize", "externalize"],
    ["nominate", "nominate"],
  ],
  arms: {
    prepare: xdr.lookup("ScpStatementPrepare"),
    confirm: xdr.lookup("ScpStatementConfirm"),
    externalize: xdr.lookup("ScpStatementExternalize"),
    nominate: xdr.lookup("ScpNomination"),
  },
});

// === xdr source ============================================================
//
//   struct SCPStatement
//   {
//       NodeID nodeID;    // v
//       uint64 slotIndex; // i
//   
//       union switch (SCPStatementType type)
//       {
//       case PREPARE:
//           struct
//           {
//               Hash quorumSetHash;       // D
//               SCPBallot ballot;         // b
//               SCPBallot* prepared;      // p
//               SCPBallot* preparedPrime; // p'
//               uint32 nC;                // c.n
//               uint32 nH;                // h.n
//           } prepare;
//       case CONFIRM:
//           struct
//           {
//               SCPBallot ballot;   // b
//               uint32 nPrepared;   // p.n
//               uint32 nCommit;     // c.n
//               uint32 nH;          // h.n
//               Hash quorumSetHash; // D
//           } confirm;
//       case EXTERNALIZE:
//           struct
//           {
//               SCPBallot commit;         // c
//               uint32 nH;                // h.n
//               Hash commitQuorumSetHash; // D used before EXTERNALIZE
//           } externalize;
//       case NOMINATE:
//           SCPNomination nominate;
//       }
//       pledges;
//   };
//
// ===========================================================================
xdr.struct("ScpStatement", [
  ["nodeId", xdr.lookup("NodeId")],
  ["slotIndex", xdr.lookup("Uint64")],
  ["pledges", xdr.lookup("ScpStatementPledges")],
]);

// === xdr source ============================================================
//
//   struct SCPEnvelope
//   {
//       SCPStatement statement;
//       Signature signature;
//   };
//
// ===========================================================================
xdr.struct("ScpEnvelope", [
  ["statement", xdr.lookup("ScpStatement")],
  ["signature", xdr.lookup("Signature")],
]);

// === xdr source ============================================================
//
//   struct SCPQuorumSet
//   {
//       uint32 threshold;
//       PublicKey validators<>;
//       SCPQuorumSet innerSets<>;
//   };
//
// ===========================================================================
xdr.struct("ScpQuorumSet", [
  ["threshold", xdr.lookup("Uint32")],
  ["validators", xdr.varArray(xdr.lookup("PublicKey"), 2147483647)],
  ["innerSets", xdr.varArray(xdr.lookup("ScpQuorumSet"), 2147483647)],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("BindExternalSystemAccountIdOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct BindExternalSystemAccountIdOp
//   {
//       int32 externalSystemType;
//   
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("BindExternalSystemAccountIdOp", [
  ["externalSystemType", xdr.lookup("Int32")],
  ["ext", xdr.lookup("BindExternalSystemAccountIdOpExt")],
]);

// === xdr source ============================================================
//
//   enum BindExternalSystemAccountIdResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       MALFORMED = -1,
//       NO_AVAILABLE_ID = -2
//   };
//
// ===========================================================================
xdr.enum("BindExternalSystemAccountIdResultCode", {
  success: 0,
  malformed: -1,
  noAvailableId: -2,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("BindExternalSystemAccountIdSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct BindExternalSystemAccountIdSuccess {
//       longstring data;
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("BindExternalSystemAccountIdSuccess", [
  ["data", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("BindExternalSystemAccountIdSuccessExt")],
]);

// === xdr source ============================================================
//
//   union BindExternalSystemAccountIdResult switch (BindExternalSystemAccountIdResultCode code)
//   {
//   case SUCCESS:
//       BindExternalSystemAccountIdSuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("BindExternalSystemAccountIdResult", {
  switchOn: xdr.lookup("BindExternalSystemAccountIdResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("BindExternalSystemAccountIdSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   enum ManageContractRequestAction
//   {
//       CREATE = 0,
//       REMOVE = 1
//   };
//
// ===========================================================================
xdr.enum("ManageContractRequestAction", {
  create: 0,
  remove: 1,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreateContractRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateContractRequest 
//   {
//       ContractRequest contractRequest;
//       uint32* allTasks;
//       
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CreateContractRequest", [
  ["contractRequest", xdr.lookup("ContractRequest")],
  ["allTasks", xdr.option(xdr.lookup("Uint32"))],
  ["ext", xdr.lookup("CreateContractRequestExt")],
]);

// === xdr source ============================================================
//
//   union switch (ManageContractRequestAction action){
//       case CREATE:
//           CreateContractRequest createContractRequest;
//       case REMOVE:
//           uint64 requestID;
//       }
//
// ===========================================================================
xdr.union("ManageContractRequestOpDetails", {
  switchOn: xdr.lookup("ManageContractRequestAction"),
  switchName: "action",
  switches: [
    ["create", "createContractRequest"],
    ["remove", "requestId"],
  ],
  arms: {
    createContractRequest: xdr.lookup("CreateContractRequest"),
    requestId: xdr.lookup("Uint64"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageContractRequestOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageContractRequestOp
//   {
//       union switch (ManageContractRequestAction action){
//       case CREATE:
//           CreateContractRequest createContractRequest;
//       case REMOVE:
//           uint64 requestID;
//       } details;
//   
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageContractRequestOp", [
  ["details", xdr.lookup("ManageContractRequestOpDetails")],
  ["ext", xdr.lookup("ManageContractRequestOpExt")],
]);

// === xdr source ============================================================
//
//   enum ManageContractRequestResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       MALFORMED = -1,
//       NOT_FOUND = -2, // not found contract request, when try to remove
//       TOO_MANY_CONTRACTS = -3,
//       NOT_ALLOWED_TO_REMOVE = -4, // only contract creator can remove contract
//       DETAILS_TOO_LONG = -5,
//       CONTRACT_CREATE_TASKS_NOT_FOUND = -6 // key-value not set
//   };
//
// ===========================================================================
xdr.enum("ManageContractRequestResultCode", {
  success: 0,
  malformed: -1,
  notFound: -2,
  tooManyContract: -3,
  notAllowedToRemove: -4,
  detailsTooLong: -5,
  contractCreateTasksNotFound: -6,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreateContractRequestResponseExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateContractRequestResponse
//   {
//   	uint64 requestID;
//       bool fulfilled;
//   
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CreateContractRequestResponse", [
  ["requestId", xdr.lookup("Uint64")],
  ["fulfilled", xdr.bool()],
  ["ext", xdr.lookup("CreateContractRequestResponseExt")],
]);

// === xdr source ============================================================
//
//   union switch (ManageContractRequestAction action)
//           {
//           case CREATE:
//               CreateContractRequestResponse response;
//           case REMOVE:
//               void;
//           }
//
// ===========================================================================
xdr.union("ManageContractRequestResultSuccessDetails", {
  switchOn: xdr.lookup("ManageContractRequestAction"),
  switchName: "action",
  switches: [
    ["create", "response"],
    ["remove", xdr.void()],
  ],
  arms: {
    response: xdr.lookup("CreateContractRequestResponse"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//
// ===========================================================================
xdr.union("ManageContractRequestResultSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct
//       {
//           union switch (ManageContractRequestAction action)
//           {
//           case CREATE:
//               CreateContractRequestResponse response;
//           case REMOVE:
//               void;
//           } details;
//   
//           // reserved for future use
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           } ext;
//       }
//
// ===========================================================================
xdr.struct("ManageContractRequestResultSuccess", [
  ["details", xdr.lookup("ManageContractRequestResultSuccessDetails")],
  ["ext", xdr.lookup("ManageContractRequestResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   union ManageContractRequestResult switch (ManageContractRequestResultCode code)
//   {
//   case SUCCESS:
//       struct
//       {
//           union switch (ManageContractRequestAction action)
//           {
//           case CREATE:
//               CreateContractRequestResponse response;
//           case REMOVE:
//               void;
//           } details;
//   
//           // reserved for future use
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           } ext;
//       } success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ManageContractRequestResult", {
  switchOn: xdr.lookup("ManageContractRequestResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("ManageContractRequestResultSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   enum ManageSaleAction
//   {
//       CREATE_UPDATE_DETAILS_REQUEST = 1,
//       CANCEL = 2
//   };
//
// ===========================================================================
xdr.enum("ManageSaleAction", {
  createUpdateDetailsRequest: 1,
  cancel: 2,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("UpdateSaleDetailsDataExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct UpdateSaleDetailsData {
//       uint64 requestID; // if requestID is 0 - create request, else - update
//       longstring newDetails;
//   
//       uint32* allTasks;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("UpdateSaleDetailsData", [
  ["requestId", xdr.lookup("Uint64")],
  ["newDetails", xdr.lookup("Longstring")],
  ["allTasks", xdr.option(xdr.lookup("Uint32"))],
  ["ext", xdr.lookup("UpdateSaleDetailsDataExt")],
]);

// === xdr source ============================================================
//
//   union switch (ManageSaleAction action) {
//       case CREATE_UPDATE_DETAILS_REQUEST:
//           UpdateSaleDetailsData updateSaleDetailsData;
//       case CANCEL:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageSaleOpData", {
  switchOn: xdr.lookup("ManageSaleAction"),
  switchName: "action",
  switches: [
    ["createUpdateDetailsRequest", "updateSaleDetailsData"],
    ["cancel", xdr.void()],
  ],
  arms: {
    updateSaleDetailsData: xdr.lookup("UpdateSaleDetailsData"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageSaleOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageSaleOp
//   {
//       uint64 saleID;
//   
//       union switch (ManageSaleAction action) {
//       case CREATE_UPDATE_DETAILS_REQUEST:
//           UpdateSaleDetailsData updateSaleDetailsData;
//       case CANCEL:
//           void;
//       } data;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("ManageSaleOp", [
  ["saleId", xdr.lookup("Uint64")],
  ["data", xdr.lookup("ManageSaleOpData")],
  ["ext", xdr.lookup("ManageSaleOpExt")],
]);

// === xdr source ============================================================
//
//   enum ManageSaleResultCode
//   {
//       SUCCESS = 0,
//   
//       SALE_NOT_FOUND = -1, // sale not found
//   
//       // errors related to action "CREATE_UPDATE_DETAILS_REQUEST"
//       INVALID_NEW_DETAILS = -2, // newDetails field is invalid JSON
//       UPDATE_DETAILS_REQUEST_ALREADY_EXISTS = -3,
//       UPDATE_DETAILS_REQUEST_NOT_FOUND = -4,
//       INVALID_UPDATE_DETAILS_REQUEST_DATA = -5, // not allowed to set allTasks on request update
//       SALE_UPDATE_DETAILS_TASKS_NOT_FOUND = -6, // it's not allowed to set state for non master account
//       NOT_ALLOWED_TO_SET_TASKS_ON_UPDATE = -7,
//       PENDING_REQUEST_UPDATE_NOT_ALLOWED = -8
//   };
//
// ===========================================================================
xdr.enum("ManageSaleResultCode", {
  success: 0,
  saleNotFound: -1,
  invalidNewDetail: -2,
  updateDetailsRequestAlreadyExist: -3,
  updateDetailsRequestNotFound: -4,
  invalidUpdateDetailsRequestDatum: -5,
  saleUpdateDetailsTasksNotFound: -6,
  notAllowedToSetTasksOnUpdate: -7,
  pendingRequestUpdateNotAllowed: -8,
});

// === xdr source ============================================================
//
//   union switch (ManageSaleAction action) {
//       case CREATE_UPDATE_DETAILS_REQUEST:
//           uint64 requestID;
//       case CANCEL:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageSaleResultSuccessResponse", {
  switchOn: xdr.lookup("ManageSaleAction"),
  switchName: "action",
  switches: [
    ["createUpdateDetailsRequest", "requestId"],
    ["cancel", xdr.void()],
  ],
  arms: {
    requestId: xdr.lookup("Uint64"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageSaleResultSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageSaleResultSuccess
//   {
//       bool fulfilled; // can be used for any reviewable request type created with manage sale operation   
//    
//       union switch (ManageSaleAction action) {
//       case CREATE_UPDATE_DETAILS_REQUEST:
//           uint64 requestID;
//       case CANCEL:
//           void;
//       } response;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageSaleResultSuccess", [
  ["fulfilled", xdr.bool()],
  ["response", xdr.lookup("ManageSaleResultSuccessResponse")],
  ["ext", xdr.lookup("ManageSaleResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   union ManageSaleResult switch (ManageSaleResultCode code)
//   {
//   case SUCCESS:
//       ManageSaleResultSuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ManageSaleResult", {
  switchOn: xdr.lookup("ManageSaleResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("ManageSaleResultSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("AmlAlertRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct AMLAlertRequest {
//       BalanceID balanceID;
//       uint64 amount;
//       longstring creatorDetails; // details set by requester
//   
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("AmlAlertRequest", [
  ["balanceId", xdr.lookup("BalanceId")],
  ["amount", xdr.lookup("Uint64")],
  ["creatorDetails", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("AmlAlertRequestExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("LimitsExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct Limits
//   {
//       int64 dailyOut;
//       int64 weeklyOut;
//       int64 monthlyOut;
//       int64 annualOut;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("Limits", [
  ["dailyOut", xdr.lookup("Int64")],
  ["weeklyOut", xdr.lookup("Int64")],
  ["monthlyOut", xdr.lookup("Int64")],
  ["annualOut", xdr.lookup("Int64")],
  ["ext", xdr.lookup("LimitsExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("AccountEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct AccountEntry
//   {
//       AccountID accountID;      // master public key for this account
//   
//       // Referral marketing
//       AccountID* referrer; // parent account
//   
//       // sequenctial ID - unique identifier of the account, used by ingesting applications to
//       // identify account, while keeping size of index small
//       uint64 sequentialID;
//   
//   	uint64 roleID;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("AccountEntry", [
  ["accountId", xdr.lookup("AccountId")],
  ["referrer", xdr.option(xdr.lookup("AccountId"))],
  ["sequentialId", xdr.lookup("Uint64")],
  ["roleId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("AccountEntryExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           RequestTypedResource details;
//   
//           uint64 tasksToAdd;
//           uint64 tasksToRemove;
//           uint64 allTasks;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("SignerRuleResourceReviewableRequest", [
  ["details", xdr.lookup("RequestTypedResource")],
  ["tasksToAdd", xdr.lookup("Uint64")],
  ["tasksToRemove", xdr.lookup("Uint64")],
  ["allTasks", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           AssetCode assetCode;
//           uint64 assetType;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("SignerRuleResourceAsset", [
  ["assetCode", xdr.lookup("AssetCode")],
  ["assetType", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           uint64 baseAssetType;
//           uint64 quoteAssetType;
//   
//           AssetCode baseAssetCode;
//           AssetCode quoteAssetCode;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("SignerRuleResourceOffer", [
  ["baseAssetType", xdr.lookup("Uint64")],
  ["quoteAssetType", xdr.lookup("Uint64")],
  ["baseAssetCode", xdr.lookup("AssetCode")],
  ["quoteAssetCode", xdr.lookup("AssetCode")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           uint64 saleID;
//           uint64 saleType;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("SignerRuleResourceSale", [
  ["saleId", xdr.lookup("Uint64")],
  ["saleType", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           uint64 assetType;
//           AssetCode assetCode;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("SignerRuleResourceAtomicSwapBid", [
  ["assetType", xdr.lookup("Uint64")],
  ["assetCode", xdr.lookup("AssetCode")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           bool isDefault;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("SignerRuleResourceSignerRule", [
  ["isDefault", xdr.bool()],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           uint64 roleID;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("SignerRuleResourceSignerRole", [
  ["roleId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           uint64 roleID;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("SignerRuleResourceSigner", [
  ["roleId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   union SignerRuleResource switch (LedgerEntryType type)
//   {
//   case REVIEWABLE_REQUEST:
//       struct
//       {
//           RequestTypedResource details;
//   
//           uint64 tasksToAdd;
//           uint64 tasksToRemove;
//           uint64 allTasks;
//   
//           EmptyExt ext;
//       } reviewableRequest;
//   case ASSET:
//       struct
//       {
//           AssetCode assetCode;
//           uint64 assetType;
//   
//           EmptyExt ext;
//       } asset;
//   case ANY:
//       void;
//   case OFFER_ENTRY:
//       struct
//       {
//           uint64 baseAssetType;
//           uint64 quoteAssetType;
//   
//           AssetCode baseAssetCode;
//           AssetCode quoteAssetCode;
//   
//           EmptyExt ext;
//       } offer;
//   case SALE:
//       struct
//       {
//           uint64 saleID;
//           uint64 saleType;
//   
//           EmptyExt ext;
//       } sale;
//   case ATOMIC_SWAP_BID:
//       struct
//       {
//           uint64 assetType;
//           AssetCode assetCode;
//   
//           EmptyExt ext;
//       } atomicSwapBid;
//   case SIGNER_RULE:
//       struct
//       {
//           bool isDefault;
//   
//           EmptyExt ext;
//       } signerRule;
//   case SIGNER_ROLE:
//       struct
//       {
//           uint64 roleID;
//   
//           EmptyExt ext;
//       } signerRole;
//   case SIGNER:
//       struct
//       {
//           uint64 roleID;
//   
//           EmptyExt ext;
//       } signer;
//   default:
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.union("SignerRuleResource", {
  switchOn: xdr.lookup("LedgerEntryType"),
  switchName: "type",
  switches: [
    ["reviewableRequest", "reviewableRequest"],
    ["asset", "asset"],
    ["any", xdr.void()],
    ["offerEntry", "offer"],
    ["sale", "sale"],
    ["atomicSwapBid", "atomicSwapBid"],
    ["signerRule", "signerRule"],
    ["signerRole", "signerRole"],
    ["signer", "signer"],
  ],
  arms: {
    reviewableRequest: xdr.lookup("SignerRuleResourceReviewableRequest"),
    asset: xdr.lookup("SignerRuleResourceAsset"),
    offer: xdr.lookup("SignerRuleResourceOffer"),
    sale: xdr.lookup("SignerRuleResourceSale"),
    atomicSwapBid: xdr.lookup("SignerRuleResourceAtomicSwapBid"),
    signerRule: xdr.lookup("SignerRuleResourceSignerRule"),
    signerRole: xdr.lookup("SignerRuleResourceSignerRole"),
    signer: xdr.lookup("SignerRuleResourceSigner"),
    ext: xdr.lookup("EmptyExt"),
  },
  defaultArm: xdr.lookup("EmptyExt"),
});

// === xdr source ============================================================
//
//   enum SignerRuleAction
//   {
//       ANY = 1,
//       CREATE = 2,
//       MANAGE = 3,
//       SEND = 4,
//       WITHDRAW = 5,
//       ISSUE = 6,
//       REVIEW = 7,
//       RECEIVE_ATOMIC_SWAP = 8,
//       CREATE_TO_SELL = 9,
//       CREATE_TO_BUY = 10,
//       PARTICIPATE = 11,
//       BIND = 12,
//       UPDATE_MAX_ISSUANCE = 13,
//       CHECK = 14,
//        UPDATE = 15,
//       CREATE_FOR_OTHER = 16,
//       CANCEL = 17,
//       REMOVE = 18
//   };
//
// ===========================================================================
xdr.enum("SignerRuleAction", {
  any: 1,
  create: 2,
  manage: 3,
  send: 4,
  withdraw: 5,
  issue: 6,
  review: 7,
  receiveAtomicSwap: 8,
  createToSell: 9,
  createToBuy: 10,
  participate: 11,
  bind: 12,
  updateMaxIssuance: 13,
  check: 14,
  update: 15,
  createForOther: 16,
  cancel: 17,
  remove: 18,
});

// === xdr source ============================================================
//
//   enum ManageContractAction
//   {
//       ADD_DETAILS = 0,
//       CONFIRM_COMPLETED = 1,
//       START_DISPUTE = 2,
//       RESOLVE_DISPUTE = 3
//   };
//
// ===========================================================================
xdr.enum("ManageContractAction", {
  addDetail: 0,
  confirmCompleted: 1,
  startDispute: 2,
  resolveDispute: 3,
});

// === xdr source ============================================================
//
//   union switch (ManageContractAction action)
//       {
//       case ADD_DETAILS:
//           longstring details;
//       case CONFIRM_COMPLETED:
//           void;
//       case START_DISPUTE:
//           longstring disputeReason;
//       case RESOLVE_DISPUTE:
//           bool isRevert;
//       }
//
// ===========================================================================
xdr.union("ManageContractOpData", {
  switchOn: xdr.lookup("ManageContractAction"),
  switchName: "action",
  switches: [
    ["addDetail", "details"],
    ["confirmCompleted", xdr.void()],
    ["startDispute", "disputeReason"],
    ["resolveDispute", "isRevert"],
  ],
  arms: {
    details: xdr.lookup("Longstring"),
    disputeReason: xdr.lookup("Longstring"),
    isRevert: xdr.bool(),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageContractOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageContractOp
//   {
//       uint64 contractID;
//   
//       union switch (ManageContractAction action)
//       {
//       case ADD_DETAILS:
//           longstring details;
//       case CONFIRM_COMPLETED:
//           void;
//       case START_DISPUTE:
//           longstring disputeReason;
//       case RESOLVE_DISPUTE:
//           bool isRevert;
//       }
//       data;
//   
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageContractOp", [
  ["contractId", xdr.lookup("Uint64")],
  ["data", xdr.lookup("ManageContractOpData")],
  ["ext", xdr.lookup("ManageContractOpExt")],
]);

// === xdr source ============================================================
//
//   enum ManageContractResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       MALFORMED = -1,
//       NOT_FOUND = -2, // not found contract
//       NOT_ALLOWED = -3, // only contractor or customer can add details
//       DETAILS_TOO_LONG = -4,
//       DISPUTE_REASON_TOO_LONG = -5,
//       ALREADY_CONFIRMED = -6,
//       INVOICE_NOT_APPROVED = -7, // all contract invoices must be approved
//       DISPUTE_ALREADY_STARTED = -8,
//       CUSTOMER_BALANCE_OVERFLOW = -9,
//       INCORRECT_PRECISION = -10
//   };
//
// ===========================================================================
xdr.enum("ManageContractResultCode", {
  success: 0,
  malformed: -1,
  notFound: -2,
  notAllowed: -3,
  detailsTooLong: -4,
  disputeReasonTooLong: -5,
  alreadyConfirmed: -6,
  invoiceNotApproved: -7,
  disputeAlreadyStarted: -8,
  customerBalanceOverflow: -9,
  incorrectPrecision: -10,
});

// === xdr source ============================================================
//
//   union switch (ManageContractAction action)
//       {
//       case CONFIRM_COMPLETED:
//           bool isCompleted;
//       default:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageContractResponseData", {
  switchOn: xdr.lookup("ManageContractAction"),
  switchName: "action",
  switches: [
    ["confirmCompleted", "isCompleted"],
  ],
  arms: {
    isCompleted: xdr.bool(),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageContractResponseExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageContractResponse
//   {
//       union switch (ManageContractAction action)
//       {
//       case CONFIRM_COMPLETED:
//           bool isCompleted;
//       default:
//           void;
//       }
//       data;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageContractResponse", [
  ["data", xdr.lookup("ManageContractResponseData")],
  ["ext", xdr.lookup("ManageContractResponseExt")],
]);

// === xdr source ============================================================
//
//   union ManageContractResult switch (ManageContractResultCode code)
//   {
//   case SUCCESS:
//       ManageContractResponse response;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ManageContractResult", {
  switchOn: xdr.lookup("ManageContractResultCode"),
  switchName: "code",
  switches: [
    ["success", "response"],
  ],
  arms: {
    response: xdr.lookup("ManageContractResponse"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   enum ManageAssetAction
//   {
//       CREATE_ASSET_CREATION_REQUEST = 0,
//       CREATE_ASSET_UPDATE_REQUEST = 1,
//   	CANCEL_ASSET_REQUEST = 2,
//   	CHANGE_PREISSUED_ASSET_SIGNER = 3,
//   	UPDATE_MAX_ISSUANCE = 4
//   };
//
// ===========================================================================
xdr.enum("ManageAssetAction", {
  createAssetCreationRequest: 0,
  createAssetUpdateRequest: 1,
  cancelAssetRequest: 2,
  changePreissuedAssetSigner: 3,
  updateMaxIssuance: 4,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CancelAssetRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CancelAssetRequest {
//   
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CancelAssetRequest", [
  ["ext", xdr.lookup("CancelAssetRequestExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("UpdateMaxIssuanceExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct UpdateMaxIssuance {
//   
//   	AssetCode assetCode;
//   	uint64 maxIssuanceAmount;
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("UpdateMaxIssuance", [
  ["assetCode", xdr.lookup("AssetCode")],
  ["maxIssuanceAmount", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("UpdateMaxIssuanceExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   			{
//   			case EMPTY_VERSION:
//   				void;
//   			}
//
// ===========================================================================
xdr.union("ManageAssetOpCreateAssetCreationRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//               AssetCreationRequest createAsset;
//               uint32* allTasks;
//   			// reserved for future use
//   			union switch (LedgerVersion v)
//   			{
//   			case EMPTY_VERSION:
//   				void;
//   			}
//   			ext;
//           }
//
// ===========================================================================
xdr.struct("ManageAssetOpCreateAssetCreationRequest", [
  ["createAsset", xdr.lookup("AssetCreationRequest")],
  ["allTasks", xdr.option(xdr.lookup("Uint32"))],
  ["ext", xdr.lookup("ManageAssetOpCreateAssetCreationRequestExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   			{
//   			case EMPTY_VERSION:
//   				void;
//   			}
//
// ===========================================================================
xdr.union("ManageAssetOpCreateAssetUpdateRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//               AssetUpdateRequest updateAsset;
//               uint32* allTasks;
//   			// reserved for future use
//   			union switch (LedgerVersion v)
//   			{
//   			case EMPTY_VERSION:
//   				void;
//   			}
//   			ext;
//           }
//
// ===========================================================================
xdr.struct("ManageAssetOpCreateAssetUpdateRequest", [
  ["updateAsset", xdr.lookup("AssetUpdateRequest")],
  ["allTasks", xdr.option(xdr.lookup("Uint32"))],
  ["ext", xdr.lookup("ManageAssetOpCreateAssetUpdateRequestExt")],
]);

// === xdr source ============================================================
//
//   union switch (ManageAssetAction action)
//   	{
//   	case CREATE_ASSET_CREATION_REQUEST:
//   		struct {
//               AssetCreationRequest createAsset;
//               uint32* allTasks;
//   			// reserved for future use
//   			union switch (LedgerVersion v)
//   			{
//   			case EMPTY_VERSION:
//   				void;
//   			}
//   			ext;
//           } createAssetCreationRequest;
//   	case CREATE_ASSET_UPDATE_REQUEST:
//   		struct {
//               AssetUpdateRequest updateAsset;
//               uint32* allTasks;
//   			// reserved for future use
//   			union switch (LedgerVersion v)
//   			{
//   			case EMPTY_VERSION:
//   				void;
//   			}
//   			ext;
//           } createAssetUpdateRequest;
//   	case CANCEL_ASSET_REQUEST:
//   		CancelAssetRequest cancelRequest;
//   	case CHANGE_PREISSUED_ASSET_SIGNER:
//   		AssetChangePreissuedSigner changePreissuedSigner;
//       case UPDATE_MAX_ISSUANCE:
//           UpdateMaxIssuance updateMaxIssuance;
//   	}
//
// ===========================================================================
xdr.union("ManageAssetOpRequest", {
  switchOn: xdr.lookup("ManageAssetAction"),
  switchName: "action",
  switches: [
    ["createAssetCreationRequest", "createAssetCreationRequest"],
    ["createAssetUpdateRequest", "createAssetUpdateRequest"],
    ["cancelAssetRequest", "cancelRequest"],
    ["changePreissuedAssetSigner", "changePreissuedSigner"],
    ["updateMaxIssuance", "updateMaxIssuance"],
  ],
  arms: {
    createAssetCreationRequest: xdr.lookup("ManageAssetOpCreateAssetCreationRequest"),
    createAssetUpdateRequest: xdr.lookup("ManageAssetOpCreateAssetUpdateRequest"),
    cancelRequest: xdr.lookup("CancelAssetRequest"),
    changePreissuedSigner: xdr.lookup("AssetChangePreissuedSigner"),
    updateMaxIssuance: xdr.lookup("UpdateMaxIssuance"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageAssetOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageAssetOp
//   {
//   	uint64 requestID; // 0 to create, non zero will try to update
//       union switch (ManageAssetAction action)
//   	{
//   	case CREATE_ASSET_CREATION_REQUEST:
//   		struct {
//               AssetCreationRequest createAsset;
//               uint32* allTasks;
//   			// reserved for future use
//   			union switch (LedgerVersion v)
//   			{
//   			case EMPTY_VERSION:
//   				void;
//   			}
//   			ext;
//           } createAssetCreationRequest;
//   	case CREATE_ASSET_UPDATE_REQUEST:
//   		struct {
//               AssetUpdateRequest updateAsset;
//               uint32* allTasks;
//   			// reserved for future use
//   			union switch (LedgerVersion v)
//   			{
//   			case EMPTY_VERSION:
//   				void;
//   			}
//   			ext;
//           } createAssetUpdateRequest;
//   	case CANCEL_ASSET_REQUEST:
//   		CancelAssetRequest cancelRequest;
//   	case CHANGE_PREISSUED_ASSET_SIGNER:
//   		AssetChangePreissuedSigner changePreissuedSigner;
//       case UPDATE_MAX_ISSUANCE:
//           UpdateMaxIssuance updateMaxIssuance;
//   	} request;
//   
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageAssetOp", [
  ["requestId", xdr.lookup("Uint64")],
  ["request", xdr.lookup("ManageAssetOpRequest")],
  ["ext", xdr.lookup("ManageAssetOpExt")],
]);

// === xdr source ============================================================
//
//   enum ManageAssetResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,                       // request was successfully created/updated/canceled
//   
//       // codes considered as "failure" for the operation
//   	REQUEST_NOT_FOUND = -1,           // failed to find asset request with such id
//       INVALID_SIGNATURE = -2,           // only asset pre issuer can change asset pre issuer
//   	ASSET_ALREADY_EXISTS = -3,	      // asset with such code already exist
//       INVALID_MAX_ISSUANCE_AMOUNT = -4, // max issuance amount is 0
//   	INVALID_CODE = -5,                // asset code is invalid (empty or contains space)
//       INVALID_PRE_ISSUER = -6,          // pre issuer is the same as existing
//   	INVALID_POLICIES = -7,            // asset policies (has flag which does not belong to AssetPolicies enum)
//   	ASSET_NOT_FOUND = -8,             // asset does not exists
//   	REQUEST_ALREADY_EXISTS = -9,      // request for creation of unique entry already exists
//   	STATS_ASSET_ALREADY_EXISTS = -10, // statistics quote asset already exists
//   	INITIAL_PREISSUED_EXCEEDS_MAX_ISSUANCE = -11, // initial pre issued amount exceeds max issuance amount
//       INVALID_DETAILS = -12,                        // details must be a valid json
//       INVALID_TRAILING_DIGITS_COUNT = -13,          // invalid number of trailing digits
//       INVALID_PREISSUED_AMOUNT_PRECISION = -14,     // initial pre issued amount does not match precision set by trailing digits count
//       INVALID_MAX_ISSUANCE_AMOUNT_PRECISION = -15,   // maximum issuance amount does not match precision set by trailing digits count
//       ASSET_CREATE_TASKS_NOT_FOUND = -16, 
//       ASSET_UPDATE_TASKS_NOT_FOUND = -17,
//       NOT_ALLOWED_TO_SET_TASKS_ON_UPDATE = -18,
//       PENDING_REQUEST_UPDATE_NOT_ALLOWED = -19
//   };
//
// ===========================================================================
xdr.enum("ManageAssetResultCode", {
  success: 0,
  requestNotFound: -1,
  invalidSignature: -2,
  assetAlreadyExist: -3,
  invalidMaxIssuanceAmount: -4,
  invalidCode: -5,
  invalidPreIssuer: -6,
  invalidPolicy: -7,
  assetNotFound: -8,
  requestAlreadyExist: -9,
  statsAssetAlreadyExist: -10,
  initialPreissuedExceedsMaxIssuance: -11,
  invalidDetail: -12,
  invalidTrailingDigitsCount: -13,
  invalidPreissuedAmountPrecision: -14,
  invalidMaxIssuanceAmountPrecision: -15,
  assetCreateTasksNotFound: -16,
  assetUpdateTasksNotFound: -17,
  notAllowedToSetTasksOnUpdate: -18,
  pendingRequestUpdateNotAllowed: -19,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageAssetSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageAssetSuccess
//   {
//   	uint64 requestID;
//   	bool fulfilled;
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageAssetSuccess", [
  ["requestId", xdr.lookup("Uint64")],
  ["fulfilled", xdr.bool()],
  ["ext", xdr.lookup("ManageAssetSuccessExt")],
]);

// === xdr source ============================================================
//
//   union ManageAssetResult switch (ManageAssetResultCode code)
//   {
//   case SUCCESS:
//       ManageAssetSuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ManageAssetResult", {
  switchOn: xdr.lookup("ManageAssetResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("ManageAssetSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("OfferEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct OfferEntry
//   {	
//       uint64 offerID;
//   	uint64 orderBookID;
//   	AccountID ownerID;
//   	bool isBuy;
//       AssetCode base; // A
//       AssetCode quote;  // B
//   	BalanceID baseBalance; 
//   	BalanceID quoteBalance;
//       int64 baseAmount;
//   	int64 quoteAmount;
//   	uint64 createdAt;
//   	int64 fee;
//   
//       int64 percentFee;
//   
//   	// price of A in terms of B
//       int64 price;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("OfferEntry", [
  ["offerId", xdr.lookup("Uint64")],
  ["orderBookId", xdr.lookup("Uint64")],
  ["ownerId", xdr.lookup("AccountId")],
  ["isBuy", xdr.bool()],
  ["base", xdr.lookup("AssetCode")],
  ["quote", xdr.lookup("AssetCode")],
  ["baseBalance", xdr.lookup("BalanceId")],
  ["quoteBalance", xdr.lookup("BalanceId")],
  ["baseAmount", xdr.lookup("Int64")],
  ["quoteAmount", xdr.lookup("Int64")],
  ["createdAt", xdr.lookup("Uint64")],
  ["fee", xdr.lookup("Int64")],
  ["percentFee", xdr.lookup("Int64")],
  ["price", xdr.lookup("Int64")],
  ["ext", xdr.lookup("OfferEntryExt")],
]);

// === xdr source ============================================================
//
//   enum AssetPairPolicy
//   {
//   	TRADEABLE_SECONDARY_MARKET = 1, // if not set pair can not be traided on secondary market
//   	PHYSICAL_PRICE_RESTRICTION = 2, // if set, then prices for new offers must be greater then physical price with correction
//   	CURRENT_PRICE_RESTRICTION = 4 // if set, then price for new offers must be in interval of (1 +- maxPriceStep)*currentPrice
//   };
//
// ===========================================================================
xdr.enum("AssetPairPolicy", {
  tradeableSecondaryMarket: 1,
  physicalPriceRestriction: 2,
  currentPriceRestriction: 4,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("AssetPairEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct AssetPairEntry
//   {
//       AssetCode base;
//   	AssetCode quote;
//   
//       int64 currentPrice;
//       int64 physicalPrice;
//   
//   	int64 physicalPriceCorrection; // correction of physical price in percents. If physical price is set and restriction by physical price set, mininal price for offer for this pair will be physicalPrice * physicalPriceCorrection
//   	int64 maxPriceStep; // max price step in percent. User is allowed to set offer with price < (1 - maxPriceStep)*currentPrice and > (1 + maxPriceStep)*currentPrice
//   
//   
//   	int32 policies;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("AssetPairEntry", [
  ["base", xdr.lookup("AssetCode")],
  ["quote", xdr.lookup("AssetCode")],
  ["currentPrice", xdr.lookup("Int64")],
  ["physicalPrice", xdr.lookup("Int64")],
  ["physicalPriceCorrection", xdr.lookup("Int64")],
  ["maxPriceStep", xdr.lookup("Int64")],
  ["policies", xdr.lookup("Int32")],
  ["ext", xdr.lookup("AssetPairEntryExt")],
]);

// === xdr source ============================================================
//
//   enum ManageLimitsAction
//   {
//       CREATE = 0,
//       REMOVE = 1
//   };
//
// ===========================================================================
xdr.enum("ManageLimitsAction", {
  create: 0,
  remove: 1,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("LimitsCreateDetailsExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct LimitsCreateDetails
//   {
//       uint64*     accountRole;
//       AccountID*  accountID;
//       StatsOpType statsOpType;
//       AssetCode   assetCode;
//       bool        isConvertNeeded;
//   
//       uint64 dailyOut;
//       uint64 weeklyOut;
//       uint64 monthlyOut;
//       uint64 annualOut;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("LimitsCreateDetails", [
  ["accountRole", xdr.option(xdr.lookup("Uint64"))],
  ["accountId", xdr.option(xdr.lookup("AccountId"))],
  ["statsOpType", xdr.lookup("StatsOpType")],
  ["assetCode", xdr.lookup("AssetCode")],
  ["isConvertNeeded", xdr.bool()],
  ["dailyOut", xdr.lookup("Uint64")],
  ["weeklyOut", xdr.lookup("Uint64")],
  ["monthlyOut", xdr.lookup("Uint64")],
  ["annualOut", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("LimitsCreateDetailsExt")],
]);

// === xdr source ============================================================
//
//   union switch (ManageLimitsAction action)
//       {
//       case CREATE:
//           LimitsCreateDetails limitsCreateDetails;
//       case REMOVE:
//           uint64 id;
//       }
//
// ===========================================================================
xdr.union("ManageLimitsOpDetails", {
  switchOn: xdr.lookup("ManageLimitsAction"),
  switchName: "action",
  switches: [
    ["create", "limitsCreateDetails"],
    ["remove", "id"],
  ],
  arms: {
    limitsCreateDetails: xdr.lookup("LimitsCreateDetails"),
    id: xdr.lookup("Uint64"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageLimitsOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageLimitsOp
//   {
//       union switch (ManageLimitsAction action)
//       {
//       case CREATE:
//           LimitsCreateDetails limitsCreateDetails;
//       case REMOVE:
//           uint64 id;
//       } details;
//   
//        // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageLimitsOp", [
  ["details", xdr.lookup("ManageLimitsOpDetails")],
  ["ext", xdr.lookup("ManageLimitsOpExt")],
]);

// === xdr source ============================================================
//
//   enum ManageLimitsResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       MALFORMED = -1,
//       NOT_FOUND = -2,
//       ALREADY_EXISTS = -3,
//       CANNOT_CREATE_FOR_ACC_ID_AND_ACC_TYPE = -4, // limits cannot be created for account ID and account type simultaneously
//       INVALID_LIMITS = -5
//   };
//
// ===========================================================================
xdr.enum("ManageLimitsResultCode", {
  success: 0,
  malformed: -1,
  notFound: -2,
  alreadyExist: -3,
  cannotCreateForAccIdAndAccType: -4,
  invalidLimit: -5,
});

// === xdr source ============================================================
//
//   union switch (ManageLimitsAction action)
//           {
//           case CREATE:
//               uint64 id;
//           case REMOVE:
//               void;
//           }
//
// ===========================================================================
xdr.union("ManageLimitsResultSuccessDetails", {
  switchOn: xdr.lookup("ManageLimitsAction"),
  switchName: "action",
  switches: [
    ["create", "id"],
    ["remove", xdr.void()],
  ],
  arms: {
    id: xdr.lookup("Uint64"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("ManageLimitsResultSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//           union switch (ManageLimitsAction action)
//           {
//           case CREATE:
//               uint64 id;
//           case REMOVE:
//               void;
//           } details;
//   
//   		// reserved for future use
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	}
//
// ===========================================================================
xdr.struct("ManageLimitsResultSuccess", [
  ["details", xdr.lookup("ManageLimitsResultSuccessDetails")],
  ["ext", xdr.lookup("ManageLimitsResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   union ManageLimitsResult switch (ManageLimitsResultCode code)
//   {
//   case SUCCESS:
//       struct {
//           union switch (ManageLimitsAction action)
//           {
//           case CREATE:
//               uint64 id;
//           case REMOVE:
//               void;
//           } details;
//   
//   		// reserved for future use
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	} success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ManageLimitsResult", {
  switchOn: xdr.lookup("ManageLimitsResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("ManageLimitsResultSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   enum ContractState
//   {
//       NO_CONFIRMATIONS = 0,
//       CUSTOMER_CONFIRMED = 1,
//       CONTRACTOR_CONFIRMED = 2,
//       DISPUTING = 4,
//       REVERTING_RESOLVE = 8,
//       NOT_REVERTING_RESOLVE = 16
//   };
//
// ===========================================================================
xdr.enum("ContractState", {
  noConfirmation: 0,
  customerConfirmed: 1,
  contractorConfirmed: 2,
  disputing: 4,
  revertingResolve: 8,
  notRevertingResolve: 16,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ContractEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ContractEntry
//   {
//       uint64 contractID;
//   
//       AccountID contractor;
//       AccountID customer;
//       AccountID escrow;
//   
//       uint64 startTime;
//       uint64 endTime;
//       uint64 invoiceRequestsIDs<>;
//       longstring initialDetails;
//   
//       uint32 state;
//       longstring customerDetails;
//   
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ContractEntry", [
  ["contractId", xdr.lookup("Uint64")],
  ["contractor", xdr.lookup("AccountId")],
  ["customer", xdr.lookup("AccountId")],
  ["escrow", xdr.lookup("AccountId")],
  ["startTime", xdr.lookup("Uint64")],
  ["endTime", xdr.lookup("Uint64")],
  ["invoiceRequestsIDs", xdr.varArray(xdr.lookup("Uint64"), 2147483647)],
  ["initialDetails", xdr.lookup("Longstring")],
  ["state", xdr.lookup("Uint32")],
  ["customerDetails", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("ContractEntryExt")],
]);

// === xdr source ============================================================
//
//   enum ThresholdIndexes
//   {
//       MASTER_WEIGHT = 0,
//       LOW = 1,
//       MED = 2,
//       HIGH = 3
//   };
//
// ===========================================================================
xdr.enum("ThresholdIndices", {
  masterWeight: 0,
  low: 1,
  med: 2,
  high: 3,
});

// === xdr source ============================================================
//
//   union switch (LedgerEntryType type)
//       {
//       case ACCOUNT:
//           AccountEntry account;
//       case SIGNER:
//           SignerEntry signer;
//       case FEE:
//           FeeEntry feeState;
//       case BALANCE:
//           BalanceEntry balance;
//       case ASSET:
//           AssetEntry asset;
//       case REFERENCE_ENTRY:
//           ReferenceEntry reference;
//       case STATISTICS:
//           StatisticsEntry stats;
//       case ACCOUNT_LIMITS:
//           AccountLimitsEntry accountLimits;
//   	case ASSET_PAIR: 
//   		AssetPairEntry assetPair;
//   	case OFFER_ENTRY:
//   		OfferEntry offer;
//   	case REVIEWABLE_REQUEST:
//   		ReviewableRequestEntry reviewableRequest;
//   	case EXTERNAL_SYSTEM_ACCOUNT_ID:
//   		ExternalSystemAccountID externalSystemAccountID;
//   	case SALE:
//   		SaleEntry sale;
//   	case KEY_VALUE:
//   	    KeyValueEntry keyValue;
//   	case ACCOUNT_KYC:
//           AccountKYCEntry accountKYC;
//       case EXTERNAL_SYSTEM_ACCOUNT_ID_POOL_ENTRY:
//           ExternalSystemAccountIDPoolEntry externalSystemAccountIDPoolEntry;
//       case LIMITS_V2:
//           LimitsV2Entry limitsV2;
//       case STATISTICS_V2:
//           StatisticsV2Entry statisticsV2;
//       case PENDING_STATISTICS:
//           PendingStatisticsEntry pendingStatistics;
//       case CONTRACT:
//           ContractEntry contract;
//       case ATOMIC_SWAP_BID:
//           AtomicSwapBidEntry atomicSwapBid;
//       case ACCOUNT_ROLE:
//           AccountRoleEntry accountRole;
//       case ACCOUNT_RULE:
//           AccountRuleEntry accountRule;
//       case SIGNER_RULE:
//           SignerRuleEntry signerRule;
//       case SIGNER_ROLE:
//           SignerRoleEntry signerRole;
//       }
//
// ===========================================================================
xdr.union("LedgerEntryData", {
  switchOn: xdr.lookup("LedgerEntryType"),
  switchName: "type",
  switches: [
    ["account", "account"],
    ["signer", "signer"],
    ["fee", "feeState"],
    ["balance", "balance"],
    ["asset", "asset"],
    ["referenceEntry", "reference"],
    ["statistic", "stats"],
    ["accountLimit", "accountLimits"],
    ["assetPair", "assetPair"],
    ["offerEntry", "offer"],
    ["reviewableRequest", "reviewableRequest"],
    ["externalSystemAccountId", "externalSystemAccountId"],
    ["sale", "sale"],
    ["keyValue", "keyValue"],
    ["accountKyc", "accountKyc"],
    ["externalSystemAccountIdPoolEntry", "externalSystemAccountIdPoolEntry"],
    ["limitsV2", "limitsV2"],
    ["statisticsV2", "statisticsV2"],
    ["pendingStatistic", "pendingStatistics"],
    ["contract", "contract"],
    ["atomicSwapBid", "atomicSwapBid"],
    ["accountRole", "accountRole"],
    ["accountRule", "accountRule"],
    ["signerRule", "signerRule"],
    ["signerRole", "signerRole"],
  ],
  arms: {
    account: xdr.lookup("AccountEntry"),
    signer: xdr.lookup("SignerEntry"),
    feeState: xdr.lookup("FeeEntry"),
    balance: xdr.lookup("BalanceEntry"),
    asset: xdr.lookup("AssetEntry"),
    reference: xdr.lookup("ReferenceEntry"),
    stats: xdr.lookup("StatisticsEntry"),
    accountLimits: xdr.lookup("AccountLimitsEntry"),
    assetPair: xdr.lookup("AssetPairEntry"),
    offer: xdr.lookup("OfferEntry"),
    reviewableRequest: xdr.lookup("ReviewableRequestEntry"),
    externalSystemAccountId: xdr.lookup("ExternalSystemAccountId"),
    sale: xdr.lookup("SaleEntry"),
    keyValue: xdr.lookup("KeyValueEntry"),
    accountKyc: xdr.lookup("AccountKycEntry"),
    externalSystemAccountIdPoolEntry: xdr.lookup("ExternalSystemAccountIdPoolEntry"),
    limitsV2: xdr.lookup("LimitsV2Entry"),
    statisticsV2: xdr.lookup("StatisticsV2Entry"),
    pendingStatistics: xdr.lookup("PendingStatisticsEntry"),
    contract: xdr.lookup("ContractEntry"),
    atomicSwapBid: xdr.lookup("AtomicSwapBidEntry"),
    accountRole: xdr.lookup("AccountRoleEntry"),
    accountRule: xdr.lookup("AccountRuleEntry"),
    signerRule: xdr.lookup("SignerRuleEntry"),
    signerRole: xdr.lookup("SignerRoleEntry"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("LedgerEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct LedgerEntry
//   {
//       uint32 lastModifiedLedgerSeq; // ledger the LedgerEntry was last changed
//   
//       union switch (LedgerEntryType type)
//       {
//       case ACCOUNT:
//           AccountEntry account;
//       case SIGNER:
//           SignerEntry signer;
//       case FEE:
//           FeeEntry feeState;
//       case BALANCE:
//           BalanceEntry balance;
//       case ASSET:
//           AssetEntry asset;
//       case REFERENCE_ENTRY:
//           ReferenceEntry reference;
//       case STATISTICS:
//           StatisticsEntry stats;
//       case ACCOUNT_LIMITS:
//           AccountLimitsEntry accountLimits;
//   	case ASSET_PAIR: 
//   		AssetPairEntry assetPair;
//   	case OFFER_ENTRY:
//   		OfferEntry offer;
//   	case REVIEWABLE_REQUEST:
//   		ReviewableRequestEntry reviewableRequest;
//   	case EXTERNAL_SYSTEM_ACCOUNT_ID:
//   		ExternalSystemAccountID externalSystemAccountID;
//   	case SALE:
//   		SaleEntry sale;
//   	case KEY_VALUE:
//   	    KeyValueEntry keyValue;
//   	case ACCOUNT_KYC:
//           AccountKYCEntry accountKYC;
//       case EXTERNAL_SYSTEM_ACCOUNT_ID_POOL_ENTRY:
//           ExternalSystemAccountIDPoolEntry externalSystemAccountIDPoolEntry;
//       case LIMITS_V2:
//           LimitsV2Entry limitsV2;
//       case STATISTICS_V2:
//           StatisticsV2Entry statisticsV2;
//       case PENDING_STATISTICS:
//           PendingStatisticsEntry pendingStatistics;
//       case CONTRACT:
//           ContractEntry contract;
//       case ATOMIC_SWAP_BID:
//           AtomicSwapBidEntry atomicSwapBid;
//       case ACCOUNT_ROLE:
//           AccountRoleEntry accountRole;
//       case ACCOUNT_RULE:
//           AccountRuleEntry accountRule;
//       case SIGNER_RULE:
//           SignerRuleEntry signerRule;
//       case SIGNER_ROLE:
//           SignerRoleEntry signerRole;
//       }
//       data;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("LedgerEntry", [
  ["lastModifiedLedgerSeq", xdr.lookup("Uint32")],
  ["data", xdr.lookup("LedgerEntryData")],
  ["ext", xdr.lookup("LedgerEntryExt")],
]);

// === xdr source ============================================================
//
//   enum EnvelopeType
//   {
//       SCP = 1,
//       TX = 2,
//       AUTH = 3
//   };
//
// ===========================================================================
xdr.enum("EnvelopeType", {
  scp: 1,
  tx: 2,
  auth: 3,
});

// === xdr source ============================================================
//
//   enum ManageSignerAction
//   {
//       CREATE = 0,
//       UPDATE = 1,
//       REMOVE = 2
//   };
//
// ===========================================================================
xdr.enum("ManageSignerAction", {
  create: 0,
  update: 1,
  remove: 2,
});

// === xdr source ============================================================
//
//   struct UpdateSignerData
//   {
//       PublicKey publicKey;
//       uint64 roleID;
//   
//       uint32 weight; // threshold for all SignerRules equals 1000
//       uint32 identity;
//   
//       longstring details;
//   
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("UpdateSignerData", [
  ["publicKey", xdr.lookup("PublicKey")],
  ["roleId", xdr.lookup("Uint64")],
  ["weight", xdr.lookup("Uint32")],
  ["identity", xdr.lookup("Uint32")],
  ["details", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct RemoveSignerData
//   {
//       PublicKey publicKey;
//   
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("RemoveSignerData", [
  ["publicKey", xdr.lookup("PublicKey")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   union switch (ManageSignerAction action)
//       {
//       case CREATE:
//           UpdateSignerData createData;
//       case UPDATE:
//           UpdateSignerData updateData;
//       case REMOVE:
//           RemoveSignerData removeData;
//       }
//
// ===========================================================================
xdr.union("ManageSignerOpData", {
  switchOn: xdr.lookup("ManageSignerAction"),
  switchName: "action",
  switches: [
    ["create", "createData"],
    ["update", "updateData"],
    ["remove", "removeData"],
  ],
  arms: {
    createData: xdr.lookup("UpdateSignerData"),
    updateData: xdr.lookup("UpdateSignerData"),
    removeData: xdr.lookup("RemoveSignerData"),
  },
});

// === xdr source ============================================================
//
//   struct ManageSignerOp
//   {
//       union switch (ManageSignerAction action)
//       {
//       case CREATE:
//           UpdateSignerData createData;
//       case UPDATE:
//           UpdateSignerData updateData;
//       case REMOVE:
//           RemoveSignerData removeData;
//       }
//       data;
//   
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("ManageSignerOp", [
  ["data", xdr.lookup("ManageSignerOpData")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   enum ManageSignerResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0, // account was created
//   
//       // codes considered as "failure" for the operation
//       INVALID_DETAILS = -1, // invalid json details
//       ALREADY_EXISTS = -2, // signer already exist
//   	NO_SUCH_ROLE = -3,
//   	INVALID_WEIGHT = -4, // more than 1000
//   	NOT_FOUND = -5 // there is no signer with such public key
//   };
//
// ===========================================================================
xdr.enum("ManageSignerResultCode", {
  success: 0,
  invalidDetail: -1,
  alreadyExist: -2,
  noSuchRole: -3,
  invalidWeight: -4,
  notFound: -5,
});

// === xdr source ============================================================
//
//   union ManageSignerResult switch (ManageSignerResultCode code)
//   {
//   case SUCCESS:
//       EmptyExt ext;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ManageSignerResult", {
  switchOn: xdr.lookup("ManageSignerResultCode"),
  switchName: "code",
  switches: [
    ["success", "ext"],
  ],
  arms: {
    ext: xdr.lookup("EmptyExt"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("SignerRoleEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct SignerRoleEntry
//   {
//       uint64 id;
//       uint64 ruleIDs<>;
//   
//       AccountID ownerID;
//   
//       longstring details;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("SignerRoleEntry", [
  ["id", xdr.lookup("Uint64")],
  ["ruleIDs", xdr.varArray(xdr.lookup("Uint64"), 2147483647)],
  ["ownerId", xdr.lookup("AccountId")],
  ["details", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("SignerRoleEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("AccountLimitsEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct AccountLimitsEntry
//   {
//       AccountID accountID;
//       Limits limits;
//   
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("AccountLimitsEntry", [
  ["accountId", xdr.lookup("AccountId")],
  ["limits", xdr.lookup("Limits")],
  ["ext", xdr.lookup("AccountLimitsEntryExt")],
]);

// === xdr source ============================================================
//
//   enum ManageExternalSystemAccountIdPoolEntryAction
//   {
//       CREATE = 0,
//       REMOVE = 1
//   };
//
// ===========================================================================
xdr.enum("ManageExternalSystemAccountIdPoolEntryAction", {
  create: 0,
  remove: 1,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreateExternalSystemAccountIdPoolEntryActionInputExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateExternalSystemAccountIdPoolEntryActionInput
//   {
//       int32 externalSystemType;
//       longstring data;
//       uint64 parent;
//   
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CreateExternalSystemAccountIdPoolEntryActionInput", [
  ["externalSystemType", xdr.lookup("Int32")],
  ["data", xdr.lookup("Longstring")],
  ["parent", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("CreateExternalSystemAccountIdPoolEntryActionInputExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("DeleteExternalSystemAccountIdPoolEntryActionInputExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct DeleteExternalSystemAccountIdPoolEntryActionInput
//   {
//       uint64 poolEntryID;
//   
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("DeleteExternalSystemAccountIdPoolEntryActionInput", [
  ["poolEntryId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("DeleteExternalSystemAccountIdPoolEntryActionInputExt")],
]);

// === xdr source ============================================================
//
//   union switch (ManageExternalSystemAccountIdPoolEntryAction action)
//       {
//       case CREATE:
//           CreateExternalSystemAccountIdPoolEntryActionInput createExternalSystemAccountIdPoolEntryActionInput;
//       case REMOVE:
//           DeleteExternalSystemAccountIdPoolEntryActionInput deleteExternalSystemAccountIdPoolEntryActionInput;
//       }
//
// ===========================================================================
xdr.union("ManageExternalSystemAccountIdPoolEntryOpActionInput", {
  switchOn: xdr.lookup("ManageExternalSystemAccountIdPoolEntryAction"),
  switchName: "action",
  switches: [
    ["create", "createExternalSystemAccountIdPoolEntryActionInput"],
    ["remove", "deleteExternalSystemAccountIdPoolEntryActionInput"],
  ],
  arms: {
    createExternalSystemAccountIdPoolEntryActionInput: xdr.lookup("CreateExternalSystemAccountIdPoolEntryActionInput"),
    deleteExternalSystemAccountIdPoolEntryActionInput: xdr.lookup("DeleteExternalSystemAccountIdPoolEntryActionInput"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageExternalSystemAccountIdPoolEntryOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageExternalSystemAccountIdPoolEntryOp
//   {
//       union switch (ManageExternalSystemAccountIdPoolEntryAction action)
//       {
//       case CREATE:
//           CreateExternalSystemAccountIdPoolEntryActionInput createExternalSystemAccountIdPoolEntryActionInput;
//       case REMOVE:
//           DeleteExternalSystemAccountIdPoolEntryActionInput deleteExternalSystemAccountIdPoolEntryActionInput;
//       } actionInput;
//   
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageExternalSystemAccountIdPoolEntryOp", [
  ["actionInput", xdr.lookup("ManageExternalSystemAccountIdPoolEntryOpActionInput")],
  ["ext", xdr.lookup("ManageExternalSystemAccountIdPoolEntryOpExt")],
]);

// === xdr source ============================================================
//
//   enum ManageExternalSystemAccountIdPoolEntryResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       MALFORMED = -1,
//       ALREADY_EXISTS = -2,
//       NOT_FOUND = -3
//   };
//
// ===========================================================================
xdr.enum("ManageExternalSystemAccountIdPoolEntryResultCode", {
  success: 0,
  malformed: -1,
  alreadyExist: -2,
  notFound: -3,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageExternalSystemAccountIdPoolEntrySuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageExternalSystemAccountIdPoolEntrySuccess {
//   	uint64 poolEntryID;
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageExternalSystemAccountIdPoolEntrySuccess", [
  ["poolEntryId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("ManageExternalSystemAccountIdPoolEntrySuccessExt")],
]);

// === xdr source ============================================================
//
//   union ManageExternalSystemAccountIdPoolEntryResult switch (ManageExternalSystemAccountIdPoolEntryResultCode code)
//   {
//   case SUCCESS:
//       ManageExternalSystemAccountIdPoolEntrySuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ManageExternalSystemAccountIdPoolEntryResult", {
  switchOn: xdr.lookup("ManageExternalSystemAccountIdPoolEntryResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("ManageExternalSystemAccountIdPoolEntrySuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("SaleCreationRequestQuoteAssetExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct SaleCreationRequestQuoteAsset {
//   	AssetCode quoteAsset; // asset in which participation will be accepted
//   	uint64 price; // price for 1 baseAsset in terms of quote asset
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("SaleCreationRequestQuoteAsset", [
  ["quoteAsset", xdr.lookup("AssetCode")],
  ["price", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("SaleCreationRequestQuoteAssetExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//   	}
//
// ===========================================================================
xdr.union("SaleCreationRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct SaleCreationRequest
//   {
//       uint64 saleType;
//   	AssetCode baseAsset; // asset for which sale will be performed
//   	AssetCode defaultQuoteAsset; // asset for soft and hard cap
//   	uint64 startTime; // start time of the sale
//   	uint64 endTime; // close time of the sale
//   	uint64 softCap; // minimum amount of quote asset to be received at which sale will be considered a successful
//   	uint64 hardCap; // max amount of quote asset to be received
//       longstring creatorDetails; // details set by requester
//       SaleTypeExt saleTypeExt;
//       uint64 requiredBaseAssetForHardCap;
//   
//       uint32 sequenceNumber;
//   	SaleCreationRequestQuoteAsset quoteAssets<100>;
//   
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//   	}
//       ext;
//   };
//
// ===========================================================================
xdr.struct("SaleCreationRequest", [
  ["saleType", xdr.lookup("Uint64")],
  ["baseAsset", xdr.lookup("AssetCode")],
  ["defaultQuoteAsset", xdr.lookup("AssetCode")],
  ["startTime", xdr.lookup("Uint64")],
  ["endTime", xdr.lookup("Uint64")],
  ["softCap", xdr.lookup("Uint64")],
  ["hardCap", xdr.lookup("Uint64")],
  ["creatorDetails", xdr.lookup("Longstring")],
  ["saleTypeExt", xdr.lookup("SaleTypeExt")],
  ["requiredBaseAssetForHardCap", xdr.lookup("Uint64")],
  ["sequenceNumber", xdr.lookup("Uint32")],
  ["quoteAssets", xdr.varArray(xdr.lookup("SaleCreationRequestQuoteAsset"), 100)],
  ["ext", xdr.lookup("SaleCreationRequestExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("AssetCreationRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct AssetCreationRequest {
//   
//   	AssetCode code;
//   	AccountID preissuedAssetSigner;
//   	uint64 maxIssuanceAmount;
//   	uint64 initialPreissuedAmount;
//       uint32 policies;
//       longstring creatorDetails; // details set by requester
//       uint64 type;
//   
//   	uint32 sequenceNumber;
//       uint32 trailingDigitsCount;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("AssetCreationRequest", [
  ["code", xdr.lookup("AssetCode")],
  ["preissuedAssetSigner", xdr.lookup("AccountId")],
  ["maxIssuanceAmount", xdr.lookup("Uint64")],
  ["initialPreissuedAmount", xdr.lookup("Uint64")],
  ["policies", xdr.lookup("Uint32")],
  ["creatorDetails", xdr.lookup("Longstring")],
  ["type", xdr.lookup("Uint64")],
  ["sequenceNumber", xdr.lookup("Uint32")],
  ["trailingDigitsCount", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("AssetCreationRequestExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("AssetUpdateRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct AssetUpdateRequest {
//   	AssetCode code;
//       longstring creatorDetails; // details set by requester
//   	uint32 policies;
//   
//   	uint32 sequenceNumber;
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("AssetUpdateRequest", [
  ["code", xdr.lookup("AssetCode")],
  ["creatorDetails", xdr.lookup("Longstring")],
  ["policies", xdr.lookup("Uint32")],
  ["sequenceNumber", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("AssetUpdateRequestExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("AssetChangePreissuedSignerExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct AssetChangePreissuedSigner
//   {
//   	AssetCode code;
//   	AccountID accountID;
//   	DecoratedSignature signature;
//   
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("AssetChangePreissuedSigner", [
  ["code", xdr.lookup("AssetCode")],
  ["accountId", xdr.lookup("AccountId")],
  ["signature", xdr.lookup("DecoratedSignature")],
  ["ext", xdr.lookup("AssetChangePreissuedSignerExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("InvoiceRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct InvoiceRequest
//   {
//       AssetCode asset;
//       uint64 amount; // not allowed to set 0
//       BalanceID senderBalance;
//       BalanceID receiverBalance;
//   
//       uint64 *contractID;
//       bool isApproved;
//       longstring creatorDetails; // details set by requester
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("InvoiceRequest", [
  ["asset", xdr.lookup("AssetCode")],
  ["amount", xdr.lookup("Uint64")],
  ["senderBalance", xdr.lookup("BalanceId")],
  ["receiverBalance", xdr.lookup("BalanceId")],
  ["contractId", xdr.option(xdr.lookup("Uint64"))],
  ["isApproved", xdr.bool()],
  ["creatorDetails", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("InvoiceRequestExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("LimitsUpdateRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct LimitsUpdateRequest
//   {
//       longstring creatorDetails; // details set by requester
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("LimitsUpdateRequest", [
  ["creatorDetails", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("LimitsUpdateRequestExt")],
]);

// === xdr source ============================================================
//
//   enum AssetPolicy
//   {
//   	TRANSFERABLE = 1,
//   	BASE_ASSET = 2,
//   	STATS_QUOTE_ASSET = 4,
//   	WITHDRAWABLE = 8,
//   	ISSUANCE_MANUAL_REVIEW_REQUIRED = 16,
//   	CAN_BE_BASE_IN_ATOMIC_SWAP = 32,
//   	CAN_BE_QUOTE_IN_ATOMIC_SWAP = 64
//   };
//
// ===========================================================================
xdr.enum("AssetPolicy", {
  transferable: 1,
  baseAsset: 2,
  statsQuoteAsset: 4,
  withdrawable: 8,
  issuanceManualReviewRequired: 16,
  canBeBaseInAtomicSwap: 32,
  canBeQuoteInAtomicSwap: 64,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("AssetEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct AssetEntry
//   {
//       AssetCode code;
//   	AccountID owner;
//   	AccountID preissuedAssetSigner; // signer of pre issuance tokens
//   	longstring details;
//   	uint64 maxIssuanceAmount; // max number of tokens to be issued
//   	uint64 availableForIssueance; // pre issued tokens available for issuance
//   	uint64 issued; // number of issued tokens
//   	uint64 pendingIssuance; // number of tokens locked for entries like token sale. lockedIssuance + issued can not be > maxIssuanceAmount
//       uint32 policies;
//       uint64 type; // use instead policies that limit usage, use in account rules
//       uint32 trailingDigitsCount;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("AssetEntry", [
  ["code", xdr.lookup("AssetCode")],
  ["owner", xdr.lookup("AccountId")],
  ["preissuedAssetSigner", xdr.lookup("AccountId")],
  ["details", xdr.lookup("Longstring")],
  ["maxIssuanceAmount", xdr.lookup("Uint64")],
  ["availableForIssueance", xdr.lookup("Uint64")],
  ["issued", xdr.lookup("Uint64")],
  ["pendingIssuance", xdr.lookup("Uint64")],
  ["policies", xdr.lookup("Uint32")],
  ["type", xdr.lookup("Uint64")],
  ["trailingDigitsCount", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("AssetEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ASwapRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ASwapRequest
//   {
//       uint64 bidID;
//       uint64 baseAmount;
//       AssetCode quoteAsset;
//       longstring creatorDetails; // details set by requester
//   
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("ASwapRequest", [
  ["bidId", xdr.lookup("Uint64")],
  ["baseAmount", xdr.lookup("Uint64")],
  ["quoteAsset", xdr.lookup("AssetCode")],
  ["creatorDetails", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("ASwapRequestExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ASwapBidQuoteAssetExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ASwapBidQuoteAsset
//   {
//       AssetCode quoteAsset;
//       uint64 price;
//   
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ASwapBidQuoteAsset", [
  ["quoteAsset", xdr.lookup("AssetCode")],
  ["price", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("ASwapBidQuoteAssetExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("AtomicSwapBidEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct AtomicSwapBidEntry
//   {
//       uint64 bidID;
//       AccountID ownerID;
//       AssetCode baseAsset;
//       BalanceID baseBalance;
//       uint64 amount;
//       uint64 lockedAmount;
//       uint64 createdAt;
//   
//       bool isCancelled;
//   
//       longstring details;
//   
//       ASwapBidQuoteAsset quoteAssets<>;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("AtomicSwapBidEntry", [
  ["bidId", xdr.lookup("Uint64")],
  ["ownerId", xdr.lookup("AccountId")],
  ["baseAsset", xdr.lookup("AssetCode")],
  ["baseBalance", xdr.lookup("BalanceId")],
  ["amount", xdr.lookup("Uint64")],
  ["lockedAmount", xdr.lookup("Uint64")],
  ["createdAt", xdr.lookup("Uint64")],
  ["isCancelled", xdr.bool()],
  ["details", xdr.lookup("Longstring")],
  ["quoteAssets", xdr.varArray(xdr.lookup("ASwapBidQuoteAsset"), 2147483647)],
  ["ext", xdr.lookup("AtomicSwapBidEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreateChangeRoleRequestOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateChangeRoleRequestOp
//   {
//       uint64 requestID;
//   
//       AccountID destinationAccount;
//       uint64 accountRoleToSet;
//       longstring kycData;
//   
//       uint32* allTasks;
//   
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CreateChangeRoleRequestOp", [
  ["requestId", xdr.lookup("Uint64")],
  ["destinationAccount", xdr.lookup("AccountId")],
  ["accountRoleToSet", xdr.lookup("Uint64")],
  ["kycData", xdr.lookup("Longstring")],
  ["allTasks", xdr.option(xdr.lookup("Uint32"))],
  ["ext", xdr.lookup("CreateChangeRoleRequestOpExt")],
]);

// === xdr source ============================================================
//
//   enum CreateChangeRoleRequestResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       ACC_TO_UPDATE_DOES_NOT_EXIST = -1, // account to update does not exist
//       REQUEST_ALREADY_EXISTS = -2,
//   	SAME_ACC_TYPE_TO_SET = -3,
//   	REQUEST_DOES_NOT_EXIST = -4,
//   	PENDING_REQUEST_UPDATE_NOT_ALLOWED = -5,
//   	NOT_ALLOWED_TO_UPDATE_REQUEST = -6, // master account can update request only through review request operation
//   	INVALID_UPDATE_KYC_REQUEST_DATA = -7,
//   	INVALID_KYC_DATA = -8,
//   	KYC_RULE_NOT_FOUND = -9
//   };
//
// ===========================================================================
xdr.enum("CreateChangeRoleRequestResultCode", {
  success: 0,
  accToUpdateDoesNotExist: -1,
  requestAlreadyExist: -2,
  sameAccTypeToSet: -3,
  requestDoesNotExist: -4,
  pendingRequestUpdateNotAllowed: -5,
  notAllowedToUpdateRequest: -6,
  invalidUpdateKycRequestDatum: -7,
  invalidKycDatum: -8,
  kycRuleNotFound: -9,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("CreateChangeRoleRequestResultSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//   		uint64 requestID;
//   		bool fulfilled;
//   		// Reserved for future use
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	}
//
// ===========================================================================
xdr.struct("CreateChangeRoleRequestResultSuccess", [
  ["requestId", xdr.lookup("Uint64")],
  ["fulfilled", xdr.bool()],
  ["ext", xdr.lookup("CreateChangeRoleRequestResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   union CreateChangeRoleRequestResult switch (CreateChangeRoleRequestResultCode code)
//   {
//   case SUCCESS:
//       struct {
//   		uint64 requestID;
//   		bool fulfilled;
//   		// Reserved for future use
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	} success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("CreateChangeRoleRequestResult", {
  switchOn: xdr.lookup("CreateChangeRoleRequestResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("CreateChangeRoleRequestResultSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   enum ManageKVAction
//       {
//           PUT = 1,
//           REMOVE = 2
//       };
//
// ===========================================================================
xdr.enum("ManageKvAction", {
  put: 1,
  remove: 2,
});

// === xdr source ============================================================
//
//   union switch(ManageKVAction action)
//           {
//               case PUT:
//                    KeyValueEntryValue value;
//               case REMOVE:
//                   void;
//           }
//
// ===========================================================================
xdr.union("ManageKeyValueOpAction", {
  switchOn: xdr.lookup("ManageKvAction"),
  switchName: "action",
  switches: [
    ["put", "value"],
    ["remove", xdr.void()],
  ],
  arms: {
    value: xdr.lookup("KeyValueEntryValue"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//           {
//               case EMPTY_VERSION:
//                   void;
//           }
//
// ===========================================================================
xdr.union("ManageKeyValueOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageKeyValueOp
//       {
//           longstring key;
//           union switch(ManageKVAction action)
//           {
//               case PUT:
//                    KeyValueEntryValue value;
//               case REMOVE:
//                   void;
//           }
//           action;
//   
//           // reserved for future use
//           union switch (LedgerVersion v)
//           {
//               case EMPTY_VERSION:
//                   void;
//           }
//           ext;
//       };
//
// ===========================================================================
xdr.struct("ManageKeyValueOp", [
  ["key", xdr.lookup("Longstring")],
  ["action", xdr.lookup("ManageKeyValueOpAction")],
  ["ext", xdr.lookup("ManageKeyValueOpExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//           {
//               case EMPTY_VERSION:
//                   void;
//           }
//
// ===========================================================================
xdr.union("ManageKeyValueSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageKeyValueSuccess
//       {
//           // reserved for future use
//           union switch (LedgerVersion v)
//           {
//               case EMPTY_VERSION:
//                   void;
//           }
//           ext;
//       };
//
// ===========================================================================
xdr.struct("ManageKeyValueSuccess", [
  ["ext", xdr.lookup("ManageKeyValueSuccessExt")],
]);

// === xdr source ============================================================
//
//   enum ManageKeyValueResultCode
//       {
//           SUCCESS = 0,
//           NOT_FOUND = -1,
//           INVALID_TYPE = -2
//       };
//
// ===========================================================================
xdr.enum("ManageKeyValueResultCode", {
  success: 0,
  notFound: -1,
  invalidType: -2,
});

// === xdr source ============================================================
//
//   union ManageKeyValueResult switch (ManageKeyValueResultCode code)
//       {
//           case SUCCESS:
//               ManageKeyValueSuccess success;
//           default:
//               void;
//       };
//
// ===========================================================================
xdr.union("ManageKeyValueResult", {
  switchOn: xdr.lookup("ManageKeyValueResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("ManageKeyValueSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("AccountRuleEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct AccountRuleEntry
//   {
//       uint64 id;
//   
//       AccountRuleResource resource;
//       AccountRuleAction action;
//   
//       bool isForbid;
//   
//       longstring details;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("AccountRuleEntry", [
  ["id", xdr.lookup("Uint64")],
  ["resource", xdr.lookup("AccountRuleResource")],
  ["action", xdr.lookup("AccountRuleAction")],
  ["isForbid", xdr.bool()],
  ["details", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("AccountRuleEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("UpdateSaleDetailsRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct UpdateSaleDetailsRequest {
//       uint64 saleID; // ID of sale to update details
//       longstring creatorDetails; // details set by requester
//   
//       uint32 sequenceNumber;
//       // Reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("UpdateSaleDetailsRequest", [
  ["saleId", xdr.lookup("Uint64")],
  ["creatorDetails", xdr.lookup("Longstring")],
  ["sequenceNumber", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("UpdateSaleDetailsRequestExt")],
]);

// === xdr source ============================================================
//
//   enum ReviewableRequestType
//   {
//   	NONE = 0, // use this request type in ReviewRequestOp extended result if additional info is not required
//   	ANY = 1,
//   	CREATE_PRE_ISSUANCE = 2,
//   	CREATE_ISSUANCE = 3,
//   	CREATE_WITHDRAW = 4,
//   	CREATE_SALE = 5,
//   	UPDATE_LIMITS = 6,
//       CREATE_AML_ALERT = 7,
//   	CHANGE_ROLE = 8,
//   	UPDATE_SALE_DETAILS = 9,
//   	CREATE_ASSET = 10,
//   	CREATE_INVOICE = 11,
//   	MANAGE_CONTRACT = 12,
//   	UPDATE_ASSET = 13,
//   	CREATE_ATOMIC_SWAP_BID = 16,
//   	CREATE_ATOMIC_SWAP = 17
//   };
//
// ===========================================================================
xdr.enum("ReviewableRequestType", {
  none: 0,
  any: 1,
  createPreIssuance: 2,
  createIssuance: 3,
  createWithdraw: 4,
  createSale: 5,
  updateLimit: 6,
  createAmlAlert: 7,
  changeRole: 8,
  updateSaleDetail: 9,
  createAsset: 10,
  createInvoice: 11,
  manageContract: 12,
  updateAsset: 13,
  createAtomicSwapBid: 16,
  createAtomicSwap: 17,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("TasksExtExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct TasksExt {
//       // Tasks are represented by a bitmask
//       uint32 allTasks;
//       uint32 pendingTasks;
//   
//       // External details vector consists of comments written by request reviewers
//       longstring externalDetails<>;
//   
//       // Reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("TasksExt", [
  ["allTasks", xdr.lookup("Uint32")],
  ["pendingTasks", xdr.lookup("Uint32")],
  ["externalDetails", xdr.varArray(xdr.lookup("Longstring"), 2147483647)],
  ["ext", xdr.lookup("TasksExtExt")],
]);

// === xdr source ============================================================
//
//   union switch (ReviewableRequestType type) {
//   		case CREATE_ASSET:
//   			AssetCreationRequest assetCreationRequest;
//   		case UPDATE_ASSET:
//   			AssetUpdateRequest assetUpdateRequest;
//   		case CREATE_PRE_ISSUANCE:
//   			PreIssuanceRequest preIssuanceRequest;
//   		case CREATE_ISSUANCE:
//   			IssuanceRequest issuanceRequest;
//   		case CREATE_WITHDRAW:
//   			WithdrawalRequest withdrawalRequest;
//   		case CREATE_SALE:
//   			SaleCreationRequest saleCreationRequest;
//           case UPDATE_LIMITS:
//               LimitsUpdateRequest limitsUpdateRequest;
//           case CREATE_AML_ALERT:
//               AMLAlertRequest amlAlertRequest;
//           case CHANGE_ROLE:
//               ChangeRoleRequest changeRoleRequest;
//           case UPDATE_SALE_DETAILS:
//               UpdateSaleDetailsRequest updateSaleDetailsRequest;
//           case CREATE_INVOICE:
//               InvoiceRequest invoiceRequest;
//           case MANAGE_CONTRACT:
//               ContractRequest contractRequest;
//           case CREATE_ATOMIC_SWAP_BID:
//               ASwapBidCreationRequest aSwapBidCreationRequest;
//           case CREATE_ATOMIC_SWAP:
//               ASwapRequest aSwapRequest;
//   	}
//
// ===========================================================================
xdr.union("ReviewableRequestEntryBody", {
  switchOn: xdr.lookup("ReviewableRequestType"),
  switchName: "type",
  switches: [
    ["createAsset", "assetCreationRequest"],
    ["updateAsset", "assetUpdateRequest"],
    ["createPreIssuance", "preIssuanceRequest"],
    ["createIssuance", "issuanceRequest"],
    ["createWithdraw", "withdrawalRequest"],
    ["createSale", "saleCreationRequest"],
    ["updateLimit", "limitsUpdateRequest"],
    ["createAmlAlert", "amlAlertRequest"],
    ["changeRole", "changeRoleRequest"],
    ["updateSaleDetail", "updateSaleDetailsRequest"],
    ["createInvoice", "invoiceRequest"],
    ["manageContract", "contractRequest"],
    ["createAtomicSwapBid", "aSwapBidCreationRequest"],
    ["createAtomicSwap", "aSwapRequest"],
  ],
  arms: {
    assetCreationRequest: xdr.lookup("AssetCreationRequest"),
    assetUpdateRequest: xdr.lookup("AssetUpdateRequest"),
    preIssuanceRequest: xdr.lookup("PreIssuanceRequest"),
    issuanceRequest: xdr.lookup("IssuanceRequest"),
    withdrawalRequest: xdr.lookup("WithdrawalRequest"),
    saleCreationRequest: xdr.lookup("SaleCreationRequest"),
    limitsUpdateRequest: xdr.lookup("LimitsUpdateRequest"),
    amlAlertRequest: xdr.lookup("AmlAlertRequest"),
    changeRoleRequest: xdr.lookup("ChangeRoleRequest"),
    updateSaleDetailsRequest: xdr.lookup("UpdateSaleDetailsRequest"),
    invoiceRequest: xdr.lookup("InvoiceRequest"),
    contractRequest: xdr.lookup("ContractRequest"),
    aSwapBidCreationRequest: xdr.lookup("ASwapBidCreationRequest"),
    aSwapRequest: xdr.lookup("ASwapRequest"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//   	}
//
// ===========================================================================
xdr.union("ReviewableRequestEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ReviewableRequestEntry {
//   	uint64 requestID;
//   	Hash hash; // hash of the request body
//   	AccountID requestor;
//   	longstring rejectReason;
//   	AccountID reviewer;
//   	string64* reference; // reference for request which will act as an unique key for the request (will reject request with the same reference from same requestor)
//   	int64 createdAt; // when request was created
//   
//   	union switch (ReviewableRequestType type) {
//   		case CREATE_ASSET:
//   			AssetCreationRequest assetCreationRequest;
//   		case UPDATE_ASSET:
//   			AssetUpdateRequest assetUpdateRequest;
//   		case CREATE_PRE_ISSUANCE:
//   			PreIssuanceRequest preIssuanceRequest;
//   		case CREATE_ISSUANCE:
//   			IssuanceRequest issuanceRequest;
//   		case CREATE_WITHDRAW:
//   			WithdrawalRequest withdrawalRequest;
//   		case CREATE_SALE:
//   			SaleCreationRequest saleCreationRequest;
//           case UPDATE_LIMITS:
//               LimitsUpdateRequest limitsUpdateRequest;
//           case CREATE_AML_ALERT:
//               AMLAlertRequest amlAlertRequest;
//           case CHANGE_ROLE:
//               ChangeRoleRequest changeRoleRequest;
//           case UPDATE_SALE_DETAILS:
//               UpdateSaleDetailsRequest updateSaleDetailsRequest;
//           case CREATE_INVOICE:
//               InvoiceRequest invoiceRequest;
//           case MANAGE_CONTRACT:
//               ContractRequest contractRequest;
//           case CREATE_ATOMIC_SWAP_BID:
//               ASwapBidCreationRequest aSwapBidCreationRequest;
//           case CREATE_ATOMIC_SWAP:
//               ASwapRequest aSwapRequest;
//   	} body;
//   
//   	TasksExt tasks;
//   
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//   	}
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ReviewableRequestEntry", [
  ["requestId", xdr.lookup("Uint64")],
  ["hash", xdr.lookup("Hash")],
  ["requestor", xdr.lookup("AccountId")],
  ["rejectReason", xdr.lookup("Longstring")],
  ["reviewer", xdr.lookup("AccountId")],
  ["reference", xdr.option(xdr.lookup("String64"))],
  ["createdAt", xdr.lookup("Int64")],
  ["body", xdr.lookup("ReviewableRequestEntryBody")],
  ["tasks", xdr.lookup("TasksExt")],
  ["ext", xdr.lookup("ReviewableRequestEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageOfferOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageOfferOp
//   {
//       BalanceID baseBalance; // balance for base asset
//   	BalanceID quoteBalance; // balance for quote asset
//   	bool isBuy;
//       int64 amount; // if set to 0, delete the offer
//       int64 price;  // price of base asset in terms of quote
//   
//       int64 fee;
//   
//       // 0=create a new offer, otherwise edit an existing offer
//       uint64 offerID;
//   	uint64 orderBookID;
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageOfferOp", [
  ["baseBalance", xdr.lookup("BalanceId")],
  ["quoteBalance", xdr.lookup("BalanceId")],
  ["isBuy", xdr.bool()],
  ["amount", xdr.lookup("Int64")],
  ["price", xdr.lookup("Int64")],
  ["fee", xdr.lookup("Int64")],
  ["offerId", xdr.lookup("Uint64")],
  ["orderBookId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("ManageOfferOpExt")],
]);

// === xdr source ============================================================
//
//   enum ManageOfferResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       MALFORMED = -1,     // generated offer would be invalid
//       PAIR_NOT_TRADED = -2, // it's not allowed to trage with this pair
//       BALANCE_NOT_FOUND = -3,  // does not own balance for buying or selling
//       UNDERFUNDED = -4,    // doesn't hold what it's trying to sell
//       CROSS_SELF = -5,     // would cross an offer from the same user
//   	OFFER_OVERFLOW = -6,
//   	ASSET_PAIR_NOT_TRADABLE = -7,
//   	PHYSICAL_PRICE_RESTRICTION = -8, // offer price violates physical price restriction
//   	CURRENT_PRICE_RESTRICTION = -9,
//       NOT_FOUND = -10, // offerID does not match an existing offer
//       INVALID_PERCENT_FEE = -11,
//   	INSUFFICIENT_PRICE = -12,
//   	ORDER_BOOK_DOES_NOT_EXISTS = -13, // specified order book does not exists
//   	SALE_IS_NOT_STARTED_YET = -14, // sale is not started yet
//   	SALE_ALREADY_ENDED = -15, // sale has already ended
//   	ORDER_VIOLATES_HARD_CAP = -16, // currentcap + order will exceed hard cap
//   	CANT_PARTICIPATE_OWN_SALE = -17, // it's not allowed to participate in own sale
//   	ASSET_MISMATCHED = -18, // sale assets does not match assets for specified balances
//   	PRICE_DOES_NOT_MATCH = -19, // price does not match sale price
//   	PRICE_IS_INVALID = -20, // price must be positive
//   	UPDATE_IS_NOT_ALLOWED = -21, // update of the offer is not allowed
//   	INVALID_AMOUNT = -22, // amount must be positive 
//   	SALE_IS_NOT_ACTIVE = -23,
//   	REQUIRES_KYC = -24, // source must have KYC in order to participate
//   	SOURCE_UNDERFUNDED = -25,
//   	SOURCE_BALANCE_LOCK_OVERFLOW = -26,
//   	REQUIRES_VERIFICATION = -27, // source must be verified in order to participate
//   	INCORRECT_AMOUNT_PRECISION = -28
//   };
//
// ===========================================================================
xdr.enum("ManageOfferResultCode", {
  success: 0,
  malformed: -1,
  pairNotTraded: -2,
  balanceNotFound: -3,
  underfunded: -4,
  crossSelf: -5,
  offerOverflow: -6,
  assetPairNotTradable: -7,
  physicalPriceRestriction: -8,
  currentPriceRestriction: -9,
  notFound: -10,
  invalidPercentFee: -11,
  insufficientPrice: -12,
  orderBookDoesNotExist: -13,
  saleIsNotStartedYet: -14,
  saleAlreadyEnded: -15,
  orderViolatesHardCap: -16,
  cantParticipateOwnSale: -17,
  assetMismatched: -18,
  priceDoesNotMatch: -19,
  priceIsInvalid: -20,
  updateIsNotAllowed: -21,
  invalidAmount: -22,
  saleIsNotActive: -23,
  requiresKyc: -24,
  sourceUnderfunded: -25,
  sourceBalanceLockOverflow: -26,
  requiresVerification: -27,
  incorrectAmountPrecision: -28,
});

// === xdr source ============================================================
//
//   enum ManageOfferEffect
//   {
//       CREATED = 0,
//       UPDATED = 1,
//       DELETED = 2
//   };
//
// ===========================================================================
xdr.enum("ManageOfferEffect", {
  created: 0,
  updated: 1,
  deleted: 2,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ClaimOfferAtomExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ClaimOfferAtom
//   {
//       // emitted to identify the offer
//       AccountID bAccountID; // Account that owns the offer
//       uint64 offerID;
//   	int64 baseAmount;
//   	int64 quoteAmount;
//   	int64 bFeePaid;
//   	int64 aFeePaid;
//   	BalanceID baseBalance;
//   	BalanceID quoteBalance;
//   
//   	int64 currentPrice;
//   
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ClaimOfferAtom", [
  ["bAccountId", xdr.lookup("AccountId")],
  ["offerId", xdr.lookup("Uint64")],
  ["baseAmount", xdr.lookup("Int64")],
  ["quoteAmount", xdr.lookup("Int64")],
  ["bFeePaid", xdr.lookup("Int64")],
  ["aFeePaid", xdr.lookup("Int64")],
  ["baseBalance", xdr.lookup("BalanceId")],
  ["quoteBalance", xdr.lookup("BalanceId")],
  ["currentPrice", xdr.lookup("Int64")],
  ["ext", xdr.lookup("ClaimOfferAtomExt")],
]);

// === xdr source ============================================================
//
//   union switch (ManageOfferEffect effect)
//       {
//       case CREATED:
//       case UPDATED:
//           OfferEntry offer;
//       default:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageOfferSuccessResultOffer", {
  switchOn: xdr.lookup("ManageOfferEffect"),
  switchName: "effect",
  switches: [
    ["created", "offer"],
    ["updated", "offer"],
  ],
  arms: {
    offer: xdr.lookup("OfferEntry"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageOfferSuccessResultExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageOfferSuccessResult
//   {
//   
//       // offers that got claimed while creating this offer
//       ClaimOfferAtom offersClaimed<>;
//   	AssetCode baseAsset;
//   	AssetCode quoteAsset;
//   
//       union switch (ManageOfferEffect effect)
//       {
//       case CREATED:
//       case UPDATED:
//           OfferEntry offer;
//       default:
//           void;
//       }
//       offer;
//   
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageOfferSuccessResult", [
  ["offersClaimed", xdr.varArray(xdr.lookup("ClaimOfferAtom"), 2147483647)],
  ["baseAsset", xdr.lookup("AssetCode")],
  ["quoteAsset", xdr.lookup("AssetCode")],
  ["offer", xdr.lookup("ManageOfferSuccessResultOffer")],
  ["ext", xdr.lookup("ManageOfferSuccessResultExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("ManageOfferResultPhysicalPriceRestrictionExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//   		int64 physicalPrice;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	}
//
// ===========================================================================
xdr.struct("ManageOfferResultPhysicalPriceRestriction", [
  ["physicalPrice", xdr.lookup("Int64")],
  ["ext", xdr.lookup("ManageOfferResultPhysicalPriceRestrictionExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("ManageOfferResultCurrentPriceRestrictionExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//   		int64 currentPrice;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	}
//
// ===========================================================================
xdr.struct("ManageOfferResultCurrentPriceRestriction", [
  ["currentPrice", xdr.lookup("Int64")],
  ["ext", xdr.lookup("ManageOfferResultCurrentPriceRestrictionExt")],
]);

// === xdr source ============================================================
//
//   union ManageOfferResult switch (ManageOfferResultCode code)
//   {
//   case SUCCESS:
//       ManageOfferSuccessResult success;
//   case PHYSICAL_PRICE_RESTRICTION:
//   	struct {
//   		int64 physicalPrice;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	} physicalPriceRestriction;
//   case CURRENT_PRICE_RESTRICTION:
//   	struct {
//   		int64 currentPrice;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	} currentPriceRestriction;
//   
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ManageOfferResult", {
  switchOn: xdr.lookup("ManageOfferResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
    ["physicalPriceRestriction", "physicalPriceRestriction"],
    ["currentPriceRestriction", "currentPriceRestriction"],
  ],
  arms: {
    success: xdr.lookup("ManageOfferSuccessResult"),
    physicalPriceRestriction: xdr.lookup("ManageOfferResultPhysicalPriceRestriction"),
    currentPriceRestriction: xdr.lookup("ManageOfferResultCurrentPriceRestriction"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ExternalSystemAccountIdExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ExternalSystemAccountID
//   {
//       AccountID accountID;
//       int32 externalSystemType;
//   	longstring data;
//   
//   	 // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ExternalSystemAccountId", [
  ["accountId", xdr.lookup("AccountId")],
  ["externalSystemType", xdr.lookup("Int32")],
  ["data", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("ExternalSystemAccountIdExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           uint64 type;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("RequestTypedResourceSale", [
  ["type", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           AssetCode assetCode;
//           uint64 assetType;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("RequestTypedResourceIssuance", [
  ["assetCode", xdr.lookup("AssetCode")],
  ["assetType", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   union RequestTypedResource switch (ReviewableRequestType requestType)
//   {
//   case CREATE_SALE:
//       struct
//       {
//           uint64 type;
//   
//           EmptyExt ext;
//       } sale;
//   case CREATE_ISSUANCE:
//       struct
//       {
//           AssetCode assetCode;
//           uint64 assetType;
//   
//           EmptyExt ext;
//       } issuance;
//   default:
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.union("RequestTypedResource", {
  switchOn: xdr.lookup("ReviewableRequestType"),
  switchName: "requestType",
  switches: [
    ["createSale", "sale"],
    ["createIssuance", "issuance"],
  ],
  arms: {
    sale: xdr.lookup("RequestTypedResourceSale"),
    issuance: xdr.lookup("RequestTypedResourceIssuance"),
    ext: xdr.lookup("EmptyExt"),
  },
  defaultArm: xdr.lookup("EmptyExt"),
});

// === xdr source ============================================================
//
//   struct
//       {
//           AssetCode assetCode;
//           uint64 assetType;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("AccountRuleResourceAsset", [
  ["assetCode", xdr.lookup("AssetCode")],
  ["assetType", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           RequestTypedResource details;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("AccountRuleResourceReviewableRequest", [
  ["details", xdr.lookup("RequestTypedResource")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           uint64 baseAssetType;
//           uint64 quoteAssetType;
//   
//           AssetCode baseAssetCode;
//           AssetCode quoteAssetCode;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("AccountRuleResourceOffer", [
  ["baseAssetType", xdr.lookup("Uint64")],
  ["quoteAssetType", xdr.lookup("Uint64")],
  ["baseAssetCode", xdr.lookup("AssetCode")],
  ["quoteAssetCode", xdr.lookup("AssetCode")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           uint64 saleID;
//           uint64 saleType;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("AccountRuleResourceSale", [
  ["saleId", xdr.lookup("Uint64")],
  ["saleType", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           uint64 assetType;
//           AssetCode assetCode;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("AccountRuleResourceAtomicSwapBid", [
  ["assetType", xdr.lookup("Uint64")],
  ["assetCode", xdr.lookup("AssetCode")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   union AccountRuleResource switch (LedgerEntryType type)
//   {
//   case TRANSACTION:
//       EmptyExt tx;
//   case ASSET:
//       struct
//       {
//           AssetCode assetCode;
//           uint64 assetType;
//   
//           EmptyExt ext;
//       } asset;
//   case REVIEWABLE_REQUEST:
//       struct
//       {
//           RequestTypedResource details;
//   
//           EmptyExt ext;
//       } reviewableRequest;
//   case ANY:
//       void;
//   case OFFER_ENTRY:
//       struct
//       {
//           uint64 baseAssetType;
//           uint64 quoteAssetType;
//   
//           AssetCode baseAssetCode;
//           AssetCode quoteAssetCode;
//   
//           EmptyExt ext;
//       } offer;
//   case SALE:
//       struct
//       {
//           uint64 saleID;
//           uint64 saleType;
//   
//           EmptyExt ext;
//       } sale;
//   case ATOMIC_SWAP_BID:
//       struct
//       {
//           uint64 assetType;
//           AssetCode assetCode;
//   
//           EmptyExt ext;
//       } atomicSwapBid;
//   default:
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.union("AccountRuleResource", {
  switchOn: xdr.lookup("LedgerEntryType"),
  switchName: "type",
  switches: [
    ["transaction", "tx"],
    ["asset", "asset"],
    ["reviewableRequest", "reviewableRequest"],
    ["any", xdr.void()],
    ["offerEntry", "offer"],
    ["sale", "sale"],
    ["atomicSwapBid", "atomicSwapBid"],
  ],
  arms: {
    tx: xdr.lookup("EmptyExt"),
    asset: xdr.lookup("AccountRuleResourceAsset"),
    reviewableRequest: xdr.lookup("AccountRuleResourceReviewableRequest"),
    offer: xdr.lookup("AccountRuleResourceOffer"),
    sale: xdr.lookup("AccountRuleResourceSale"),
    atomicSwapBid: xdr.lookup("AccountRuleResourceAtomicSwapBid"),
    ext: xdr.lookup("EmptyExt"),
  },
  defaultArm: xdr.lookup("EmptyExt"),
});

// === xdr source ============================================================
//
//   enum AccountRuleAction
//   {
//       ANY = 1,
//       CREATE = 2,
//       MANAGE = 3,
//       SEND = 4,
//       WITHDRAW = 5,
//       RECEIVE_ISSUANCE = 6,
//       RECEIVE_PAYMENT = 7,
//       RECEIVE_ATOMIC_SWAP = 8,
//       CREATE_TO_SELL = 9,
//       CREATE_TO_BUY = 10,
//       PARTICIPATE = 11,
//       BIND = 12,
//       UPDATE_MAX_ISSUANCE = 13,
//       CHECK = 14,
//       CREATE_WITH_TASKS = 15,
//       CREATE_FOR_OTHER = 16,
//       CANCEL = 17
//   };
//
// ===========================================================================
xdr.enum("AccountRuleAction", {
  any: 1,
  create: 2,
  manage: 3,
  send: 4,
  withdraw: 5,
  receiveIssuance: 6,
  receivePayment: 7,
  receiveAtomicSwap: 8,
  createToSell: 9,
  createToBuy: 10,
  participate: 11,
  bind: 12,
  updateMaxIssuance: 13,
  check: 14,
  createWithTask: 15,
  createForOther: 16,
  cancel: 17,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("StatisticsV2EntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct StatisticsV2Entry
//   {
//       uint64      id;
//   	AccountID   accountID;
//   	StatsOpType statsOpType;
//       AssetCode   assetCode;
//       bool        isConvertNeeded;
//   
//   	uint64 dailyOutcome;
//   	uint64 weeklyOutcome;
//   	uint64 monthlyOutcome;
//   	uint64 annualOutcome;
//   
//   	int64 updatedAt;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("StatisticsV2Entry", [
  ["id", xdr.lookup("Uint64")],
  ["accountId", xdr.lookup("AccountId")],
  ["statsOpType", xdr.lookup("StatsOpType")],
  ["assetCode", xdr.lookup("AssetCode")],
  ["isConvertNeeded", xdr.bool()],
  ["dailyOutcome", xdr.lookup("Uint64")],
  ["weeklyOutcome", xdr.lookup("Uint64")],
  ["monthlyOutcome", xdr.lookup("Uint64")],
  ["annualOutcome", xdr.lookup("Uint64")],
  ["updatedAt", xdr.lookup("Int64")],
  ["ext", xdr.lookup("StatisticsV2EntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("AccountRoleEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct AccountRoleEntry
//   {
//       uint64 id;
//   
//       uint64 ruleIDs<>;
//   
//       longstring details;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("AccountRoleEntry", [
  ["id", xdr.lookup("Uint64")],
  ["ruleIDs", xdr.varArray(xdr.lookup("Uint64"), 2147483647)],
  ["details", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("AccountRoleEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreateAccountOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateAccountOp
//   {
//       AccountID destination; // account to create
//       AccountID* referrer;
//   	uint64 roleID;
//   
//   	UpdateSignerData signersData<>;
//   
//   	 // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CreateAccountOp", [
  ["destination", xdr.lookup("AccountId")],
  ["referrer", xdr.option(xdr.lookup("AccountId"))],
  ["roleId", xdr.lookup("Uint64")],
  ["signersData", xdr.varArray(xdr.lookup("UpdateSignerData"), 2147483647)],
  ["ext", xdr.lookup("CreateAccountOpExt")],
]);

// === xdr source ============================================================
//
//   enum CreateAccountResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0, // account was created
//   
//       // codes considered as "failure" for the operation
//       INVALID_DESTINATION = -1, // source cannot be destination
//       ALREADY_EXISTS = -2, // account already exist
//       INVALID_WEIGHT = -3, // sum of weight with different identity must be more or equal threshold
//   	NO_SUCH_ROLE = -4,
//   	INVALID_SIGNER_DATA = -5,
//   	NO_SIGNER_DATA = -6 // empty signer data array not allowed
//   };
//
// ===========================================================================
xdr.enum("CreateAccountResultCode", {
  success: 0,
  invalidDestination: -1,
  alreadyExist: -2,
  invalidWeight: -3,
  noSuchRole: -4,
  invalidSignerDatum: -5,
  noSignerDatum: -6,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreateAccountSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateAccountSuccess
//   {
//       uint64 sequentialID;
//   
//   	 // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CreateAccountSuccess", [
  ["sequentialId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("CreateAccountSuccessExt")],
]);

// === xdr source ============================================================
//
//   union CreateAccountResult switch (CreateAccountResultCode code)
//   {
//   case SUCCESS:
//       CreateAccountSuccess success;
//   case INVALID_SIGNER_DATA:
//       ManageSignerResultCode createSignerErrorCode;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("CreateAccountResult", {
  switchOn: xdr.lookup("CreateAccountResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
    ["invalidSignerDatum", "createSignerErrorCode"],
  ],
  arms: {
    success: xdr.lookup("CreateAccountSuccess"),
    createSignerErrorCode: xdr.lookup("ManageSignerResultCode"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreateIssuanceRequestOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateIssuanceRequestOp
//   {
//   	IssuanceRequest request;
//   	string64 reference;
//   
//       uint32* allTasks;
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CreateIssuanceRequestOp", [
  ["request", xdr.lookup("IssuanceRequest")],
  ["reference", xdr.lookup("String64")],
  ["allTasks", xdr.option(xdr.lookup("Uint32"))],
  ["ext", xdr.lookup("CreateIssuanceRequestOpExt")],
]);

// === xdr source ============================================================
//
//   enum CreateIssuanceRequestResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       ASSET_NOT_FOUND = -1,
//   	INVALID_AMOUNT = -2,             // amount is 0
//   	REFERENCE_DUPLICATION = -3,
//   	NO_COUNTERPARTY = -4,
//   	NOT_AUTHORIZED = -5,
//   	EXCEEDS_MAX_ISSUANCE_AMOUNT = -6,
//   	RECEIVER_FULL_LINE = -7,
//   	INVALID_EXTERNAL_DETAILS = -8, // external details size exceeds max allowed
//   	FEE_EXCEEDS_AMOUNT = -9, // fee more than amount to issue
//       REQUIRES_KYC = -10, // asset requires receiver to have KYC
//       REQUIRES_VERIFICATION = -11, //asset requires receiver to be verified
//       ISSUANCE_TASKS_NOT_FOUND = -12, // issuance tasks have not been provided by the source and don't exist in 'KeyValue' table
//       SYSTEM_TASKS_NOT_ALLOWED = -13,
//       INVALID_AMOUNT_PRECISION = -14   // amount does not match asset's precision
//   };
//
// ===========================================================================
xdr.enum("CreateIssuanceRequestResultCode", {
  success: 0,
  assetNotFound: -1,
  invalidAmount: -2,
  referenceDuplication: -3,
  noCounterparty: -4,
  notAuthorized: -5,
  exceedsMaxIssuanceAmount: -6,
  receiverFullLine: -7,
  invalidExternalDetail: -8,
  feeExceedsAmount: -9,
  requiresKyc: -10,
  requiresVerification: -11,
  issuanceTasksNotFound: -12,
  systemTasksNotAllowed: -13,
  invalidAmountPrecision: -14,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   	{
//   	case EMPTY_VERSION:
//   		void;
//   	}
//
// ===========================================================================
xdr.union("CreateIssuanceRequestSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateIssuanceRequestSuccess {
//   	uint64 requestID;
//   	AccountID receiver;
//   	bool fulfilled;
//   	Fee fee;
//   	union switch (LedgerVersion v)
//   	{
//   	case EMPTY_VERSION:
//   		void;
//   	}
//   	ext;
//   };
//
// ===========================================================================
xdr.struct("CreateIssuanceRequestSuccess", [
  ["requestId", xdr.lookup("Uint64")],
  ["receiver", xdr.lookup("AccountId")],
  ["fulfilled", xdr.bool()],
  ["fee", xdr.lookup("Fee")],
  ["ext", xdr.lookup("CreateIssuanceRequestSuccessExt")],
]);

// === xdr source ============================================================
//
//   union CreateIssuanceRequestResult switch (CreateIssuanceRequestResultCode code)
//   {
//   case SUCCESS:
//       CreateIssuanceRequestSuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("CreateIssuanceRequestResult", {
  switchOn: xdr.lookup("CreateIssuanceRequestResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("CreateIssuanceRequestSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   enum ManageInvoiceRequestAction
//   {
//       CREATE = 0,
//       REMOVE = 1
//   };
//
// ===========================================================================
xdr.enum("ManageInvoiceRequestAction", {
  create: 0,
  remove: 1,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("InvoiceCreationRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct InvoiceCreationRequest
//   {
//       AssetCode asset;
//       AccountID sender;
//       uint64 amount; // not allowed to set 0
//   
//       uint64 *contractID;
//       longstring details;
//   
//       uint32* allTasks;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("InvoiceCreationRequest", [
  ["asset", xdr.lookup("AssetCode")],
  ["sender", xdr.lookup("AccountId")],
  ["amount", xdr.lookup("Uint64")],
  ["contractId", xdr.option(xdr.lookup("Uint64"))],
  ["details", xdr.lookup("Longstring")],
  ["allTasks", xdr.option(xdr.lookup("Uint32"))],
  ["ext", xdr.lookup("InvoiceCreationRequestExt")],
]);

// === xdr source ============================================================
//
//   union switch (ManageInvoiceRequestAction action){
//       case CREATE:
//           InvoiceCreationRequest invoiceRequest;
//       case REMOVE:
//           uint64 requestID;
//       }
//
// ===========================================================================
xdr.union("ManageInvoiceRequestOpDetails", {
  switchOn: xdr.lookup("ManageInvoiceRequestAction"),
  switchName: "action",
  switches: [
    ["create", "invoiceRequest"],
    ["remove", "requestId"],
  ],
  arms: {
    invoiceRequest: xdr.lookup("InvoiceCreationRequest"),
    requestId: xdr.lookup("Uint64"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageInvoiceRequestOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageInvoiceRequestOp
//   {
//       union switch (ManageInvoiceRequestAction action){
//       case CREATE:
//           InvoiceCreationRequest invoiceRequest;
//       case REMOVE:
//           uint64 requestID;
//       } details;
//   
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageInvoiceRequestOp", [
  ["details", xdr.lookup("ManageInvoiceRequestOpDetails")],
  ["ext", xdr.lookup("ManageInvoiceRequestOpExt")],
]);

// === xdr source ============================================================
//
//   enum ManageInvoiceRequestResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       MALFORMED = -1,
//       BALANCE_NOT_FOUND = -2, // sender balance not found
//       NOT_FOUND = -3, // not found invoice request, when try to remove
//       TOO_MANY_INVOICES = -4,
//       DETAILS_TOO_LONG = -5,
//       NOT_ALLOWED_TO_REMOVE = -6, // only invoice creator can remove invoice
//       CONTRACT_NOT_FOUND = -7,
//       ONLY_CONTRACTOR_CAN_ATTACH_INVOICE_TO_CONTRACT = -8,
//       SENDER_ACCOUNT_MISMATCHED = -9,
//       INVOICE_IS_APPROVED = -10, // not allowed to remove approved invoice
//       INVOICE_TASKS_NOT_FOUND = -11
//   };
//
// ===========================================================================
xdr.enum("ManageInvoiceRequestResultCode", {
  success: 0,
  malformed: -1,
  balanceNotFound: -2,
  notFound: -3,
  tooManyInvoice: -4,
  detailsTooLong: -5,
  notAllowedToRemove: -6,
  contractNotFound: -7,
  onlyContractorCanAttachInvoiceToContract: -8,
  senderAccountMismatched: -9,
  invoiceIsApproved: -10,
  invoiceTasksNotFound: -11,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreateInvoiceRequestResponseExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateInvoiceRequestResponse
//   {
//   	BalanceID receiverBalance;
//   	BalanceID senderBalance;
//   
//   	uint64 requestID;
//   
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CreateInvoiceRequestResponse", [
  ["receiverBalance", xdr.lookup("BalanceId")],
  ["senderBalance", xdr.lookup("BalanceId")],
  ["requestId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("CreateInvoiceRequestResponseExt")],
]);

// === xdr source ============================================================
//
//   union switch (ManageInvoiceRequestAction action)
//           {
//           case CREATE:
//               CreateInvoiceRequestResponse response;
//           case REMOVE:
//               void;
//           }
//
// ===========================================================================
xdr.union("ManageInvoiceRequestResultSuccessDetails", {
  switchOn: xdr.lookup("ManageInvoiceRequestAction"),
  switchName: "action",
  switches: [
    ["create", "response"],
    ["remove", xdr.void()],
  ],
  arms: {
    response: xdr.lookup("CreateInvoiceRequestResponse"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//
// ===========================================================================
xdr.union("ManageInvoiceRequestResultSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct
//       {
//           bool fulfilled;
//           union switch (ManageInvoiceRequestAction action)
//           {
//           case CREATE:
//               CreateInvoiceRequestResponse response;
//           case REMOVE:
//               void;
//           } details;
//   
//           // reserved for future use
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           } ext;
//       }
//
// ===========================================================================
xdr.struct("ManageInvoiceRequestResultSuccess", [
  ["fulfilled", xdr.bool()],
  ["details", xdr.lookup("ManageInvoiceRequestResultSuccessDetails")],
  ["ext", xdr.lookup("ManageInvoiceRequestResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   union ManageInvoiceRequestResult switch (ManageInvoiceRequestResultCode code)
//   {
//   case SUCCESS:
//       struct
//       {
//           bool fulfilled;
//           union switch (ManageInvoiceRequestAction action)
//           {
//           case CREATE:
//               CreateInvoiceRequestResponse response;
//           case REMOVE:
//               void;
//           } details;
//   
//           // reserved for future use
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           } ext;
//       } success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ManageInvoiceRequestResult", {
  switchOn: xdr.lookup("ManageInvoiceRequestResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("ManageInvoiceRequestResultSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   enum ErrorCode
//   {
//       MISC = 0, // Unspecific error
//       DATA = 1, // Malformed data
//       CONF = 2, // Misconfiguration error
//       AUTH = 3, // Authentication failure
//       LOAD = 4  // System overloaded
//   };
//
// ===========================================================================
xdr.enum("ErrorCode", {
  misc: 0,
  datum: 1,
  conf: 2,
  auth: 3,
  load: 4,
});

// === xdr source ============================================================
//
//   struct Error
//   {
//       ErrorCode code;
//       string msg<100>;
//   };
//
// ===========================================================================
xdr.struct("Error", [
  ["code", xdr.lookup("ErrorCode")],
  ["msg", xdr.string(100)],
]);

// === xdr source ============================================================
//
//   struct AuthCert
//   {
//       Curve25519Public pubkey;
//       uint64 expiration;
//       Signature sig;
//   };
//
// ===========================================================================
xdr.struct("AuthCert", [
  ["pubkey", xdr.lookup("Curve25519Public")],
  ["expiration", xdr.lookup("Uint64")],
  ["sig", xdr.lookup("Signature")],
]);

// === xdr source ============================================================
//
//   struct Hello
//   {
//       uint32 ledgerVersion;
//       uint32 overlayVersion;
//       uint32 overlayMinVersion;
//       Hash networkID;
//       string versionStr<100>;
//       int listeningPort;
//       NodeID peerID;
//       AuthCert cert;
//       uint256 nonce;
//   };
//
// ===========================================================================
xdr.struct("Hello", [
  ["ledgerVersion", xdr.lookup("Uint32")],
  ["overlayVersion", xdr.lookup("Uint32")],
  ["overlayMinVersion", xdr.lookup("Uint32")],
  ["networkId", xdr.lookup("Hash")],
  ["versionStr", xdr.string(100)],
  ["listeningPort", xdr.int()],
  ["peerId", xdr.lookup("NodeId")],
  ["cert", xdr.lookup("AuthCert")],
  ["nonce", xdr.lookup("Uint256")],
]);

// === xdr source ============================================================
//
//   struct Auth
//   {
//       // Empty message, just to confirm
//       // establishment of MAC keys.
//       int unused;
//   };
//
// ===========================================================================
xdr.struct("Auth", [
  ["unused", xdr.int()],
]);

// === xdr source ============================================================
//
//   enum IPAddrType
//   {
//       IPv4 = 0,
//       IPv6 = 1
//   };
//
// ===========================================================================
xdr.enum("IpAddrType", {
  iPv4: 0,
  iPv6: 1,
});

// === xdr source ============================================================
//
//   union switch (IPAddrType type)
//       {
//       case IPv4:
//           opaque ipv4[4];
//       case IPv6:
//           opaque ipv6[16];
//       }
//
// ===========================================================================
xdr.union("PeerAddressIp", {
  switchOn: xdr.lookup("IpAddrType"),
  switchName: "type",
  switches: [
    ["iPv4", "ipv4"],
    ["iPv6", "ipv6"],
  ],
  arms: {
    ipv4: xdr.opaque(4),
    ipv6: xdr.opaque(16),
  },
});

// === xdr source ============================================================
//
//   struct PeerAddress
//   {
//       union switch (IPAddrType type)
//       {
//       case IPv4:
//           opaque ipv4[4];
//       case IPv6:
//           opaque ipv6[16];
//       }
//       ip;
//       uint32 port;
//       uint32 numFailures;
//   };
//
// ===========================================================================
xdr.struct("PeerAddress", [
  ["ip", xdr.lookup("PeerAddressIp")],
  ["port", xdr.lookup("Uint32")],
  ["numFailures", xdr.lookup("Uint32")],
]);

// === xdr source ============================================================
//
//   enum MessageType
//   {
//       ERROR_MSG = 0,
//       AUTH = 2,
//       DONT_HAVE = 3,
//   
//       GET_PEERS = 4, // gets a list of peers this guy knows about
//       PEERS = 5,
//   
//       GET_TX_SET = 6, // gets a particular txset by hash
//       TX_SET = 7,
//   
//       TRANSACTION = 8, // pass on a tx you have heard about
//   
//       // SCP
//       GET_SCP_QUORUMSET = 9,
//       SCP_QUORUMSET = 10,
//       SCP_MESSAGE = 11,
//       GET_SCP_STATE = 12,
//   
//       // new messages
//       HELLO = 13
//   };
//
// ===========================================================================
xdr.enum("MessageType", {
  errorMsg: 0,
  auth: 2,
  dontHave: 3,
  getPeer: 4,
  peer: 5,
  getTxSet: 6,
  txSet: 7,
  transaction: 8,
  getScpQuorumset: 9,
  scpQuorumset: 10,
  scpMessage: 11,
  getScpState: 12,
  hello: 13,
});

// === xdr source ============================================================
//
//   struct DontHave
//   {
//       MessageType type;
//       uint256 reqHash;
//   };
//
// ===========================================================================
xdr.struct("DontHave", [
  ["type", xdr.lookup("MessageType")],
  ["reqHash", xdr.lookup("Uint256")],
]);

// === xdr source ============================================================
//
//   union StellarMessage switch (MessageType type)
//   {
//   case ERROR_MSG:
//       Error error;
//   case HELLO:
//       Hello hello;
//   case AUTH:
//       Auth auth;
//   case DONT_HAVE:
//       DontHave dontHave;
//   case GET_PEERS:
//       void;
//   case PEERS:
//       PeerAddress peers<>;
//   
//   case GET_TX_SET:
//       uint256 txSetHash;
//   case TX_SET:
//       TransactionSet txSet;
//   
//   case TRANSACTION:
//       TransactionEnvelope transaction;
//   
//   // SCP
//   case GET_SCP_QUORUMSET:
//       uint256 qSetHash;
//   case SCP_QUORUMSET:
//       SCPQuorumSet qSet;
//   case SCP_MESSAGE:
//       SCPEnvelope envelope;
//   case GET_SCP_STATE:
//       uint32 getSCPLedgerSeq; // ledger seq requested ; if 0, requests the latest
//   };
//
// ===========================================================================
xdr.union("StellarMessage", {
  switchOn: xdr.lookup("MessageType"),
  switchName: "type",
  switches: [
    ["errorMsg", "error"],
    ["hello", "hello"],
    ["auth", "auth"],
    ["dontHave", "dontHave"],
    ["getPeer", xdr.void()],
    ["peer", "peers"],
    ["getTxSet", "txSetHash"],
    ["txSet", "txSet"],
    ["transaction", "transaction"],
    ["getScpQuorumset", "qSetHash"],
    ["scpQuorumset", "qSet"],
    ["scpMessage", "envelope"],
    ["getScpState", "getScpLedgerSeq"],
  ],
  arms: {
    error: xdr.lookup("Error"),
    hello: xdr.lookup("Hello"),
    auth: xdr.lookup("Auth"),
    dontHave: xdr.lookup("DontHave"),
    peers: xdr.varArray(xdr.lookup("PeerAddress"), 2147483647),
    txSetHash: xdr.lookup("Uint256"),
    txSet: xdr.lookup("TransactionSet"),
    transaction: xdr.lookup("TransactionEnvelope"),
    qSetHash: xdr.lookup("Uint256"),
    qSet: xdr.lookup("ScpQuorumSet"),
    envelope: xdr.lookup("ScpEnvelope"),
    getScpLedgerSeq: xdr.lookup("Uint32"),
  },
});

// === xdr source ============================================================
//
//   struct
//   {
//      uint64 sequence;
//      StellarMessage message;
//      HmacSha256Mac mac;
//       }
//
// ===========================================================================
xdr.struct("AuthenticatedMessageV0", [
  ["sequence", xdr.lookup("Uint64")],
  ["message", xdr.lookup("StellarMessage")],
  ["mac", xdr.lookup("HmacSha256Mac")],
]);

// === xdr source ============================================================
//
//   union AuthenticatedMessage switch (LedgerVersion v)
//   {
//   case EMPTY_VERSION:
//       struct
//   {
//      uint64 sequence;
//      StellarMessage message;
//      HmacSha256Mac mac;
//       } v0;
//   };
//
// ===========================================================================
xdr.union("AuthenticatedMessage", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", "v0"],
  ],
  arms: {
    v0: xdr.lookup("AuthenticatedMessageV0"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("SetFeesOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct SetFeesOp
//       {
//           FeeEntry* fee;
//   		bool isDelete;
//   		// reserved for future use
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       };
//
// ===========================================================================
xdr.struct("SetFeesOp", [
  ["fee", xdr.option(xdr.lookup("FeeEntry"))],
  ["isDelete", xdr.bool()],
  ["ext", xdr.lookup("SetFeesOpExt")],
]);

// === xdr source ============================================================
//
//   enum SetFeesResultCode
//       {
//           // codes considered as "success" for the operation
//           SUCCESS = 0,
//           
//           // codes considered as "failure" for the operation
//           INVALID_AMOUNT = -1,      // amount is negative
//   		INVALID_FEE_TYPE = -2,     // operation type is invalid
//           ASSET_NOT_FOUND = -3,
//           INVALID_ASSET = -4,
//           MALFORMED = -5,
//   		MALFORMED_RANGE = -6,
//   		RANGE_OVERLAP = -7,
//   		NOT_FOUND = -8,
//   		SUB_TYPE_NOT_EXIST = -9,
//   		INVALID_FEE_VERSION = -10, // version of fee entry is greater than ledger version
//   		INVALID_FEE_ASSET = -11,
//   		FEE_ASSET_NOT_ALLOWED = -12, // feeAsset can be set only if feeType is PAYMENT
//   		CROSS_ASSET_FEE_NOT_ALLOWED = -13, // feeAsset on payment fee type can differ from asset only if payment fee subtype is OUTGOING
//   		FEE_ASSET_NOT_FOUND = -14,
//   		ASSET_PAIR_NOT_FOUND = -15, // cannot create cross asset fee entry without existing asset pair
//   		INVALID_ASSET_PAIR_PRICE = -16,
//   		INVALID_FEE_HASH = -17
//       };
//
// ===========================================================================
xdr.enum("SetFeesResultCode", {
  success: 0,
  invalidAmount: -1,
  invalidFeeType: -2,
  assetNotFound: -3,
  invalidAsset: -4,
  malformed: -5,
  malformedRange: -6,
  rangeOverlap: -7,
  notFound: -8,
  subTypeNotExist: -9,
  invalidFeeVersion: -10,
  invalidFeeAsset: -11,
  feeAssetNotAllowed: -12,
  crossAssetFeeNotAllowed: -13,
  feeAssetNotFound: -14,
  assetPairNotFound: -15,
  invalidAssetPairPrice: -16,
  invalidFeeHash: -17,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   				{
//   				case EMPTY_VERSION:
//   					void;
//   				}
//
// ===========================================================================
xdr.union("SetFeesResultSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//   				// reserved for future use
//   				union switch (LedgerVersion v)
//   				{
//   				case EMPTY_VERSION:
//   					void;
//   				}
//   				ext;
//   			}
//
// ===========================================================================
xdr.struct("SetFeesResultSuccess", [
  ["ext", xdr.lookup("SetFeesResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   union SetFeesResult switch (SetFeesResultCode code)
//       {
//           case SUCCESS:
//               struct {
//   				// reserved for future use
//   				union switch (LedgerVersion v)
//   				{
//   				case EMPTY_VERSION:
//   					void;
//   				}
//   				ext;
//   			} success;
//           default:
//               void;
//       };
//
// ===========================================================================
xdr.union("SetFeesResult", {
  switchOn: xdr.lookup("SetFeesResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("SetFeesResultSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CancelSaleCreationRequestOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CancelSaleCreationRequestOp
//   {
//       uint64 requestID;
//   
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   
//   };
//
// ===========================================================================
xdr.struct("CancelSaleCreationRequestOp", [
  ["requestId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("CancelSaleCreationRequestOpExt")],
]);

// === xdr source ============================================================
//
//   enum CancelSaleCreationRequestResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       REQUEST_ID_INVALID = -1, // request id can not be equal zero
//       REQUEST_NOT_FOUND = -2 // trying to cancel not existing reviewable request
//   };
//
// ===========================================================================
xdr.enum("CancelSaleCreationRequestResultCode", {
  success: 0,
  requestIdInvalid: -1,
  requestNotFound: -2,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CancelSaleCreationSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CancelSaleCreationSuccess {
//   
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CancelSaleCreationSuccess", [
  ["ext", xdr.lookup("CancelSaleCreationSuccessExt")],
]);

// === xdr source ============================================================
//
//   union CancelSaleCreationRequestResult switch (CancelSaleCreationRequestResultCode code)
//   {
//       case SUCCESS:
//           CancelSaleCreationSuccess success;
//       default:
//           void;
//   };
//
// ===========================================================================
xdr.union("CancelSaleCreationRequestResult", {
  switchOn: xdr.lookup("CancelSaleCreationRequestResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("CancelSaleCreationSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("SignerRuleEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct SignerRuleEntry
//   {
//       uint64 id;
//   
//       SignerRuleResource resource;
//       SignerRuleAction action;
//   
//       bool isForbid;
//       bool isDefault; // default rules will be in each role
//   
//       longstring details;
//   
//       AccountID ownerID;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("SignerRuleEntry", [
  ["id", xdr.lookup("Uint64")],
  ["resource", xdr.lookup("SignerRuleResource")],
  ["action", xdr.lookup("SignerRuleAction")],
  ["isForbid", xdr.bool()],
  ["isDefault", xdr.bool()],
  ["details", xdr.lookup("Longstring")],
  ["ownerId", xdr.lookup("AccountId")],
  ["ext", xdr.lookup("SignerRuleEntryExt")],
]);

// === xdr source ============================================================
//
//   enum FeeType
//   {
//       PAYMENT_FEE = 0,
//   	OFFER_FEE = 1,
//       WITHDRAWAL_FEE = 2,
//       ISSUANCE_FEE = 3,
//       INVEST_FEE = 4, // fee to be taken while creating sale participation
//       CAPITAL_DEPLOYMENT_FEE = 5, // fee to be taken when sale close
//       OPERATION_FEE = 6,
//       PAYOUT_FEE = 7,
//       ATOMIC_SWAP_SALE_FEE = 8,
//       ATOMIC_SWAP_PURCHASE_FEE = 9
//   };
//
// ===========================================================================
xdr.enum("FeeType", {
  paymentFee: 0,
  offerFee: 1,
  withdrawalFee: 2,
  issuanceFee: 3,
  investFee: 4,
  capitalDeploymentFee: 5,
  operationFee: 6,
  payoutFee: 7,
  atomicSwapSaleFee: 8,
  atomicSwapPurchaseFee: 9,
});

// === xdr source ============================================================
//
//   enum EmissionFeeType
//   {
//   	PRIMARY_MARKET = 1,
//   	SECONDARY_MARKET = 2
//   };
//
// ===========================================================================
xdr.enum("EmissionFeeType", {
  primaryMarket: 1,
  secondaryMarket: 2,
});

// === xdr source ============================================================
//
//   enum PaymentFeeType
//   {
//       OUTGOING = 1,
//       INCOMING = 2
//   };
//
// ===========================================================================
xdr.enum("PaymentFeeType", {
  outgoing: 1,
  incoming: 2,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("FeeEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct FeeEntry
//   {
//       FeeType feeType;
//       AssetCode asset;
//   
//       int64 fixedFee; // fee paid for operation
//   	int64 percentFee; // percent of transfer amount to be charged
//   
//       AccountID* accountID;
//       uint64*    accountRole;
//       int64 subtype; // for example, different withdrawals — bars or coins
//   
//       int64 lowerBound;
//       int64 upperBound;
//   
//       Hash hash;
//   
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("FeeEntry", [
  ["feeType", xdr.lookup("FeeType")],
  ["asset", xdr.lookup("AssetCode")],
  ["fixedFee", xdr.lookup("Int64")],
  ["percentFee", xdr.lookup("Int64")],
  ["accountId", xdr.option(xdr.lookup("AccountId"))],
  ["accountRole", xdr.option(xdr.lookup("Uint64"))],
  ["subtype", xdr.lookup("Int64")],
  ["lowerBound", xdr.lookup("Int64")],
  ["upperBound", xdr.lookup("Int64")],
  ["hash", xdr.lookup("Hash")],
  ["ext", xdr.lookup("FeeEntryExt")],
]);

// === xdr source ============================================================
//
//   enum ManageAccountRuleAction
//   {
//       CREATE = 0,
//       UPDATE = 1,
//       REMOVE = 2
//   };
//
// ===========================================================================
xdr.enum("ManageAccountRuleAction", {
  create: 0,
  update: 1,
  remove: 2,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreateAccountRuleDataExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateAccountRuleData
//   {
//       AccountRuleResource resource;
//       AccountRuleAction action;
//       bool isForbid;
//       longstring details;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("CreateAccountRuleData", [
  ["resource", xdr.lookup("AccountRuleResource")],
  ["action", xdr.lookup("AccountRuleAction")],
  ["isForbid", xdr.bool()],
  ["details", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("CreateAccountRuleDataExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("UpdateAccountRuleDataExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct UpdateAccountRuleData
//   {
//       uint64 accountRuleID;
//       AccountRuleResource resource;
//       AccountRuleAction action;
//       bool isForbid;
//       longstring details;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("UpdateAccountRuleData", [
  ["accountRuleId", xdr.lookup("Uint64")],
  ["resource", xdr.lookup("AccountRuleResource")],
  ["action", xdr.lookup("AccountRuleAction")],
  ["isForbid", xdr.bool()],
  ["details", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("UpdateAccountRuleDataExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("RemoveAccountRuleDataExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct RemoveAccountRuleData
//   {
//       uint64 accountRuleID;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("RemoveAccountRuleData", [
  ["accountRuleId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("RemoveAccountRuleDataExt")],
]);

// === xdr source ============================================================
//
//   union switch (ManageAccountRuleAction action)
//       {
//       case CREATE:
//           CreateAccountRuleData createData;
//       case UPDATE:
//           UpdateAccountRuleData updateData;
//       case REMOVE:
//           RemoveAccountRuleData removeData;
//       }
//
// ===========================================================================
xdr.union("ManageAccountRuleOpData", {
  switchOn: xdr.lookup("ManageAccountRuleAction"),
  switchName: "action",
  switches: [
    ["create", "createData"],
    ["update", "updateData"],
    ["remove", "removeData"],
  ],
  arms: {
    createData: xdr.lookup("CreateAccountRuleData"),
    updateData: xdr.lookup("UpdateAccountRuleData"),
    removeData: xdr.lookup("RemoveAccountRuleData"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageAccountRuleOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageAccountRuleOp
//   {
//       union switch (ManageAccountRuleAction action)
//       {
//       case CREATE:
//           CreateAccountRuleData createData;
//       case UPDATE:
//           UpdateAccountRuleData updateData;
//       case REMOVE:
//           RemoveAccountRuleData removeData;
//       } data;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageAccountRuleOp", [
  ["data", xdr.lookup("ManageAccountRuleOpData")],
  ["ext", xdr.lookup("ManageAccountRuleOpExt")],
]);

// === xdr source ============================================================
//
//   enum ManageAccountRuleResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       NOT_FOUND = -1,
//       RULE_IS_USED = -2,
//       INVALID_DETAILS = -3
//   };
//
// ===========================================================================
xdr.enum("ManageAccountRuleResultCode", {
  success: 0,
  notFound: -1,
  ruleIsUsed: -2,
  invalidDetail: -3,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//               {
//               case EMPTY_VERSION:
//                   void;
//               }
//
// ===========================================================================
xdr.union("ManageAccountRuleResultSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//               uint64 ruleID;
//   
//               // reserved for future use
//               union switch (LedgerVersion v)
//               {
//               case EMPTY_VERSION:
//                   void;
//               }
//               ext;
//           }
//
// ===========================================================================
xdr.struct("ManageAccountRuleResultSuccess", [
  ["ruleId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("ManageAccountRuleResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   union ManageAccountRuleResult switch (ManageAccountRuleResultCode code)
//   {
//       case SUCCESS:
//           struct {
//               uint64 ruleID;
//   
//               // reserved for future use
//               union switch (LedgerVersion v)
//               {
//               case EMPTY_VERSION:
//                   void;
//               }
//               ext;
//           } success;
//       case RULE_IS_USED:
//           uint64 roleIDs<>;
//       default:
//           void;
//   };
//
// ===========================================================================
xdr.union("ManageAccountRuleResult", {
  switchOn: xdr.lookup("ManageAccountRuleResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
    ["ruleIsUsed", "roleIDs"],
  ],
  arms: {
    success: xdr.lookup("ManageAccountRuleResultSuccess"),
    roleIDs: xdr.varArray(xdr.lookup("Uint64"), 2147483647),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("StatisticsEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct StatisticsEntry
//   {
//   	AccountID accountID;
//   
//   	uint64 dailyOutcome;
//   	uint64 weeklyOutcome;
//   	uint64 monthlyOutcome;
//   	uint64 annualOutcome;
//   
//   	int64 updatedAt;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("StatisticsEntry", [
  ["accountId", xdr.lookup("AccountId")],
  ["dailyOutcome", xdr.lookup("Uint64")],
  ["weeklyOutcome", xdr.lookup("Uint64")],
  ["monthlyOutcome", xdr.lookup("Uint64")],
  ["annualOutcome", xdr.lookup("Uint64")],
  ["updatedAt", xdr.lookup("Int64")],
  ["ext", xdr.lookup("StatisticsEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//          void;
//       }
//
// ===========================================================================
xdr.union("ExternalSystemAccountIdPoolEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ExternalSystemAccountIDPoolEntry
//   {
//       uint64 poolEntryID;
//       int32 externalSystemType;
//       longstring data;
//       AccountID* accountID;
//       uint64 expiresAt;
//       uint64 bindedAt;
//       uint64 parent;
//       bool isDeleted;
//   
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//          void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ExternalSystemAccountIdPoolEntry", [
  ["poolEntryId", xdr.lookup("Uint64")],
  ["externalSystemType", xdr.lookup("Int32")],
  ["data", xdr.lookup("Longstring")],
  ["accountId", xdr.option(xdr.lookup("AccountId"))],
  ["expiresAt", xdr.lookup("Uint64")],
  ["bindedAt", xdr.lookup("Uint64")],
  ["parent", xdr.lookup("Uint64")],
  ["isDeleted", xdr.bool()],
  ["ext", xdr.lookup("ExternalSystemAccountIdPoolEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ASwapBidCreationRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ASwapBidCreationRequest
//   {
//       BalanceID baseBalance;
//       uint64 amount;
//       longstring creatorDetails; // details set by requester
//   
//       ASwapBidQuoteAsset quoteAssets<>;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("ASwapBidCreationRequest", [
  ["baseBalance", xdr.lookup("BalanceId")],
  ["amount", xdr.lookup("Uint64")],
  ["creatorDetails", xdr.lookup("Longstring")],
  ["quoteAssets", xdr.varArray(xdr.lookup("ASwapBidQuoteAsset"), 2147483647)],
  ["ext", xdr.lookup("ASwapBidCreationRequestExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("AccountKycEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct AccountKYCEntry
//   {
//       AccountID accountID;
//       longstring KYCData;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("AccountKycEntry", [
  ["accountId", xdr.lookup("AccountId")],
  ["kycData", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("AccountKycEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreateWithdrawalRequestOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateWithdrawalRequestOp
//   {
//   	WithdrawalRequest request;
//   
//   	uint32* allTasks;
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   
//   };
//
// ===========================================================================
xdr.struct("CreateWithdrawalRequestOp", [
  ["request", xdr.lookup("WithdrawalRequest")],
  ["allTasks", xdr.option(xdr.lookup("Uint32"))],
  ["ext", xdr.lookup("CreateWithdrawalRequestOpExt")],
]);

// === xdr source ============================================================
//
//   enum CreateWithdrawalRequestResultCode
//   {
//   	// codes considered as "success" for the operation
//   	SUCCESS = 0,
//   
//   	// codes considered as "failure" for the operation
//   	INVALID_AMOUNT = -1, // amount is 0
//   	INVALID_EXTERNAL_DETAILS = -2, // external details size exceeds max allowed
//   	BALANCE_NOT_FOUND = -3, // balance not found
//   	ASSET_IS_NOT_WITHDRAWABLE = -4, // asset is not withdrawable
//   	CONVERSION_PRICE_IS_NOT_AVAILABLE = -5, // failed to find conversion price - conversion is not allowed
//   	FEE_MISMATCHED = -6, // expected fee does not match calculated fee
//   	CONVERSION_OVERFLOW = -7, // overflow during converting source asset to dest asset
//   	CONVERTED_AMOUNT_MISMATCHED = -8, // expected converted amount passed by user, does not match calculated
//   	BALANCE_LOCK_OVERFLOW = -9, // overflow while tried to lock amount
//   	UNDERFUNDED = -10, // insufficient balance to perform operation
//   	INVALID_UNIVERSAL_AMOUNT = -11, // non-zero universal amount
//   	STATS_OVERFLOW = -12, // statistics overflowed by the operation
//   	LIMITS_EXCEEDED = -13, // withdraw exceeds limits for source account
//   	INVALID_PRE_CONFIRMATION_DETAILS = -14, // it's not allowed to pass pre confirmation details
//   	LOWER_BOUND_NOT_EXCEEDED = -15, //amount to withdraw is too small 
//       WITHDRAWAL_TASKS_NOT_FOUND = -16,
//   	NOT_ALLOWED_TO_SET_WITHDRAWAL_TASKS = -17, //Can't set withdrawal tasks on request creation
//   	WITHDRAWAL_ZERO_TASKS_NOT_ALLOWED = -18
//   };
//
// ===========================================================================
xdr.enum("CreateWithdrawalRequestResultCode", {
  success: 0,
  invalidAmount: -1,
  invalidExternalDetail: -2,
  balanceNotFound: -3,
  assetIsNotWithdrawable: -4,
  conversionPriceIsNotAvailable: -5,
  feeMismatched: -6,
  conversionOverflow: -7,
  convertedAmountMismatched: -8,
  balanceLockOverflow: -9,
  underfunded: -10,
  invalidUniversalAmount: -11,
  statsOverflow: -12,
  limitsExceeded: -13,
  invalidPreConfirmationDetail: -14,
  lowerBoundNotExceeded: -15,
  withdrawalTasksNotFound: -16,
  notAllowedToSetWithdrawalTask: -17,
  withdrawalZeroTasksNotAllowed: -18,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   	{
//   	case EMPTY_VERSION:
//   		void;
//   	}
//
// ===========================================================================
xdr.union("CreateWithdrawalSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateWithdrawalSuccess {
//   	uint64 requestID;
//   
//      bool fulfilled;
//   	union switch (LedgerVersion v)
//   	{
//   	case EMPTY_VERSION:
//   		void;
//   	}
//   	ext;
//   };
//
// ===========================================================================
xdr.struct("CreateWithdrawalSuccess", [
  ["requestId", xdr.lookup("Uint64")],
  ["fulfilled", xdr.bool()],
  ["ext", xdr.lookup("CreateWithdrawalSuccessExt")],
]);

// === xdr source ============================================================
//
//   union CreateWithdrawalRequestResult switch (CreateWithdrawalRequestResultCode code)
//   {
//   	case SUCCESS:
//   		CreateWithdrawalSuccess success;
//   	default:
//   		void;
//   };
//
// ===========================================================================
xdr.union("CreateWithdrawalRequestResult", {
  switchOn: xdr.lookup("CreateWithdrawalRequestResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("CreateWithdrawalSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   enum ManageBalanceAction
//   {
//       CREATE = 0,
//       DELETE_BALANCE = 1,
//   	CREATE_UNIQUE = 2 // ensures that balance will not be created if one for such asset and account exists
//   };
//
// ===========================================================================
xdr.enum("ManageBalanceAction", {
  create: 0,
  deleteBalance: 1,
  createUnique: 2,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageBalanceOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageBalanceOp
//   {
//       ManageBalanceAction action;
//       AccountID destination;
//       AssetCode asset;
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageBalanceOp", [
  ["action", xdr.lookup("ManageBalanceAction")],
  ["destination", xdr.lookup("AccountId")],
  ["asset", xdr.lookup("AssetCode")],
  ["ext", xdr.lookup("ManageBalanceOpExt")],
]);

// === xdr source ============================================================
//
//   enum ManageBalanceResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       MALFORMED = -1,       // invalid destination
//       NOT_FOUND = -2,
//       DESTINATION_NOT_FOUND = -3,
//       ASSET_NOT_FOUND = -4,
//       INVALID_ASSET = -5,
//   	BALANCE_ALREADY_EXISTS = -6,
//   	VERSION_IS_NOT_SUPPORTED_YET = -7 // version specified in request is not supported yet
//   };
//
// ===========================================================================
xdr.enum("ManageBalanceResultCode", {
  success: 0,
  malformed: -1,
  notFound: -2,
  destinationNotFound: -3,
  assetNotFound: -4,
  invalidAsset: -5,
  balanceAlreadyExist: -6,
  versionIsNotSupportedYet: -7,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageBalanceSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageBalanceSuccess {
//   	BalanceID balanceID;
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageBalanceSuccess", [
  ["balanceId", xdr.lookup("BalanceId")],
  ["ext", xdr.lookup("ManageBalanceSuccessExt")],
]);

// === xdr source ============================================================
//
//   union ManageBalanceResult switch (ManageBalanceResultCode code)
//   {
//   case SUCCESS:
//       ManageBalanceSuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ManageBalanceResult", {
  switchOn: xdr.lookup("ManageBalanceResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("ManageBalanceSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreateASwapBidCreationRequestOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateASwapBidCreationRequestOp
//   {
//       ASwapBidCreationRequest request;
//   
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CreateASwapBidCreationRequestOp", [
  ["request", xdr.lookup("ASwapBidCreationRequest")],
  ["ext", xdr.lookup("CreateASwapBidCreationRequestOpExt")],
]);

// === xdr source ============================================================
//
//   enum CreateASwapBidCreationRequestResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       INVALID_AMOUNT = -1, // amount is equal to 0
//       INVALID_PRICE = -2, // price is equal to 0
//       INVALID_DETAILS = -3,
//       ATOMIC_SWAP_BID_OVERFLOW = -4,
//       BASE_ASSET_NOT_FOUND = -5, // base asset does not exist
//       BASE_ASSET_CANNOT_BE_SWAPPED = -6,
//       QUOTE_ASSET_NOT_FOUND = -7, // quote asset does not exist
//       QUOTE_ASSET_CANNOT_BE_SWAPPED = -8,
//       BASE_BALANCE_NOT_FOUND = -9,
//       ASSETS_ARE_EQUAL = -10, // base and quote assets are the same
//       BASE_BALANCE_UNDERFUNDED = -11,
//       INVALID_QUOTE_ASSET = -12, // one of the quote assets is invalid
//       NOT_ALLOWED_BY_ASSET_POLICY = -13
//   };
//
// ===========================================================================
xdr.enum("CreateASwapBidCreationRequestResultCode", {
  success: 0,
  invalidAmount: -1,
  invalidPrice: -2,
  invalidDetail: -3,
  atomicSwapBidOverflow: -4,
  baseAssetNotFound: -5,
  baseAssetCannotBeSwapped: -6,
  quoteAssetNotFound: -7,
  quoteAssetCannotBeSwapped: -8,
  baseBalanceNotFound: -9,
  assetsAreEqual: -10,
  baseBalanceUnderfunded: -11,
  invalidQuoteAsset: -12,
  notAllowedByAssetPolicy: -13,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreateASwapBidCreationRequestSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateASwapBidCreationRequestSuccess
//   {
//       uint64 requestID;
//       bool fulfilled;
//   
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("CreateASwapBidCreationRequestSuccess", [
  ["requestId", xdr.lookup("Uint64")],
  ["fulfilled", xdr.bool()],
  ["ext", xdr.lookup("CreateASwapBidCreationRequestSuccessExt")],
]);

// === xdr source ============================================================
//
//   union CreateASwapBidCreationRequestResult switch (CreateASwapBidCreationRequestResultCode code)
//   {
//   case SUCCESS:
//       CreateASwapBidCreationRequestSuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("CreateASwapBidCreationRequestResult", {
  switchOn: xdr.lookup("CreateASwapBidCreationRequestResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("CreateASwapBidCreationRequestSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   typedef opaque UpgradeType<128>;
//
// ===========================================================================
xdr.typedef("UpgradeType", xdr.varOpaque(128));

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("StellarValueExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct StellarValue
//   {
//       Hash txSetHash;   // transaction set to apply to previous ledger
//       uint64 closeTime; // network close time
//   
//       // upgrades to apply to the previous ledger (usually empty)
//       // this is a vector of encoded 'LedgerUpgrade' so that nodes can drop
//       // unknown steps during consensus if needed.
//       // see notes below on 'LedgerUpgrade' for more detail
//       // max size is dictated by number of upgrade types (+ room for future)
//       UpgradeType upgrades<6>;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("StellarValue", [
  ["txSetHash", xdr.lookup("Hash")],
  ["closeTime", xdr.lookup("Uint64")],
  ["upgrades", xdr.varArray(xdr.lookup("UpgradeType"), 6)],
  ["ext", xdr.lookup("StellarValueExt")],
]);

// === xdr source ============================================================
//
//   struct IdGenerator {
//   	LedgerEntryType entryType; // type of the entry, for which ids will be generated
//   	uint64 idPool; // last used entry specific ID, used for generating entry of specified type
//   };
//
// ===========================================================================
xdr.struct("IdGenerator", [
  ["entryType", xdr.lookup("LedgerEntryType")],
  ["idPool", xdr.lookup("Uint64")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("LedgerHeaderExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct LedgerHeader
//   {
//       uint32 ledgerVersion;    // the protocol version of the ledger
//       Hash previousLedgerHash; // hash of the previous ledger header
//       StellarValue scpValue;   // what consensus agreed to
//       Hash txSetResultHash;    // the TransactionResultSet that led to this ledger
//       Hash bucketListHash;     // hash of the ledger state
//   
//       uint32 ledgerSeq; // sequence number of this ledger
//   
//       IdGenerator idGenerators<>; // generators of ids
//   
//       uint32 baseFee;     // base fee per operation in stroops
//       uint32 baseReserve; // account base reserve in stroops
//   
//       uint32 maxTxSetSize; // maximum size a transaction set can be
//   
//       int64 txExpirationPeriod;
//       
//       Hash skipList[4]; // hashes of ledgers in the past. allows you to jump back
//                         // in time without walking the chain back ledger by ledger
//                         // each slot contains the oldest ledger that is mod of
//                         // either 50  5000  50000 or 500000 depending on index
//                         // skipList[0] mod(50), skipList[1] mod(5000), etc
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("LedgerHeader", [
  ["ledgerVersion", xdr.lookup("Uint32")],
  ["previousLedgerHash", xdr.lookup("Hash")],
  ["scpValue", xdr.lookup("StellarValue")],
  ["txSetResultHash", xdr.lookup("Hash")],
  ["bucketListHash", xdr.lookup("Hash")],
  ["ledgerSeq", xdr.lookup("Uint32")],
  ["idGenerators", xdr.varArray(xdr.lookup("IdGenerator"), 2147483647)],
  ["baseFee", xdr.lookup("Uint32")],
  ["baseReserve", xdr.lookup("Uint32")],
  ["maxTxSetSize", xdr.lookup("Uint32")],
  ["txExpirationPeriod", xdr.lookup("Int64")],
  ["skipList", xdr.array(xdr.lookup("Hash"), 4)],
  ["ext", xdr.lookup("LedgerHeaderExt")],
]);

// === xdr source ============================================================
//
//   enum LedgerUpgradeType
//   {
//       VERSION = 1,
//       MAX_TX_SET_SIZE = 2,
//       TX_EXPIRATION_PERIOD = 3
//   };
//
// ===========================================================================
xdr.enum("LedgerUpgradeType", {
  version: 1,
  maxTxSetSize: 2,
  txExpirationPeriod: 3,
});

// === xdr source ============================================================
//
//   union LedgerUpgrade switch (LedgerUpgradeType type)
//   {
//   case VERSION:
//       uint32 newLedgerVersion; // update ledgerVersion
//   case MAX_TX_SET_SIZE:
//       uint32 newMaxTxSetSize; // update maxTxSetSize
//   case TX_EXPIRATION_PERIOD:
//       int64 newTxExpirationPeriod;
//   };
//
// ===========================================================================
xdr.union("LedgerUpgrade", {
  switchOn: xdr.lookup("LedgerUpgradeType"),
  switchName: "type",
  switches: [
    ["version", "newLedgerVersion"],
    ["maxTxSetSize", "newMaxTxSetSize"],
    ["txExpirationPeriod", "newTxExpirationPeriod"],
  ],
  arms: {
    newLedgerVersion: xdr.lookup("Uint32"),
    newMaxTxSetSize: xdr.lookup("Uint32"),
    newTxExpirationPeriod: xdr.lookup("Int64"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("LedgerKeyAccountExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct
//       {
//           AccountID accountID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyAccount", [
  ["accountId", xdr.lookup("AccountId")],
  ["ext", xdr.lookup("LedgerKeyAccountExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//
// ===========================================================================
xdr.union("LedgerKeySignerExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct
//       {
//           PublicKey pubKey;
//           AccountID accountID;
//   
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeySigner", [
  ["pubKey", xdr.lookup("PublicKey")],
  ["accountId", xdr.lookup("AccountId")],
  ["ext", xdr.lookup("LedgerKeySignerExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("LedgerKeyFeeStateExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//           Hash hash;
//   		int64 lowerBound;
//   		int64 upperBound;
//   		 union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyFeeState", [
  ["hash", xdr.lookup("Hash")],
  ["lowerBound", xdr.lookup("Int64")],
  ["upperBound", xdr.lookup("Int64")],
  ["ext", xdr.lookup("LedgerKeyFeeStateExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("LedgerKeyBalanceExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct
//       {
//   		BalanceID balanceID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyBalance", [
  ["balanceId", xdr.lookup("BalanceId")],
  ["ext", xdr.lookup("LedgerKeyBalanceExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("LedgerKeyAssetExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct
//       {
//   		AssetCode code;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyAsset", [
  ["code", xdr.lookup("AssetCode")],
  ["ext", xdr.lookup("LedgerKeyAssetExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("LedgerKeyReferenceExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct
//       {
//   		AccountID sender;
//   		string64 reference;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyReference", [
  ["sender", xdr.lookup("AccountId")],
  ["reference", xdr.lookup("String64")],
  ["ext", xdr.lookup("LedgerKeyReferenceExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("LedgerKeyStatsExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//           AccountID accountID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyStats", [
  ["accountId", xdr.lookup("AccountId")],
  ["ext", xdr.lookup("LedgerKeyStatsExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("LedgerKeyAccountLimitsExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//           AccountID accountID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyAccountLimits", [
  ["accountId", xdr.lookup("AccountId")],
  ["ext", xdr.lookup("LedgerKeyAccountLimitsExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("LedgerKeyAssetPairExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//            AssetCode base;
//   		 AssetCode quote;
//   		 union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyAssetPair", [
  ["base", xdr.lookup("AssetCode")],
  ["quote", xdr.lookup("AssetCode")],
  ["ext", xdr.lookup("LedgerKeyAssetPairExt")],
]);

// === xdr source ============================================================
//
//   struct {
//   		uint64 offerID;
//   		AccountID ownerID;
//   	}
//
// ===========================================================================
xdr.struct("LedgerKeyOffer", [
  ["offerId", xdr.lookup("Uint64")],
  ["ownerId", xdr.lookup("AccountId")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("LedgerKeyReviewableRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//           uint64 requestID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyReviewableRequest", [
  ["requestId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("LedgerKeyReviewableRequestExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("LedgerKeyExternalSystemAccountIdExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//   		AccountID accountID;
//   		int32 externalSystemType;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	}
//
// ===========================================================================
xdr.struct("LedgerKeyExternalSystemAccountId", [
  ["accountId", xdr.lookup("AccountId")],
  ["externalSystemType", xdr.lookup("Int32")],
  ["ext", xdr.lookup("LedgerKeyExternalSystemAccountIdExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("LedgerKeySaleExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//   		uint64 saleID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	}
//
// ===========================================================================
xdr.struct("LedgerKeySale", [
  ["saleId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("LedgerKeySaleExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//           {
//           	case EMPTY_VERSION:
//           		void;
//           }
//
// ===========================================================================
xdr.union("LedgerKeyKeyValueExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//           longstring key;
//           union switch (LedgerVersion v)
//           {
//           	case EMPTY_VERSION:
//           		void;
//           }
//           ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyKeyValue", [
  ["key", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("LedgerKeyKeyValueExt")],
]);

// === xdr source ============================================================
//
//   union switch(LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//
// ===========================================================================
xdr.union("LedgerKeyAccountKycExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//           AccountID accountID;
//           union switch(LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyAccountKyc", [
  ["accountId", xdr.lookup("AccountId")],
  ["ext", xdr.lookup("LedgerKeyAccountKycExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("LedgerKeyExternalSystemAccountIdPoolEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//   		uint64 poolEntryID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	}
//
// ===========================================================================
xdr.struct("LedgerKeyExternalSystemAccountIdPoolEntry", [
  ["poolEntryId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("LedgerKeyExternalSystemAccountIdPoolEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//
// ===========================================================================
xdr.union("LedgerKeyLimitsV2Ext", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//           uint64 id;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           } ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyLimitsV2", [
  ["id", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("LedgerKeyLimitsV2Ext")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//
// ===========================================================================
xdr.union("LedgerKeyStatisticsV2Ext", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//           uint64 id;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyStatisticsV2", [
  ["id", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("LedgerKeyStatisticsV2Ext")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//
// ===========================================================================
xdr.union("LedgerKeyPendingStatisticsExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//           uint64 statisticsID;
//           uint64 requestID;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyPendingStatistics", [
  ["statisticsId", xdr.lookup("Uint64")],
  ["requestId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("LedgerKeyPendingStatisticsExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//
// ===========================================================================
xdr.union("LedgerKeyContractExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//           uint64 contractID;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyContract", [
  ["contractId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("LedgerKeyContractExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//
// ===========================================================================
xdr.union("LedgerKeyAtomicSwapBidExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//           uint64 bidID;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyAtomicSwapBid", [
  ["bidId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("LedgerKeyAtomicSwapBidExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//
// ===========================================================================
xdr.union("LedgerKeyAccountRoleExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//           uint64 id;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyAccountRole", [
  ["id", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("LedgerKeyAccountRoleExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//
// ===========================================================================
xdr.union("LedgerKeyAccountRuleExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//           uint64 id;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyAccountRule", [
  ["id", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("LedgerKeyAccountRuleExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//
// ===========================================================================
xdr.union("LedgerKeySignerRoleExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//           uint64 id;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeySignerRole", [
  ["id", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("LedgerKeySignerRoleExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//
// ===========================================================================
xdr.union("LedgerKeySignerRuleExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//           uint64 id;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeySignerRule", [
  ["id", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("LedgerKeySignerRuleExt")],
]);

// === xdr source ============================================================
//
//   union LedgerKey switch (LedgerEntryType type)
//   {
//   case ACCOUNT:
//       struct
//       {
//           AccountID accountID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       } account;
//   case SIGNER:
//       struct
//       {
//           PublicKey pubKey;
//           AccountID accountID;
//   
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       } signer;
//   case FEE:
//       struct {
//           Hash hash;
//   		int64 lowerBound;
//   		int64 upperBound;
//   		 union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       } feeState;
//   case BALANCE:
//       struct
//       {
//   		BalanceID balanceID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       } balance;
//   case ASSET:
//       struct
//       {
//   		AssetCode code;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       } asset;
//   case REFERENCE_ENTRY:
//       struct
//       {
//   		AccountID sender;
//   		string64 reference;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       } reference;
//   case STATISTICS:
//       struct {
//           AccountID accountID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       } stats;
//   case ACCOUNT_LIMITS:
//       struct {
//           AccountID accountID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       } accountLimits;
//   case ASSET_PAIR:
//   	struct {
//            AssetCode base;
//   		 AssetCode quote;
//   		 union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       } assetPair;
//   case OFFER_ENTRY:
//   	struct {
//   		uint64 offerID;
//   		AccountID ownerID;
//   	} offer;
//   case REVIEWABLE_REQUEST:
//       struct {
//           uint64 requestID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       } reviewableRequest;
//   case EXTERNAL_SYSTEM_ACCOUNT_ID:
//   	struct {
//   		AccountID accountID;
//   		int32 externalSystemType;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	} externalSystemAccountID;
//   case SALE:
//   	struct {
//   		uint64 saleID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	} sale;
//   case KEY_VALUE:
//       struct {
//           longstring key;
//           union switch (LedgerVersion v)
//           {
//           	case EMPTY_VERSION:
//           		void;
//           }
//           ext;
//       } keyValue;
//   case ACCOUNT_KYC:
//       struct {
//           AccountID accountID;
//           union switch(LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       } accountKYC;
//   case EXTERNAL_SYSTEM_ACCOUNT_ID_POOL_ENTRY:
//       struct {
//   		uint64 poolEntryID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	} externalSystemAccountIDPoolEntry;
//   case LIMITS_V2:
//       struct {
//           uint64 id;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           } ext;
//       } limitsV2;
//   case STATISTICS_V2:
//       struct {
//           uint64 id;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       } statisticsV2;
//   case PENDING_STATISTICS:
//       struct {
//           uint64 statisticsID;
//           uint64 requestID;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       } pendingStatistics;
//   case CONTRACT:
//       struct {
//           uint64 contractID;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       } contract;
//   case ATOMIC_SWAP_BID:
//       struct {
//           uint64 bidID;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       } atomicSwapBid;
//   case ACCOUNT_ROLE:
//       struct {
//           uint64 id;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       } accountRole;
//   case ACCOUNT_RULE:
//       struct {
//           uint64 id;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       } accountRule;
//   case SIGNER_ROLE:
//       struct {
//           uint64 id;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       } signerRole;
//   case SIGNER_RULE:
//       struct {
//           uint64 id;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       } signerRule;
//   };
//
// ===========================================================================
xdr.union("LedgerKey", {
  switchOn: xdr.lookup("LedgerEntryType"),
  switchName: "type",
  switches: [
    ["account", "account"],
    ["signer", "signer"],
    ["fee", "feeState"],
    ["balance", "balance"],
    ["asset", "asset"],
    ["referenceEntry", "reference"],
    ["statistic", "stats"],
    ["accountLimit", "accountLimits"],
    ["assetPair", "assetPair"],
    ["offerEntry", "offer"],
    ["reviewableRequest", "reviewableRequest"],
    ["externalSystemAccountId", "externalSystemAccountId"],
    ["sale", "sale"],
    ["keyValue", "keyValue"],
    ["accountKyc", "accountKyc"],
    ["externalSystemAccountIdPoolEntry", "externalSystemAccountIdPoolEntry"],
    ["limitsV2", "limitsV2"],
    ["statisticsV2", "statisticsV2"],
    ["pendingStatistic", "pendingStatistics"],
    ["contract", "contract"],
    ["atomicSwapBid", "atomicSwapBid"],
    ["accountRole", "accountRole"],
    ["accountRule", "accountRule"],
    ["signerRole", "signerRole"],
    ["signerRule", "signerRule"],
  ],
  arms: {
    account: xdr.lookup("LedgerKeyAccount"),
    signer: xdr.lookup("LedgerKeySigner"),
    feeState: xdr.lookup("LedgerKeyFeeState"),
    balance: xdr.lookup("LedgerKeyBalance"),
    asset: xdr.lookup("LedgerKeyAsset"),
    reference: xdr.lookup("LedgerKeyReference"),
    stats: xdr.lookup("LedgerKeyStats"),
    accountLimits: xdr.lookup("LedgerKeyAccountLimits"),
    assetPair: xdr.lookup("LedgerKeyAssetPair"),
    offer: xdr.lookup("LedgerKeyOffer"),
    reviewableRequest: xdr.lookup("LedgerKeyReviewableRequest"),
    externalSystemAccountId: xdr.lookup("LedgerKeyExternalSystemAccountId"),
    sale: xdr.lookup("LedgerKeySale"),
    keyValue: xdr.lookup("LedgerKeyKeyValue"),
    accountKyc: xdr.lookup("LedgerKeyAccountKyc"),
    externalSystemAccountIdPoolEntry: xdr.lookup("LedgerKeyExternalSystemAccountIdPoolEntry"),
    limitsV2: xdr.lookup("LedgerKeyLimitsV2"),
    statisticsV2: xdr.lookup("LedgerKeyStatisticsV2"),
    pendingStatistics: xdr.lookup("LedgerKeyPendingStatistics"),
    contract: xdr.lookup("LedgerKeyContract"),
    atomicSwapBid: xdr.lookup("LedgerKeyAtomicSwapBid"),
    accountRole: xdr.lookup("LedgerKeyAccountRole"),
    accountRule: xdr.lookup("LedgerKeyAccountRule"),
    signerRole: xdr.lookup("LedgerKeySignerRole"),
    signerRule: xdr.lookup("LedgerKeySignerRule"),
  },
});

// === xdr source ============================================================
//
//   enum BucketEntryType
//   {
//       LIVEENTRY = 0,
//       DEADENTRY = 1
//   };
//
// ===========================================================================
xdr.enum("BucketEntryType", {
  liveentry: 0,
  deadentry: 1,
});

// === xdr source ============================================================
//
//   union BucketEntry switch (BucketEntryType type)
//   {
//   case LIVEENTRY:
//       LedgerEntry liveEntry;
//   
//   case DEADENTRY:
//       LedgerKey deadEntry;
//   };
//
// ===========================================================================
xdr.union("BucketEntry", {
  switchOn: xdr.lookup("BucketEntryType"),
  switchName: "type",
  switches: [
    ["liveentry", "liveEntry"],
    ["deadentry", "deadEntry"],
  ],
  arms: {
    liveEntry: xdr.lookup("LedgerEntry"),
    deadEntry: xdr.lookup("LedgerKey"),
  },
});

// === xdr source ============================================================
//
//   struct TransactionSet
//   {
//       Hash previousLedgerHash;
//       TransactionEnvelope txs<>;
//   };
//
// ===========================================================================
xdr.struct("TransactionSet", [
  ["previousLedgerHash", xdr.lookup("Hash")],
  ["txes", xdr.varArray(xdr.lookup("TransactionEnvelope"), 2147483647)],
]);

// === xdr source ============================================================
//
//   struct TransactionResultPair
//   {
//       Hash transactionHash;
//       TransactionResult result; // result for the transaction
//   };
//
// ===========================================================================
xdr.struct("TransactionResultPair", [
  ["transactionHash", xdr.lookup("Hash")],
  ["result", xdr.lookup("TransactionResult")],
]);

// === xdr source ============================================================
//
//   struct TransactionResultSet
//   {
//       TransactionResultPair results<>;
//   };
//
// ===========================================================================
xdr.struct("TransactionResultSet", [
  ["results", xdr.varArray(xdr.lookup("TransactionResultPair"), 2147483647)],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("TransactionHistoryEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct TransactionHistoryEntry
//   {
//       uint32 ledgerSeq;
//       TransactionSet txSet;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("TransactionHistoryEntry", [
  ["ledgerSeq", xdr.lookup("Uint32")],
  ["txSet", xdr.lookup("TransactionSet")],
  ["ext", xdr.lookup("TransactionHistoryEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("TransactionHistoryResultEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct TransactionHistoryResultEntry
//   {
//       uint32 ledgerSeq;
//       TransactionResultSet txResultSet;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("TransactionHistoryResultEntry", [
  ["ledgerSeq", xdr.lookup("Uint32")],
  ["txResultSet", xdr.lookup("TransactionResultSet")],
  ["ext", xdr.lookup("TransactionHistoryResultEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("LedgerHeaderHistoryEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct LedgerHeaderHistoryEntry
//   {
//       Hash hash;
//       LedgerHeader header;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("LedgerHeaderHistoryEntry", [
  ["hash", xdr.lookup("Hash")],
  ["header", xdr.lookup("LedgerHeader")],
  ["ext", xdr.lookup("LedgerHeaderHistoryEntryExt")],
]);

// === xdr source ============================================================
//
//   struct LedgerSCPMessages
//   {
//       uint32 ledgerSeq;
//       SCPEnvelope messages<>;
//   };
//
// ===========================================================================
xdr.struct("LedgerScpMessages", [
  ["ledgerSeq", xdr.lookup("Uint32")],
  ["messages", xdr.varArray(xdr.lookup("ScpEnvelope"), 2147483647)],
]);

// === xdr source ============================================================
//
//   struct SCPHistoryEntryV0
//   {
//       SCPQuorumSet quorumSets<>; // additional quorum sets used by ledgerMessages
//       LedgerSCPMessages ledgerMessages;
//   };
//
// ===========================================================================
xdr.struct("ScpHistoryEntryV0", [
  ["quorumSets", xdr.varArray(xdr.lookup("ScpQuorumSet"), 2147483647)],
  ["ledgerMessages", xdr.lookup("LedgerScpMessages")],
]);

// === xdr source ============================================================
//
//   union SCPHistoryEntry switch (LedgerVersion v)
//   {
//   case EMPTY_VERSION:
//       SCPHistoryEntryV0 v0;
//   };
//
// ===========================================================================
xdr.union("ScpHistoryEntry", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", "v0"],
  ],
  arms: {
    v0: xdr.lookup("ScpHistoryEntryV0"),
  },
});

// === xdr source ============================================================
//
//   enum LedgerEntryChangeType
//   {
//       CREATED = 0, // entry was added to the ledger
//       UPDATED = 1, // entry was modified in the ledger
//       REMOVED = 2, // entry was removed from the ledger
//       STATE = 3    // value of the entry
//   };
//
// ===========================================================================
xdr.enum("LedgerEntryChangeType", {
  created: 0,
  updated: 1,
  removed: 2,
  state: 3,
});

// === xdr source ============================================================
//
//   union LedgerEntryChange switch (LedgerEntryChangeType type)
//   {
//   case CREATED:
//       LedgerEntry created;
//   case UPDATED:
//       LedgerEntry updated;
//   case REMOVED:
//       LedgerKey removed;
//   case STATE:
//       LedgerEntry state;
//   };
//
// ===========================================================================
xdr.union("LedgerEntryChange", {
  switchOn: xdr.lookup("LedgerEntryChangeType"),
  switchName: "type",
  switches: [
    ["created", "created"],
    ["updated", "updated"],
    ["removed", "removed"],
    ["state", "state"],
  ],
  arms: {
    created: xdr.lookup("LedgerEntry"),
    updated: xdr.lookup("LedgerEntry"),
    removed: xdr.lookup("LedgerKey"),
    state: xdr.lookup("LedgerEntry"),
  },
});

// === xdr source ============================================================
//
//   typedef LedgerEntryChange LedgerEntryChanges<>;
//
// ===========================================================================
xdr.typedef("LedgerEntryChanges", xdr.varArray(xdr.lookup("LedgerEntryChange"), 2147483647));

// === xdr source ============================================================
//
//   struct OperationMeta
//   {
//       LedgerEntryChanges changes;
//   };
//
// ===========================================================================
xdr.struct("OperationMeta", [
  ["changes", xdr.lookup("LedgerEntryChanges")],
]);

// === xdr source ============================================================
//
//   union TransactionMeta switch (LedgerVersion v)
//   {
//   case EMPTY_VERSION:
//       OperationMeta operations<>;
//   };
//
// ===========================================================================
xdr.union("TransactionMeta", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", "operations"],
  ],
  arms: {
    operations: xdr.varArray(xdr.lookup("OperationMeta"), 2147483647),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;		
//       }
//
// ===========================================================================
xdr.union("CheckSaleStateOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CheckSaleStateOp
//   {
//   	uint64 saleID;
//   	 // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;		
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CheckSaleStateOp", [
  ["saleId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("CheckSaleStateOpExt")],
]);

// === xdr source ============================================================
//
//   enum CheckSaleStateResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0, // sale was processed
//   
//       // codes considered as "failure" for the operation
//       NOT_FOUND = -1, // sale was not found
//   	NOT_READY = -2 // sale is not ready to be closed or canceled
//   };
//
// ===========================================================================
xdr.enum("CheckSaleStateResultCode", {
  success: 0,
  notFound: -1,
  notReady: -2,
});

// === xdr source ============================================================
//
//   enum CheckSaleStateEffect {
//   	CANCELED = 1, // sale did not managed to go over soft cap in time
//   	CLOSED = 2, // sale met hard cap or (end time and soft cap)
//   	UPDATED = 3 // on check sale was modified and modifications must be saved
//   };
//
// ===========================================================================
xdr.enum("CheckSaleStateEffect", {
  canceled: 1,
  closed: 2,
  updated: 3,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("SaleCanceledExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct SaleCanceled {
//   	 // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("SaleCanceled", [
  ["ext", xdr.lookup("SaleCanceledExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("SaleUpdatedExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct SaleUpdated {
//   	 // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("SaleUpdated", [
  ["ext", xdr.lookup("SaleUpdatedExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CheckSubSaleClosedResultExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CheckSubSaleClosedResult {
//   	BalanceID saleBaseBalance;
//   	BalanceID saleQuoteBalance;
//   	ManageOfferSuccessResult saleDetails;
//   	 // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CheckSubSaleClosedResult", [
  ["saleBaseBalance", xdr.lookup("BalanceId")],
  ["saleQuoteBalance", xdr.lookup("BalanceId")],
  ["saleDetails", xdr.lookup("ManageOfferSuccessResult")],
  ["ext", xdr.lookup("CheckSubSaleClosedResultExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CheckSaleClosedResultExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CheckSaleClosedResult {
//   	AccountID saleOwner;
//   	CheckSubSaleClosedResult results<>;
//   	 // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CheckSaleClosedResult", [
  ["saleOwner", xdr.lookup("AccountId")],
  ["results", xdr.varArray(xdr.lookup("CheckSubSaleClosedResult"), 2147483647)],
  ["ext", xdr.lookup("CheckSaleClosedResultExt")],
]);

// === xdr source ============================================================
//
//   union switch (CheckSaleStateEffect effect)
//       {
//       case CANCELED:
//           SaleCanceled saleCanceled;
//   	case CLOSED:
//   		CheckSaleClosedResult saleClosed;
//   	case UPDATED:
//   		SaleUpdated saleUpdated;
//       }
//
// ===========================================================================
xdr.union("CheckSaleStateSuccessEffect", {
  switchOn: xdr.lookup("CheckSaleStateEffect"),
  switchName: "effect",
  switches: [
    ["canceled", "saleCanceled"],
    ["closed", "saleClosed"],
    ["updated", "saleUpdated"],
  ],
  arms: {
    saleCanceled: xdr.lookup("SaleCanceled"),
    saleClosed: xdr.lookup("CheckSaleClosedResult"),
    saleUpdated: xdr.lookup("SaleUpdated"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CheckSaleStateSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CheckSaleStateSuccess
//   {
//   	uint64 saleID;
//   	union switch (CheckSaleStateEffect effect)
//       {
//       case CANCELED:
//           SaleCanceled saleCanceled;
//   	case CLOSED:
//   		CheckSaleClosedResult saleClosed;
//   	case UPDATED:
//   		SaleUpdated saleUpdated;
//       }
//       effect;
//   	 // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CheckSaleStateSuccess", [
  ["saleId", xdr.lookup("Uint64")],
  ["effect", xdr.lookup("CheckSaleStateSuccessEffect")],
  ["ext", xdr.lookup("CheckSaleStateSuccessExt")],
]);

// === xdr source ============================================================
//
//   union CheckSaleStateResult switch (CheckSaleStateResultCode code)
//   {
//   case SUCCESS:
//       CheckSaleStateSuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("CheckSaleStateResult", {
  switchOn: xdr.lookup("CheckSaleStateResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("CheckSaleStateSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("PreIssuanceRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct PreIssuanceRequest {
//   	AssetCode asset;
//   	uint64 amount;
//   	DecoratedSignature signature;
//   	string64 reference;
//       longstring creatorDetails; // details set by requester
//   
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("PreIssuanceRequest", [
  ["asset", xdr.lookup("AssetCode")],
  ["amount", xdr.lookup("Uint64")],
  ["signature", xdr.lookup("DecoratedSignature")],
  ["reference", xdr.lookup("String64")],
  ["creatorDetails", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("PreIssuanceRequestExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("IssuanceRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct IssuanceRequest {
//   	AssetCode asset;
//   	uint64 amount;
//   	BalanceID receiver;
//   	longstring externalDetails; // details of the issuance (External system id, etc.)
//   	Fee fee; //totalFee to be payed (calculated automatically)
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("IssuanceRequest", [
  ["asset", xdr.lookup("AssetCode")],
  ["amount", xdr.lookup("Uint64")],
  ["receiver", xdr.lookup("BalanceId")],
  ["externalDetails", xdr.lookup("Longstring")],
  ["fee", xdr.lookup("Fee")],
  ["ext", xdr.lookup("IssuanceRequestExt")],
]);

// === xdr source ============================================================
//
//   enum ManageAssetPairAction
//   {
//       CREATE = 0,
//       UPDATE_PRICE = 1,
//       UPDATE_POLICIES = 2
//   };
//
// ===========================================================================
xdr.enum("ManageAssetPairAction", {
  create: 0,
  updatePrice: 1,
  updatePolicy: 2,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageAssetPairOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageAssetPairOp
//   {
//       ManageAssetPairAction action;
//   	AssetCode base;
//   	AssetCode quote;
//   
//       int64 physicalPrice;
//   
//   	int64 physicalPriceCorrection; // correction of physical price in percents. If physical price is set and restriction by physical price set, mininal price for offer for this pair will be physicalPrice * physicalPriceCorrection
//   	int64 maxPriceStep;
//   
//   	int32 policies;
//   
//   	 // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageAssetPairOp", [
  ["action", xdr.lookup("ManageAssetPairAction")],
  ["base", xdr.lookup("AssetCode")],
  ["quote", xdr.lookup("AssetCode")],
  ["physicalPrice", xdr.lookup("Int64")],
  ["physicalPriceCorrection", xdr.lookup("Int64")],
  ["maxPriceStep", xdr.lookup("Int64")],
  ["policies", xdr.lookup("Int32")],
  ["ext", xdr.lookup("ManageAssetPairOpExt")],
]);

// === xdr source ============================================================
//
//   enum ManageAssetPairResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//   	NOT_FOUND = -1,           // failed to find asset with such code
//   	ALREADY_EXISTS = -2,
//       MALFORMED = -3,
//   	INVALID_ASSET = -4,
//   	INVALID_ACTION = -5,
//   	INVALID_POLICIES = -6,
//   	ASSET_NOT_FOUND = -7
//   };
//
// ===========================================================================
xdr.enum("ManageAssetPairResultCode", {
  success: 0,
  notFound: -1,
  alreadyExist: -2,
  malformed: -3,
  invalidAsset: -4,
  invalidAction: -5,
  invalidPolicy: -6,
  assetNotFound: -7,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageAssetPairSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageAssetPairSuccess
//   {
//   	int64 currentPrice;
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageAssetPairSuccess", [
  ["currentPrice", xdr.lookup("Int64")],
  ["ext", xdr.lookup("ManageAssetPairSuccessExt")],
]);

// === xdr source ============================================================
//
//   union ManageAssetPairResult switch (ManageAssetPairResultCode code)
//   {
//   case SUCCESS:
//       ManageAssetPairSuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ManageAssetPairResult", {
  switchOn: xdr.lookup("ManageAssetPairResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("ManageAssetPairSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   enum SaleType {
//   	BASIC_SALE = 1, // sale creator specifies price for each quote asset
//   	CROWD_FUNDING = 2, // sale creator does not specify price,
//   	                  // price is defined on sale close based on amount of base asset to be sold and amount of quote assets collected
//       FIXED_PRICE=3
//   };
//
// ===========================================================================
xdr.enum("SaleType", {
  basicSale: 1,
  crowdFunding: 2,
  fixedPrice: 3,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("FixedPriceSaleExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct FixedPriceSale {
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("FixedPriceSale", [
  ["ext", xdr.lookup("FixedPriceSaleExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CrowdFundingSaleExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CrowdFundingSale {
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CrowdFundingSale", [
  ["ext", xdr.lookup("CrowdFundingSaleExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("BasicSaleExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct BasicSale {
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("BasicSale", [
  ["ext", xdr.lookup("BasicSaleExt")],
]);

// === xdr source ============================================================
//
//   union SaleTypeExt switch (SaleType saleType)
//   {
//   	case BASIC_SALE:
//   		BasicSale basicSale;
//   	case CROWD_FUNDING:
//   		CrowdFundingSale crowdFundingSale;
//   	case FIXED_PRICE:
//   		FixedPriceSale fixedPriceSale;
//   };
//
// ===========================================================================
xdr.union("SaleTypeExt", {
  switchOn: xdr.lookup("SaleType"),
  switchName: "saleType",
  switches: [
    ["basicSale", "basicSale"],
    ["crowdFunding", "crowdFundingSale"],
    ["fixedPrice", "fixedPriceSale"],
  ],
  arms: {
    basicSale: xdr.lookup("BasicSale"),
    crowdFundingSale: xdr.lookup("CrowdFundingSale"),
    fixedPriceSale: xdr.lookup("FixedPriceSale"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("SaleQuoteAssetExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct SaleQuoteAsset {
//   	AssetCode quoteAsset; // asset in which participation will be accepted
//   	uint64 price; // price for 1 baseAsset in terms of quote asset
//   	BalanceID quoteBalance;
//   	uint64 currentCap; // current capitalization
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("SaleQuoteAsset", [
  ["quoteAsset", xdr.lookup("AssetCode")],
  ["price", xdr.lookup("Uint64")],
  ["quoteBalance", xdr.lookup("BalanceId")],
  ["currentCap", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("SaleQuoteAssetExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("SaleEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct SaleEntry
//   {
//   	uint64 saleID;
//   	uint64 saleType;
//   	AccountID ownerID;
//       AssetCode baseAsset; // asset for which sale will be performed
//   	uint64 startTime; // start time of the sale
//   	uint64 endTime; // close time of the sale
//   	AssetCode defaultQuoteAsset; // asset for soft and hard cap
//   	uint64 softCap; // minimum amount of quote asset to be received at which sale will be considered a successful
//   	uint64 hardCap; // max amount of quote asset to be received
//   	uint64 currentCapInBase;
//   	uint64 maxAmountToBeSold;
//   	longstring details; // sale specific details
//   	SaleQuoteAsset quoteAssets<100>;
//   
//   	BalanceID baseBalance;
//       SaleTypeExt saleTypeExt;
//   
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("SaleEntry", [
  ["saleId", xdr.lookup("Uint64")],
  ["saleType", xdr.lookup("Uint64")],
  ["ownerId", xdr.lookup("AccountId")],
  ["baseAsset", xdr.lookup("AssetCode")],
  ["startTime", xdr.lookup("Uint64")],
  ["endTime", xdr.lookup("Uint64")],
  ["defaultQuoteAsset", xdr.lookup("AssetCode")],
  ["softCap", xdr.lookup("Uint64")],
  ["hardCap", xdr.lookup("Uint64")],
  ["currentCapInBase", xdr.lookup("Uint64")],
  ["maxAmountToBeSold", xdr.lookup("Uint64")],
  ["details", xdr.lookup("Longstring")],
  ["quoteAssets", xdr.varArray(xdr.lookup("SaleQuoteAsset"), 100)],
  ["baseBalance", xdr.lookup("BalanceId")],
  ["saleTypeExt", xdr.lookup("SaleTypeExt")],
  ["ext", xdr.lookup("SaleEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("PaymentFeeDataV2Ext", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct PaymentFeeDataV2 {
//       Fee sourceFee;
//       Fee destinationFee;
//   
//       bool sourcePaysForDest; // if true - source account pays fee, else destination
//   
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("PaymentFeeDataV2", [
  ["sourceFee", xdr.lookup("Fee")],
  ["destinationFee", xdr.lookup("Fee")],
  ["sourcePaysForDest", xdr.bool()],
  ["ext", xdr.lookup("PaymentFeeDataV2Ext")],
]);

// === xdr source ============================================================
//
//   enum PaymentDestinationType {
//       ACCOUNT = 0,
//       BALANCE = 1
//   };
//
// ===========================================================================
xdr.enum("PaymentDestinationType", {
  account: 0,
  balance: 1,
});

// === xdr source ============================================================
//
//   union switch (PaymentDestinationType type) {
//           case ACCOUNT:
//               AccountID accountID;
//           case BALANCE:
//               BalanceID balanceID;
//       }
//
// ===========================================================================
xdr.union("PaymentOpV2Destination", {
  switchOn: xdr.lookup("PaymentDestinationType"),
  switchName: "type",
  switches: [
    ["account", "accountId"],
    ["balance", "balanceId"],
  ],
  arms: {
    accountId: xdr.lookup("AccountId"),
    balanceId: xdr.lookup("BalanceId"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("PaymentOpV2Ext", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct PaymentOpV2
//   {
//       BalanceID sourceBalanceID;
//   
//       union switch (PaymentDestinationType type) {
//           case ACCOUNT:
//               AccountID accountID;
//           case BALANCE:
//               BalanceID balanceID;
//       } destination;
//   
//       uint64 amount;
//   
//       PaymentFeeDataV2 feeData;
//   
//       longstring subject;
//       longstring reference;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("PaymentOpV2", [
  ["sourceBalanceId", xdr.lookup("BalanceId")],
  ["destination", xdr.lookup("PaymentOpV2Destination")],
  ["amount", xdr.lookup("Uint64")],
  ["feeData", xdr.lookup("PaymentFeeDataV2")],
  ["subject", xdr.lookup("Longstring")],
  ["reference", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("PaymentOpV2Ext")],
]);

// === xdr source ============================================================
//
//   enum PaymentV2ResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0, // payment successfully completed
//   
//       // codes considered as "failure" for the operation
//       MALFORMED = -1, // bad input
//       UNDERFUNDED = -2, // not enough funds in source account
//       LINE_FULL = -3, // destination would go above their limit
//   	DESTINATION_BALANCE_NOT_FOUND = -4,
//       BALANCE_ASSETS_MISMATCHED = -5,
//   	SRC_BALANCE_NOT_FOUND = -6, // source balance not found
//       REFERENCE_DUPLICATION = -7,
//       STATS_OVERFLOW = -8,
//       LIMITS_EXCEEDED = -9,
//       NOT_ALLOWED_BY_ASSET_POLICY = -10,
//       INVALID_DESTINATION_FEE = -11,
//       INSUFFICIENT_FEE_AMOUNT = -12,
//       PAYMENT_AMOUNT_IS_LESS_THAN_DEST_FEE = -13,
//       DESTINATION_ACCOUNT_NOT_FOUND = -14,
//       INCORRECT_AMOUNT_PRECISION = -15
//   
//        // !!! Add new result code to review invoice op too !!!
//   };
//
// ===========================================================================
xdr.enum("PaymentV2ResultCode", {
  success: 0,
  malformed: -1,
  underfunded: -2,
  lineFull: -3,
  destinationBalanceNotFound: -4,
  balanceAssetsMismatched: -5,
  srcBalanceNotFound: -6,
  referenceDuplication: -7,
  statsOverflow: -8,
  limitsExceeded: -9,
  notAllowedByAssetPolicy: -10,
  invalidDestinationFee: -11,
  insufficientFeeAmount: -12,
  paymentAmountIsLessThanDestFee: -13,
  destinationAccountNotFound: -14,
  incorrectAmountPrecision: -15,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("PaymentV2ResponseExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct PaymentV2Response {
//       AccountID destination;
//       BalanceID destinationBalanceID;
//   
//       AssetCode asset;
//       uint64 sourceSentUniversal;
//       uint64 paymentID;
//   
//       Fee actualSourcePaymentFee;
//       Fee actualDestinationPaymentFee;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("PaymentV2Response", [
  ["destination", xdr.lookup("AccountId")],
  ["destinationBalanceId", xdr.lookup("BalanceId")],
  ["asset", xdr.lookup("AssetCode")],
  ["sourceSentUniversal", xdr.lookup("Uint64")],
  ["paymentId", xdr.lookup("Uint64")],
  ["actualSourcePaymentFee", xdr.lookup("Fee")],
  ["actualDestinationPaymentFee", xdr.lookup("Fee")],
  ["ext", xdr.lookup("PaymentV2ResponseExt")],
]);

// === xdr source ============================================================
//
//   union PaymentV2Result switch (PaymentV2ResultCode code)
//   {
//   case SUCCESS:
//       PaymentV2Response paymentV2Response;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("PaymentV2Result", {
  switchOn: xdr.lookup("PaymentV2ResultCode"),
  switchName: "code",
  switches: [
    ["success", "paymentV2Response"],
  ],
  arms: {
    paymentV2Response: xdr.lookup("PaymentV2Response"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   enum StatsOpType
//   {
//       PAYMENT_OUT = 1,
//       WITHDRAW = 2,
//       SPEND = 3,
//       DEPOSIT = 4,
//       PAYOUT = 5
//   };
//
// ===========================================================================
xdr.enum("StatsOpType", {
  paymentOut: 1,
  withdraw: 2,
  spend: 3,
  deposit: 4,
  payout: 5,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("LimitsV2EntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct LimitsV2Entry
//   {
//       uint64      id;
//       uint64*     accountRole;
//       AccountID*  accountID;
//       StatsOpType statsOpType;
//       AssetCode   assetCode;
//       bool        isConvertNeeded;
//   
//       uint64 dailyOut;
//       uint64 weeklyOut;
//       uint64 monthlyOut;
//       uint64 annualOut;
//   
//        // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("LimitsV2Entry", [
  ["id", xdr.lookup("Uint64")],
  ["accountRole", xdr.option(xdr.lookup("Uint64"))],
  ["accountId", xdr.option(xdr.lookup("AccountId"))],
  ["statsOpType", xdr.lookup("StatsOpType")],
  ["assetCode", xdr.lookup("AssetCode")],
  ["isConvertNeeded", xdr.bool()],
  ["dailyOut", xdr.lookup("Uint64")],
  ["weeklyOut", xdr.lookup("Uint64")],
  ["monthlyOut", xdr.lookup("Uint64")],
  ["annualOut", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("LimitsV2EntryExt")],
]);

// === xdr source ============================================================
//
//   enum ManageSignerRoleAction
//   {
//       CREATE = 0,
//       UPDATE = 1,
//       REMOVE = 2
//   };
//
// ===========================================================================
xdr.enum("ManageSignerRoleAction", {
  create: 0,
  update: 1,
  remove: 2,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreateSignerRoleDataExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateSignerRoleData
//   {
//       uint64 ruleIDs<>;
//       bool isReadOnly;
//       longstring details;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("CreateSignerRoleData", [
  ["ruleIDs", xdr.varArray(xdr.lookup("Uint64"), 2147483647)],
  ["isReadOnly", xdr.bool()],
  ["details", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("CreateSignerRoleDataExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("UpdateSignerRoleDataExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct UpdateSignerRoleData
//   {
//       uint64 roleID;
//       uint64 ruleIDs<>;
//   
//       longstring details;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("UpdateSignerRoleData", [
  ["roleId", xdr.lookup("Uint64")],
  ["ruleIDs", xdr.varArray(xdr.lookup("Uint64"), 2147483647)],
  ["details", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("UpdateSignerRoleDataExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("RemoveSignerRoleDataExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct RemoveSignerRoleData
//   {
//       uint64 roleID;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("RemoveSignerRoleData", [
  ["roleId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("RemoveSignerRoleDataExt")],
]);

// === xdr source ============================================================
//
//   union switch (ManageSignerRoleAction action)
//       {
//       case CREATE:
//           CreateSignerRoleData createData;
//       case UPDATE:
//           UpdateSignerRoleData updateData;
//       case REMOVE:
//           RemoveSignerRoleData removeData;
//       }
//
// ===========================================================================
xdr.union("ManageSignerRoleOpData", {
  switchOn: xdr.lookup("ManageSignerRoleAction"),
  switchName: "action",
  switches: [
    ["create", "createData"],
    ["update", "updateData"],
    ["remove", "removeData"],
  ],
  arms: {
    createData: xdr.lookup("CreateSignerRoleData"),
    updateData: xdr.lookup("UpdateSignerRoleData"),
    removeData: xdr.lookup("RemoveSignerRoleData"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageSignerRoleOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageSignerRoleOp
//   {
//       union switch (ManageSignerRoleAction action)
//       {
//       case CREATE:
//           CreateSignerRoleData createData;
//       case UPDATE:
//           UpdateSignerRoleData updateData;
//       case REMOVE:
//           RemoveSignerRoleData removeData;
//       } data;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageSignerRoleOp", [
  ["data", xdr.lookup("ManageSignerRoleOpData")],
  ["ext", xdr.lookup("ManageSignerRoleOpExt")],
]);

// === xdr source ============================================================
//
//   enum ManageSignerRoleResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       NOT_FOUND = -1, // does not exists or owner mismatched
//       ROLE_IS_USED = -2,
//       INVALID_DETAILS = -3,
//       NO_SUCH_RULE = -4,
//       RULE_ID_DUPLICATION = -5,
//       DEFAULT_RULE_ID_DUPLICATION = -6
//   };
//
// ===========================================================================
xdr.enum("ManageSignerRoleResultCode", {
  success: 0,
  notFound: -1,
  roleIsUsed: -2,
  invalidDetail: -3,
  noSuchRule: -4,
  ruleIdDuplication: -5,
  defaultRuleIdDuplication: -6,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//               {
//               case EMPTY_VERSION:
//                   void;
//               }
//
// ===========================================================================
xdr.union("ManageSignerRoleResultSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//               uint64 roleID;
//   
//               // reserved for future use
//               union switch (LedgerVersion v)
//               {
//               case EMPTY_VERSION:
//                   void;
//               }
//               ext;
//           }
//
// ===========================================================================
xdr.struct("ManageSignerRoleResultSuccess", [
  ["roleId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("ManageSignerRoleResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   union ManageSignerRoleResult switch (ManageSignerRoleResultCode code)
//   {
//       case SUCCESS:
//           struct {
//               uint64 roleID;
//   
//               // reserved for future use
//               union switch (LedgerVersion v)
//               {
//               case EMPTY_VERSION:
//                   void;
//               }
//               ext;
//           } success;
//       case RULE_ID_DUPLICATION:
//       case DEFAULT_RULE_ID_DUPLICATION:
//       case NO_SUCH_RULE:
//           uint64 ruleID;
//       default:
//           void;
//   };
//
// ===========================================================================
xdr.union("ManageSignerRoleResult", {
  switchOn: xdr.lookup("ManageSignerRoleResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
    ["ruleIdDuplication", "ruleId"],
    ["defaultRuleIdDuplication", "ruleId"],
    ["noSuchRule", "ruleId"],
  ],
  arms: {
    success: xdr.lookup("ManageSignerRoleResultSuccess"),
    ruleId: xdr.lookup("Uint64"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("SignerEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct SignerEntry
//   {
//       PublicKey pubKey;
//       AccountID accountID; // account to which signer had attached
//   
//       uint32 weight; // threshold for all SignerRules equals 1000
//   	uint32 identity;
//   
//   	longstring details;
//   
//   	uint64 roleID;
//   
//   	 // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("SignerEntry", [
  ["pubKey", xdr.lookup("PublicKey")],
  ["accountId", xdr.lookup("AccountId")],
  ["weight", xdr.lookup("Uint32")],
  ["identity", xdr.lookup("Uint32")],
  ["details", xdr.lookup("Longstring")],
  ["roleId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("SignerEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ReferenceEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ReferenceEntry
//   {
//   	AccountID sender;
//       string64 reference;
//   
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ReferenceEntry", [
  ["sender", xdr.lookup("AccountId")],
  ["reference", xdr.lookup("String64")],
  ["ext", xdr.lookup("ReferenceEntryExt")],
]);

// === xdr source ============================================================
//
//   enum LedgerVersion {
//   	EMPTY_VERSION = 0
//   };
//
// ===========================================================================
xdr.enum("LedgerVersion", {
  emptyVersion: 0,
});

// === xdr source ============================================================
//
//   union EmptyExt switch (LedgerVersion v)
//   {
//   case EMPTY_VERSION:
//       void;
//   };
//
// ===========================================================================
xdr.union("EmptyExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   typedef opaque Hash[32];
//
// ===========================================================================
xdr.typedef("Hash", xdr.opaque(32));

// === xdr source ============================================================
//
//   typedef opaque uint256[32];
//
// ===========================================================================
xdr.typedef("Uint256", xdr.opaque(32));

// === xdr source ============================================================
//
//   typedef unsigned int uint32;
//
// ===========================================================================
xdr.typedef("Uint32", xdr.uint());

// === xdr source ============================================================
//
//   typedef int int32;
//
// ===========================================================================
xdr.typedef("Int32", xdr.int());

// === xdr source ============================================================
//
//   typedef unsigned hyper uint64;
//
// ===========================================================================
xdr.typedef("Uint64", xdr.uhyper());

// === xdr source ============================================================
//
//   typedef hyper int64;
//
// ===========================================================================
xdr.typedef("Int64", xdr.hyper());

// === xdr source ============================================================
//
//   enum CryptoKeyType
//   {
//       KEY_TYPE_ED25519 = 0
//   };
//
// ===========================================================================
xdr.enum("CryptoKeyType", {
  keyTypeEd25519: 0,
});

// === xdr source ============================================================
//
//   enum PublicKeyType
//   {
//   	PUBLIC_KEY_TYPE_ED25519 = 0
//   };
//
// ===========================================================================
xdr.enum("PublicKeyType", {
  publicKeyTypeEd25519: 0,
});

// === xdr source ============================================================
//
//   union PublicKey switch (CryptoKeyType type)
//   {
//   case KEY_TYPE_ED25519:
//       uint256 ed25519;
//   };
//
// ===========================================================================
xdr.union("PublicKey", {
  switchOn: xdr.lookup("CryptoKeyType"),
  switchName: "type",
  switches: [
    ["keyTypeEd25519", "ed25519"],
  ],
  arms: {
    ed25519: xdr.lookup("Uint256"),
  },
});

// === xdr source ============================================================
//
//   enum LedgerEntryType
//   {
//       ANY = 1,
//       ACCOUNT = 2,
//       SIGNER = 3,
//       FEE = 4,
//       BALANCE = 5,
//       PAYMENT_REQUEST = 6,
//       ASSET = 7,
//       REFERENCE_ENTRY = 8,
//       STATISTICS = 9,
//       TRUST = 10,
//       ACCOUNT_LIMITS = 11,
//   	ASSET_PAIR = 12,
//   	OFFER_ENTRY = 13,
//   	REVIEWABLE_REQUEST = 15,
//   	EXTERNAL_SYSTEM_ACCOUNT_ID = 16,
//   	SALE = 17,
//   	ACCOUNT_KYC = 18,
//   	EXTERNAL_SYSTEM_ACCOUNT_ID_POOL_ENTRY = 19,
//       KEY_VALUE = 20,
//       LIMITS_V2 = 22,
//       STATISTICS_V2 = 23,
//       PENDING_STATISTICS = 24,
//       CONTRACT = 25,
//       ACCOUNT_ROLE = 26,
//       ACCOUNT_RULE = 27,
//       ATOMIC_SWAP_BID = 28,
//       TRANSACTION = 29, // is used for account rule resource
//       SIGNER_RULE = 30,
//       SIGNER_ROLE = 31
//   };
//
// ===========================================================================
xdr.enum("LedgerEntryType", {
  any: 1,
  account: 2,
  signer: 3,
  fee: 4,
  balance: 5,
  paymentRequest: 6,
  asset: 7,
  referenceEntry: 8,
  statistic: 9,
  trust: 10,
  accountLimit: 11,
  assetPair: 12,
  offerEntry: 13,
  reviewableRequest: 15,
  externalSystemAccountId: 16,
  sale: 17,
  accountKyc: 18,
  externalSystemAccountIdPoolEntry: 19,
  keyValue: 20,
  limitsV2: 22,
  statisticsV2: 23,
  pendingStatistic: 24,
  contract: 25,
  accountRole: 26,
  accountRule: 27,
  atomicSwapBid: 28,
  transaction: 29,
  signerRule: 30,
  signerRole: 31,
});

// === xdr source ============================================================
//
//   typedef opaque Signature<64>;
//
// ===========================================================================
xdr.typedef("Signature", xdr.varOpaque(64));

// === xdr source ============================================================
//
//   typedef opaque SignatureHint[4];
//
// ===========================================================================
xdr.typedef("SignatureHint", xdr.opaque(4));

// === xdr source ============================================================
//
//   typedef PublicKey NodeID;
//
// ===========================================================================
xdr.typedef("NodeId", xdr.lookup("PublicKey"));

// === xdr source ============================================================
//
//   struct Curve25519Secret
//   {
//           opaque key[32];
//   };
//
// ===========================================================================
xdr.struct("Curve25519Secret", [
  ["key", xdr.opaque(32)],
]);

// === xdr source ============================================================
//
//   struct Curve25519Public
//   {
//           opaque key[32];
//   };
//
// ===========================================================================
xdr.struct("Curve25519Public", [
  ["key", xdr.opaque(32)],
]);

// === xdr source ============================================================
//
//   struct HmacSha256Key
//   {
//           opaque key[32];
//   };
//
// ===========================================================================
xdr.struct("HmacSha256Key", [
  ["key", xdr.opaque(32)],
]);

// === xdr source ============================================================
//
//   struct HmacSha256Mac
//   {
//           opaque mac[32];
//   };
//
// ===========================================================================
xdr.struct("HmacSha256Mac", [
  ["mac", xdr.opaque(32)],
]);

// === xdr source ============================================================
//
//   typedef PublicKey AccountID;
//
// ===========================================================================
xdr.typedef("AccountId", xdr.lookup("PublicKey"));

// === xdr source ============================================================
//
//   typedef PublicKey BalanceID;
//
// ===========================================================================
xdr.typedef("BalanceId", xdr.lookup("PublicKey"));

// === xdr source ============================================================
//
//   typedef opaque Thresholds[4];
//
// ===========================================================================
xdr.typedef("Thresholds", xdr.opaque(4));

// === xdr source ============================================================
//
//   typedef string string32<32>;
//
// ===========================================================================
xdr.typedef("String32", xdr.string(32));

// === xdr source ============================================================
//
//   typedef string string64<64>;
//
// ===========================================================================
xdr.typedef("String64", xdr.string(64));

// === xdr source ============================================================
//
//   typedef string string256<256>;
//
// ===========================================================================
xdr.typedef("String256", xdr.string(256));

// === xdr source ============================================================
//
//   typedef string longstring<>;
//
// ===========================================================================
xdr.typedef("Longstring", xdr.string());

// === xdr source ============================================================
//
//   typedef string AssetCode<16>;
//
// ===========================================================================
xdr.typedef("AssetCode", xdr.string(16));

// === xdr source ============================================================
//
//   typedef uint64 Salt;
//
// ===========================================================================
xdr.typedef("Salt", xdr.lookup("Uint64"));

// === xdr source ============================================================
//
//   typedef opaque DataValue<64>;
//
// ===========================================================================
xdr.typedef("DataValue", xdr.varOpaque(64));

// === xdr source ============================================================
//
//   union switch(LedgerVersion v)
//       {
//           case EMPTY_VERSION:
//               void;
//       }
//
// ===========================================================================
xdr.union("FeeExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct Fee {
//   	uint64 fixed;
//   	uint64 percent;
//   
//       // reserved for future use
//       union switch(LedgerVersion v)
//       {
//           case EMPTY_VERSION:
//               void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("Fee", [
  ["fixed", xdr.lookup("Uint64")],
  ["percent", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("FeeExt")],
]);

// === xdr source ============================================================
//
//   enum OperationType
//   {
//       CREATE_ACCOUNT = 1,
//       CREATE_ISSUANCE_REQUEST = 3,
//       SET_FEES = 5,
//       CREATE_WITHDRAWAL_REQUEST = 7,
//       MANAGE_BALANCE = 9,
//       MANAGE_ASSET = 11,
//       CREATE_PREISSUANCE_REQUEST = 12,
//       MANAGE_LIMITS = 13,
//   	MANAGE_ASSET_PAIR = 15,
//   	MANAGE_OFFER = 16,
//       MANAGE_INVOICE_REQUEST = 17,
//   	REVIEW_REQUEST = 18,
//   	CREATE_SALE_REQUEST = 19,
//   	CHECK_SALE_STATE = 20,
//       CREATE_AML_ALERT = 21,
//       CREATE_CHANGE_ROLE_REQUEST = 22,
//       PAYMENT_V2 = 23,
//       MANAGE_EXTERNAL_SYSTEM_ACCOUNT_ID_POOL_ENTRY = 24,
//       BIND_EXTERNAL_SYSTEM_ACCOUNT_ID = 25,
//       MANAGE_SALE = 26,
//       MANAGE_KEY_VALUE = 27,
//       CREATE_MANAGE_LIMITS_REQUEST = 28,
//       MANAGE_CONTRACT_REQUEST = 29,
//       MANAGE_CONTRACT = 30,
//       CANCEL_SALE_REQUEST = 31,
//       PAYOUT = 32,
//       MANAGE_ACCOUNT_ROLE = 33,
//       MANAGE_ACCOUNT_RULE = 34,
//       CREATE_ASWAP_BID_REQUEST = 35,
//       CANCEL_ASWAP_BID = 36,
//       CREATE_ASWAP_REQUEST = 37,
//       MANAGE_SIGNER = 38,
//       MANAGE_SIGNER_ROLE = 39,
//       MANAGE_SIGNER_RULE = 40
//   };
//
// ===========================================================================
xdr.enum("OperationType", {
  createAccount: 1,
  createIssuanceRequest: 3,
  setFee: 5,
  createWithdrawalRequest: 7,
  manageBalance: 9,
  manageAsset: 11,
  createPreissuanceRequest: 12,
  manageLimit: 13,
  manageAssetPair: 15,
  manageOffer: 16,
  manageInvoiceRequest: 17,
  reviewRequest: 18,
  createSaleRequest: 19,
  checkSaleState: 20,
  createAmlAlert: 21,
  createChangeRoleRequest: 22,
  paymentV2: 23,
  manageExternalSystemAccountIdPoolEntry: 24,
  bindExternalSystemAccountId: 25,
  manageSale: 26,
  manageKeyValue: 27,
  createManageLimitsRequest: 28,
  manageContractRequest: 29,
  manageContract: 30,
  cancelSaleRequest: 31,
  payout: 32,
  manageAccountRole: 33,
  manageAccountRule: 34,
  createAswapBidRequest: 35,
  cancelAswapBid: 36,
  createAswapRequest: 37,
  manageSigner: 38,
  manageSignerRole: 39,
  manageSignerRule: 40,
});

// === xdr source ============================================================
//
//   struct DecoratedSignature
//   {
//       SignatureHint hint;  // last 4 bytes of the public key, used as a hint
//       Signature signature; // actual signature
//   };
//
// ===========================================================================
xdr.struct("DecoratedSignature", [
  ["hint", xdr.lookup("SignatureHint")],
  ["signature", xdr.lookup("Signature")],
]);

// === xdr source ============================================================
//
//   enum ReviewRequestOpAction {
//   	APPROVE = 1,
//   	REJECT = 2,
//   	PERMANENT_REJECT = 3
//   };
//
// ===========================================================================
xdr.enum("ReviewRequestOpAction", {
  approve: 1,
  reject: 2,
  permanentReject: 3,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("LimitsUpdateDetailsExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct LimitsUpdateDetails {
//       LimitsV2Entry newLimitsV2;
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("LimitsUpdateDetails", [
  ["newLimitsV2", xdr.lookup("LimitsV2Entry")],
  ["ext", xdr.lookup("LimitsUpdateDetailsExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("WithdrawalDetailsExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct WithdrawalDetails {
//   	string externalDetails<>;
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("WithdrawalDetails", [
  ["externalDetails", xdr.string()],
  ["ext", xdr.lookup("WithdrawalDetailsExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("AmlAlertDetailsExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct AMLAlertDetails {
//   	string comment<>;
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("AmlAlertDetails", [
  ["comment", xdr.string()],
  ["ext", xdr.lookup("AmlAlertDetailsExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ContractDetailsExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ContractDetails {
//       longstring details;
//   
//       // Reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ContractDetails", [
  ["details", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("ContractDetailsExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("BillPayDetailsExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct BillPayDetails {
//       PaymentOpV2 paymentDetails;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("BillPayDetails", [
  ["paymentDetails", xdr.lookup("PaymentOpV2")],
  ["ext", xdr.lookup("BillPayDetailsExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ReviewDetailsExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ReviewDetails {
//       uint32 tasksToAdd;
//       uint32 tasksToRemove;
//       string externalDetails<>;
//       // Reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ReviewDetails", [
  ["tasksToAdd", xdr.lookup("Uint32")],
  ["tasksToRemove", xdr.lookup("Uint32")],
  ["externalDetails", xdr.string()],
  ["ext", xdr.lookup("ReviewDetailsExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("SaleExtendedExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct SaleExtended {
//       uint64 saleID;
//   
//       // Reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("SaleExtended", [
  ["saleId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("SaleExtendedExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ASwapBidExtendedExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ASwapBidExtended
//   {
//       uint64 bidID;
//   
//       // Reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ASwapBidExtended", [
  ["bidId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("ASwapBidExtendedExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ASwapExtendedExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ASwapExtended
//   {
//       uint64 bidID;
//       AccountID bidOwnerID;
//       AccountID purchaserID;
//       AssetCode baseAsset;
//       AssetCode quoteAsset;
//       uint64 baseAmount;
//       uint64 quoteAmount;
//       uint64 price;
//       BalanceID bidOwnerBaseBalanceID;
//       BalanceID purchaserBaseBalanceID;
//   
//       // Reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ASwapExtended", [
  ["bidId", xdr.lookup("Uint64")],
  ["bidOwnerId", xdr.lookup("AccountId")],
  ["purchaserId", xdr.lookup("AccountId")],
  ["baseAsset", xdr.lookup("AssetCode")],
  ["quoteAsset", xdr.lookup("AssetCode")],
  ["baseAmount", xdr.lookup("Uint64")],
  ["quoteAmount", xdr.lookup("Uint64")],
  ["price", xdr.lookup("Uint64")],
  ["bidOwnerBaseBalanceId", xdr.lookup("BalanceId")],
  ["purchaserBaseBalanceId", xdr.lookup("BalanceId")],
  ["ext", xdr.lookup("ASwapExtendedExt")],
]);

// === xdr source ============================================================
//
//   union switch(ReviewableRequestType requestType) {
//       case CREATE_SALE:
//           SaleExtended saleExtended;
//       case NONE:
//           void;
//   	case CREATE_ATOMIC_SWAP_BID:
//           ASwapBidExtended aSwapBidExtended;
//       case CREATE_ATOMIC_SWAP:
//           ASwapExtended aSwapExtended;
//       }
//
// ===========================================================================
xdr.union("ExtendedResultTypeExt", {
  switchOn: xdr.lookup("ReviewableRequestType"),
  switchName: "requestType",
  switches: [
    ["createSale", "saleExtended"],
    ["none", xdr.void()],
    ["createAtomicSwapBid", "aSwapBidExtended"],
    ["createAtomicSwap", "aSwapExtended"],
  ],
  arms: {
    saleExtended: xdr.lookup("SaleExtended"),
    aSwapBidExtended: xdr.lookup("ASwapBidExtended"),
    aSwapExtended: xdr.lookup("ASwapExtended"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//      {
//      case EMPTY_VERSION:
//          void;
//      }
//
// ===========================================================================
xdr.union("ExtendedResultExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ExtendedResult {
//       bool fulfilled;
//   
//       union switch(ReviewableRequestType requestType) {
//       case CREATE_SALE:
//           SaleExtended saleExtended;
//       case NONE:
//           void;
//   	case CREATE_ATOMIC_SWAP_BID:
//           ASwapBidExtended aSwapBidExtended;
//       case CREATE_ATOMIC_SWAP:
//           ASwapExtended aSwapExtended;
//       } typeExt;
//   
//      // Reserved for future use
//      union switch (LedgerVersion v)
//      {
//      case EMPTY_VERSION:
//          void;
//      }
//      ext;
//   };
//
// ===========================================================================
xdr.struct("ExtendedResult", [
  ["fulfilled", xdr.bool()],
  ["typeExt", xdr.lookup("ExtendedResultTypeExt")],
  ["ext", xdr.lookup("ExtendedResultExt")],
]);

// === xdr source ============================================================
//
//   union switch(ReviewableRequestType requestType) {
//   	case CREATE_WITHDRAW:
//   		WithdrawalDetails withdrawal;
//       case UPDATE_LIMITS:
//           LimitsUpdateDetails limitsUpdate;
//       case CREATE_AML_ALERT:
//           AMLAlertDetails amlAlertDetails;
//       case CREATE_INVOICE:
//           BillPayDetails billPay;
//       case MANAGE_CONTRACT:
//           ContractDetails contract;
//   	default:
//   		void;
//   	}
//
// ===========================================================================
xdr.union("ReviewRequestOpRequestDetails", {
  switchOn: xdr.lookup("ReviewableRequestType"),
  switchName: "requestType",
  switches: [
    ["createWithdraw", "withdrawal"],
    ["updateLimit", "limitsUpdate"],
    ["createAmlAlert", "amlAlertDetails"],
    ["createInvoice", "billPay"],
    ["manageContract", "contract"],
  ],
  arms: {
    withdrawal: xdr.lookup("WithdrawalDetails"),
    limitsUpdate: xdr.lookup("LimitsUpdateDetails"),
    amlAlertDetails: xdr.lookup("AmlAlertDetails"),
    billPay: xdr.lookup("BillPayDetails"),
    contract: xdr.lookup("ContractDetails"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ReviewRequestOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ReviewRequestOp
//   {
//   	uint64 requestID;
//   	Hash requestHash;
//   	union switch(ReviewableRequestType requestType) {
//   	case CREATE_WITHDRAW:
//   		WithdrawalDetails withdrawal;
//       case UPDATE_LIMITS:
//           LimitsUpdateDetails limitsUpdate;
//       case CREATE_AML_ALERT:
//           AMLAlertDetails amlAlertDetails;
//       case CREATE_INVOICE:
//           BillPayDetails billPay;
//       case MANAGE_CONTRACT:
//           ContractDetails contract;
//   	default:
//   		void;
//   	} requestDetails;
//   	ReviewRequestOpAction action;
//   	longstring reason;
//   	
//       ReviewDetails reviewDetails;
//       
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ReviewRequestOp", [
  ["requestId", xdr.lookup("Uint64")],
  ["requestHash", xdr.lookup("Hash")],
  ["requestDetails", xdr.lookup("ReviewRequestOpRequestDetails")],
  ["action", xdr.lookup("ReviewRequestOpAction")],
  ["reason", xdr.lookup("Longstring")],
  ["reviewDetails", xdr.lookup("ReviewDetails")],
  ["ext", xdr.lookup("ReviewRequestOpExt")],
]);

// === xdr source ============================================================
//
//   enum ReviewRequestResultCode
//   {
//       // Codes considered as "success" for the operation
//       SUCCESS = 0,
//   
//       // Codes considered as "failure" for the operation
//       INVALID_REASON = -1,        // reason must be empty if approving and not empty if rejecting
//   	INVALID_ACTION = -2,
//   	HASH_MISMATCHED = -3,
//   	NOT_FOUND = -4,
//   	TYPE_MISMATCHED = -5,
//   	REJECT_NOT_ALLOWED = -6, // reject not allowed, use permanent reject
//   	INVALID_EXTERNAL_DETAILS = -7,
//   	REQUESTOR_IS_BLOCKED = -8,
//   	PERMANENT_REJECT_NOT_ALLOWED = -9, // permanent reject not allowed, use reject
//   
//   	REMOVING_NOT_SET_TASKS = -100,// cannot remove tasks which are not set
//   
//   	// Asset requests
//   	ASSET_ALREADY_EXISTS = -200,
//   	ASSET_DOES_NOT_EXISTS = -210,
//   
//   	// Issuance requests
//   	MAX_ISSUANCE_AMOUNT_EXCEEDED = -400,
//   	INSUFFICIENT_AVAILABLE_FOR_ISSUANCE_AMOUNT = -410,
//   	FULL_LINE = -420, // can't fund balance - total funds exceed UINT64_MAX
//   	SYSTEM_TASKS_NOT_ALLOWED = -430,
//       INCORRECT_PRECISION = -440,
//   
//   	// Sale creation requests
//   	BASE_ASSET_DOES_NOT_EXISTS = -500,
//   	HARD_CAP_WILL_EXCEED_MAX_ISSUANCE = -510,
//   	INSUFFICIENT_PREISSUED_FOR_HARD_CAP = -520,
//   	BASE_ASSET_NOT_FOUND = -530,
//   	QUOTE_ASSET_NOT_FOUND = -550,
//   
//   	// Update KYC requests
//   	NON_ZERO_TASKS_TO_REMOVE_NOT_ALLOWED = -600,
//   
//   	// Update sale details
//   	SALE_NOT_FOUND = -700,
//   
//       // Invoice requests
//       AMOUNT_MISMATCHED = -1010, // amount does not match
//       DESTINATION_BALANCE_MISMATCHED = -1020, // invoice balance and payment balance do not match
//       NOT_ALLOWED_ACCOUNT_DESTINATION = -1030,
//       REQUIRED_SOURCE_PAY_FOR_DESTINATION = -1040, // not allowed shift fee responsibility to destination
//       SOURCE_BALANCE_MISMATCHED = -1050, // source balance must match invoice sender account
//       CONTRACT_NOT_FOUND = -1060,
//       INVOICE_RECEIVER_BALANCE_LOCK_AMOUNT_OVERFLOW = -1070,
//       INVOICE_ALREADY_APPROVED = -1080,
//   
//       // codes considered as "failure" for the payment operation
//       PAYMENT_V2_MALFORMED = -1100, // bad input0, requestID must be > 0
//       UNDERFUNDED = -1110, // not enough funds in source account
//       LINE_FULL = -1120, // destination would go above their limit
//       DESTINATION_BALANCE_NOT_FOUND = -1130,
//       BALANCE_ASSETS_MISMATCHED = -1140,
//       SRC_BALANCE_NOT_FOUND = -1150, // source balance not found
//       REFERENCE_DUPLICATION = -1160,
//       STATS_OVERFLOW = -1170,
//       LIMITS_EXCEEDED = -1180,
//       NOT_ALLOWED_BY_ASSET_POLICY = -1190,
//       INVALID_DESTINATION_FEE = -1200,
//       INVALID_DESTINATION_FEE_ASSET = -1210, // destination fee asset must be the same as source balance asset
//       FEE_ASSET_MISMATCHED = -1220,
//       INSUFFICIENT_FEE_AMOUNT = -1230,
//       BALANCE_TO_CHARGE_FEE_FROM_NOT_FOUND = -1240,
//       PAYMENT_AMOUNT_IS_LESS_THAN_DEST_FEE = -1250,
//       DESTINATION_ACCOUNT_NOT_FOUND = -1260,
//   
//       // Limits update requests
//       CANNOT_CREATE_FOR_ACC_ID_AND_ACC_TYPE = 1300, // limits cannot be created for account ID and account type simultaneously
//       INVALID_LIMITS = 1310,
//   
//       // Contract requests
//       CONTRACT_DETAILS_TOO_LONG = -1400, // customer details reached length limit
//   
//   	// Atomic swap
//   	BASE_ASSET_CANNOT_BE_SWAPPED = -1500,
//   	QUOTE_ASSET_CANNOT_BE_SWAPPED = -1501,
//   	ASSETS_ARE_EQUAL = -1502,
//   	ASWAP_BID_UNDERFUNDED = -1503,
//   	ASWAP_PURCHASER_FULL_LINE = -1504
//   
//   };
//
// ===========================================================================
xdr.enum("ReviewRequestResultCode", {
  success: 0,
  invalidReason: -1,
  invalidAction: -2,
  hashMismatched: -3,
  notFound: -4,
  typeMismatched: -5,
  rejectNotAllowed: -6,
  invalidExternalDetail: -7,
  requestorIsBlocked: -8,
  permanentRejectNotAllowed: -9,
  removingNotSetTask: -100,
  assetAlreadyExist: -200,
  assetDoesNotExist: -210,
  maxIssuanceAmountExceeded: -400,
  insufficientAvailableForIssuanceAmount: -410,
  fullLine: -420,
  systemTasksNotAllowed: -430,
  incorrectPrecision: -440,
  baseAssetDoesNotExist: -500,
  hardCapWillExceedMaxIssuance: -510,
  insufficientPreissuedForHardCap: -520,
  baseAssetNotFound: -530,
  quoteAssetNotFound: -550,
  nonZeroTasksToRemoveNotAllowed: -600,
  saleNotFound: -700,
  amountMismatched: -1010,
  destinationBalanceMismatched: -1020,
  notAllowedAccountDestination: -1030,
  requiredSourcePayForDestination: -1040,
  sourceBalanceMismatched: -1050,
  contractNotFound: -1060,
  invoiceReceiverBalanceLockAmountOverflow: -1070,
  invoiceAlreadyApproved: -1080,
  paymentV2Malformed: -1100,
  underfunded: -1110,
  lineFull: -1120,
  destinationBalanceNotFound: -1130,
  balanceAssetsMismatched: -1140,
  srcBalanceNotFound: -1150,
  referenceDuplication: -1160,
  statsOverflow: -1170,
  limitsExceeded: -1180,
  notAllowedByAssetPolicy: -1190,
  invalidDestinationFee: -1200,
  invalidDestinationFeeAsset: -1210,
  feeAssetMismatched: -1220,
  insufficientFeeAmount: -1230,
  balanceToChargeFeeFromNotFound: -1240,
  paymentAmountIsLessThanDestFee: -1250,
  destinationAccountNotFound: -1260,
  cannotCreateForAccIdAndAccType: 1300,
  invalidLimit: 1310,
  contractDetailsTooLong: -1400,
  baseAssetCannotBeSwapped: -1500,
  quoteAssetCannotBeSwapped: -1501,
  assetsAreEqual: -1502,
  aswapBidUnderfunded: -1503,
  aswapPurchaserFullLine: -1504,
});

// === xdr source ============================================================
//
//   union ReviewRequestResult switch (ReviewRequestResultCode code)
//   {
//   case SUCCESS:
//   	ExtendedResult success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ReviewRequestResult", {
  switchOn: xdr.lookup("ReviewRequestResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("ExtendedResult"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   enum KeyValueEntryType
//       {
//           UINT32 = 1,
//           STRING = 2,
//           UINT64 = 3
//       };
//
// ===========================================================================
xdr.enum("KeyValueEntryType", {
  uint32: 1,
  string: 2,
  uint64: 3,
});

// === xdr source ============================================================
//
//   union KeyValueEntryValue switch (KeyValueEntryType type)
//       {
//           case UINT32:
//               uint32 ui32Value;
//           case STRING:
//               string stringValue<>;
//           case UINT64:
//               uint64 ui64Value;
//       };
//
// ===========================================================================
xdr.union("KeyValueEntryValue", {
  switchOn: xdr.lookup("KeyValueEntryType"),
  switchName: "type",
  switches: [
    ["uint32", "ui32Value"],
    ["string", "stringValue"],
    ["uint64", "ui64Value"],
  ],
  arms: {
    ui32Value: xdr.lookup("Uint32"),
    stringValue: xdr.string(),
    ui64Value: xdr.lookup("Uint64"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//           {
//               case EMPTY_VERSION:
//                   void;
//           }
//
// ===========================================================================
xdr.union("KeyValueEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct KeyValueEntry
//       {
//           longstring key;
//   
//           KeyValueEntryValue value;
//   
//           // reserved for future use
//           union switch (LedgerVersion v)
//           {
//               case EMPTY_VERSION:
//                   void;
//           }
//           ext;
//       };
//
// ===========================================================================
xdr.struct("KeyValueEntry", [
  ["key", xdr.lookup("Longstring")],
  ["value", xdr.lookup("KeyValueEntryValue")],
  ["ext", xdr.lookup("KeyValueEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreateSaleCreationRequestOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateSaleCreationRequestOp
//   {
//   	uint64 requestID;
//       SaleCreationRequest request;
//   
//       uint32* allTasks;
//   
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   
//   };
//
// ===========================================================================
xdr.struct("CreateSaleCreationRequestOp", [
  ["requestId", xdr.lookup("Uint64")],
  ["request", xdr.lookup("SaleCreationRequest")],
  ["allTasks", xdr.option(xdr.lookup("Uint32"))],
  ["ext", xdr.lookup("CreateSaleCreationRequestOpExt")],
]);

// === xdr source ============================================================
//
//   enum CreateSaleCreationRequestResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//   	REQUEST_NOT_FOUND = -1, // trying to update reviewable request which does not exists
//   	BASE_ASSET_OR_ASSET_REQUEST_NOT_FOUND = -2, // failed to find asset or asset request for sale
//   	QUOTE_ASSET_NOT_FOUND = -3, // failed to find quote asset
//   	START_END_INVALID = -4, // sale ends before start
//   	INVALID_END = -5, // end date is in the past
//   	INVALID_PRICE = -6, // price can not be 0
//   	INVALID_CAP = -7, // hard cap is < soft cap
//   	INSUFFICIENT_MAX_ISSUANCE = -8, // max number of tokens is less then number of tokens required for soft cap
//   	INVALID_ASSET_PAIR = -9, // one of the assets has invalid code or base asset is equal to quote asset
//   	REQUEST_OR_SALE_ALREADY_EXISTS = -10,
//   	INSUFFICIENT_PREISSUED = -11, // amount of pre issued tokens is insufficient for hard cap
//   	INVALID_DETAILS = -12, // details must be a valid json
//   	VERSION_IS_NOT_SUPPORTED_YET = -13, // version specified in request is not supported yet
//       SALE_CREATE_TASKS_NOT_FOUND = -14,
//       NOT_ALLOWED_TO_SET_TASKS_ON_UPDATE = -15, // can't set allTasks on request update
//       PENDING_REQUEST_UPDATE_NOT_ALLOWED = -16
//   };
//
// ===========================================================================
xdr.enum("CreateSaleCreationRequestResultCode", {
  success: 0,
  requestNotFound: -1,
  baseAssetOrAssetRequestNotFound: -2,
  quoteAssetNotFound: -3,
  startEndInvalid: -4,
  invalidEnd: -5,
  invalidPrice: -6,
  invalidCap: -7,
  insufficientMaxIssuance: -8,
  invalidAssetPair: -9,
  requestOrSaleAlreadyExist: -10,
  insufficientPreissued: -11,
  invalidDetail: -12,
  versionIsNotSupportedYet: -13,
  saleCreateTasksNotFound: -14,
  notAllowedToSetTasksOnUpdate: -15,
  pendingRequestUpdateNotAllowed: -16,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreateSaleCreationSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateSaleCreationSuccess {
//   	uint64 requestID;
//       uint64 saleID;
//   
//       bool fulfilled;
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CreateSaleCreationSuccess", [
  ["requestId", xdr.lookup("Uint64")],
  ["saleId", xdr.lookup("Uint64")],
  ["fulfilled", xdr.bool()],
  ["ext", xdr.lookup("CreateSaleCreationSuccessExt")],
]);

// === xdr source ============================================================
//
//   union CreateSaleCreationRequestResult switch (CreateSaleCreationRequestResultCode code)
//   {
//       case SUCCESS:
//           CreateSaleCreationSuccess success;
//       default:
//           void;
//   };
//
// ===========================================================================
xdr.union("CreateSaleCreationRequestResult", {
  switchOn: xdr.lookup("CreateSaleCreationRequestResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("CreateSaleCreationSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreatePreIssuanceRequestOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreatePreIssuanceRequestOp
//   {
//       PreIssuanceRequest request;
//   
//       uint32* allTasks;
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CreatePreIssuanceRequestOp", [
  ["request", xdr.lookup("PreIssuanceRequest")],
  ["allTasks", xdr.option(xdr.lookup("Uint32"))],
  ["ext", xdr.lookup("CreatePreIssuanceRequestOpExt")],
]);

// === xdr source ============================================================
//
//   enum CreatePreIssuanceRequestResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       ASSET_NOT_FOUND = -1,
//       REFERENCE_DUPLICATION = -2,      // reference is already used
//       NOT_AUTHORIZED_UPLOAD = -3,      // tries to pre issue asset for not owned asset
//       INVALID_SIGNATURE = -4,
//       EXCEEDED_MAX_AMOUNT = -5,
//       INVALID_AMOUNT = -6,             // amount is 0
//       INVALID_REFERENCE = -7,
//       INCORRECT_AMOUNT_PRECISION = -8,  // amount does not fit to this asset's precision
//       PREISSUANCE_TASKS_NOT_FOUND = -9
//   };
//
// ===========================================================================
xdr.enum("CreatePreIssuanceRequestResultCode", {
  success: 0,
  assetNotFound: -1,
  referenceDuplication: -2,
  notAuthorizedUpload: -3,
  invalidSignature: -4,
  exceededMaxAmount: -5,
  invalidAmount: -6,
  invalidReference: -7,
  incorrectAmountPrecision: -8,
  preissuanceTasksNotFound: -9,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("CreatePreIssuanceRequestResultSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//   		uint64 requestID;
//   		bool fulfilled;
//   		// reserved for future use
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	}
//
// ===========================================================================
xdr.struct("CreatePreIssuanceRequestResultSuccess", [
  ["requestId", xdr.lookup("Uint64")],
  ["fulfilled", xdr.bool()],
  ["ext", xdr.lookup("CreatePreIssuanceRequestResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   union CreatePreIssuanceRequestResult switch (CreatePreIssuanceRequestResultCode code)
//   {
//   case SUCCESS:
//       struct {
//   		uint64 requestID;
//   		bool fulfilled;
//   		// reserved for future use
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	} success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("CreatePreIssuanceRequestResult", {
  switchOn: xdr.lookup("CreatePreIssuanceRequestResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("CreatePreIssuanceRequestResultSuccess"),
  },
  defaultArm: xdr.void(),
});

});
export default types;
