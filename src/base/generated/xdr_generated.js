// Automatically generated on 2018-06-06T13:11:29+03:00
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
  ["asset", xdr.lookup("AssetCode")],
  ["accountId", xdr.lookup("AccountId")],
  ["amount", xdr.lookup("Uint64")],
  ["locked", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("BalanceEntryExt")],
]);

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
//       INVALID_NEW_DETAILS = -2, // newDetails field is invalid JSON
//       UPDATE_DETAILS_REQUEST_ALREADY_EXISTS = -3,
//       UPDATE_DETAILS_REQUEST_NOT_FOUND = -4
//   };
//
// ===========================================================================
xdr.enum("ManageSaleResultCode", {
  success: 0,
  saleNotFound: -1,
  invalidNewDetail: -2,
  updateDetailsRequestAlreadyExist: -3,
  updateDetailsRequestNotFound: -4,
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
//       union switch (ManageSaleAction action) {
//       case CREATE_UPDATE_DETAILS_REQUEST:
//           uint64 requestID;
//       case CANCEL:
//           void;
//       } response;
//   
//       //reserved for future use
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
//   enum ReviewableRequestType
//   {
//       ASSET_CREATE = 0,
//   	ASSET_UPDATE = 1,
//   	PRE_ISSUANCE_CREATE = 2,
//   	ISSUANCE_CREATE = 3,
//   	WITHDRAW = 4,
//   	SALE = 5,
//   	LIMITS_UPDATE = 6,
//   	TWO_STEP_WITHDRAWAL = 7,
//       AML_ALERT = 8,
//   	UPDATE_KYC = 9,
//   	UPDATE_SALE_DETAILS = 10
//   };
//
// ===========================================================================
xdr.enum("ReviewableRequestType", {
  assetCreate: 0,
  assetUpdate: 1,
  preIssuanceCreate: 2,
  issuanceCreate: 3,
  withdraw: 4,
  sale: 5,
  limitsUpdate: 6,
  twoStepWithdrawal: 7,
  amlAlert: 8,
  updateKyc: 9,
  updateSaleDetail: 10,
});

// === xdr source ============================================================
//
//   union switch (ReviewableRequestType type) {
//   		case ASSET_CREATE:
//   			AssetCreationRequest assetCreationRequest;
//   		case ASSET_UPDATE:
//   			AssetUpdateRequest assetUpdateRequest;
//   		case PRE_ISSUANCE_CREATE:
//   			PreIssuanceRequest preIssuanceRequest;
//   		case ISSUANCE_CREATE:
//   			IssuanceRequest issuanceRequest;
//   		case WITHDRAW:
//   			WithdrawalRequest withdrawalRequest;
//   		case SALE:
//   			SaleCreationRequest saleCreationRequest;
//           case LIMITS_UPDATE:
//               LimitsUpdateRequest limitsUpdateRequest;
//   		case TWO_STEP_WITHDRAWAL:
//   			WithdrawalRequest twoStepWithdrawalRequest;
//           case AML_ALERT:
//               AMLAlertRequest amlAlertRequest;
//           case UPDATE_KYC:
//               UpdateKYCRequest updateKYCRequest;
//           case UPDATE_SALE_DETAILS:
//               UpdateSaleDetailsRequest updateSaleDetailsRequest;
//   	}
//
// ===========================================================================
xdr.union("ReviewableRequestEntryBody", {
  switchOn: xdr.lookup("ReviewableRequestType"),
  switchName: "type",
  switches: [
    ["assetCreate", "assetCreationRequest"],
    ["assetUpdate", "assetUpdateRequest"],
    ["preIssuanceCreate", "preIssuanceRequest"],
    ["issuanceCreate", "issuanceRequest"],
    ["withdraw", "withdrawalRequest"],
    ["sale", "saleCreationRequest"],
    ["limitsUpdate", "limitsUpdateRequest"],
    ["twoStepWithdrawal", "twoStepWithdrawalRequest"],
    ["amlAlert", "amlAlertRequest"],
    ["updateKyc", "updateKycRequest"],
    ["updateSaleDetail", "updateSaleDetailsRequest"],
  ],
  arms: {
    assetCreationRequest: xdr.lookup("AssetCreationRequest"),
    assetUpdateRequest: xdr.lookup("AssetUpdateRequest"),
    preIssuanceRequest: xdr.lookup("PreIssuanceRequest"),
    issuanceRequest: xdr.lookup("IssuanceRequest"),
    withdrawalRequest: xdr.lookup("WithdrawalRequest"),
    saleCreationRequest: xdr.lookup("SaleCreationRequest"),
    limitsUpdateRequest: xdr.lookup("LimitsUpdateRequest"),
    twoStepWithdrawalRequest: xdr.lookup("WithdrawalRequest"),
    amlAlertRequest: xdr.lookup("AmlAlertRequest"),
    updateKycRequest: xdr.lookup("UpdateKycRequest"),
    updateSaleDetailsRequest: xdr.lookup("UpdateSaleDetailsRequest"),
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
//   		case ASSET_CREATE:
//   			AssetCreationRequest assetCreationRequest;
//   		case ASSET_UPDATE:
//   			AssetUpdateRequest assetUpdateRequest;
//   		case PRE_ISSUANCE_CREATE:
//   			PreIssuanceRequest preIssuanceRequest;
//   		case ISSUANCE_CREATE:
//   			IssuanceRequest issuanceRequest;
//   		case WITHDRAW:
//   			WithdrawalRequest withdrawalRequest;
//   		case SALE:
//   			SaleCreationRequest saleCreationRequest;
//           case LIMITS_UPDATE:
//               LimitsUpdateRequest limitsUpdateRequest;
//   		case TWO_STEP_WITHDRAWAL:
//   			WithdrawalRequest twoStepWithdrawalRequest;
//           case AML_ALERT:
//               AMLAlertRequest amlAlertRequest;
//           case UPDATE_KYC:
//               UpdateKYCRequest updateKYCRequest;
//           case UPDATE_SALE_DETAILS:
//               UpdateSaleDetailsRequest updateSaleDetailsRequest;
//   	} body;
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
xdr.struct("ReviewableRequestEntry", [
  ["requestId", xdr.lookup("Uint64")],
  ["hash", xdr.lookup("Hash")],
  ["requestor", xdr.lookup("AccountId")],
  ["rejectReason", xdr.lookup("Longstring")],
  ["reviewer", xdr.lookup("AccountId")],
  ["reference", xdr.option(xdr.lookup("String64"))],
  ["createdAt", xdr.lookup("Int64")],
  ["body", xdr.lookup("ReviewableRequestEntryBody")],
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
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageInvoiceOpExt", {
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
//   struct ManageInvoiceOp
//   {
//       BalanceID receiverBalance;
//   	AccountID sender;
//       int64 amount; // if set to 0, delete the invoice
//   
//       // 0=create a new invoice, otherwise edit an existing invoice
//       uint64 invoiceID;
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
xdr.struct("ManageInvoiceOp", [
  ["receiverBalance", xdr.lookup("BalanceId")],
  ["sender", xdr.lookup("AccountId")],
  ["amount", xdr.lookup("Int64")],
  ["invoiceId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("ManageInvoiceOpExt")],
]);

// === xdr source ============================================================
//
//   enum ManageInvoiceResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       MALFORMED = -1,
//       BALANCE_NOT_FOUND = -2,
//   	INVOICE_OVERFLOW = -3,
//   
//       NOT_FOUND = -4,
//       TOO_MANY_INVOICES = -5,
//       CAN_NOT_DELETE_IN_PROGRESS = -6
//   };
//
// ===========================================================================
xdr.enum("ManageInvoiceResultCode", {
  success: 0,
  malformed: -1,
  balanceNotFound: -2,
  invoiceOverflow: -3,
  notFound: -4,
  tooManyInvoice: -5,
  canNotDeleteInProgress: -6,
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
xdr.union("ManageInvoiceSuccessResultExt", {
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
//   struct ManageInvoiceSuccessResult 
//   {
//   	uint64 invoiceID;
//   	AssetCode asset;
//   	BalanceID senderBalance;
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
xdr.struct("ManageInvoiceSuccessResult", [
  ["invoiceId", xdr.lookup("Uint64")],
  ["asset", xdr.lookup("AssetCode")],
  ["senderBalance", xdr.lookup("BalanceId")],
  ["ext", xdr.lookup("ManageInvoiceSuccessResultExt")],
]);

// === xdr source ============================================================
//
//   union ManageInvoiceResult switch (ManageInvoiceResultCode code)
//   {
//   case SUCCESS:
//       ManageInvoiceSuccessResult success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ManageInvoiceResult", {
  switchOn: xdr.lookup("ManageInvoiceResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("ManageInvoiceSuccessResult"),
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
//   	VERSION_IS_NOT_SUPPORTED_YET = -13 // version specified in request is not supported yet
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
xdr.struct("CreateSaleCreationSuccess", [
  ["requestId", xdr.lookup("Uint64")],
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
//   enum KeyValueEntryType
//       {
//           UINT32 = 1,
//           STRING = 2
//       };
//
// ===========================================================================
xdr.enum("KeyValueEntryType", {
  uint32: 1,
  string: 2,
});

// === xdr source ============================================================
//
//   union switch (KeyValueEntryType type)
//           {
//                case UINT32:
//                   uint32 ui32Value;
//                case STRING:
//                   string stringValue<>;
//           }
//
// ===========================================================================
xdr.union("KeyValueEntryValue", {
  switchOn: xdr.lookup("KeyValueEntryType"),
  switchName: "type",
  switches: [
    ["uint32", "ui32Value"],
    ["string", "stringValue"],
  ],
  arms: {
    ui32Value: xdr.lookup("Uint32"),
    stringValue: xdr.string(),
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
//           union switch (KeyValueEntryType type)
//           {
//                case UINT32:
//                   uint32 ui32Value;
//                case STRING:
//                   string stringValue<>;
//           }
//           value;
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
xdr.union("UpdateKycRequestDataExt", {
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
//   struct UpdateKYCRequestData {
//       AccountID accountToUpdateKYC;
//   	AccountType accountTypeToSet;
//   	uint32 kycLevelToSet;
//       longstring kycData;
//   	uint32* allTasks;
//   
//   	// Reserved for future use
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("UpdateKycRequestData", [
  ["accountToUpdateKyc", xdr.lookup("AccountId")],
  ["accountTypeToSet", xdr.lookup("AccountType")],
  ["kycLevelToSet", xdr.lookup("Uint32")],
  ["kycData", xdr.lookup("Longstring")],
  ["allTasks", xdr.option(xdr.lookup("Uint32"))],
  ["ext", xdr.lookup("UpdateKycRequestDataExt")],
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
xdr.union("CreateUpdateKycRequestOpExt", {
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
//   struct CreateUpdateKYCRequestOp {
//       uint64 requestID;
//       UpdateKYCRequestData updateKYCRequestData;
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CreateUpdateKycRequestOp", [
  ["requestId", xdr.lookup("Uint64")],
  ["updateKycRequestData", xdr.lookup("UpdateKycRequestData")],
  ["ext", xdr.lookup("CreateUpdateKycRequestOpExt")],
]);

// === xdr source ============================================================
//
//   enum CreateUpdateKYCRequestResultCode
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
xdr.enum("CreateUpdateKycRequestResultCode", {
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
xdr.union("CreateUpdateKycRequestResultSuccessExt", {
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
xdr.struct("CreateUpdateKycRequestResultSuccess", [
  ["requestId", xdr.lookup("Uint64")],
  ["fulfilled", xdr.bool()],
  ["ext", xdr.lookup("CreateUpdateKycRequestResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   union CreateUpdateKYCRequestResult switch (CreateUpdateKYCRequestResultCode code)
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
xdr.union("CreateUpdateKycRequestResult", {
  switchOn: xdr.lookup("CreateUpdateKycRequestResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("CreateUpdateKycRequestResultSuccess"),
  },
  defaultArm: xdr.void(),
});

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
//       AUTO_GENERATED_TYPE_NOT_ALLOWED = -3,
//       NOT_FOUND = -4
//   };
//
// ===========================================================================
xdr.enum("ManageExternalSystemAccountIdPoolEntryResultCode", {
  success: 0,
  malformed: -1,
  alreadyExist: -2,
  autoGeneratedTypeNotAllowed: -3,
  notFound: -4,
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
//   enum WithdrawalType {
//   	AUTO_CONVERSION = 0
//   };
//
// ===========================================================================
xdr.enum("WithdrawalType", {
  autoConversion: 0,
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
xdr.union("AutoConversionWithdrawalDetailsExt", {
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
//   struct AutoConversionWithdrawalDetails {
//   	AssetCode destAsset; // asset in which withdrawal will be converted
//   	uint64 expectedAmount; // expected amount to be received in specified asset
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
xdr.struct("AutoConversionWithdrawalDetails", [
  ["destAsset", xdr.lookup("AssetCode")],
  ["expectedAmount", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("AutoConversionWithdrawalDetailsExt")],
]);

// === xdr source ============================================================
//
//   union switch (WithdrawalType withdrawalType) {
//   	case AUTO_CONVERSION:
//   		AutoConversionWithdrawalDetails autoConversion;
//   	}
//
// ===========================================================================
xdr.union("WithdrawalRequestDetails", {
  switchOn: xdr.lookup("WithdrawalType"),
  switchName: "withdrawalType",
  switches: [
    ["autoConversion", "autoConversion"],
  ],
  arms: {
    autoConversion: xdr.lookup("AutoConversionWithdrawalDetails"),
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
//       longstring externalDetails; // details of the withdrawal (External system id, etc.)
//   	longstring preConfirmationDetails; // details provided by PSIM if two step withdrwal is required
//   	union switch (WithdrawalType withdrawalType) {
//   	case AUTO_CONVERSION:
//   		AutoConversionWithdrawalDetails autoConversion;
//   	} details;
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
  ["externalDetails", xdr.lookup("Longstring")],
  ["preConfirmationDetails", xdr.lookup("Longstring")],
  ["details", xdr.lookup("WithdrawalRequestDetails")],
  ["ext", xdr.lookup("WithdrawalRequestExt")],
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
//   struct LimitsUpdateRequest {
//       Hash documentHash;
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
  ["documentHash", xdr.lookup("Hash")],
  ["ext", xdr.lookup("LimitsUpdateRequestExt")],
]);

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
//                   KeyValueEntry value;
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
    value: xdr.lookup("KeyValueEntry"),
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
//           string256 key;
//           union switch(ManageKVAction action)
//           {
//               case PUT:
//                   KeyValueEntry value;
//               case REMOVE:
//                   void;
//           }
//           action;
//   
//           // reserved for future use
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       };
//
// ===========================================================================
xdr.struct("ManageKeyValueOp", [
  ["key", xdr.lookup("String256")],
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
//           SUCCESS = 1,
//           NOT_FOUND = -1,
//           INVALID_TYPE = -2
//       };
//
// ===========================================================================
xdr.enum("ManageKeyValueResultCode", {
  success: 1,
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
//       NO_AVAILABLE_ID = -2,
//       AUTO_GENERATED_TYPE_NOT_ALLOWED = -3
//   };
//
// ===========================================================================
xdr.enum("BindExternalSystemAccountIdResultCode", {
  success: 0,
  malformed: -1,
  noAvailableId: -2,
  autoGeneratedTypeNotAllowed: -3,
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
//   	REQUIRES_KYC = -24 // source must have KYC in order to participate
//   
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
//   	case PASS_EXTERNAL_SYS_ACC_ID_IN_CREATE_ACC:
//   		ExternalSystemAccountID externalSystemIDs<>;
//       }
//
// ===========================================================================
xdr.union("CreateAccountOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
    ["passExternalSysAccIdInCreateAcc", "externalSystemIDs"],
  ],
  arms: {
    externalSystemIDs: xdr.varArray(xdr.lookup("ExternalSystemAccountId"), 2147483647),
  },
});

// === xdr source ============================================================
//
//   struct CreateAccountOp
//   {
//       AccountID destination; // account to create
//       AccountID recoveryKey; // recovery signer's public key
//       AccountID* referrer;     // parent account
//   	AccountType accountType;
//   	uint32 policies;
//   
//   	 // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;	
//   	case PASS_EXTERNAL_SYS_ACC_ID_IN_CREATE_ACC:
//   		ExternalSystemAccountID externalSystemIDs<>;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CreateAccountOp", [
  ["destination", xdr.lookup("AccountId")],
  ["recoveryKey", xdr.lookup("AccountId")],
  ["referrer", xdr.option(xdr.lookup("AccountId"))],
  ["accountType", xdr.lookup("AccountType")],
  ["policies", xdr.lookup("Uint32")],
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
//       MALFORMED = -1,       // invalid destination
//   	ACCOUNT_TYPE_MISMATCHED = -2, // account already exist and change of account type is not allowed
//   	TYPE_NOT_ALLOWED = -3, // master or commission account types are not allowed
//       NAME_DUPLICATION = -4,
//       REFERRER_NOT_FOUND = -5,
//   	INVALID_ACCOUNT_VERSION = -6, // if account version is higher than ledger version
//   	NOT_VERIFIED_CANNOT_HAVE_POLICIES = -7,
//   	EXTERNAL_SYS_ACC_NOT_ALLOWED = -8, // op contains external system account ID which should be generated on core level
//   	EXTERNAL_SYS_ID_EXISTS = -9 // external system account ID already exists
//   };
//
// ===========================================================================
xdr.enum("CreateAccountResultCode", {
  success: 0,
  malformed: -1,
  accountTypeMismatched: -2,
  typeNotAllowed: -3,
  nameDuplication: -4,
  referrerNotFound: -5,
  invalidAccountVersion: -6,
  notVerifiedCannotHavePolicy: -7,
  externalSysAccNotAllowed: -8,
  externalSysIdExist: -9,
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
//   	ExternalSystemAccountID externalSystemIDs<>;
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
  ["externalSystemIDs", xdr.varArray(xdr.lookup("ExternalSystemAccountId"), 2147483647)],
  ["ext", xdr.lookup("CreateAccountSuccessExt")],
]);

// === xdr source ============================================================
//
//   union CreateAccountResult switch (CreateAccountResultCode code)
//   {
//   case SUCCESS:
//       CreateAccountSuccess success;
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
  ],
  arms: {
    success: xdr.lookup("CreateAccountSuccess"),
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
//   enum LedgerVersion {
//   	EMPTY_VERSION = 0,
//   	PASS_EXTERNAL_SYS_ACC_ID_IN_CREATE_ACC = 1,
//   	DETAILED_LEDGER_CHANGES = 2, // write more all ledger changes to transaction meta
//   	NEW_SIGNER_TYPES = 3, // use more comprehensive list of signer types
//   	TYPED_SALE = 4, // sales can have type
//   	UNIQUE_BALANCE_CREATION = 5, // allows to specify in manage balance that balance should not be created if one for such asset and account exists
//   	ASSET_PREISSUER_MIGRATION = 6,
//   	ASSET_PREISSUER_MIGRATED = 7,
//   	USE_KYC_LEVEL = 8,
//   	ERROR_ON_NON_ZERO_TASKS_TO_REMOVE_IN_REJECT_KYC = 9,
//   	ALLOW_ACCOUNT_MANAGER_TO_CHANGE_KYC = 10,
//   	CHANGE_ASSET_ISSUER_BAD_AUTH_EXTRA_FIXED = 11,
//   	AUTO_CREATE_COMMISSION_BALANCE_ON_TRANSFER = 12,
//       ALLOW_REJECT_REQUEST_OF_BLOCKED_REQUESTOR = 13,
//   	ASSET_UPDATE_CHECK_REFERENCE_EXISTS = 14,
//   	CROSS_ASSET_FEE = 15,
//   	USE_PAYMENT_V2 = 16,
//   	ALLOW_SYNDICATE_TO_UPDATE_KYC = 17,
//   	DO_NOT_BUILD_ACCOUNT_IF_VERSION_EQUALS_OR_GREATER = 18,
//   	ALLOW_TO_SPECIFY_REQUIRED_BASE_ASSET_AMOUNT_FOR_HARD_CAP = 19,
//   	KYC_RULES = 20,
//   	ALLOW_TO_CREATE_SEVERAL_SALES = 21,
//   	KEY_VALUE_POOL_ENTRY_EXPIRES_AT = 22,
//   	KEY_VALUE_UPDATE = 23,
//   	ALLOW_TO_CANCEL_SALE_PARTICIP_WITHOUT_SPECIFING_BALANCE = 24,
//   	DETAILS_MAX_LENGTH_EXTENDED = 25,
//   	ALLOW_MASTER_TO_MANAGE_SALE = 26
//   };
//
// ===========================================================================
xdr.enum("LedgerVersion", {
  emptyVersion: 0,
  passExternalSysAccIdInCreateAcc: 1,
  detailedLedgerChange: 2,
  newSignerType: 3,
  typedSale: 4,
  uniqueBalanceCreation: 5,
  assetPreissuerMigration: 6,
  assetPreissuerMigrated: 7,
  useKycLevel: 8,
  errorOnNonZeroTasksToRemoveInRejectKyc: 9,
  allowAccountManagerToChangeKyc: 10,
  changeAssetIssuerBadAuthExtraFixed: 11,
  autoCreateCommissionBalanceOnTransfer: 12,
  allowRejectRequestOfBlockedRequestor: 13,
  assetUpdateCheckReferenceExist: 14,
  crossAssetFee: 15,
  usePaymentV2: 16,
  allowSyndicateToUpdateKyc: 17,
  doNotBuildAccountIfVersionEqualsOrGreater: 18,
  allowToSpecifyRequiredBaseAssetAmountForHardCap: 19,
  kycRule: 20,
  allowToCreateSeveralSale: 21,
  keyValuePoolEntryExpiresAt: 22,
  keyValueUpdate: 23,
  allowToCancelSaleParticipWithoutSpecifingBalance: 24,
  detailsMaxLengthExtended: 25,
  allowMasterToManageSale: 26,
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
//       CREATE_ACCOUNT = 0,
//       PAYMENT = 1,
//       SET_OPTIONS = 2,
//       CREATE_ISSUANCE_REQUEST = 3,
//       SET_FEES = 5,
//   	MANAGE_ACCOUNT = 6,
//       CREATE_WITHDRAWAL_REQUEST = 7,
//       MANAGE_BALANCE = 9,
//       REVIEW_PAYMENT_REQUEST = 10,
//       MANAGE_ASSET = 11,
//       CREATE_PREISSUANCE_REQUEST = 12,
//       SET_LIMITS = 13,
//       DIRECT_DEBIT = 14,
//   	MANAGE_ASSET_PAIR = 15,
//   	MANAGE_OFFER = 16,
//       MANAGE_INVOICE = 17,
//   	REVIEW_REQUEST = 18,
//   	CREATE_SALE_REQUEST = 19,
//   	CHECK_SALE_STATE = 20,
//       CREATE_AML_ALERT = 21,
//       CREATE_KYC_REQUEST = 22,
//       PAYMENT_V2 = 23,
//       MANAGE_EXTERNAL_SYSTEM_ACCOUNT_ID_POOL_ENTRY = 24,
//       BIND_EXTERNAL_SYSTEM_ACCOUNT_ID = 25,
//       MANAGE_SALE = 26,
//       MANAGE_KEY_VALUE = 27
//   };
//
// ===========================================================================
xdr.enum("OperationType", {
  createAccount: 0,
  payment: 1,
  setOption: 2,
  createIssuanceRequest: 3,
  setFee: 5,
  manageAccount: 6,
  createWithdrawalRequest: 7,
  manageBalance: 9,
  reviewPaymentRequest: 10,
  manageAsset: 11,
  createPreissuanceRequest: 12,
  setLimit: 13,
  directDebit: 14,
  manageAssetPair: 15,
  manageOffer: 16,
  manageInvoice: 17,
  reviewRequest: 18,
  createSaleRequest: 19,
  checkSaleState: 20,
  createAmlAlert: 21,
  createKycRequest: 22,
  paymentV2: 23,
  manageExternalSystemAccountIdPoolEntry: 24,
  bindExternalSystemAccountId: 25,
  manageSale: 26,
  manageKeyValue: 27,
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
//   union switch (OperationType type)
//       {
//       case CREATE_ACCOUNT:
//           CreateAccountOp createAccountOp;
//       case PAYMENT:
//           PaymentOp paymentOp;
//       case SET_OPTIONS:
//           SetOptionsOp setOptionsOp;
//   	case CREATE_ISSUANCE_REQUEST:
//   		CreateIssuanceRequestOp createIssuanceRequestOp;
//       case SET_FEES:
//           SetFeesOp setFeesOp;
//   	case MANAGE_ACCOUNT:
//   		ManageAccountOp manageAccountOp;
//   	case CREATE_WITHDRAWAL_REQUEST:
//   		CreateWithdrawalRequestOp createWithdrawalRequestOp;
//   	case MANAGE_BALANCE:
//   		ManageBalanceOp manageBalanceOp;
//   	case REVIEW_PAYMENT_REQUEST:
//   		ReviewPaymentRequestOp reviewPaymentRequestOp;
//       case MANAGE_ASSET:
//           ManageAssetOp manageAssetOp;
//       case CREATE_PREISSUANCE_REQUEST:
//           CreatePreIssuanceRequestOp createPreIssuanceRequest;
//       case SET_LIMITS:
//           SetLimitsOp setLimitsOp;
//       case DIRECT_DEBIT:
//           DirectDebitOp directDebitOp;
//   	case MANAGE_ASSET_PAIR:
//   		ManageAssetPairOp manageAssetPairOp;
//   	case MANAGE_OFFER:
//   		ManageOfferOp manageOfferOp;
//       case MANAGE_INVOICE:
//           ManageInvoiceOp manageInvoiceOp;
//   	case REVIEW_REQUEST:
//   		ReviewRequestOp reviewRequestOp;
//   	case CREATE_SALE_REQUEST:
//   		CreateSaleCreationRequestOp createSaleCreationRequestOp;
//   	case CHECK_SALE_STATE:
//   		CheckSaleStateOp checkSaleStateOp;
//   	case CREATE_AML_ALERT:
//   	    CreateAMLAlertRequestOp createAMLAlertRequestOp;
//   	case MANAGE_KEY_VALUE:
//   	    ManageKeyValueOp manageKeyValueOp;
//   	case CREATE_KYC_REQUEST:
//   		CreateUpdateKYCRequestOp createUpdateKYCRequestOp;
//       case MANAGE_EXTERNAL_SYSTEM_ACCOUNT_ID_POOL_ENTRY:
//           ManageExternalSystemAccountIdPoolEntryOp manageExternalSystemAccountIdPoolEntryOp;
//       case BIND_EXTERNAL_SYSTEM_ACCOUNT_ID:
//           BindExternalSystemAccountIdOp bindExternalSystemAccountIdOp;
//       case PAYMENT_V2:
//           PaymentOpV2 paymentOpV2;
//       case MANAGE_SALE:
//           ManageSaleOp manageSaleOp;
//       }
//
// ===========================================================================
xdr.union("OperationBody", {
  switchOn: xdr.lookup("OperationType"),
  switchName: "type",
  switches: [
    ["createAccount", "createAccountOp"],
    ["payment", "paymentOp"],
    ["setOption", "setOptionsOp"],
    ["createIssuanceRequest", "createIssuanceRequestOp"],
    ["setFee", "setFeesOp"],
    ["manageAccount", "manageAccountOp"],
    ["createWithdrawalRequest", "createWithdrawalRequestOp"],
    ["manageBalance", "manageBalanceOp"],
    ["reviewPaymentRequest", "reviewPaymentRequestOp"],
    ["manageAsset", "manageAssetOp"],
    ["createPreissuanceRequest", "createPreIssuanceRequest"],
    ["setLimit", "setLimitsOp"],
    ["directDebit", "directDebitOp"],
    ["manageAssetPair", "manageAssetPairOp"],
    ["manageOffer", "manageOfferOp"],
    ["manageInvoice", "manageInvoiceOp"],
    ["reviewRequest", "reviewRequestOp"],
    ["createSaleRequest", "createSaleCreationRequestOp"],
    ["checkSaleState", "checkSaleStateOp"],
    ["createAmlAlert", "createAmlAlertRequestOp"],
    ["manageKeyValue", "manageKeyValueOp"],
    ["createKycRequest", "createUpdateKycRequestOp"],
    ["manageExternalSystemAccountIdPoolEntry", "manageExternalSystemAccountIdPoolEntryOp"],
    ["bindExternalSystemAccountId", "bindExternalSystemAccountIdOp"],
    ["paymentV2", "paymentOpV2"],
    ["manageSale", "manageSaleOp"],
  ],
  arms: {
    createAccountOp: xdr.lookup("CreateAccountOp"),
    paymentOp: xdr.lookup("PaymentOp"),
    setOptionsOp: xdr.lookup("SetOptionsOp"),
    createIssuanceRequestOp: xdr.lookup("CreateIssuanceRequestOp"),
    setFeesOp: xdr.lookup("SetFeesOp"),
    manageAccountOp: xdr.lookup("ManageAccountOp"),
    createWithdrawalRequestOp: xdr.lookup("CreateWithdrawalRequestOp"),
    manageBalanceOp: xdr.lookup("ManageBalanceOp"),
    reviewPaymentRequestOp: xdr.lookup("ReviewPaymentRequestOp"),
    manageAssetOp: xdr.lookup("ManageAssetOp"),
    createPreIssuanceRequest: xdr.lookup("CreatePreIssuanceRequestOp"),
    setLimitsOp: xdr.lookup("SetLimitsOp"),
    directDebitOp: xdr.lookup("DirectDebitOp"),
    manageAssetPairOp: xdr.lookup("ManageAssetPairOp"),
    manageOfferOp: xdr.lookup("ManageOfferOp"),
    manageInvoiceOp: xdr.lookup("ManageInvoiceOp"),
    reviewRequestOp: xdr.lookup("ReviewRequestOp"),
    createSaleCreationRequestOp: xdr.lookup("CreateSaleCreationRequestOp"),
    checkSaleStateOp: xdr.lookup("CheckSaleStateOp"),
    createAmlAlertRequestOp: xdr.lookup("CreateAmlAlertRequestOp"),
    manageKeyValueOp: xdr.lookup("ManageKeyValueOp"),
    createUpdateKycRequestOp: xdr.lookup("CreateUpdateKycRequestOp"),
    manageExternalSystemAccountIdPoolEntryOp: xdr.lookup("ManageExternalSystemAccountIdPoolEntryOp"),
    bindExternalSystemAccountIdOp: xdr.lookup("BindExternalSystemAccountIdOp"),
    paymentOpV2: xdr.lookup("PaymentOpV2"),
    manageSaleOp: xdr.lookup("ManageSaleOp"),
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
//       case PAYMENT:
//           PaymentOp paymentOp;
//       case SET_OPTIONS:
//           SetOptionsOp setOptionsOp;
//   	case CREATE_ISSUANCE_REQUEST:
//   		CreateIssuanceRequestOp createIssuanceRequestOp;
//       case SET_FEES:
//           SetFeesOp setFeesOp;
//   	case MANAGE_ACCOUNT:
//   		ManageAccountOp manageAccountOp;
//   	case CREATE_WITHDRAWAL_REQUEST:
//   		CreateWithdrawalRequestOp createWithdrawalRequestOp;
//   	case MANAGE_BALANCE:
//   		ManageBalanceOp manageBalanceOp;
//   	case REVIEW_PAYMENT_REQUEST:
//   		ReviewPaymentRequestOp reviewPaymentRequestOp;
//       case MANAGE_ASSET:
//           ManageAssetOp manageAssetOp;
//       case CREATE_PREISSUANCE_REQUEST:
//           CreatePreIssuanceRequestOp createPreIssuanceRequest;
//       case SET_LIMITS:
//           SetLimitsOp setLimitsOp;
//       case DIRECT_DEBIT:
//           DirectDebitOp directDebitOp;
//   	case MANAGE_ASSET_PAIR:
//   		ManageAssetPairOp manageAssetPairOp;
//   	case MANAGE_OFFER:
//   		ManageOfferOp manageOfferOp;
//       case MANAGE_INVOICE:
//           ManageInvoiceOp manageInvoiceOp;
//   	case REVIEW_REQUEST:
//   		ReviewRequestOp reviewRequestOp;
//   	case CREATE_SALE_REQUEST:
//   		CreateSaleCreationRequestOp createSaleCreationRequestOp;
//   	case CHECK_SALE_STATE:
//   		CheckSaleStateOp checkSaleStateOp;
//   	case CREATE_AML_ALERT:
//   	    CreateAMLAlertRequestOp createAMLAlertRequestOp;
//   	case MANAGE_KEY_VALUE:
//   	    ManageKeyValueOp manageKeyValueOp;
//   	case CREATE_KYC_REQUEST:
//   		CreateUpdateKYCRequestOp createUpdateKYCRequestOp;
//       case MANAGE_EXTERNAL_SYSTEM_ACCOUNT_ID_POOL_ENTRY:
//           ManageExternalSystemAccountIdPoolEntryOp manageExternalSystemAccountIdPoolEntryOp;
//       case BIND_EXTERNAL_SYSTEM_ACCOUNT_ID:
//           BindExternalSystemAccountIdOp bindExternalSystemAccountIdOp;
//       case PAYMENT_V2:
//           PaymentOpV2 paymentOpV2;
//       case MANAGE_SALE:
//           ManageSaleOp manageSaleOp;
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
//   	opBAD_AUTH_EXTRA = -8
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
});

// === xdr source ============================================================
//
//   union switch (OperationType type)
//       {
//       case CREATE_ACCOUNT:
//           CreateAccountResult createAccountResult;
//       case PAYMENT:
//           PaymentResult paymentResult;
//       case SET_OPTIONS:
//           SetOptionsResult setOptionsResult;
//   	case CREATE_ISSUANCE_REQUEST:
//   		CreateIssuanceRequestResult createIssuanceRequestResult;
//       case SET_FEES:
//           SetFeesResult setFeesResult;
//   	case MANAGE_ACCOUNT:
//   		ManageAccountResult manageAccountResult;
//       case CREATE_WITHDRAWAL_REQUEST:
//   		CreateWithdrawalRequestResult createWithdrawalRequestResult;
//       case MANAGE_BALANCE:
//           ManageBalanceResult manageBalanceResult;
//       case REVIEW_PAYMENT_REQUEST:
//           ReviewPaymentRequestResult reviewPaymentRequestResult;
//       case MANAGE_ASSET:
//           ManageAssetResult manageAssetResult;
//       case CREATE_PREISSUANCE_REQUEST:
//           CreatePreIssuanceRequestResult createPreIssuanceRequestResult;
//       case SET_LIMITS:
//           SetLimitsResult setLimitsResult;
//       case DIRECT_DEBIT:
//           DirectDebitResult directDebitResult;
//   	case MANAGE_ASSET_PAIR:
//   		ManageAssetPairResult manageAssetPairResult;
//   	case MANAGE_OFFER:
//   		ManageOfferResult manageOfferResult;
//   	case MANAGE_INVOICE:
//   		ManageInvoiceResult manageInvoiceResult;
//   	case REVIEW_REQUEST:
//   		ReviewRequestResult reviewRequestResult;
//   	case CREATE_SALE_REQUEST:
//   		CreateSaleCreationRequestResult createSaleCreationRequestResult;
//   	case CHECK_SALE_STATE:
//   		CheckSaleStateResult checkSaleStateResult;
//   	case CREATE_AML_ALERT:
//   	    CreateAMLAlertRequestResult createAMLAlertRequestResult;
//   	case MANAGE_KEY_VALUE:
//   	    ManageKeyValueResult manageKeyValueResult;
//   	case CREATE_KYC_REQUEST:
//   	    CreateUpdateKYCRequestResult createUpdateKYCRequestResult;
//       case MANAGE_EXTERNAL_SYSTEM_ACCOUNT_ID_POOL_ENTRY:
//           ManageExternalSystemAccountIdPoolEntryResult manageExternalSystemAccountIdPoolEntryResult;
//       case BIND_EXTERNAL_SYSTEM_ACCOUNT_ID:
//           BindExternalSystemAccountIdResult bindExternalSystemAccountIdResult;
//       case PAYMENT_V2:
//           PaymentV2Result paymentV2Result;
//       case MANAGE_SALE:
//           ManageSaleResult manageSaleResult;
//       }
//
// ===========================================================================
xdr.union("OperationResultTr", {
  switchOn: xdr.lookup("OperationType"),
  switchName: "type",
  switches: [
    ["createAccount", "createAccountResult"],
    ["payment", "paymentResult"],
    ["setOption", "setOptionsResult"],
    ["createIssuanceRequest", "createIssuanceRequestResult"],
    ["setFee", "setFeesResult"],
    ["manageAccount", "manageAccountResult"],
    ["createWithdrawalRequest", "createWithdrawalRequestResult"],
    ["manageBalance", "manageBalanceResult"],
    ["reviewPaymentRequest", "reviewPaymentRequestResult"],
    ["manageAsset", "manageAssetResult"],
    ["createPreissuanceRequest", "createPreIssuanceRequestResult"],
    ["setLimit", "setLimitsResult"],
    ["directDebit", "directDebitResult"],
    ["manageAssetPair", "manageAssetPairResult"],
    ["manageOffer", "manageOfferResult"],
    ["manageInvoice", "manageInvoiceResult"],
    ["reviewRequest", "reviewRequestResult"],
    ["createSaleRequest", "createSaleCreationRequestResult"],
    ["checkSaleState", "checkSaleStateResult"],
    ["createAmlAlert", "createAmlAlertRequestResult"],
    ["manageKeyValue", "manageKeyValueResult"],
    ["createKycRequest", "createUpdateKycRequestResult"],
    ["manageExternalSystemAccountIdPoolEntry", "manageExternalSystemAccountIdPoolEntryResult"],
    ["bindExternalSystemAccountId", "bindExternalSystemAccountIdResult"],
    ["paymentV2", "paymentV2Result"],
    ["manageSale", "manageSaleResult"],
  ],
  arms: {
    createAccountResult: xdr.lookup("CreateAccountResult"),
    paymentResult: xdr.lookup("PaymentResult"),
    setOptionsResult: xdr.lookup("SetOptionsResult"),
    createIssuanceRequestResult: xdr.lookup("CreateIssuanceRequestResult"),
    setFeesResult: xdr.lookup("SetFeesResult"),
    manageAccountResult: xdr.lookup("ManageAccountResult"),
    createWithdrawalRequestResult: xdr.lookup("CreateWithdrawalRequestResult"),
    manageBalanceResult: xdr.lookup("ManageBalanceResult"),
    reviewPaymentRequestResult: xdr.lookup("ReviewPaymentRequestResult"),
    manageAssetResult: xdr.lookup("ManageAssetResult"),
    createPreIssuanceRequestResult: xdr.lookup("CreatePreIssuanceRequestResult"),
    setLimitsResult: xdr.lookup("SetLimitsResult"),
    directDebitResult: xdr.lookup("DirectDebitResult"),
    manageAssetPairResult: xdr.lookup("ManageAssetPairResult"),
    manageOfferResult: xdr.lookup("ManageOfferResult"),
    manageInvoiceResult: xdr.lookup("ManageInvoiceResult"),
    reviewRequestResult: xdr.lookup("ReviewRequestResult"),
    createSaleCreationRequestResult: xdr.lookup("CreateSaleCreationRequestResult"),
    checkSaleStateResult: xdr.lookup("CheckSaleStateResult"),
    createAmlAlertRequestResult: xdr.lookup("CreateAmlAlertRequestResult"),
    manageKeyValueResult: xdr.lookup("ManageKeyValueResult"),
    createUpdateKycRequestResult: xdr.lookup("CreateUpdateKycRequestResult"),
    manageExternalSystemAccountIdPoolEntryResult: xdr.lookup("ManageExternalSystemAccountIdPoolEntryResult"),
    bindExternalSystemAccountIdResult: xdr.lookup("BindExternalSystemAccountIdResult"),
    paymentV2Result: xdr.lookup("PaymentV2Result"),
    manageSaleResult: xdr.lookup("ManageSaleResult"),
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
//       case PAYMENT:
//           PaymentResult paymentResult;
//       case SET_OPTIONS:
//           SetOptionsResult setOptionsResult;
//   	case CREATE_ISSUANCE_REQUEST:
//   		CreateIssuanceRequestResult createIssuanceRequestResult;
//       case SET_FEES:
//           SetFeesResult setFeesResult;
//   	case MANAGE_ACCOUNT:
//   		ManageAccountResult manageAccountResult;
//       case CREATE_WITHDRAWAL_REQUEST:
//   		CreateWithdrawalRequestResult createWithdrawalRequestResult;
//       case MANAGE_BALANCE:
//           ManageBalanceResult manageBalanceResult;
//       case REVIEW_PAYMENT_REQUEST:
//           ReviewPaymentRequestResult reviewPaymentRequestResult;
//       case MANAGE_ASSET:
//           ManageAssetResult manageAssetResult;
//       case CREATE_PREISSUANCE_REQUEST:
//           CreatePreIssuanceRequestResult createPreIssuanceRequestResult;
//       case SET_LIMITS:
//           SetLimitsResult setLimitsResult;
//       case DIRECT_DEBIT:
//           DirectDebitResult directDebitResult;
//   	case MANAGE_ASSET_PAIR:
//   		ManageAssetPairResult manageAssetPairResult;
//   	case MANAGE_OFFER:
//   		ManageOfferResult manageOfferResult;
//   	case MANAGE_INVOICE:
//   		ManageInvoiceResult manageInvoiceResult;
//   	case REVIEW_REQUEST:
//   		ReviewRequestResult reviewRequestResult;
//   	case CREATE_SALE_REQUEST:
//   		CreateSaleCreationRequestResult createSaleCreationRequestResult;
//   	case CHECK_SALE_STATE:
//   		CheckSaleStateResult checkSaleStateResult;
//   	case CREATE_AML_ALERT:
//   	    CreateAMLAlertRequestResult createAMLAlertRequestResult;
//   	case MANAGE_KEY_VALUE:
//   	    ManageKeyValueResult manageKeyValueResult;
//   	case CREATE_KYC_REQUEST:
//   	    CreateUpdateKYCRequestResult createUpdateKYCRequestResult;
//       case MANAGE_EXTERNAL_SYSTEM_ACCOUNT_ID_POOL_ENTRY:
//           ManageExternalSystemAccountIdPoolEntryResult manageExternalSystemAccountIdPoolEntryResult;
//       case BIND_EXTERNAL_SYSTEM_ACCOUNT_ID:
//           BindExternalSystemAccountIdResult bindExternalSystemAccountIdResult;
//       case PAYMENT_V2:
//           PaymentV2Result paymentV2Result;
//       case MANAGE_SALE:
//           ManageSaleResult manageSaleResult;
//       }
//       tr;
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
  ],
  arms: {
    tr: xdr.lookup("OperationResultTr"),
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
//       txBAD_AUTH = -5,             // too few valid signatures / wrong network
//       txNO_ACCOUNT = -6,           // source account not found
//       txBAD_AUTH_EXTRA = -7,      // unused signatures attached to transaction
//       txINTERNAL_ERROR = -8,      // an unknown error occured
//   	txACCOUNT_BLOCKED = -9,     // account is blocked and cannot be source of tx
//       txDUPLICATION = -10         // if timing is stored
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
});

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
//   enum ManageAssetAction
//   {
//       CREATE_ASSET_CREATION_REQUEST = 0,
//       CREATE_ASSET_UPDATE_REQUEST = 1,
//   	CANCEL_ASSET_REQUEST = 2,
//   	CHANGE_PREISSUED_ASSET_SIGNER = 3
//   };
//
// ===========================================================================
xdr.enum("ManageAssetAction", {
  createAssetCreationRequest: 0,
  createAssetUpdateRequest: 1,
  cancelAssetRequest: 2,
  changePreissuedAssetSigner: 3,
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
//   union switch (ManageAssetAction action)
//   	{
//   	case CREATE_ASSET_CREATION_REQUEST:
//   		AssetCreationRequest createAsset;
//   	case CREATE_ASSET_UPDATE_REQUEST:
//   		AssetUpdateRequest updateAsset;
//   	case CANCEL_ASSET_REQUEST:
//   		CancelAssetRequest cancelRequest;
//   	case CHANGE_PREISSUED_ASSET_SIGNER:
//   		AssetChangePreissuedSigner changePreissuedSigner;
//   	}
//
// ===========================================================================
xdr.union("ManageAssetOpRequest", {
  switchOn: xdr.lookup("ManageAssetAction"),
  switchName: "action",
  switches: [
    ["createAssetCreationRequest", "createAsset"],
    ["createAssetUpdateRequest", "updateAsset"],
    ["cancelAssetRequest", "cancelRequest"],
    ["changePreissuedAssetSigner", "changePreissuedSigner"],
  ],
  arms: {
    createAsset: xdr.lookup("AssetCreationRequest"),
    updateAsset: xdr.lookup("AssetUpdateRequest"),
    cancelRequest: xdr.lookup("CancelAssetRequest"),
    changePreissuedSigner: xdr.lookup("AssetChangePreissuedSigner"),
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
//   		AssetCreationRequest createAsset;
//   	case CREATE_ASSET_UPDATE_REQUEST:
//   		AssetUpdateRequest updateAsset;
//   	case CANCEL_ASSET_REQUEST:
//   		CancelAssetRequest cancelRequest;
//   	case CHANGE_PREISSUED_ASSET_SIGNER:
//   		AssetChangePreissuedSigner changePreissuedSigner;
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
//   	ASSET_ALREADY_EXISTS = -3,			   // asset with such code already exist
//       INVALID_MAX_ISSUANCE_AMOUNT = -4, // max issuance amount is 0
//   	INVALID_CODE = -5,                // asset code is invalid (empty or contains space)
//   	INVALID_POLICIES = -7,            // asset policies (has flag which does not belong to AssetPolicies enum)
//   	ASSET_NOT_FOUND = -8,             // asset does not exists
//   	REQUEST_ALREADY_EXISTS = -9,      // request for creation of unique entry already exists
//   	STATS_ASSET_ALREADY_EXISTS = -10, // statistics quote asset already exists
//   	INITIAL_PREISSUED_EXCEEDS_MAX_ISSUANCE = -11, // initial pre issued amount exceeds max issuance amount
//   	INVALID_DETAILS = -12 // details must be a valid json
//   };
//
// ===========================================================================
xdr.enum("ManageAssetResultCode", {
  success: 0,
  requestNotFound: -1,
  assetAlreadyExist: -3,
  invalidMaxIssuanceAmount: -4,
  invalidCode: -5,
  invalidPolicy: -7,
  assetNotFound: -8,
  requestAlreadyExist: -9,
  statsAssetAlreadyExist: -10,
  initialPreissuedExceedsMaxIssuance: -11,
  invalidDetail: -12,
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
//   enum SaleType {
//   	BASIC_SALE = 1, // sale creator specifies price for each quote asset
//   	CROWD_FUNDING = 2 // sale creator does not specify price,
//   	                  // price is defined on sale close based on amount of base asset to be sold and amount of quote assets collected
//   };
//
// ===========================================================================
xdr.enum("SaleType", {
  basicSale: 1,
  crowdFunding: 2,
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
//   union switch (SaleType saleType)
//       {
//   	case BASIC_SALE:
//   		BasicSale basicSale;
//       case CROWD_FUNDING:
//           CrowdFundingSale crowdFundingSale;
//       }
//
// ===========================================================================
xdr.union("SaleTypeExtTypedSale", {
  switchOn: xdr.lookup("SaleType"),
  switchName: "saleType",
  switches: [
    ["basicSale", "basicSale"],
    ["crowdFunding", "crowdFundingSale"],
  ],
  arms: {
    basicSale: xdr.lookup("BasicSale"),
    crowdFundingSale: xdr.lookup("CrowdFundingSale"),
  },
});

// === xdr source ============================================================
//
//   struct SaleTypeExt {
//   	union switch (SaleType saleType)
//       {
//   	case BASIC_SALE:
//   		BasicSale basicSale;
//       case CROWD_FUNDING:
//           CrowdFundingSale crowdFundingSale;
//       }
//       typedSale;
//   };
//
// ===========================================================================
xdr.struct("SaleTypeExt", [
  ["typedSale", xdr.lookup("SaleTypeExtTypedSale")],
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
//   	case TYPED_SALE:
//   		SaleTypeExt saleTypeExt;
//       }
//
// ===========================================================================
xdr.union("SaleEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
    ["typedSale", "saleTypeExt"],
  ],
  arms: {
    saleTypeExt: xdr.lookup("SaleTypeExt"),
  },
});

// === xdr source ============================================================
//
//   struct SaleEntry
//   {
//   	uint64 saleID;
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
//   
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//   	case TYPED_SALE:
//   		SaleTypeExt saleTypeExt;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("SaleEntry", [
  ["saleId", xdr.lookup("Uint64")],
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
  ["ext", xdr.lookup("SaleEntryExt")],
]);

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
//           {
//           case EMPTY_VERSION:
//               void;
//           }
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
//       Limits newLimits;
//       union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//   };
//
// ===========================================================================
xdr.struct("LimitsUpdateDetails", [
  ["newLimits", xdr.lookup("Limits")],
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
xdr.union("UpdateKycDetailsExt", {
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
//   struct UpdateKYCDetails {
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
xdr.struct("UpdateKycDetails", [
  ["tasksToAdd", xdr.lookup("Uint32")],
  ["tasksToRemove", xdr.lookup("Uint32")],
  ["externalDetails", xdr.string()],
  ["ext", xdr.lookup("UpdateKycDetailsExt")],
]);

// === xdr source ============================================================
//
//   union switch(ReviewableRequestType requestType) {
//   	case WITHDRAW:
//   		WithdrawalDetails withdrawal;
//       case LIMITS_UPDATE:
//           LimitsUpdateDetails limitsUpdate;
//   	case TWO_STEP_WITHDRAWAL:
//   		WithdrawalDetails twoStepWithdrawal;
//       case AML_ALERT:
//           AMLAlertDetails amlAlertDetails;
//       case UPDATE_KYC:
//           UpdateKYCDetails updateKYC;
//   	default:
//   		void;
//   	}
//
// ===========================================================================
xdr.union("ReviewRequestOpRequestDetails", {
  switchOn: xdr.lookup("ReviewableRequestType"),
  switchName: "requestType",
  switches: [
    ["withdraw", "withdrawal"],
    ["limitsUpdate", "limitsUpdate"],
    ["twoStepWithdrawal", "twoStepWithdrawal"],
    ["amlAlert", "amlAlertDetails"],
    ["updateKyc", "updateKyc"],
  ],
  arms: {
    withdrawal: xdr.lookup("WithdrawalDetails"),
    limitsUpdate: xdr.lookup("LimitsUpdateDetails"),
    twoStepWithdrawal: xdr.lookup("WithdrawalDetails"),
    amlAlertDetails: xdr.lookup("AmlAlertDetails"),
    updateKyc: xdr.lookup("UpdateKycDetails"),
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
//   	case WITHDRAW:
//   		WithdrawalDetails withdrawal;
//       case LIMITS_UPDATE:
//           LimitsUpdateDetails limitsUpdate;
//   	case TWO_STEP_WITHDRAWAL:
//   		WithdrawalDetails twoStepWithdrawal;
//       case AML_ALERT:
//           AMLAlertDetails amlAlertDetails;
//       case UPDATE_KYC:
//           UpdateKYCDetails updateKYC;
//   	default:
//   		void;
//   	} requestDetails;
//   	ReviewRequestOpAction action;
//   	longstring reason;
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
xdr.struct("ReviewRequestOp", [
  ["requestId", xdr.lookup("Uint64")],
  ["requestHash", xdr.lookup("Hash")],
  ["requestDetails", xdr.lookup("ReviewRequestOpRequestDetails")],
  ["action", xdr.lookup("ReviewRequestOpAction")],
  ["reason", xdr.lookup("Longstring")],
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
//   	// Asset requests
//   	ASSET_ALREADY_EXISTS = -20,
//   	ASSET_DOES_NOT_EXISTS = -21,
//   
//   	// Issuance requests
//   	MAX_ISSUANCE_AMOUNT_EXCEEDED = -40,
//   	INSUFFICIENT_AVAILABLE_FOR_ISSUANCE_AMOUNT = -41,
//   	FULL_LINE = -42, // can't fund balance - total funds exceed UINT64_MAX
//   
//   	// Sale creation requests
//   	BASE_ASSET_DOES_NOT_EXISTS = -50,
//   	HARD_CAP_WILL_EXCEED_MAX_ISSUANCE = -51,
//   	INSUFFICIENT_PREISSUED_FOR_HARD_CAP = -52,
//   
//   	// Update KYC requests
//   	NON_ZERO_TASKS_TO_REMOVE_NOT_ALLOWED = -60,
//   
//   	// Update sale details requests
//   	SALE_NOT_FOUND = -70
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
  assetAlreadyExist: -20,
  assetDoesNotExist: -21,
  maxIssuanceAmountExceeded: -40,
  insufficientAvailableForIssuanceAmount: -41,
  fullLine: -42,
  baseAssetDoesNotExist: -50,
  hardCapWillExceedMaxIssuance: -51,
  insufficientPreissuedForHardCap: -52,
  nonZeroTasksToRemoveNotAllowed: -60,
  saleNotFound: -70,
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
xdr.union("ReviewRequestResultSuccessExt", {
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
xdr.struct("ReviewRequestResultSuccess", [
  ["ext", xdr.lookup("ReviewRequestResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   union ReviewRequestResult switch (ReviewRequestResultCode code)
//   {
//   case SUCCESS:
//   	struct {
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
xdr.union("ReviewRequestResult", {
  switchOn: xdr.lookup("ReviewRequestResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("ReviewRequestResultSuccess"),
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
xdr.union("FeeDataV2Ext", {
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
//   struct FeeDataV2 {
//       uint64 maxPaymentFee;
//       uint64 fixedFee;
//   
//       // Cross asset fees
//       AssetCode feeAsset;
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
xdr.struct("FeeDataV2", [
  ["maxPaymentFee", xdr.lookup("Uint64")],
  ["fixedFee", xdr.lookup("Uint64")],
  ["feeAsset", xdr.lookup("AssetCode")],
  ["ext", xdr.lookup("FeeDataV2Ext")],
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
//       FeeDataV2 sourceFee;
//       FeeDataV2 destinationFee;
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
  ["sourceFee", xdr.lookup("FeeDataV2")],
  ["destinationFee", xdr.lookup("FeeDataV2")],
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
//       INVALID_DESTINATION_FEE_ASSET = -12, // destination fee asset must be the same as source balance asset
//       FEE_ASSET_MISMATCHED = -13,
//       INSUFFICIENT_FEE_AMOUNT = -14,
//       BALANCE_TO_CHARGE_FEE_FROM_NOT_FOUND = -15,
//       PAYMENT_AMOUNT_IS_LESS_THAN_DEST_FEE = -16
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
  invalidDestinationFeeAsset: -12,
  feeAssetMismatched: -13,
  insufficientFeeAmount: -14,
  balanceToChargeFeeFromNotFound: -15,
  paymentAmountIsLessThanDestFee: -16,
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
//       uint64 actualSourcePaymentFee;
//       uint64 actualDestinationPaymentFee;
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
  ["actualSourcePaymentFee", xdr.lookup("Uint64")],
  ["actualDestinationPaymentFee", xdr.lookup("Uint64")],
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
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("DirectDebitOpExt", {
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
//   struct DirectDebitOp
//   {
//       AccountID from;
//       PaymentOp paymentOp;
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
xdr.struct("DirectDebitOp", [
  ["from", xdr.lookup("AccountId")],
  ["paymentOp", xdr.lookup("PaymentOp")],
  ["ext", xdr.lookup("DirectDebitOpExt")],
]);

// === xdr source ============================================================
//
//   enum DirectDebitResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0, // payment successfuly completed
//   
//       // codes considered as "failure" for the operation
//       MALFORMED = -1,       // bad input
//       UNDERFUNDED = -2,     // not enough funds in source account
//       LINE_FULL = -3,       // destination would go above their limit
//   	FEE_MISMATCHED = -4,   // fee is not equal to expected fee
//       BALANCE_NOT_FOUND = -5, // destination balance not found
//       BALANCE_ACCOUNT_MISMATCHED = -6,
//       BALANCE_ASSETS_MISMATCHED = -7,
//   	SRC_BALANCE_NOT_FOUND = -8, // source balance not found
//       REFERENCE_DUPLICATION = -9,
//       STATS_OVERFLOW = -10,
//       LIMITS_EXCEEDED = -11,
//       NOT_ALLOWED_BY_ASSET_POLICY = -12,
//       NO_TRUST = -13
//   };
//
// ===========================================================================
xdr.enum("DirectDebitResultCode", {
  success: 0,
  malformed: -1,
  underfunded: -2,
  lineFull: -3,
  feeMismatched: -4,
  balanceNotFound: -5,
  balanceAccountMismatched: -6,
  balanceAssetsMismatched: -7,
  srcBalanceNotFound: -8,
  referenceDuplication: -9,
  statsOverflow: -10,
  limitsExceeded: -11,
  notAllowedByAssetPolicy: -12,
  noTrust: -13,
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
xdr.union("DirectDebitSuccessExt", {
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
//   struct DirectDebitSuccess {
//   	PaymentResponse paymentResponse;
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
xdr.struct("DirectDebitSuccess", [
  ["paymentResponse", xdr.lookup("PaymentResponse")],
  ["ext", xdr.lookup("DirectDebitSuccessExt")],
]);

// === xdr source ============================================================
//
//   union DirectDebitResult switch (DirectDebitResultCode code)
//   {
//   case SUCCESS:
//       DirectDebitSuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("DirectDebitResult", {
  switchOn: xdr.lookup("DirectDebitResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("DirectDebitSuccess"),
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
//   	REFERENCE_DUPLICATION = 4, // reference already exists
//   	INVALID_AMOUNT = 5 // amount must be positive
//   
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
xdr.struct("CreateAmlAlertRequestSuccess", [
  ["requestId", xdr.lookup("Uint64")],
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
//       longstring details;
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
xdr.struct("AssetCreationRequest", [
  ["code", xdr.lookup("AssetCode")],
  ["preissuedAssetSigner", xdr.lookup("AccountId")],
  ["maxIssuanceAmount", xdr.lookup("Uint64")],
  ["initialPreissuedAmount", xdr.lookup("Uint64")],
  ["policies", xdr.lookup("Uint32")],
  ["details", xdr.lookup("Longstring")],
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
//   	longstring details;
//   	uint32 policies;
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
xdr.struct("AssetUpdateRequest", [
  ["code", xdr.lookup("AssetCode")],
  ["details", xdr.lookup("Longstring")],
  ["policies", xdr.lookup("Uint32")],
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
//   struct AssetChangePreissuedSigner {
//   	AssetCode code;
//   	AccountID accountID;
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
xdr.union("ManageAccountOpExt", {
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
//   struct ManageAccountOp
//   {
//       AccountID account; // account to manage
//       AccountType accountType;
//       uint32 blockReasonsToAdd;
//       uint32 blockReasonsToRemove; 
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
xdr.struct("ManageAccountOp", [
  ["account", xdr.lookup("AccountId")],
  ["accountType", xdr.lookup("AccountType")],
  ["blockReasonsToAdd", xdr.lookup("Uint32")],
  ["blockReasonsToRemove", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("ManageAccountOpExt")],
]);

// === xdr source ============================================================
//
//   enum ManageAccountResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0, // account was created
//   
//       // codes considered as "failure" for the operation
//       NOT_FOUND = -1,         // account does not exists
//       MALFORMED = -2,
//   	NOT_ALLOWED = -3,         // manage account operation is not allowed on this account
//       TYPE_MISMATCH = -4
//   };
//
// ===========================================================================
xdr.enum("ManageAccountResultCode", {
  success: 0,
  notFound: -1,
  malformed: -2,
  notAllowed: -3,
  typeMismatch: -4,
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
xdr.union("ManageAccountSuccessExt", {
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
//   struct ManageAccountSuccess {
//   	uint32 blockReasons;
//    // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageAccountSuccess", [
  ["blockReasons", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("ManageAccountSuccessExt")],
]);

// === xdr source ============================================================
//
//   union ManageAccountResult switch (ManageAccountResultCode code)
//   {
//   case SUCCESS:
//       ManageAccountSuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ManageAccountResult", {
  switchOn: xdr.lookup("ManageAccountResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("ManageAccountSuccess"),
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
xdr.union("InvoiceReferenceExt", {
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
//   struct InvoiceReference {
//       uint64 invoiceID;
//       bool accept;
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
xdr.struct("InvoiceReference", [
  ["invoiceId", xdr.lookup("Uint64")],
  ["accept", xdr.bool()],
  ["ext", xdr.lookup("InvoiceReferenceExt")],
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
xdr.union("FeeDataExt", {
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
//   struct FeeData {
//       int64 paymentFee;
//       int64 fixedFee;
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
xdr.struct("FeeData", [
  ["paymentFee", xdr.lookup("Int64")],
  ["fixedFee", xdr.lookup("Int64")],
  ["ext", xdr.lookup("FeeDataExt")],
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
xdr.union("PaymentFeeDataExt", {
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
//   struct PaymentFeeData {
//       FeeData sourceFee;
//       FeeData destinationFee;
//       bool sourcePaysForDest;    // if true source account pays fee, else destination
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
xdr.struct("PaymentFeeData", [
  ["sourceFee", xdr.lookup("FeeData")],
  ["destinationFee", xdr.lookup("FeeData")],
  ["sourcePaysForDest", xdr.bool()],
  ["ext", xdr.lookup("PaymentFeeDataExt")],
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
xdr.union("PaymentOpExt", {
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
//   struct PaymentOp
//   {
//       BalanceID sourceBalanceID;
//       BalanceID destinationBalanceID;
//       int64 amount;          // amount they end up with
//   
//       PaymentFeeData feeData;
//   
//       string256 subject;
//       string64 reference;
//       
//       InvoiceReference* invoiceReference;
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
xdr.struct("PaymentOp", [
  ["sourceBalanceId", xdr.lookup("BalanceId")],
  ["destinationBalanceId", xdr.lookup("BalanceId")],
  ["amount", xdr.lookup("Int64")],
  ["feeData", xdr.lookup("PaymentFeeData")],
  ["subject", xdr.lookup("String256")],
  ["reference", xdr.lookup("String64")],
  ["invoiceReference", xdr.option(xdr.lookup("InvoiceReference"))],
  ["ext", xdr.lookup("PaymentOpExt")],
]);

// === xdr source ============================================================
//
//   enum PaymentResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0, // payment successfuly completed
//   
//       // codes considered as "failure" for the operation
//       MALFORMED = -1,       // bad input
//       UNDERFUNDED = -2,     // not enough funds in source account
//       LINE_FULL = -3,       // destination would go above their limit
//   	FEE_MISMATCHED = -4,   // fee is not equal to expected fee
//       BALANCE_NOT_FOUND = -5, // destination balance not found
//       BALANCE_ACCOUNT_MISMATCHED = -6,
//       BALANCE_ASSETS_MISMATCHED = -7,
//   	SRC_BALANCE_NOT_FOUND = -8, // source balance not found
//       REFERENCE_DUPLICATION = -9,
//       STATS_OVERFLOW = -10,
//       LIMITS_EXCEEDED = -11,
//       NOT_ALLOWED_BY_ASSET_POLICY = -12,
//       INVOICE_NOT_FOUND = -13,
//       INVOICE_WRONG_AMOUNT = -14,
//       INVOICE_BALANCE_MISMATCH = -15,
//       INVOICE_ACCOUNT_MISMATCH = -16,
//       INVOICE_ALREADY_PAID = -17
//   };
//
// ===========================================================================
xdr.enum("PaymentResultCode", {
  success: 0,
  malformed: -1,
  underfunded: -2,
  lineFull: -3,
  feeMismatched: -4,
  balanceNotFound: -5,
  balanceAccountMismatched: -6,
  balanceAssetsMismatched: -7,
  srcBalanceNotFound: -8,
  referenceDuplication: -9,
  statsOverflow: -10,
  limitsExceeded: -11,
  notAllowedByAssetPolicy: -12,
  invoiceNotFound: -13,
  invoiceWrongAmount: -14,
  invoiceBalanceMismatch: -15,
  invoiceAccountMismatch: -16,
  invoiceAlreadyPaid: -17,
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
xdr.union("PaymentResponseExt", {
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
//   struct PaymentResponse {
//       AccountID destination;
//       uint64 paymentID;
//       AssetCode asset;
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
xdr.struct("PaymentResponse", [
  ["destination", xdr.lookup("AccountId")],
  ["paymentId", xdr.lookup("Uint64")],
  ["asset", xdr.lookup("AssetCode")],
  ["ext", xdr.lookup("PaymentResponseExt")],
]);

// === xdr source ============================================================
//
//   union PaymentResult switch (PaymentResultCode code)
//   {
//   case SUCCESS:
//       PaymentResponse paymentResponse;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("PaymentResult", {
  switchOn: xdr.lookup("PaymentResultCode"),
  switchName: "code",
  switches: [
    ["success", "paymentResponse"],
  ],
  arms: {
    paymentResponse: xdr.lookup("PaymentResponse"),
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
xdr.union("UpdateKycRequestExt", {
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
//   struct UpdateKYCRequest {
//   	AccountID accountToUpdateKYC;
//   	AccountType accountTypeToSet;
//   	uint32 kycLevel;
//   	longstring kycData;
//   
//   	// Tasks are represented by a bit mask. Each flag(task) in mask refers to specific KYC data validity checker
//   	uint32 allTasks;
//   	uint32 pendingTasks;
//   
//   	// Sequence number increases when request is rejected
//   	uint32 sequenceNumber;
//   
//   	// External details vector consists of comments written by KYC data validity checkers
//   	longstring externalDetails<>;
//   
//   	// Reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("UpdateKycRequest", [
  ["accountToUpdateKyc", xdr.lookup("AccountId")],
  ["accountTypeToSet", xdr.lookup("AccountType")],
  ["kycLevel", xdr.lookup("Uint32")],
  ["kycData", xdr.lookup("Longstring")],
  ["allTasks", xdr.lookup("Uint32")],
  ["pendingTasks", xdr.lookup("Uint32")],
  ["sequenceNumber", xdr.lookup("Uint32")],
  ["externalDetails", xdr.varArray(xdr.lookup("Longstring"), 2147483647)],
  ["ext", xdr.lookup("UpdateKycRequestExt")],
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
//   struct {
//               SaleTypeExt saleTypeExt;
//               uint64 requiredBaseAssetForHardCap;
//           }
//
// ===========================================================================
xdr.struct("SaleCreationRequestExtV2", [
  ["saleTypeExt", xdr.lookup("SaleTypeExt")],
  ["requiredBaseAssetForHardCap", xdr.lookup("Uint64")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//   	case TYPED_SALE:
//   		SaleTypeExt saleTypeExt;
//       case ALLOW_TO_SPECIFY_REQUIRED_BASE_ASSET_AMOUNT_FOR_HARD_CAP:
//           struct {
//               SaleTypeExt saleTypeExt;
//               uint64 requiredBaseAssetForHardCap;
//           } extV2;
//       }
//
// ===========================================================================
xdr.union("SaleCreationRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
    ["typedSale", "saleTypeExt"],
    ["allowToSpecifyRequiredBaseAssetAmountForHardCap", "extV2"],
  ],
  arms: {
    saleTypeExt: xdr.lookup("SaleTypeExt"),
    extV2: xdr.lookup("SaleCreationRequestExtV2"),
  },
});

// === xdr source ============================================================
//
//   struct SaleCreationRequest {
//   	AssetCode baseAsset; // asset for which sale will be performed
//   	AssetCode defaultQuoteAsset; // asset for soft and hard cap
//   	uint64 startTime; // start time of the sale
//   	uint64 endTime; // close time of the sale
//   	uint64 softCap; // minimum amount of quote asset to be received at which sale will be considered a successful
//   	uint64 hardCap; // max amount of quote asset to be received
//   	longstring details; // sale specific details
//   
//   	SaleCreationRequestQuoteAsset quoteAssets<100>;
//   
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//   	case TYPED_SALE:
//   		SaleTypeExt saleTypeExt;
//       case ALLOW_TO_SPECIFY_REQUIRED_BASE_ASSET_AMOUNT_FOR_HARD_CAP:
//           struct {
//               SaleTypeExt saleTypeExt;
//               uint64 requiredBaseAssetForHardCap;
//           } extV2;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("SaleCreationRequest", [
  ["baseAsset", xdr.lookup("AssetCode")],
  ["defaultQuoteAsset", xdr.lookup("AssetCode")],
  ["startTime", xdr.lookup("Uint64")],
  ["endTime", xdr.lookup("Uint64")],
  ["softCap", xdr.lookup("Uint64")],
  ["hardCap", xdr.lookup("Uint64")],
  ["details", xdr.lookup("Longstring")],
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
//   	INVALID_AMOUNT = -2,
//   	REFERENCE_DUPLICATION = -3,
//   	NO_COUNTERPARTY = -4,
//   	NOT_AUTHORIZED = -5,
//   	EXCEEDS_MAX_ISSUANCE_AMOUNT = -6,
//   	RECEIVER_FULL_LINE = -7,
//   	INVALID_EXTERNAL_DETAILS = -8, // external details size exceeds max allowed
//   	FEE_EXCEEDS_AMOUNT = -9, // fee more than amount to issue
//       REQUIRES_KYC = -10 // asset requires receiver to have KYC
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
//   enum RequestType
//   {
//       REQUEST_TYPE_SALE = 0,
//       REQUEST_TYPE_WITHDRAWAL = 1,
//       REQUEST_TYPE_REDEEM = 2,
//       REQUEST_TYPE_PAYMENT = 3
//   };
//
// ===========================================================================
xdr.enum("RequestType", {
  requestTypeSale: 0,
  requestTypeWithdrawal: 1,
  requestTypeRedeem: 2,
  requestTypePayment: 3,
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
xdr.union("PaymentRequestEntryExt", {
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
//   struct PaymentRequestEntry
//   {
//       uint64 paymentID;
//       BalanceID sourceBalance;
//       BalanceID* destinationBalance;
//       int64 sourceSend;
//       int64 sourceSendUniversal;
//       int64 destinationReceive;
//       
//       uint64 createdAt;
//   
//       uint64* invoiceID;
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
xdr.struct("PaymentRequestEntry", [
  ["paymentId", xdr.lookup("Uint64")],
  ["sourceBalance", xdr.lookup("BalanceId")],
  ["destinationBalance", xdr.option(xdr.lookup("BalanceId"))],
  ["sourceSend", xdr.lookup("Int64")],
  ["sourceSendUniversal", xdr.lookup("Int64")],
  ["destinationReceive", xdr.lookup("Int64")],
  ["createdAt", xdr.lookup("Uint64")],
  ["invoiceId", xdr.option(xdr.lookup("Uint64"))],
  ["ext", xdr.lookup("PaymentRequestEntryExt")],
]);

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
//   enum ManageTrustAction
//   {
//       TRUST_ADD = 0,
//       TRUST_REMOVE = 1
//   };
//
// ===========================================================================
xdr.enum("ManageTrustAction", {
  trustAdd: 0,
  trustRemove: 1,
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
xdr.union("TrustDataExt", {
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
//   struct TrustData {
//       TrustEntry trust;
//       ManageTrustAction action;
//   	// reserved for future use
//   	union switch (LedgerVersion v)
//   	{
//   	case EMPTY_VERSION:
//   		void;
//   	}
//   	ext;
//   };
//
// ===========================================================================
xdr.struct("TrustData", [
  ["trust", xdr.lookup("TrustEntry")],
  ["action", xdr.lookup("ManageTrustAction")],
  ["ext", xdr.lookup("TrustDataExt")],
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
xdr.union("LimitsUpdateRequestDataExt", {
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
//   struct LimitsUpdateRequestData {
//       Hash documentHash;
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("LimitsUpdateRequestData", [
  ["documentHash", xdr.lookup("Hash")],
  ["ext", xdr.lookup("LimitsUpdateRequestDataExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   	{
//   	case EMPTY_VERSION:
//   		void;
//   	}
//
// ===========================================================================
xdr.union("SetOptionsOpExt", {
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
//   struct SetOptionsOp
//   {
//       // account threshold manipulation
//       uint32* masterWeight; // weight of the master account
//       uint32* lowThreshold;
//       uint32* medThreshold;
//       uint32* highThreshold;
//   
//       // Add, update or remove a signer for the account
//       // signer is deleted if the weight is 0
//       Signer* signer;
//   
//       TrustData* trustData;
//   
//       // Create LimitsUpdateRequest for account
//       LimitsUpdateRequestData* limitsUpdateRequestData;
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
xdr.struct("SetOptionsOp", [
  ["masterWeight", xdr.option(xdr.lookup("Uint32"))],
  ["lowThreshold", xdr.option(xdr.lookup("Uint32"))],
  ["medThreshold", xdr.option(xdr.lookup("Uint32"))],
  ["highThreshold", xdr.option(xdr.lookup("Uint32"))],
  ["signer", xdr.option(xdr.lookup("Signer"))],
  ["trustData", xdr.option(xdr.lookup("TrustData"))],
  ["limitsUpdateRequestData", xdr.option(xdr.lookup("LimitsUpdateRequestData"))],
  ["ext", xdr.lookup("SetOptionsOpExt")],
]);

// === xdr source ============================================================
//
//   enum SetOptionsResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//       // codes considered as "failure" for the operation
//       TOO_MANY_SIGNERS = -1, // max number of signers already reached
//       THRESHOLD_OUT_OF_RANGE = -2, // bad value for weight/threshold
//       BAD_SIGNER = -3,             // signer cannot be masterkey
//       BALANCE_NOT_FOUND = -4,
//       TRUST_MALFORMED = -5,
//   	TRUST_TOO_MANY = -6,
//   	INVALID_SIGNER_VERSION = -7, // if signer version is higher than ledger version
//   	LIMITS_UPDATE_REQUEST_REFERENCE_DUPLICATION = -8
//   };
//
// ===========================================================================
xdr.enum("SetOptionsResultCode", {
  success: 0,
  tooManySigner: -1,
  thresholdOutOfRange: -2,
  badSigner: -3,
  balanceNotFound: -4,
  trustMalformed: -5,
  trustTooMany: -6,
  invalidSignerVersion: -7,
  limitsUpdateRequestReferenceDuplication: -8,
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
xdr.union("SetOptionsResultSuccessExt", {
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
//           uint64 limitsUpdateRequestID;
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
xdr.struct("SetOptionsResultSuccess", [
  ["limitsUpdateRequestId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("SetOptionsResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   union SetOptionsResult switch (SetOptionsResultCode code)
//   {
//   case SUCCESS:
//       struct {
//           uint64 limitsUpdateRequestID;
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
xdr.union("SetOptionsResult", {
  switchOn: xdr.lookup("SetOptionsResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("SetOptionsResultSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   enum SignerType
//   {
//   	READER = 1,                  // can only read data from API and Horizon
//   	NOT_VERIFIED_ACC_MANAGER = 2,// can manage not verified account and block/unblock general
//   	GENERAL_ACC_MANAGER = 4,     // allowed to create account, block/unblock, change limits for particular general account
//   	DIRECT_DEBIT_OPERATOR = 8, // allowed to perform direct debit operation
//   	ASSET_MANAGER = 16, // allowed to create assets/asset pairs and update policies, set fees
//   	ASSET_RATE_MANAGER = 32, // allowed to set physical asset price
//   	BALANCE_MANAGER = 64, // allowed to create balances, spend assets from balances
//   	ISSUANCE_MANAGER = 128, // allowed to make preissuance request
//   	INVOICE_MANAGER = 256, // allowed to create payment requests to other accounts
//   	PAYMENT_OPERATOR = 512, // allowed to review payment requests
//   	LIMITS_MANAGER = 1024, // allowed to change limits
//   	ACCOUNT_MANAGER = 2048, // allowed to add/delete signers and trust
//   	COMMISSION_BALANCE_MANAGER  = 4096,// allowed to spend from commission balances
//   	OPERATIONAL_BALANCE_MANAGER = 8192, // allowed to spend from operational balances
//   	EVENTS_CHECKER = 16384, // allow to check and trigger events
//   	EXCHANGE_ACC_MANAGER = 32768, // can manage exchange account
//   	SYNDICATE_ACC_MANAGER = 65536, // can manage syndicate account
//   	USER_ASSET_MANAGER = 131072, // can review sale, asset creation/update requests
//   	USER_ISSUANCE_MANAGER = 262144, // can review pre-issuance/issuance requests
//   	WITHDRAW_MANAGER = 524288, // can review withdraw requests
//   	FEES_MANAGER = 1048576, // can set fee
//   	TX_SENDER = 2097152, // can send tx
//   	AML_ALERT_MANAGER = 4194304, // can manage AML alert request
//   	AML_ALERT_REVIEWER = 8388608, // can review aml alert requests
//   	KYC_ACC_MANAGER = 16777216, // can manage kyc
//   	KYC_SUPER_ADMIN = 33554432,
//   	EXTERNAL_SYSTEM_ACCOUNT_ID_POOL_MANAGER = 67108864,
//       KEY_VALUE_MANAGER = 134217728 // can manage keyValue
//   };
//
// ===========================================================================
xdr.enum("SignerType", {
  reader: 1,
  notVerifiedAccManager: 2,
  generalAccManager: 4,
  directDebitOperator: 8,
  assetManager: 16,
  assetRateManager: 32,
  balanceManager: 64,
  issuanceManager: 128,
  invoiceManager: 256,
  paymentOperator: 512,
  limitsManager: 1024,
  accountManager: 2048,
  commissionBalanceManager: 4096,
  operationalBalanceManager: 8192,
  eventsChecker: 16384,
  exchangeAccManager: 32768,
  syndicateAccManager: 65536,
  userAssetManager: 131072,
  userIssuanceManager: 262144,
  withdrawManager: 524288,
  feesManager: 1048576,
  txSender: 2097152,
  amlAlertManager: 4194304,
  amlAlertReviewer: 8388608,
  kycAccManager: 16777216,
  kycSuperAdmin: 33554432,
  externalSystemAccountIdPoolManager: 67108864,
  keyValueManager: 134217728,
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
xdr.union("SignerExt", {
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
//   struct Signer
//   {
//       AccountID pubKey;
//       uint32 weight; // really only need 1byte
//   	uint32 signerType;
//   	uint32 identity;
//   	string256 name;
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
xdr.struct("Signer", [
  ["pubKey", xdr.lookup("AccountId")],
  ["weight", xdr.lookup("Uint32")],
  ["signerType", xdr.lookup("Uint32")],
  ["identity", xdr.lookup("Uint32")],
  ["name", xdr.lookup("String256")],
  ["ext", xdr.lookup("SignerExt")],
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
xdr.union("TrustEntryExt", {
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
//   struct TrustEntry
//   {
//       AccountID allowedAccount;
//       BalanceID balanceToUse;
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
xdr.struct("TrustEntry", [
  ["allowedAccount", xdr.lookup("AccountId")],
  ["balanceToUse", xdr.lookup("BalanceId")],
  ["ext", xdr.lookup("TrustEntryExt")],
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
//   	int64 weeklyOut;
//   	int64 monthlyOut;
//       int64 annualOut;
//   
//   	 // reserved for future use
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
xdr.struct("Limits", [
  ["dailyOut", xdr.lookup("Int64")],
  ["weeklyOut", xdr.lookup("Int64")],
  ["monthlyOut", xdr.lookup("Int64")],
  ["annualOut", xdr.lookup("Int64")],
  ["ext", xdr.lookup("LimitsExt")],
]);

// === xdr source ============================================================
//
//   enum AccountPolicies
//   {
//   	NO_PERMISSIONS = 0,
//   	ALLOW_TO_CREATE_USER_VIA_API = 1
//   };
//
// ===========================================================================
xdr.enum("AccountPolicies", {
  noPermission: 0,
  allowToCreateUserViaApi: 1,
});

// === xdr source ============================================================
//
//   enum AccountType
//   {
//   	OPERATIONAL = 1,       // operational account of the system 
//   	GENERAL = 2,           // general account can perform payments, setoptions, be source account for tx, etc.
//   	COMMISSION = 3,        // commission account
//   	MASTER = 4,            // master account
//       NOT_VERIFIED = 5,
//   	SYNDICATE = 6, // can create asset
//   	EXCHANGE = 7
//   };
//
// ===========================================================================
xdr.enum("AccountType", {
  operational: 1,
  general: 2,
  commission: 3,
  master: 4,
  notVerified: 5,
  syndicate: 6,
  exchange: 7,
});

// === xdr source ============================================================
//
//   enum BlockReasons
//   {
//   	RECOVERY_REQUEST = 1,
//   	KYC_UPDATE = 2,
//   	SUSPICIOUS_BEHAVIOR = 4,
//   	TOO_MANY_KYC_UPDATE_REQUESTS = 8
//   };
//
// ===========================================================================
xdr.enum("BlockReasons", {
  recoveryRequest: 1,
  kycUpdate: 2,
  suspiciousBehavior: 4,
  tooManyKycUpdateRequest: 8,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//   	case USE_KYC_LEVEL:
//   		uint32 kycLevel;
//       }
//
// ===========================================================================
xdr.union("AccountEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
    ["useKycLevel", "kycLevel"],
  ],
  arms: {
    kycLevel: xdr.lookup("Uint32"),
  },
});

// === xdr source ============================================================
//
//   struct AccountEntry
//   {
//       AccountID accountID;      // master public key for this account
//       AccountID recoveryID;
//   
//       // fields used for signatures
//       // thresholds stores unsigned bytes: [weight of master|low|medium|high]
//       Thresholds thresholds;
//   
//       Signer signers<>; // possible signers for this account
//       Limits* limits;
//   
//   	uint32 blockReasons;
//       AccountType accountType; // type of the account
//       
//       // Referral marketing
//       AccountID* referrer;     // parent account
//   
//   	int32 policies;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//   	case USE_KYC_LEVEL:
//   		uint32 kycLevel;
//       }
//   	
//       ext;
//   };
//
// ===========================================================================
xdr.struct("AccountEntry", [
  ["accountId", xdr.lookup("AccountId")],
  ["recoveryId", xdr.lookup("AccountId")],
  ["thresholds", xdr.lookup("Thresholds")],
  ["signers", xdr.varArray(xdr.lookup("Signer"), 2147483647)],
  ["limits", xdr.option(xdr.lookup("Limits"))],
  ["blockReasons", xdr.lookup("Uint32")],
  ["accountType", xdr.lookup("AccountType")],
  ["referrer", xdr.option(xdr.lookup("AccountId"))],
  ["policies", xdr.lookup("Int32")],
  ["ext", xdr.lookup("AccountEntryExt")],
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
//   enum FeeType
//   {
//       PAYMENT_FEE = 0,
//   	OFFER_FEE = 1,
//       WITHDRAWAL_FEE = 2,
//       ISSUANCE_FEE = 3
//   };
//
// ===========================================================================
xdr.enum("FeeType", {
  paymentFee: 0,
  offerFee: 1,
  withdrawalFee: 2,
  issuanceFee: 3,
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
//       case CROSS_ASSET_FEE:
//           AssetCode feeAsset;
//       }
//
// ===========================================================================
xdr.union("FeeEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
    ["crossAssetFee", "feeAsset"],
  ],
  arms: {
    feeAsset: xdr.lookup("AssetCode"),
  },
});

// === xdr source ============================================================
//
//   struct FeeEntry
//   {
//       FeeType feeType;
//       AssetCode asset;
//       int64 fixedFee; // fee paid for operation
//   	int64 percentFee; // percent of transfer amount to be charged
//   
//       AccountID* accountID;
//       AccountType* accountType;
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
//       case CROSS_ASSET_FEE:
//           AssetCode feeAsset;
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
  ["accountType", xdr.option(xdr.lookup("AccountType"))],
  ["subtype", xdr.lookup("Int64")],
  ["lowerBound", xdr.lookup("Int64")],
  ["upperBound", xdr.lookup("Int64")],
  ["hash", xdr.lookup("Hash")],
  ["ext", xdr.lookup("FeeEntryExt")],
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
//       WithdrawalRequest request;
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
xdr.struct("CreateWithdrawalRequestOp", [
  ["request", xdr.lookup("WithdrawalRequest")],
  ["ext", xdr.lookup("CreateWithdrawalRequestOpExt")],
]);

// === xdr source ============================================================
//
//   enum CreateWithdrawalRequestResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//   	INVALID_AMOUNT = -1, // amount is 0
//       INVALID_EXTERNAL_DETAILS = -2, // external details size exceeds max allowed
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
//       LIMITS_EXCEEDED = -13, // withdraw exceeds limits for source account
//   	INVALID_PRE_CONFIRMATION_DETAILS = -14 // it's not allowed to pass pre confirmation details
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
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CreateWithdrawalSuccess", [
  ["requestId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("CreateWithdrawalSuccessExt")],
]);

// === xdr source ============================================================
//
//   union CreateWithdrawalRequestResult switch (CreateWithdrawalRequestResultCode code)
//   {
//       case SUCCESS:
//           CreateWithdrawalSuccess success;
//       default:
//           void;
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
//   enum ExternalSystemIDGeneratorType {
//   	BITCOIN_BASIC = 1,
//   	ETHEREUM_BASIC = 2
//   };
//
// ===========================================================================
xdr.enum("ExternalSystemIdGeneratorType", {
  bitcoinBasic: 1,
  ethereumBasic: 2,
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
//       ExternalSystemIDGeneratorType externalSystemIDGenerators<>;
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
  ["externalSystemIdGenerators", xdr.varArray(xdr.lookup("ExternalSystemIdGeneratorType"), 2147483647)],
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
//       TX_EXPIRATION_PERIOD = 3,
//   	EXTERNAL_SYSTEM_ID_GENERATOR = 4
//   };
//
// ===========================================================================
xdr.enum("LedgerUpgradeType", {
  version: 1,
  maxTxSetSize: 2,
  txExpirationPeriod: 3,
  externalSystemIdGenerator: 4,
});

// === xdr source ============================================================
//
//   union LedgerUpgrade switch (LedgerUpgradeType type)
//   {
//   case VERSION:
//       uint32 newLedgerVersion; // update ledgerVersion
//   case MAX_TX_SET_SIZE:
//       uint32 newMaxTxSetSize; // update maxTxSetSize
//   case EXTERNAL_SYSTEM_ID_GENERATOR:
//       ExternalSystemIDGeneratorType newExternalSystemIDGenerators<>;
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
    ["externalSystemIdGenerator", "newExternalSystemIdGenerators"],
    ["txExpirationPeriod", "newTxExpirationPeriod"],
  ],
  arms: {
    newLedgerVersion: xdr.lookup("Uint32"),
    newMaxTxSetSize: xdr.lookup("Uint32"),
    newExternalSystemIdGenerators: xdr.varArray(xdr.lookup("ExternalSystemIdGeneratorType"), 2147483647),
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
xdr.union("LedgerKeyPaymentRequestExt", {
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
//   		uint64 paymentID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyPaymentRequest", [
  ["paymentId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("LedgerKeyPaymentRequestExt")],
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
xdr.union("LedgerKeyAccountTypeLimitsExt", {
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
//           AccountType accountType;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyAccountTypeLimits", [
  ["accountType", xdr.lookup("AccountType")],
  ["ext", xdr.lookup("LedgerKeyAccountTypeLimitsExt")],
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
xdr.union("LedgerKeyTrustExt", {
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
//           AccountID allowedAccount;
//           BalanceID balanceToUse;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyTrust", [
  ["allowedAccount", xdr.lookup("AccountId")],
  ["balanceToUse", xdr.lookup("BalanceId")],
  ["ext", xdr.lookup("LedgerKeyTrustExt")],
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
xdr.union("LedgerKeyInvoiceExt", {
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
//           uint64 invoiceID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyInvoice", [
  ["invoiceId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("LedgerKeyInvoiceExt")],
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
//           string256 key;
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
  ["key", xdr.lookup("String256")],
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
//   case PAYMENT_REQUEST:
//       struct
//       {
//   		uint64 paymentID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       } paymentRequest;
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
//   case ACCOUNT_TYPE_LIMITS:
//       struct {
//           AccountType accountType;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       } accountTypeLimits;
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
//   case TRUST:
//       struct {
//           AccountID allowedAccount;
//           BalanceID balanceToUse;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       } trust;
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
//   case INVOICE:
//       struct {
//           uint64 invoiceID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       } invoice;
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
//           string256 key;
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
//   };
//
// ===========================================================================
xdr.union("LedgerKey", {
  switchOn: xdr.lookup("LedgerEntryType"),
  switchName: "type",
  switches: [
    ["account", "account"],
    ["fee", "feeState"],
    ["balance", "balance"],
    ["paymentRequest", "paymentRequest"],
    ["asset", "asset"],
    ["referenceEntry", "reference"],
    ["accountTypeLimit", "accountTypeLimits"],
    ["statistic", "stats"],
    ["trust", "trust"],
    ["accountLimit", "accountLimits"],
    ["assetPair", "assetPair"],
    ["offerEntry", "offer"],
    ["invoice", "invoice"],
    ["reviewableRequest", "reviewableRequest"],
    ["externalSystemAccountId", "externalSystemAccountId"],
    ["sale", "sale"],
    ["keyValue", "keyValue"],
    ["accountKyc", "accountKyc"],
    ["externalSystemAccountIdPoolEntry", "externalSystemAccountIdPoolEntry"],
  ],
  arms: {
    account: xdr.lookup("LedgerKeyAccount"),
    feeState: xdr.lookup("LedgerKeyFeeState"),
    balance: xdr.lookup("LedgerKeyBalance"),
    paymentRequest: xdr.lookup("LedgerKeyPaymentRequest"),
    asset: xdr.lookup("LedgerKeyAsset"),
    reference: xdr.lookup("LedgerKeyReference"),
    accountTypeLimits: xdr.lookup("LedgerKeyAccountTypeLimits"),
    stats: xdr.lookup("LedgerKeyStats"),
    trust: xdr.lookup("LedgerKeyTrust"),
    accountLimits: xdr.lookup("LedgerKeyAccountLimits"),
    assetPair: xdr.lookup("LedgerKeyAssetPair"),
    offer: xdr.lookup("LedgerKeyOffer"),
    invoice: xdr.lookup("LedgerKeyInvoice"),
    reviewableRequest: xdr.lookup("LedgerKeyReviewableRequest"),
    externalSystemAccountId: xdr.lookup("LedgerKeyExternalSystemAccountId"),
    sale: xdr.lookup("LedgerKeySale"),
    keyValue: xdr.lookup("LedgerKeyKeyValue"),
    accountKyc: xdr.lookup("LedgerKeyAccountKyc"),
    externalSystemAccountIdPoolEntry: xdr.lookup("LedgerKeyExternalSystemAccountIdPoolEntry"),
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
//       longstring newDetails;
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
xdr.struct("UpdateSaleDetailsRequest", [
  ["saleId", xdr.lookup("Uint64")],
  ["newDetails", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("UpdateSaleDetailsRequestExt")],
]);

// === xdr source ============================================================
//
//   enum AssetPolicy
//   {
//   	TRANSFERABLE = 1,
//   	BASE_ASSET = 2,
//   	STATS_QUOTE_ASSET = 4,
//   	WITHDRAWABLE = 8,
//   	TWO_STEP_WITHDRAWAL = 16,
//   	REQUIRES_KYC = 32,
//   	ISSUANCE_MANUAL_REVIEW_REQUIRED = 64
//   };
//
// ===========================================================================
xdr.enum("AssetPolicy", {
  transferable: 1,
  baseAsset: 2,
  statsQuoteAsset: 4,
  withdrawable: 8,
  twoStepWithdrawal: 16,
  requiresKyc: 32,
  issuanceManualReviewRequired: 64,
});

// === xdr source ============================================================
//
//   enum AssetSystemPolicies
//   {
//   	TWO_STEP_WITHDRAW = 1
//   };
//
// ===========================================================================
xdr.enum("AssetSystemPolicies", {
  twoStepWithdraw: 1,
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
  ["ext", xdr.lookup("AssetEntryExt")],
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
//   		INVALID_ASSET_PAIR_PRICE = -16
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
xdr.union("AccountTypeLimitsEntryExt", {
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
//   struct AccountTypeLimitsEntry
//   {
//   	AccountType accountType;
//       Limits limits;
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
xdr.struct("AccountTypeLimitsEntry", [
  ["accountType", xdr.lookup("AccountType")],
  ["limits", xdr.lookup("Limits")],
  ["ext", xdr.lookup("AccountTypeLimitsEntryExt")],
]);

// === xdr source ============================================================
//
//   enum InvoiceState
//   {
//       INVOICE_NEEDS_PAYMENT = 0,
//       INVOICE_NEEDS_PAYMENT_REVIEW = 1
//   };
//
// ===========================================================================
xdr.enum("InvoiceState", {
  invoiceNeedsPayment: 0,
  invoiceNeedsPaymentReview: 1,
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
xdr.union("InvoiceEntryExt", {
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
//   struct InvoiceEntry
//   {
//       uint64 invoiceID;
//       AccountID receiverAccount;
//       BalanceID receiverBalance;
//   	AccountID sender;
//       int64 amount;
//       
//       InvoiceState state;
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
xdr.struct("InvoiceEntry", [
  ["invoiceId", xdr.lookup("Uint64")],
  ["receiverAccount", xdr.lookup("AccountId")],
  ["receiverBalance", xdr.lookup("BalanceId")],
  ["sender", xdr.lookup("AccountId")],
  ["amount", xdr.lookup("Int64")],
  ["state", xdr.lookup("InvoiceState")],
  ["ext", xdr.lookup("InvoiceEntryExt")],
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
//   	{
//   	case EMPTY_VERSION:
//   		void;
//   	}
//
// ===========================================================================
xdr.union("ReviewPaymentRequestOpExt", {
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
//   struct ReviewPaymentRequestOp
//   {
//       uint64 paymentID;
//   
//   	bool accept;
//       longstring* rejectReason;
//   	// reserved for future use
//   	union switch (LedgerVersion v)
//   	{
//   	case EMPTY_VERSION:
//   		void;
//   	}
//   	ext;
//   };
//
// ===========================================================================
xdr.struct("ReviewPaymentRequestOp", [
  ["paymentId", xdr.lookup("Uint64")],
  ["accept", xdr.bool()],
  ["rejectReason", xdr.option(xdr.lookup("Longstring"))],
  ["ext", xdr.lookup("ReviewPaymentRequestOpExt")],
]);

// === xdr source ============================================================
//
//   enum ReviewPaymentRequestResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//   	NOT_FOUND = -1,           // failed to find Recovery request with such ID
//       LINE_FULL = -2
//   };
//
// ===========================================================================
xdr.enum("ReviewPaymentRequestResultCode", {
  success: 0,
  notFound: -1,
  lineFull: -2,
});

// === xdr source ============================================================
//
//   enum PaymentState
//   {
//       PENDING = 0,
//       PROCESSED = 1,
//       REJECTED = 2
//   };
//
// ===========================================================================
xdr.enum("PaymentState", {
  pending: 0,
  processed: 1,
  rejected: 2,
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
xdr.union("ReviewPaymentResponseExt", {
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
//   struct ReviewPaymentResponse {
//       PaymentState state;
//       
//       uint64* relatedInvoiceID;
//   	// reserved for future use
//   	union switch (LedgerVersion v)
//   	{
//   	case EMPTY_VERSION:
//   		void;
//   	}
//   	ext;
//   };
//
// ===========================================================================
xdr.struct("ReviewPaymentResponse", [
  ["state", xdr.lookup("PaymentState")],
  ["relatedInvoiceId", xdr.option(xdr.lookup("Uint64"))],
  ["ext", xdr.lookup("ReviewPaymentResponseExt")],
]);

// === xdr source ============================================================
//
//   union ReviewPaymentRequestResult switch (ReviewPaymentRequestResultCode code)
//   {
//   case SUCCESS:
//       ReviewPaymentResponse reviewPaymentResponse;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ReviewPaymentRequestResult", {
  switchOn: xdr.lookup("ReviewPaymentRequestResultCode"),
  switchName: "code",
  switches: [
    ["success", "reviewPaymentResponse"],
  ],
  arms: {
    reviewPaymentResponse: xdr.lookup("ReviewPaymentResponse"),
  },
  defaultArm: xdr.void(),
});

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
//   enum LedgerEntryType
//   {
//       ACCOUNT = 0,
//       FEE = 2,
//       BALANCE = 4,
//       PAYMENT_REQUEST = 5,
//       ASSET = 6,
//       REFERENCE_ENTRY = 7,
//       ACCOUNT_TYPE_LIMITS = 8,
//       STATISTICS = 9,
//       TRUST = 10,
//       ACCOUNT_LIMITS = 11,
//   	ASSET_PAIR = 12,
//   	OFFER_ENTRY = 13,
//       INVOICE = 14,
//   	REVIEWABLE_REQUEST = 15,
//   	EXTERNAL_SYSTEM_ACCOUNT_ID = 16,
//   	SALE = 17,
//   	ACCOUNT_KYC = 18,
//   	EXTERNAL_SYSTEM_ACCOUNT_ID_POOL_ENTRY = 19,
//       KEY_VALUE = 20
//   };
//
// ===========================================================================
xdr.enum("LedgerEntryType", {
  account: 0,
  fee: 2,
  balance: 4,
  paymentRequest: 5,
  asset: 6,
  referenceEntry: 7,
  accountTypeLimit: 8,
  statistic: 9,
  trust: 10,
  accountLimit: 11,
  assetPair: 12,
  offerEntry: 13,
  invoice: 14,
  reviewableRequest: 15,
  externalSystemAccountId: 16,
  sale: 17,
  accountKyc: 18,
  externalSystemAccountIdPoolEntry: 19,
  keyValue: 20,
});

// === xdr source ============================================================
//
//   union switch (LedgerEntryType type)
//       {
//       case ACCOUNT:
//           AccountEntry account;
//       case FEE:
//           FeeEntry feeState;
//       case BALANCE:
//           BalanceEntry balance;
//       case PAYMENT_REQUEST:
//           PaymentRequestEntry paymentRequest;
//       case ASSET:
//           AssetEntry asset;
//       case REFERENCE_ENTRY:
//           ReferenceEntry reference;
//       case ACCOUNT_TYPE_LIMITS:
//           AccountTypeLimitsEntry accountTypeLimits;
//       case STATISTICS:
//           StatisticsEntry stats;
//       case TRUST:
//           TrustEntry trust;
//       case ACCOUNT_LIMITS:
//           AccountLimitsEntry accountLimits;
//   	case ASSET_PAIR: 
//   		AssetPairEntry assetPair;
//   	case OFFER_ENTRY:
//   		OfferEntry offer;
//       case INVOICE:
//           InvoiceEntry invoice;
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
//       }
//
// ===========================================================================
xdr.union("LedgerEntryData", {
  switchOn: xdr.lookup("LedgerEntryType"),
  switchName: "type",
  switches: [
    ["account", "account"],
    ["fee", "feeState"],
    ["balance", "balance"],
    ["paymentRequest", "paymentRequest"],
    ["asset", "asset"],
    ["referenceEntry", "reference"],
    ["accountTypeLimit", "accountTypeLimits"],
    ["statistic", "stats"],
    ["trust", "trust"],
    ["accountLimit", "accountLimits"],
    ["assetPair", "assetPair"],
    ["offerEntry", "offer"],
    ["invoice", "invoice"],
    ["reviewableRequest", "reviewableRequest"],
    ["externalSystemAccountId", "externalSystemAccountId"],
    ["sale", "sale"],
    ["keyValue", "keyValue"],
    ["accountKyc", "accountKyc"],
    ["externalSystemAccountIdPoolEntry", "externalSystemAccountIdPoolEntry"],
  ],
  arms: {
    account: xdr.lookup("AccountEntry"),
    feeState: xdr.lookup("FeeEntry"),
    balance: xdr.lookup("BalanceEntry"),
    paymentRequest: xdr.lookup("PaymentRequestEntry"),
    asset: xdr.lookup("AssetEntry"),
    reference: xdr.lookup("ReferenceEntry"),
    accountTypeLimits: xdr.lookup("AccountTypeLimitsEntry"),
    stats: xdr.lookup("StatisticsEntry"),
    trust: xdr.lookup("TrustEntry"),
    accountLimits: xdr.lookup("AccountLimitsEntry"),
    assetPair: xdr.lookup("AssetPairEntry"),
    offer: xdr.lookup("OfferEntry"),
    invoice: xdr.lookup("InvoiceEntry"),
    reviewableRequest: xdr.lookup("ReviewableRequestEntry"),
    externalSystemAccountId: xdr.lookup("ExternalSystemAccountId"),
    sale: xdr.lookup("SaleEntry"),
    keyValue: xdr.lookup("KeyValueEntry"),
    accountKyc: xdr.lookup("AccountKycEntry"),
    externalSystemAccountIdPoolEntry: xdr.lookup("ExternalSystemAccountIdPoolEntry"),
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
//       case FEE:
//           FeeEntry feeState;
//       case BALANCE:
//           BalanceEntry balance;
//       case PAYMENT_REQUEST:
//           PaymentRequestEntry paymentRequest;
//       case ASSET:
//           AssetEntry asset;
//       case REFERENCE_ENTRY:
//           ReferenceEntry reference;
//       case ACCOUNT_TYPE_LIMITS:
//           AccountTypeLimitsEntry accountTypeLimits;
//       case STATISTICS:
//           StatisticsEntry stats;
//       case TRUST:
//           TrustEntry trust;
//       case ACCOUNT_LIMITS:
//           AccountLimitsEntry accountLimits;
//   	case ASSET_PAIR: 
//   		AssetPairEntry assetPair;
//   	case OFFER_ENTRY:
//   		OfferEntry offer;
//       case INVOICE:
//           InvoiceEntry invoice;
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
//   union switch (LedgerVersion v)
//   	{
//   	case EMPTY_VERSION:
//   		void;
//   	}
//
// ===========================================================================
xdr.union("SetLimitsOpExt", {
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
//   struct SetLimitsOp
//   {
//       AccountID* account;
//       AccountType* accountType;
//   
//       Limits limits;
//   	// reserved for future use
//   	union switch (LedgerVersion v)
//   	{
//   	case EMPTY_VERSION:
//   		void;
//   	}
//   	ext;
//   };
//
// ===========================================================================
xdr.struct("SetLimitsOp", [
  ["account", xdr.option(xdr.lookup("AccountId"))],
  ["accountType", xdr.option(xdr.lookup("AccountType"))],
  ["limits", xdr.lookup("Limits")],
  ["ext", xdr.lookup("SetLimitsOpExt")],
]);

// === xdr source ============================================================
//
//   enum SetLimitsResultCode
//   {
//       // codes considered as "success" for the operation
//       SUCCESS = 0,
//       // codes considered as "failure" for the operation
//       MALFORMED = -1
//   };
//
// ===========================================================================
xdr.enum("SetLimitsResultCode", {
  success: 0,
  malformed: -1,
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
xdr.union("SetLimitsResultSuccessExt", {
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
xdr.struct("SetLimitsResultSuccess", [
  ["ext", xdr.lookup("SetLimitsResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   union SetLimitsResult switch (SetLimitsResultCode code)
//   {
//   case SUCCESS:
//       struct {
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
xdr.union("SetLimitsResult", {
  switchOn: xdr.lookup("SetLimitsResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("SetLimitsResultSuccess"),
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
//       REFERENCE_DUPLICATION = -2,    // reference is already used
//       NOT_AUTHORIZED_UPLOAD = -3, // tries to pre issue asset for not owned asset
//       INVALID_SIGNATURE = -4,
//       EXCEEDED_MAX_AMOUNT = -5,
//   	INVALID_AMOUNT = -6,
//   	INVALID_REFERENCE = -7
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
//       longstring reason;
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
  ["reason", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("AmlAlertRequestExt")],
]);

});
export default types;
