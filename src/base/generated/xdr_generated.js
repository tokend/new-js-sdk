// revision: bfe433c307cbf914f6c15b00c80f934cb9125b01
// branch:   refactor/internal_work
// Automatically generated on 2019-12-25T10:08:33+00:00
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
//       // sequential ID - unique identifier of the account, used by ingesting applications to
//       // identify account, while keeping size of index small
//       uint64 sequentialID;
//   
//   	uint64 roleIDs<>;
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
  ["roleIDs", xdr.varArray(xdr.lookup("Uint64"), 2147483647)],
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
//   
//       uint32 securityType; // use instead policies that limit usage, use in account rules
//       uint32 state; // smth that can be used to disable asset
//   	
//   	uint64 maxIssuanceAmount; // max number of tokens to be issued
//   	uint64 issued; // number of issued tokens
//   	uint64 pendingIssuance; // number of tokens to be issued
//   	
//       uint32 trailingDigitsCount;
//       
//       AccountID owner;
//   	longstring details;
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
  ["securityType", xdr.lookup("Uint32")],
  ["state", xdr.lookup("Uint32")],
  ["maxIssuanceAmount", xdr.lookup("Uint64")],
  ["issued", xdr.lookup("Uint64")],
  ["pendingIssuance", xdr.lookup("Uint64")],
  ["trailingDigitsCount", xdr.lookup("Uint32")],
  ["owner", xdr.lookup("AccountId")],
  ["details", xdr.lookup("Longstring")],
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
//   	// sequential ID - unique identifier of the balance, used by ingesting applications to
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
//   struct DataEntry 
//   {
//       uint64 id;
//       uint32 securityType;
//       longstring value;
//   
//       AccountID owner;
//   
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("DataEntry", [
  ["id", xdr.lookup("Uint64")],
  ["securityType", xdr.lookup("Uint32")],
  ["value", xdr.lookup("Longstring")],
  ["owner", xdr.lookup("AccountId")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   //: `KeyValueEntryType` defines the type of value in the key-value entry
//       enum KeyValueEntryType
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
//   //: `KeyValueEntryValue` represents the value based on given `KeyValueEntryType`
//       union KeyValueEntryValue switch (KeyValueEntryType type)
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
//   //: `KeyValueEntry` is an entry used to store key mapped values
//       struct KeyValueEntry
//       {
//           //: String value that must be unique among other keys for kev-value pairs
//           longstring key;
//   
//           //: Value that corresponds to particular key (depending on `KeyValueEntryType`, 
//           //: the value can be either uint32, or uint64, or string)
//           KeyValueEntryValue value;
//   
//           //: reserved for future use
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
//   struct ReferenceEntry
//   {
//   	AccountID sender;
//       string64 reference;
//       OperationType opType;
//       uint32 securityType;
//   
//   	// reserved for future use
//   	EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("ReferenceEntry", [
  ["sender", xdr.lookup("AccountId")],
  ["reference", xdr.lookup("String64")],
  ["opType", xdr.lookup("OperationType")],
  ["securityType", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   union ReviewableRequestOperation switch (OperationType type)
//   {
//   case CREATE_ACCOUNT:
//       CreateAccountOp createAccountOp;
//   case PAYMENT:
//       PaymentOp paymentOp;
//   case CREATE_SIGNER:
//       CreateSignerOp createSignerOp;
//   case UPDATE_SIGNER:
//       UpdateSignerOp updateSignerOp;
//   case REMOVE_SIGNER:
//       RemoveSignerOp removeSignerOp;
//   case CREATE_ROLE:
//       CreateRoleOp createRoleOp;
//   case UPDATE_ROLE:
//       UpdateRoleOp updateRoleOp;
//   case REMOVE_ROLE:
//       RemoveRoleOp removeRoleOp;
//   case CREATE_RULE:
//       CreateRuleOp createRuleOp;
//   case UPDATE_RULE:
//       UpdateRuleOp updateRuleOp;
//   case REMOVE_RULE:
//       RemoveRuleOp removeRuleOp;
//   case ISSUANCE:
//       IssuanceOp issuanceOp;
//   case DESTRUCTION:
//       DestructionOp destructionOp;
//   case CHANGE_ACCOUNT_ROLES:
//       ChangeAccountRolesOp changeAccountRolesOp;
//   case CREATE_ASSET:
//       CreateAssetOp createAssetOp;
//   case UPDATE_ASSET:
//       UpdateAssetOp updateAssetOp;
//   case PUT_KEY_VALUE:
//       PutKeyValueOp putKeyValueOp;
//   case REMOVE_KEY_VALUE:
//       RemoveKeyValueOp removeKeyValueOp;
//   case CREATE_DATA:
//       CreateDataOp createDataOp;
//   case UPDATE_DATA:
//       UpdateDataOp updateDataOp;
//   case REMOVE_DATA:
//       RemoveDataOp removeDataOp;
//   case CREATE_BALANCE:
//       CreateBalanceOp createBalanceOp;
//   case INITIATE_KYC_RECOVERY:
//       InitiateKYCRecoveryOp initiateKYCRecoveryOp;
//   case KYC_RECOVERY:
//       KYCRecoveryOp kycRecoveryOp;
//   
//   };
//
// ===========================================================================
xdr.union("ReviewableRequestOperation", {
  switchOn: xdr.lookup("OperationType"),
  switchName: "type",
  switches: [
    ["createAccount", "createAccountOp"],
    ["payment", "paymentOp"],
    ["createSigner", "createSignerOp"],
    ["updateSigner", "updateSignerOp"],
    ["removeSigner", "removeSignerOp"],
    ["createRole", "createRoleOp"],
    ["updateRole", "updateRoleOp"],
    ["removeRole", "removeRoleOp"],
    ["createRule", "createRuleOp"],
    ["updateRule", "updateRuleOp"],
    ["removeRule", "removeRuleOp"],
    ["issuance", "issuanceOp"],
    ["destruction", "destructionOp"],
    ["changeAccountRole", "changeAccountRolesOp"],
    ["createAsset", "createAssetOp"],
    ["updateAsset", "updateAssetOp"],
    ["putKeyValue", "putKeyValueOp"],
    ["removeKeyValue", "removeKeyValueOp"],
    ["createDatum", "createDataOp"],
    ["updateDatum", "updateDataOp"],
    ["removeDatum", "removeDataOp"],
    ["createBalance", "createBalanceOp"],
    ["initiateKycRecovery", "initiateKycRecoveryOp"],
    ["kycRecovery", "kycRecoveryOp"],
  ],
  arms: {
    createAccountOp: xdr.lookup("CreateAccountOp"),
    paymentOp: xdr.lookup("PaymentOp"),
    createSignerOp: xdr.lookup("CreateSignerOp"),
    updateSignerOp: xdr.lookup("UpdateSignerOp"),
    removeSignerOp: xdr.lookup("RemoveSignerOp"),
    createRoleOp: xdr.lookup("CreateRoleOp"),
    updateRoleOp: xdr.lookup("UpdateRoleOp"),
    removeRoleOp: xdr.lookup("RemoveRoleOp"),
    createRuleOp: xdr.lookup("CreateRuleOp"),
    updateRuleOp: xdr.lookup("UpdateRuleOp"),
    removeRuleOp: xdr.lookup("RemoveRuleOp"),
    issuanceOp: xdr.lookup("IssuanceOp"),
    destructionOp: xdr.lookup("DestructionOp"),
    changeAccountRolesOp: xdr.lookup("ChangeAccountRolesOp"),
    createAssetOp: xdr.lookup("CreateAssetOp"),
    updateAssetOp: xdr.lookup("UpdateAssetOp"),
    putKeyValueOp: xdr.lookup("PutKeyValueOp"),
    removeKeyValueOp: xdr.lookup("RemoveKeyValueOp"),
    createDataOp: xdr.lookup("CreateDataOp"),
    updateDataOp: xdr.lookup("UpdateDataOp"),
    removeDataOp: xdr.lookup("RemoveDataOp"),
    createBalanceOp: xdr.lookup("CreateBalanceOp"),
    initiateKycRecoveryOp: xdr.lookup("InitiateKycRecoveryOp"),
    kycRecoveryOp: xdr.lookup("KycRecoveryOp"),
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
//   struct ReviewableRequestEntry
//   {
//   	uint64 requestID;
//   	Hash hash; // hash of the request body
//   
//       uint32 securityType; // responsible for operations (types, count)
//   
//   	AccountID requestor;
//       longstring rejectReason;
//   	int64 createdAt; // when request was created
//   
//   	ReviewableRequestOperation operations<>;
//   
//   	uint64 allTasks;
//       uint64 pendingTasks;
//       // maybe add sequenceNumber and creator details
//   
//       // External details vector consists of comments written by request reviewers
//       longstring externalDetails<>;
//       longstring creatorDetails;
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
  ["securityType", xdr.lookup("Uint32")],
  ["requestor", xdr.lookup("AccountId")],
  ["rejectReason", xdr.lookup("Longstring")],
  ["createdAt", xdr.lookup("Int64")],
  ["operations", xdr.varArray(xdr.lookup("ReviewableRequestOperation"), 2147483647)],
  ["allTasks", xdr.lookup("Uint64")],
  ["pendingTasks", xdr.lookup("Uint64")],
  ["externalDetails", xdr.varArray(xdr.lookup("Longstring"), 2147483647)],
  ["creatorDetails", xdr.lookup("Longstring")],
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
xdr.union("RoleEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct RoleEntry
//   {
//       uint64 id;
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
xdr.struct("RoleEntry", [
  ["id", xdr.lookup("Uint64")],
  ["ruleIDs", xdr.varArray(xdr.lookup("Uint64"), 2147483647)],
  ["details", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("RoleEntryExt")],
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
xdr.union("RuleEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct RuleEntry
//   {
//       uint64 id;
//   
//       RuleResource resource;
//       RuleAction action;
//   
//       bool forbids;
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
xdr.struct("RuleEntry", [
  ["id", xdr.lookup("Uint64")],
  ["resource", xdr.lookup("RuleResource")],
  ["action", xdr.lookup("RuleAction")],
  ["forbids", xdr.bool()],
  ["details", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("RuleEntryExt")],
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
//   	uint64 roleIDs<>;
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
  ["roleIDs", xdr.varArray(xdr.lookup("Uint64"), 2147483647)],
  ["ext", xdr.lookup("SignerEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerEntryType type)
//       {
//       case ACCOUNT:
//           AccountEntry account;
//       case SIGNER:
//           SignerEntry signer;
//       case BALANCE:
//           BalanceEntry balance;
//       case ASSET:
//           AssetEntry asset;
//       case DATA:
//           DataEntry data;
//       case REFERENCE:
//           ReferenceEntry reference;
//       case REVIEWABLE_REQUEST:
//   		ReviewableRequestEntry reviewableRequest;
//   	case KEY_VALUE:
//   	    KeyValueEntry keyValue;
//   	case ACCOUNT_KYC:
//           AccountKYCEntry accountKYC;
//       case RULE:
//           RuleEntry rule;
//       case ROLE:
//           RoleEntry role;
//       }
//
// ===========================================================================
xdr.union("LedgerEntryData", {
  switchOn: xdr.lookup("LedgerEntryType"),
  switchName: "type",
  switches: [
    ["account", "account"],
    ["signer", "signer"],
    ["balance", "balance"],
    ["asset", "asset"],
    ["datum", "data"],
    ["reference", "reference"],
    ["reviewableRequest", "reviewableRequest"],
    ["keyValue", "keyValue"],
    ["accountKyc", "accountKyc"],
    ["rule", "rule"],
    ["role", "role"],
  ],
  arms: {
    account: xdr.lookup("AccountEntry"),
    signer: xdr.lookup("SignerEntry"),
    balance: xdr.lookup("BalanceEntry"),
    asset: xdr.lookup("AssetEntry"),
    data: xdr.lookup("DataEntry"),
    reference: xdr.lookup("ReferenceEntry"),
    reviewableRequest: xdr.lookup("ReviewableRequestEntry"),
    keyValue: xdr.lookup("KeyValueEntry"),
    accountKyc: xdr.lookup("AccountKycEntry"),
    rule: xdr.lookup("RuleEntry"),
    role: xdr.lookup("RoleEntry"),
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
//       case BALANCE:
//           BalanceEntry balance;
//       case ASSET:
//           AssetEntry asset;
//       case DATA:
//           DataEntry data;
//       case REFERENCE:
//           ReferenceEntry reference;
//       case REVIEWABLE_REQUEST:
//   		ReviewableRequestEntry reviewableRequest;
//   	case KEY_VALUE:
//   	    KeyValueEntry keyValue;
//   	case ACCOUNT_KYC:
//           AccountKYCEntry accountKYC;
//       case RULE:
//           RuleEntry rule;
//       case ROLE:
//           RoleEntry role;
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
//          {
//          case EMPTY_VERSION:
//             void;
//          }
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
//           union switch (LedgerVersion v)
//          {
//          case EMPTY_VERSION:
//             void;
//          }
//          ext;
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
//           {
//           case EMPTY_VERSION:
//               void;
//           }
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
//           BalanceID balanceID;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
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
//           {
//           case EMPTY_VERSION:
//               void;
//           }
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
//           AssetCode code;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyAsset", [
  ["code", xdr.lookup("AssetCode")],
  ["ext", xdr.lookup("LedgerKeyAssetExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           AccountID sender;
//           string64 reference;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyReference", [
  ["sender", xdr.lookup("AccountId")],
  ["reference", xdr.lookup("String64")],
  ["ext", xdr.lookup("EmptyExt")],
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
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
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
//           {
//           case EMPTY_VERSION:
//               void;
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
//           case EMPTY_VERSION:
//               void;
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
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//
// ===========================================================================
xdr.union("LedgerKeyRoleExt", {
  switchOn: xdr.lookup("LedgerVersion"),
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
xdr.struct("LedgerKeyRole", [
  ["id", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("LedgerKeyRoleExt")],
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
xdr.union("LedgerKeyRuleExt", {
  switchOn: xdr.lookup("LedgerVersion"),
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
xdr.struct("LedgerKeyRule", [
  ["id", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("LedgerKeyRuleExt")],
]);

// === xdr source ============================================================
//
//   struct {
//           uint64 id;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyData", [
  ["id", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   union LedgerKey switch (LedgerEntryType type)
//   {
//   case ACCOUNT:
//       struct
//       {
//           AccountID accountID;
//           union switch (LedgerVersion v)
//          {
//          case EMPTY_VERSION:
//             void;
//          }
//          ext;
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
//   case BALANCE:
//       struct
//       {
//           BalanceID balanceID;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       } balance;
//   case ASSET:
//       struct
//       {
//           AssetCode code;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       } asset;
//   case REFERENCE:
//       struct
//       {
//           AccountID sender;
//           string64 reference;
//   
//           EmptyExt ext;
//       } reference;
//   case REVIEWABLE_REQUEST:
//       struct {
//           uint64 requestID;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       } reviewableRequest;
//   case KEY_VALUE:
//       struct {
//           longstring key;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
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
//   case ROLE:
//       struct {
//           uint64 id;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       } role;
//   case RULE:
//       struct {
//           uint64 id;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       } rule;
//   case DATA:
//       struct {
//           uint64 id;
//   
//           EmptyExt ext;
//       } data;
//   
//   };
//
// ===========================================================================
xdr.union("LedgerKey", {
  switchOn: xdr.lookup("LedgerEntryType"),
  switchName: "type",
  switches: [
    ["account", "account"],
    ["signer", "signer"],
    ["balance", "balance"],
    ["asset", "asset"],
    ["reference", "reference"],
    ["reviewableRequest", "reviewableRequest"],
    ["keyValue", "keyValue"],
    ["accountKyc", "accountKyc"],
    ["role", "role"],
    ["rule", "rule"],
    ["datum", "data"],
  ],
  arms: {
    account: xdr.lookup("LedgerKeyAccount"),
    signer: xdr.lookup("LedgerKeySigner"),
    balance: xdr.lookup("LedgerKeyBalance"),
    asset: xdr.lookup("LedgerKeyAsset"),
    reference: xdr.lookup("LedgerKeyReference"),
    reviewableRequest: xdr.lookup("LedgerKeyReviewableRequest"),
    keyValue: xdr.lookup("LedgerKeyKeyValue"),
    accountKyc: xdr.lookup("LedgerKeyAccountKyc"),
    role: xdr.lookup("LedgerKeyRole"),
    rule: xdr.lookup("LedgerKeyRule"),
    data: xdr.lookup("LedgerKeyData"),
  },
});

// === xdr source ============================================================
//
//   enum LedgerUpgradeType
//   {
//       NONE = 0,
//       VERSION = 1,
//       MAX_TX_SET_SIZE = 2,
//       TX_EXPIRATION_PERIOD = 3
//   };
//
// ===========================================================================
xdr.enum("LedgerUpgradeType", {
  none: 0,
  version: 1,
  maxTxSetSize: 2,
  txExpirationPeriod: 3,
});

// === xdr source ============================================================
//
//   union LedgerUpgrade switch (LedgerUpgradeType type)
//   {
//   case NONE:
//       void;
//   case VERSION:
//       uint32 newLedgerVersion; // update ledgerVersion
//   case MAX_TX_SET_SIZE:
//       uint32 newMaxTxSetSize; // update maxTxSetSize
//   case TX_EXPIRATION_PERIOD:
//       uint64 newTxExpirationPeriod;
//   };
//
// ===========================================================================
xdr.union("LedgerUpgrade", {
  switchOn: xdr.lookup("LedgerUpgradeType"),
  switchName: "type",
  switches: [
    ["none", xdr.void()],
    ["version", "newLedgerVersion"],
    ["maxTxSetSize", "newMaxTxSetSize"],
    ["txExpirationPeriod", "newTxExpirationPeriod"],
  ],
  arms: {
    newLedgerVersion: xdr.lookup("Uint32"),
    newMaxTxSetSize: xdr.lookup("Uint32"),
    newTxExpirationPeriod: xdr.lookup("Uint64"),
  },
});

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
//       Hash txSetHash;          // hash of transactions' hashes
//       Hash txSetResultHash;    // the TransactionResultSet that led to this ledger
//   
//       uint32 ledgerSeq; // sequence number of this ledger
//       uint64 closeTime; // network close time
//   
//       IdGenerator idGenerators<>; // generators of ids
//       LedgerUpgrade upgrade; // upgrade in current ledger (usually none), only one upgrade in one closed ledger is enough
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
  ["txSetHash", xdr.lookup("Hash")],
  ["txSetResultHash", xdr.lookup("Hash")],
  ["ledgerSeq", xdr.lookup("Uint32")],
  ["closeTime", xdr.lookup("Uint64")],
  ["idGenerators", xdr.varArray(xdr.lookup("IdGenerator"), 2147483647)],
  ["upgrade", xdr.lookup("LedgerUpgrade")],
  ["ext", xdr.lookup("LedgerHeaderExt")],
]);

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
//   struct ChangeAccountRolesOp
//   {
//       AccountID destinationAccount;
//   
//       //: ID of account role that will be attached to `destinationAccount`
//       uint64 rolesToSet<>;
//       //: Arbitrary stringified json object that can be used to attach data to be reviewed by an admin
//       longstring details;
//   
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("ChangeAccountRolesOp", [
  ["destinationAccount", xdr.lookup("AccountId")],
  ["rolesToSet", xdr.varArray(xdr.lookup("Uint64"), 2147483647)],
  ["details", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   enum ChangeAccountRolesResultCode
//   {
//       SUCCESS = 0,
//   
//       INVALID_DETAILS = -1,
//       ACCOUNT_NOT_FOUND = -2,
//       TOO_MANY_ROLES = -3,
//       NO_SUCH_ROLE = -4,
//       NO_ROLE_IDS = -5,
//       ROLE_ID_DUPLICATION = -6
//   };
//
// ===========================================================================
xdr.enum("ChangeAccountRolesResultCode", {
  success: 0,
  invalidDetail: -1,
  accountNotFound: -2,
  tooManyRole: -3,
  noSuchRole: -4,
  noRoleId: -5,
  roleIdDuplication: -6,
});

// === xdr source ============================================================
//
//   union ChangeAccountRolesResult switch (ChangeAccountRolesResultCode code)
//   {
//   case SUCCESS:
//       EmptyExt ext;
//   case TOO_MANY_ROLES:
//       uint32 maxRolesCount;
//   case NO_SUCH_ROLE:
//   case ROLE_ID_DUPLICATION:
//       uint64 roleID;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ChangeAccountRolesResult", {
  switchOn: xdr.lookup("ChangeAccountRolesResultCode"),
  switchName: "code",
  switches: [
    ["success", "ext"],
    ["tooManyRole", "maxRolesCount"],
    ["noSuchRole", "roleId"],
    ["roleIdDuplication", "roleId"],
  ],
  arms: {
    ext: xdr.lookup("EmptyExt"),
    maxRolesCount: xdr.lookup("Uint32"),
    roleId: xdr.lookup("Uint64"),
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
//   //: CreateAccountOp is used to create new account
//   struct CreateAccountOp
//   {
//       //: ID of account to be created
//       AccountID destination;
//       //: ID of an another account that introduced this account into the system.
//       //: If account with such ID does not exist or it's Admin Account. Referrer won't be set.
//       AccountID* referrer;
//       //: ID of the role that will be attached to an account
//       uint64 roleIDs<>;
//   
//       //: Array of data about 'destination' account signers to be created
//       SignerData signersData<>;
//   
//       //: reserved for future use
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
  ["roleIDs", xdr.varArray(xdr.lookup("Uint64"), 2147483647)],
  ["signersData", xdr.varArray(xdr.lookup("SignerData"), 2147483647)],
  ["ext", xdr.lookup("CreateAccountOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of CreateAccountOp
//   enum CreateAccountResultCode
//   {
//       //: Means that `destination` account has been successfully created with signers specified in `signersData`
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: Source account cannot be the same as the destination account
//       INVALID_DESTINATION = -1,
//       //: Account with such an ID already exists
//       ALREADY_EXISTS = -2, // account already exist
//       //: Sum of weights of signers with different identities must exceed the threshold (for now, 1000)
//       INVALID_WEIGHT = -3,
//       //: There is no role with such an ID
//       NO_SUCH_ROLE = -4,
//       //: Creation of a signer for an account is failed because `signersData` is invalid.
//       //: See `createSignerErrorCode`
//       INVALID_SIGNER_DATA = -5,
//       //: It is not allowed to create accounts without signers
//       NO_SIGNER_DATA = -6, // empty signer data array not allowed
//       NO_ROLE_IDS = -7,
//       ROLE_ID_DUPLICATION = -8,
//       TOO_MANY_ROLES = -9
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
  noRoleId: -7,
  roleIdDuplication: -8,
  tooManyRole: -9,
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
//   //: Result of successful application of `CreateAccount` operation
//   struct CreateAccountSuccess
//   {
//       //: Unique unsigned integer identifier of the new account
//       uint64 sequentialID;
//   
//       //: reserved for future use
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
//   //: Result of operation application
//   union CreateAccountResult switch (CreateAccountResultCode code)
//   {
//   case SUCCESS:
//       CreateAccountSuccess success;
//   case INVALID_SIGNER_DATA:
//       //: `createSignerErrorCode` is used to determine the reason of signer creation failure
//       CreateSignerResultCode createSignerErrorCode;
//   case NO_SUCH_ROLE:
//   case ROLE_ID_DUPLICATION:
//       uint64 roleID;
//   case TOO_MANY_ROLES:
//       uint32 maxRolesCount;
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
    ["noSuchRole", "roleId"],
    ["roleIdDuplication", "roleId"],
    ["tooManyRole", "maxRolesCount"],
  ],
  arms: {
    success: xdr.lookup("CreateAccountSuccess"),
    createSignerErrorCode: xdr.lookup("CreateSignerResultCode"),
    roleId: xdr.lookup("Uint64"),
    maxRolesCount: xdr.lookup("Uint32"),
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
xdr.union("CreateAssetOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateAssetOp
//   {
//       AssetCode code;
//   
//       uint32 securityType; // use instead policies that limit usage, use in account rules
//       uint32 state; 
//   
//   	uint64 maxIssuanceAmount; // max number of tokens to be issued
//       
//       uint32 trailingDigitsCount;
//   
//       longstring details;
//   
//       //: reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CreateAssetOp", [
  ["code", xdr.lookup("AssetCode")],
  ["securityType", xdr.lookup("Uint32")],
  ["state", xdr.lookup("Uint32")],
  ["maxIssuanceAmount", xdr.lookup("Uint64")],
  ["trailingDigitsCount", xdr.lookup("Uint32")],
  ["details", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("CreateAssetOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of ManageAssetOp
//   enum CreateAssetResultCode
//   {
//       //: Specified action in `data` of ManageSignerOp was successfully performed
//       SUCCESS = 0,                       // request was successfully created/updated/canceled
//   
//       //: It is not allowed to create an asset with a code that is already used for another asset
//       ASSET_ALREADY_EXISTS = -1,	      // asset with such code already exist
//       //: It is not allowed to set max issuance amount that is
//       //: less than the sum of issued, pending issuance and available for issuance amounts
//       INVALID_MAX_ISSUANCE_AMOUNT = -2, // max issuance amount is 0
//       //: It is not allowed to use an asset code that is empty or contains space
//       INVALID_CODE = -3,                // asset code is invalid (empty or contains space)
//       //: It is not allowed to use details with invalid json structure
//       INVALID_CREATOR_DETAILS = -4,                        // details must be a valid json
//       //: It is not allowed to set a trailing digits count greater than the maximum trailing digits count (6 at the moment)
//       INVALID_TRAILING_DIGITS_COUNT = -5,          // invalid number of trailing digits
//       //: Maximum issuance amount precision and asset precision are mismatched
//       INVALID_MAX_ISSUANCE_AMOUNT_PRECISION = -6
//   };
//
// ===========================================================================
xdr.enum("CreateAssetResultCode", {
  success: 0,
  assetAlreadyExist: -1,
  invalidMaxIssuanceAmount: -2,
  invalidCode: -3,
  invalidCreatorDetail: -4,
  invalidTrailingDigitsCount: -5,
  invalidMaxIssuanceAmountPrecision: -6,
});

// === xdr source ============================================================
//
//   //: Is used to return the result of operation application
//   union CreateAssetResult switch (CreateAssetResultCode code)
//   {
//   case SUCCESS:
//       //: Result of successful operation application
//       EmptyExt ext;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("CreateAssetResult", {
  switchOn: xdr.lookup("CreateAssetResultCode"),
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
xdr.union("CreateBalanceOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: `ManageBalanceOp` applies an `action` of the `ManageBalanceAction` type on the balance of a particular `asset` (referenced to by its AssetCode)
//   //: of the `destination` account (referenced to by its AccountID)
//   struct CreateBalanceOp
//   {
//       //: Defines an account whose balance will be managed
//       AccountID destination;
//       //: Defines an asset code of the balance to which `action` will be applied
//       AssetCode asset;
//   
//       bool additional;
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
xdr.struct("CreateBalanceOp", [
  ["destination", xdr.lookup("AccountId")],
  ["asset", xdr.lookup("AssetCode")],
  ["additional", xdr.bool()],
  ["ext", xdr.lookup("CreateBalanceOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes for the ManageBalance operation
//   enum CreateBalanceResultCode
//   {
//       // codes considered as "success" for the operation
//       //: Indicates that `ManageBalanceOp` is successfully applied
//       SUCCESS = 0,
//   
//       //: AssetCode `asset` is invalid (e.g. `AssetCode` does not consist of alphanumeric symbols)
//       INVALID_ASSET = -1,
//       //: Cannot find an asset with a provided asset code
//       ASSET_NOT_FOUND = -2,
//       //: Cannot find an account provided by the `destination` AccountID
//       DESTINATION_NOT_FOUND = -3,
//       ALREADY_EXISTS = -4
//   };
//
// ===========================================================================
xdr.enum("CreateBalanceResultCode", {
  success: 0,
  invalidAsset: -1,
  assetNotFound: -2,
  destinationNotFound: -3,
  alreadyExist: -4,
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
xdr.union("CreateBalanceSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateBalanceSuccess {
//       //: ID of the balance that was managed
//       BalanceID balanceID;
//       //: reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CreateBalanceSuccess", [
  ["balanceId", xdr.lookup("BalanceId")],
  ["ext", xdr.lookup("CreateBalanceSuccessExt")],
]);

// === xdr source ============================================================
//
//   union CreateBalanceResult switch (CreateBalanceResultCode code)
//   {
//   case SUCCESS:
//       CreateBalanceSuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("CreateBalanceResult", {
  switchOn: xdr.lookup("CreateBalanceResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("CreateBalanceSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   struct CreateDataOp 
//   {
//       uint32 securityType;
//       longstring value;
//   
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("CreateDataOp", [
  ["securityType", xdr.lookup("Uint32")],
  ["value", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   enum CreateDataResultCode
//   {
//       SUCCESS = 0,
//   
//       INVALID_DATA = -1
//   };
//
// ===========================================================================
xdr.enum("CreateDataResultCode", {
  success: 0,
  invalidDatum: -1,
});

// === xdr source ============================================================
//
//   struct CreateDataSuccess 
//   {
//       uint64 dataID;
//   
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("CreateDataSuccess", [
  ["dataId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   union CreateDataResult switch (CreateDataResultCode code)
//   {
//       case SUCCESS:
//           CreateDataSuccess success;
//       default:
//           void;
//   };
//
// ===========================================================================
xdr.union("CreateDataResult", {
  switchOn: xdr.lookup("CreateDataResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("CreateDataSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   struct CreateReviewableRequestOp
//   {
//       uint32 securityType;
//       longstring creatorDetails;
//       ReviewableRequestOperation operations<>;
//   
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("CreateReviewableRequestOp", [
  ["securityType", xdr.lookup("Uint32")],
  ["creatorDetails", xdr.lookup("Longstring")],
  ["operations", xdr.varArray(xdr.lookup("ReviewableRequestOperation"), 2147483647)],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   enum CreateReviewableRequestResultCode
//   {
//       SUCCESS = 0,
//   
//       INVALID_OPERATION = -1,
//       TASKS_NOT_FOUND = -2,
//       TOO_MANY_OPERATIONS = -3,
//       SECURITY_TYPE_MISMATCH = -4,
//       INVALID_CREATOR_DETAILS = -5
//   };
//
// ===========================================================================
xdr.enum("CreateReviewableRequestResultCode", {
  success: 0,
  invalidOperation: -1,
  tasksNotFound: -2,
  tooManyOperation: -3,
  securityTypeMismatch: -4,
  invalidCreatorDetail: -5,
});

// === xdr source ============================================================
//
//   struct CreateReviewableRequestSuccessResult 
//   {
//       uint64 requestID;
//   
//       ExtendedResult extendedResult;
//   
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("CreateReviewableRequestSuccessResult", [
  ["requestId", xdr.lookup("Uint64")],
  ["extendedResult", xdr.lookup("ExtendedResult")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   union CreateReviewableRequestResult switch (CreateReviewableRequestResultCode code)
//   {
//   case SUCCESS:
//       CreateReviewableRequestSuccessResult success;
//   case INVALID_OPERATION:
//       OperationResult operationResult;
//   case TOO_MANY_OPERATIONS:
//       uint32 maxOperationsCount;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("CreateReviewableRequestResult", {
  switchOn: xdr.lookup("CreateReviewableRequestResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
    ["invalidOperation", "operationResult"],
    ["tooManyOperation", "maxOperationsCount"],
  ],
  arms: {
    success: xdr.lookup("CreateReviewableRequestSuccessResult"),
    operationResult: xdr.lookup("OperationResult"),
    maxOperationsCount: xdr.lookup("Uint32"),
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
xdr.union("CreateRoleOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: CreateSignerRoleData is used to pass necessary params to create a new signer role
//   struct CreateRoleOp
//   {
//       //: Array of ids of existing, unique and not default rules
//       uint64 ruleIDs<>;
//       //: Arbitrary stringified json object with details to attach to the role
//       longstring details;
//   
//       //: reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("CreateRoleOp", [
  ["ruleIDs", xdr.varArray(xdr.lookup("Uint64"), 2147483647)],
  ["details", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("CreateRoleOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of ManageSignerRoleResultCode
//   enum CreateRoleResultCode
//   {
//       //: Means that the specified action in `data` of ManageSignerRoleOp was successfully executed
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: Passed details have invalid json structure
//       INVALID_DETAILS = -1,
//       //: There is no rule with id passed through `ruleIDs`
//       NO_SUCH_RULE = -2,
//       //: It is not allowed to duplicate ids in `ruleIDs` array
//       RULE_ID_DUPLICATION = -3,
//       //: It is not allowed to pass ruleIDs that are more than maxSignerRuleCount (by default, 128)
//       TOO_MANY_RULE_IDS = -4
//   };
//
// ===========================================================================
xdr.enum("CreateRoleResultCode", {
  success: 0,
  invalidDetail: -1,
  noSuchRule: -2,
  ruleIdDuplication: -3,
  tooManyRuleId: -4,
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
xdr.union("CreateRoleResultSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
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
//           //: id of a role that was managed
//           uint64 roleID;
//   
//           //: reserved for future use
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       }
//
// ===========================================================================
xdr.struct("CreateRoleResultSuccess", [
  ["roleId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("CreateRoleResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   //: Result of operation application
//   union CreateRoleResult switch (CreateRoleResultCode code)
//   {
//   case SUCCESS:
//       struct
//       {
//           //: id of a role that was managed
//           uint64 roleID;
//   
//           //: reserved for future use
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       } success;
//   case RULE_ID_DUPLICATION:
//   case NO_SUCH_RULE:
//       //: ID of a rule that was either duplicated or is default or does not exist
//       uint64 ruleID;
//   case TOO_MANY_RULE_IDS:
//       //: max count of rule ids that can be passed in `ruleIDs` array
//       uint32 maxRuleIDsCount;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("CreateRoleResult", {
  switchOn: xdr.lookup("CreateRoleResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
    ["ruleIdDuplication", "ruleId"],
    ["noSuchRule", "ruleId"],
    ["tooManyRuleId", "maxRuleIDsCount"],
  ],
  arms: {
    success: xdr.lookup("CreateRoleResultSuccess"),
    ruleId: xdr.lookup("Uint64"),
    maxRuleIDsCount: xdr.lookup("Uint32"),
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
xdr.union("CreateRuleOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: CreateSignerRuleData is used to pass necessary params to create a new signer rule
//   struct CreateRuleOp
//   {
//       //: Resource is used to specify an entity (for some, with properties) that can be managed through operations
//       RuleResource resource;
//       //: Value from enum that can be applied to `resource`
//       RuleAction action;
//       //: Indicate whether or not an `action` on the provided `resource` is prohibited
//       bool forbids;
//       //: Arbitrary stringified json object with details that will be attached to a rule
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
xdr.struct("CreateRuleOp", [
  ["resource", xdr.lookup("RuleResource")],
  ["action", xdr.lookup("RuleAction")],
  ["forbids", xdr.bool()],
  ["details", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("CreateRuleOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of ManageSignerRuleOp
//   enum CreateRuleResultCode
//   {
//       //: Specified action in `data` of ManageSignerRuleOp was successfully executed
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: Passed details have invalid json structure
//       INVALID_DETAILS = -1,
//   
//       INVALID_CUSTOM_ACTION = -2,
//       INVALID_CUSTOM_RESOURCE = -3
//   };
//
// ===========================================================================
xdr.enum("CreateRuleResultCode", {
  success: 0,
  invalidDetail: -1,
  invalidCustomAction: -2,
  invalidCustomResource: -3,
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
xdr.union("CreateRuleResultSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
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
//           //: id of the rule that was managed
//           uint64 ruleID;
//   
//           //: reserved for future use
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       }
//
// ===========================================================================
xdr.struct("CreateRuleResultSuccess", [
  ["ruleId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("CreateRuleResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   //: Result of operation application
//   union CreateRuleResult switch (CreateRuleResultCode code)
//   {
//   case SUCCESS:
//       struct {
//           //: id of the rule that was managed
//           uint64 ruleID;
//   
//           //: reserved for future use
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       } success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("CreateRuleResult", {
  switchOn: xdr.lookup("CreateRuleResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("CreateRuleResultSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   struct SignerData
//   {
//       //: Public key of a signer
//       PublicKey publicKey;
//       //: id of the role that will be attached to a signer
//       uint64 roleIDs<>;
//   
//       //: weight that signer will have, threshold for all SignerRequirements equals 1000
//       uint32 weight;
//       //: If there are some signers with equal identity, only one signer will be chosen
//       //: (either the one with the biggest weight or the one who was the first to satisfy a threshold)
//       uint32 identity;
//   
//       //: Arbitrary stringified json object with details that will be attached to signer
//       longstring details;
//   
//       //: reserved for future extension
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("SignerData", [
  ["publicKey", xdr.lookup("PublicKey")],
  ["roleIDs", xdr.varArray(xdr.lookup("Uint64"), 2147483647)],
  ["weight", xdr.lookup("Uint32")],
  ["identity", xdr.lookup("Uint32")],
  ["details", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct CreateSignerOp
//   {
//       SignerData data;
//   
//       //: reserved for future extension
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("CreateSignerOp", [
  ["data", xdr.lookup("SignerData")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   enum CreateSignerResultCode
//   {
//       SUCCESS = 0,
//   
//       //: Passed details have invalid json structure
//       INVALID_DETAILS = -1, // invalid json details
//       //: Signer with such public key is already attached to the source account
//       ALREADY_EXISTS = -2, // signer already exist
//       //: There is no role with such id
//       NO_SUCH_ROLE = -3,
//       //: It is not allowed to set weight more than 1000
//       INVALID_WEIGHT = -4, // more than 1000
//       NO_ROLE_IDS = -5,
//       ROLE_ID_DUPLICATION = -6,
//       TOO_MANY_ROLES = -7
//   };
//
// ===========================================================================
xdr.enum("CreateSignerResultCode", {
  success: 0,
  invalidDetail: -1,
  alreadyExist: -2,
  noSuchRole: -3,
  invalidWeight: -4,
  noRoleId: -5,
  roleIdDuplication: -6,
  tooManyRole: -7,
});

// === xdr source ============================================================
//
//   union CreateSignerResult switch (CreateSignerResultCode code)
//   {
//   case SUCCESS:
//       EmptyExt ext;
//   case NO_SUCH_ROLE:
//   case ROLE_ID_DUPLICATION:
//       uint64 roleID;
//   case TOO_MANY_ROLES:
//       uint32 maxRolesCount;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("CreateSignerResult", {
  switchOn: xdr.lookup("CreateSignerResultCode"),
  switchName: "code",
  switches: [
    ["success", "ext"],
    ["noSuchRole", "roleId"],
    ["roleIdDuplication", "roleId"],
    ["tooManyRole", "maxRolesCount"],
  ],
  arms: {
    ext: xdr.lookup("EmptyExt"),
    roleId: xdr.lookup("Uint64"),
    maxRolesCount: xdr.lookup("Uint32"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   //: Destruction operation will charge the specified amount from balance
//   struct DestructionOp
//   {
//       //: security type
//       uint32 securityType;
//       //: Balance to withdraw from
//       BalanceID balance; // balance id from which withdrawal will be performed
//       //: Amount to withdraw
//       uint64 amount; // amount to be withdrawn
//   
//       longstring reference;
//   
//       //: Total fee to pay, contains fixed amount and calculated percent of the withdrawn amount
//       Fee fee; // expected fee to be paid
//       //: Arbitrary stringified json object that can be used to attach data to be reviewed by an admin
//       longstring creatorDetails; // details set by requester
//   
//       //: Reserved for future use
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("DestructionOp", [
  ["securityType", xdr.lookup("Uint32")],
  ["balance", xdr.lookup("BalanceId")],
  ["amount", xdr.lookup("Uint64")],
  ["reference", xdr.lookup("Longstring")],
  ["fee", xdr.lookup("Fee")],
  ["creatorDetails", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   //: Destruction operation result codes
//   enum DestructionResultCode
//   {
//       // codes considered as "success" for the operation
//       //: Destruction operation successfully applied
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: Trying to create a withdrawal with a 0 amount 
//       INVALID_AMOUNT = -1,
//       //: Creator details are not in a valid JSON format
//       INVALID_CREATOR_DETAILS = -2,
//       //: Source balance to withdraw from is not found 
//       BALANCE_NOT_FOUND = -3, // balance not found
//       //: Asset cannot be withdrawn because AssetPolicy::WITHDRAWABLE is not set
//       ASSET_IS_NOT_WITHDRAWABLE = -4,
//       //: Expected fee and actual fee mismatch
//       FEE_MISMATCHED = -5,
//       //: Trying to lock balance, locked amount would exceed UINT64_MAX
//       BALANCE_LOCK_OVERFLOW = -6,
//       //: Insufficient balance to withdraw the requested amount
//       UNDERFUNDED = -7,
//       //: Applying operation would overflow statistics
//       STATS_OVERFLOW = -8,
//       //: Applying operation would exceed limits set in the system
//       LIMITS_EXCEEDED = -9,
//       //: Amount withdrawn is smaller than the minimal withdrawable amount set in the system
//       LOWER_BOUND_NOT_EXCEEDED = -10,
//       REFERENCE_DUPLICATION = -11,
//       INVALID_REFERENCE = -12
//   };
//
// ===========================================================================
xdr.enum("DestructionResultCode", {
  success: 0,
  invalidAmount: -1,
  invalidCreatorDetail: -2,
  balanceNotFound: -3,
  assetIsNotWithdrawable: -4,
  feeMismatched: -5,
  balanceLockOverflow: -6,
  underfunded: -7,
  statsOverflow: -8,
  limitsExceeded: -9,
  lowerBoundNotExceeded: -10,
  referenceDuplication: -11,
  invalidReference: -12,
});

// === xdr source ============================================================
//
//   //: Result of the successful withdrawal request creation
//   struct DestructionSuccess {
//       //: Account address of the receiver
//       AccountID targetAccount;
//       BalanceID targetBalance;
//   
//       uint64 actualAmount;
//       //: Paid fee
//       Fee fee;
//   
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("DestructionSuccess", [
  ["targetAccount", xdr.lookup("AccountId")],
  ["targetBalance", xdr.lookup("BalanceId")],
  ["actualAmount", xdr.lookup("Uint64")],
  ["fee", xdr.lookup("Fee")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   //: Result of applying Destruction operation along with the result code
//   union DestructionResult switch (DestructionResultCode code)
//   {
//       case SUCCESS:
//           DestructionSuccess success;
//       default:
//           void;
//   };
//
// ===========================================================================
xdr.union("DestructionResult", {
  switchOn: xdr.lookup("DestructionResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("DestructionSuccess"),
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
xdr.union("InitiateKycRecoveryOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: InitiateKYCRecoveryOp is used to start KYC recovery process
//   struct InitiateKYCRecoveryOp
//   {
//       //: Address of account to be recovered
//       AccountID targetAccount;
//       //: New signer to set
//       PublicKey signer;
//   
//       //: reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("InitiateKycRecoveryOp", [
  ["targetAccount", xdr.lookup("AccountId")],
  ["signer", xdr.lookup("PublicKey")],
  ["ext", xdr.lookup("InitiateKycRecoveryOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of InitiateKYCRecoveryOp
//   enum InitiateKYCRecoveryResultCode
//   {
//       //: Means that KYC recovery was successfully initiated
//       SUCCESS = 0,
//   
//       //: System configuration forbids KYC recovery
//       RECOVERY_NOT_ALLOWED = -1,
//       //: Either, there is no entry by key `kyc_recovery_signer_role`, or such role does not exists
//       RECOVERY_SIGNER_ROLE_NOT_FOUND = -2
//   };
//
// ===========================================================================
xdr.enum("InitiateKycRecoveryResultCode", {
  success: 0,
  recoveryNotAllowed: -1,
  recoverySignerRoleNotFound: -2,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//            {
//            case EMPTY_VERSION:
//                void;
//            }
//
// ===========================================================================
xdr.union("InitiateKycRecoveryResultSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
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
//            AccountID targetAccount;
//            //: reserved for future use
//            union switch (LedgerVersion v)
//            {
//            case EMPTY_VERSION:
//                void;
//            } ext;
//       }
//
// ===========================================================================
xdr.struct("InitiateKycRecoveryResultSuccess", [
  ["targetAccount", xdr.lookup("AccountId")],
  ["ext", xdr.lookup("InitiateKycRecoveryResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   //: Result of operation applying
//   union InitiateKYCRecoveryResult switch (InitiateKYCRecoveryResultCode code)
//   {
//   case SUCCESS:
//       struct
//       {
//            AccountID targetAccount;
//            //: reserved for future use
//            union switch (LedgerVersion v)
//            {
//            case EMPTY_VERSION:
//                void;
//            } ext;
//       } success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("InitiateKycRecoveryResult", {
  switchOn: xdr.lookup("InitiateKycRecoveryResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("InitiateKycRecoveryResultSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   //: IssuanceOp is used to issuance specified amount of asset to a receiver's balance
//   struct IssuanceOp
//   {
//       //: security type
//       uint32 securityType;
//   
//       //: Code of an asset to issuance
//       AssetCode asset;
//       //: Amount to issuance
//       uint64 amount;
//   
//       MovementDestination destination;
//   
//       longstring reference;
//   
//       //: Arbitrary stringified json object that can be used to attach data to be reviewed by an admin
//       longstring creatorDetails; // details of the issuance (External system id, etc.)
//       //: Total fee to pay, consists of fixed fee and percent fee, calculated automatically
//       Fee fee; //totalFee to be payed (calculated automatically)
//       //: Reserved for future use
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("IssuanceOp", [
  ["securityType", xdr.lookup("Uint32")],
  ["asset", xdr.lookup("AssetCode")],
  ["amount", xdr.lookup("Uint64")],
  ["destination", xdr.lookup("MovementDestination")],
  ["reference", xdr.lookup("Longstring")],
  ["creatorDetails", xdr.lookup("Longstring")],
  ["fee", xdr.lookup("Fee")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of the IssuanceOp
//   enum IssuanceResultCode
//   {
//       // codes considered as "success" for the operation
//       //: Issuance operation application was successful
//       SUCCESS = 0,
//       
//       // codes considered as "failure" for the operation
//       //: Asset to issuance is not found
//       ASSET_NOT_FOUND = -1,
//       //: Trying to create an issuance request with negative/zero amount
//       INVALID_AMOUNT = -2,
//       //: Either the target balance is not found or there is a mismatch between the target balance asset and an asset in the request
//       NO_COUNTERPARTY = -4,
//       //: Source of operation is not an owner of the asset 
//       NOT_AUTHORIZED = -5,
//       //: Issuanced amount plus amount to issuance will exceed max issuance amount
//       EXCEEDS_MAX_ISSUANCE_AMOUNT = -6,
//       //: Amount to issuance plus amount on balance would exceed UINT64_MAX 
//       RECEIVER_FULL_LINE = -7,
//       //: Creator details are not valid JSON
//       INVALID_CREATOR_DETAILS = -8,
//       //: Fee is greater than the amount to issuance
//       FEE_EXCEEDS_AMOUNT = -9,
//       INVALID_AMOUNT_PRECISION = -10,
//       INVALID_REFERENCE = -11,
//       REFERENCE_DUPLICATION = -12
//   };
//
// ===========================================================================
xdr.enum("IssuanceResultCode", {
  success: 0,
  assetNotFound: -1,
  invalidAmount: -2,
  noCounterparty: -4,
  notAuthorized: -5,
  exceedsMaxIssuanceAmount: -6,
  receiverFullLine: -7,
  invalidCreatorDetail: -8,
  feeExceedsAmount: -9,
  invalidAmountPrecision: -10,
  invalidReference: -11,
  referenceDuplication: -12,
});

// === xdr source ============================================================
//
//   //:Result of successful application of Issuance operation
//   struct IssuanceSuccess {
//   
//       //: Account address of the receiver
//       AccountID receiver;
//       BalanceID receiverBalance;
//   
//       //: Paid fee
//       Fee fee;
//       //: Reserved for future use
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("IssuanceSuccess", [
  ["receiver", xdr.lookup("AccountId")],
  ["receiverBalance", xdr.lookup("BalanceId")],
  ["fee", xdr.lookup("Fee")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   //: Create issuance request result with result code
//   union IssuanceResult switch (IssuanceResultCode code)
//   {
//   case SUCCESS:
//       IssuanceSuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("IssuanceResult", {
  switchOn: xdr.lookup("IssuanceResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("IssuanceSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   //: KYCRecoveryOp to create KYC recovery request and set new signers for account
//   struct KYCRecoveryOp
//   {
//       //: Account for which signers will be set
//       AccountID targetAccount;
//       //: New signers to set
//       SignerData signersData<>;
//   
//        //: Arbitrary stringified json object that can be used to attach data to be reviewed by an admin
//       longstring creatorDetails; // details set by requester
//   
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("KycRecoveryOp", [
  ["targetAccount", xdr.lookup("AccountId")],
  ["signersData", xdr.varArray(xdr.lookup("SignerData"), 2147483647)],
  ["creatorDetails", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of KYCRecoveryOp
//   enum KYCRecoveryResultCode
//   {
//       //: KYC Recovery request was successfully created
//       SUCCESS = 0,
//   
//       //: Creator details are not in a valid JSON format
//       INVALID_CREATOR_DETAILS = -1,
//       //: Not allowed to provide empty slice of signers
//       NO_SIGNER_DATA = -2,
//       //: SignerData contains duplicates
//       SIGNER_DUPLICATION = -3,
//       //: Signer has weight > threshold
//       INVALID_WEIGHT = -4,
//       //: Signer has invalid details
//       INVALID_DETAILS = -5,
//       //: Account with provided account address does not exist
//       TARGET_ACCOUNT_NOT_FOUND = -9,
//       //: System configuration forbids KYC recovery
//       RECOVERY_NOT_ALLOWED = -10
//   };
//
// ===========================================================================
xdr.enum("KycRecoveryResultCode", {
  success: 0,
  invalidCreatorDetail: -1,
  noSignerDatum: -2,
  signerDuplication: -3,
  invalidWeight: -4,
  invalidDetail: -5,
  targetAccountNotFound: -9,
  recoveryNotAllowed: -10,
});

// === xdr source ============================================================
//
//   struct {
//           AccountID targetAccount;
//           //: reserved for future use
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("KycRecoveryResultSuccess", [
  ["targetAccount", xdr.lookup("AccountId")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   //: Result of operation applying
//   union KYCRecoveryResult switch (KYCRecoveryResultCode code)
//   {
//   case SUCCESS:
//       //: Is used to pass useful params if operation is success
//       struct {
//           AccountID targetAccount;
//           //: reserved for future use
//           EmptyExt ext;
//       } success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("KycRecoveryResult", {
  switchOn: xdr.lookup("KycRecoveryResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("KycRecoveryResultSuccess"),
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
//       //: Fee to pay by source balance
//       Fee sourceFee;
//       //: Fee kept from destination account/balance
//       Fee destinationFee;
//       //: Indicates whether or not the source of payment pays the destination fee
//       bool sourcePaysForDest;
//   
//       //: reserved for future use
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
  ["sourceFee", xdr.lookup("Fee")],
  ["destinationFee", xdr.lookup("Fee")],
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
//   //: PaymentOp is used to transfer some amount of asset from the source balance to destination account/balance
//   struct PaymentOp
//   {
//       //: ID of the source balance of payment
//       BalanceID sourceBalanceID;
//   
//       uint32 securityType;
//   
//       //: `destination` defines the type of instance that receives the payment based on given PaymentDestinationType
//       MovementDestination destination;
//   
//       //: Amount of payment
//       uint64 amount;
//   
//       //: `feeData` defines all data about the payment fee
//       PaymentFeeData feeData;
//   
//       //: `subject` is a user-provided info about the real-life purpose of payment
//       longstring subject;
//       //: `reference` is a string formed by a payment sender. `Reference-sender account` pair is unique.
//       longstring reference;
//   
//       //: reserved for future use
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
  ["securityType", xdr.lookup("Uint32")],
  ["destination", xdr.lookup("MovementDestination")],
  ["amount", xdr.lookup("Uint64")],
  ["feeData", xdr.lookup("PaymentFeeData")],
  ["subject", xdr.lookup("Longstring")],
  ["reference", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("PaymentOpExt")],
]);

// === xdr source ============================================================
//
//   enum PaymentResultCode
//   {
//       // codes considered as "success" for the operation
//       //: Payment was successfully completed
//       SUCCESS = 0, // payment successfully completed
//   
//       // codes considered as "failure" for the operation
//       //: Payment sender balance ID and payment receiver balance ID are equal or reference is longer than 64 symbols
//       MALFORMED = -1,
//       //: Not enough funds in the source account
//       UNDERFUNDED = -2,
//       //: After the payment fulfillment, the destination balance will exceed the limit (total amount on the balance will be greater than UINT64_MAX)
//       LINE_FULL = -3,
//       //: There is no balance found with an ID provided in `destinations.balanceID`
//       DESTINATION_BALANCE_NOT_FOUND = -4,
//       //: Sender balance asset and receiver balance asset are not equal
//       BALANCE_ASSETS_MISMATCHED = -5,
//       //: There is no balance found with ID provided in `sourceBalanceID`
//       SRC_BALANCE_NOT_FOUND = -6,
//       //: Pair `reference-sender account` of the payment is not unique
//       REFERENCE_DUPLICATION = -7,
//       //: Stats entry exceeded account limits
//       STATS_OVERFLOW = -8,
//       //: Account will exceed its limits after the payment is fulfilled
//       LIMITS_EXCEEDED = -9,
//       //: Payment asset does not have a `TRANSFERABLE` policy set
//       NOT_ALLOWED_BY_ASSET_POLICY = -10,
//       //: Overflow during total fee calculation
//       INVALID_DESTINATION_FEE = -11,
//       //: Payment fee amount is insufficient
//       INSUFFICIENT_FEE_AMOUNT = -12,
//       //: Fee charged from destination balance is greater than the payment amount
//       PAYMENT_AMOUNT_IS_LESS_THAN_DEST_FEE = -13,
//       //: There is no account found with an ID provided in `destination.accountID`
//       DESTINATION_ACCOUNT_NOT_FOUND = -14,
//       //: Amount precision and asset precision are mismatched
//       INCORRECT_AMOUNT_PRECISION = -15,
//       INVALID_REFERENCE = -16
//   };
//
// ===========================================================================
xdr.enum("PaymentResultCode", {
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
  invalidReference: -16,
});

// === xdr source ============================================================
//
//   //: `PaymentResponse` defines the response on the corresponding PaymentOp
//   struct PaymentSuccess {
//       //: ID of the destination account
//       AccountID destination;
//       //: ID of the destination balance
//       BalanceID destinationBalanceID;
//   
//       //: Code of an asset used in payment
//       AssetCode asset;
//       //: Actual amount received
//       uint64 amountReceived;
//   
//       //: Fee charged from the source balance
//       Fee actualSourcePaymentFee;
//       //: Fee charged from the destination balance
//       Fee actualDestinationPaymentFee;
//   
//       //: reserved for future use
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("PaymentSuccess", [
  ["destination", xdr.lookup("AccountId")],
  ["destinationBalanceId", xdr.lookup("BalanceId")],
  ["asset", xdr.lookup("AssetCode")],
  ["amountReceived", xdr.lookup("Uint64")],
  ["actualSourcePaymentFee", xdr.lookup("Fee")],
  ["actualDestinationPaymentFee", xdr.lookup("Fee")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   union PaymentResult switch (PaymentResultCode code)
//   {
//   case SUCCESS:
//       PaymentSuccess paymentSuccess;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("PaymentResult", {
  switchOn: xdr.lookup("PaymentResultCode"),
  switchName: "code",
  switches: [
    ["success", "paymentSuccess"],
  ],
  arms: {
    paymentSuccess: xdr.lookup("PaymentSuccess"),
  },
  defaultArm: xdr.void(),
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
xdr.union("PutKeyValueOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: `PutKeyValueOp` is used to update the key-value entry present in the system
//       struct PutKeyValueOp
//       {
//           //: `key` is the key for KeyValueEntry
//           longstring key;
//           KeyValueEntryValue value;
//   
//           //: reserved for future use
//           union switch (LedgerVersion v)
//           {
//               case EMPTY_VERSION:
//                   void;
//           }
//           ext;
//       };
//
// ===========================================================================
xdr.struct("PutKeyValueOp", [
  ["key", xdr.lookup("Longstring")],
  ["value", xdr.lookup("KeyValueEntryValue")],
  ["ext", xdr.lookup("PutKeyValueOpExt")],
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
xdr.union("PutKeyValueSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: `PutKeyValueSuccess` represents details returned after the successful application of `PutKeyValueOp`
//       struct PutKeyValueSuccess
//       {
//           //: reserved for future use
//           union switch (LedgerVersion v)
//           {
//               case EMPTY_VERSION:
//                   void;
//           }
//           ext;
//       };
//
// ===========================================================================
xdr.struct("PutKeyValueSuccess", [
  ["ext", xdr.lookup("PutKeyValueSuccessExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes for `PutKeyValueOp`
//       enum PutKeyValueResultCode
//       {
//           //: `PutKeyValueOp` is applied successfully
//           SUCCESS = 0,
//           //: Value type of the key-value entry is forbidden for the provided key
//           INVALID_TYPE = -1,
//           //: value is forbidden for the provided key
//           VALUE_NOT_ALLOWED = -2
//       };
//
// ===========================================================================
xdr.enum("PutKeyValueResultCode", {
  success: 0,
  invalidType: -1,
  valueNotAllowed: -2,
});

// === xdr source ============================================================
//
//   //: `PutKeyValueResult` represents the result of PutKeyValueOp
//       union PutKeyValueResult switch (PutKeyValueResultCode code)
//       {
//           case SUCCESS:
//               PutKeyValueSuccess success;
//           default:
//               void;
//       };
//
// ===========================================================================
xdr.union("PutKeyValueResult", {
  switchOn: xdr.lookup("PutKeyValueResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("PutKeyValueSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   struct RemoveDataOp 
//   {
//       uint64 dataID;
//   
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("RemoveDataOp", [
  ["dataId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   enum RemoveDataResultCode 
//   {
//       SUCCESS = 0,
//   
//       NOT_FOUND = -1,
//       NOT_ALLOWED = -2
//   };
//
// ===========================================================================
xdr.enum("RemoveDataResultCode", {
  success: 0,
  notFound: -1,
  notAllowed: -2,
});

// === xdr source ============================================================
//
//   union RemoveDataResult switch (RemoveDataResultCode code)
//   {
//   case SUCCESS:
//       EmptyExt ext;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("RemoveDataResult", {
  switchOn: xdr.lookup("RemoveDataResultCode"),
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
//           {
//               case EMPTY_VERSION:
//                   void;
//           }
//
// ===========================================================================
xdr.union("RemoveKeyValueOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: `RemoveKeyValueOp` is used to remove key-value entry present in the system by key
//       struct RemoveKeyValueOp
//       {
//           //: `key` is the key for KeyValueEntry
//           longstring key;
//   
//           //: reserved for future use
//           union switch (LedgerVersion v)
//           {
//               case EMPTY_VERSION:
//                   void;
//           }
//           ext;
//       };
//
// ===========================================================================
xdr.struct("RemoveKeyValueOp", [
  ["key", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("RemoveKeyValueOpExt")],
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
xdr.union("RemoveKeyValueSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: `RemoveKeyValueSuccess` represents details returned after the successful application of `RemoveKeyValueOp`
//       struct RemoveKeyValueSuccess
//       {
//           //: reserved for future use
//           union switch (LedgerVersion v)
//           {
//               case EMPTY_VERSION:
//                   void;
//           }
//           ext;
//       };
//
// ===========================================================================
xdr.struct("RemoveKeyValueSuccess", [
  ["ext", xdr.lookup("RemoveKeyValueSuccessExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes for `RemoveKeyValueOp`
//       enum RemoveKeyValueResultCode
//       {
//           //: `RemoveKeyValueOp` is applied successfully
//           SUCCESS = 0,
//           //: There is no key value with such key
//           NOT_FOUND = -1
//       };
//
// ===========================================================================
xdr.enum("RemoveKeyValueResultCode", {
  success: 0,
  notFound: -1,
});

// === xdr source ============================================================
//
//   //: `RemoveKeyValueResult` represents the result of RemoveKeyValueOp
//       union RemoveKeyValueResult switch (RemoveKeyValueResultCode code)
//       {
//           case SUCCESS:
//               RemoveKeyValueSuccess success;
//           default:
//               void;
//       };
//
// ===========================================================================
xdr.union("RemoveKeyValueResult", {
  switchOn: xdr.lookup("RemoveKeyValueResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("RemoveKeyValueSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   struct RemoveReviewableRequestOp
//   {
//       uint64 requestID;
//   
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("RemoveReviewableRequestOp", [
  ["requestId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   enum RemoveReviewableRequestResultCode
//   {
//       SUCCESS = 0,
//   
//   
//       NOT_FOUND = -1
//   };
//
// ===========================================================================
xdr.enum("RemoveReviewableRequestResultCode", {
  success: 0,
  notFound: -1,
});

// === xdr source ============================================================
//
//   union RemoveReviewableRequestResult switch (RemoveReviewableRequestResultCode code)
//   {
//   case SUCCESS:
//       EmptyExt ext;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("RemoveReviewableRequestResult", {
  switchOn: xdr.lookup("RemoveReviewableRequestResultCode"),
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
xdr.union("RemoveRoleOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: RemoveSignerRoleData is used to pass necessary params to remove existing signer role
//   struct RemoveRoleOp
//   {
//       //: Identifier of an existing signer role
//       uint64 roleID;
//   
//       //: reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("RemoveRoleOp", [
  ["roleId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("RemoveRoleOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of ManageSignerRoleResultCode
//   enum RemoveRoleResultCode
//   {
//       //: Means that the specified action in `data` of ManageSignerRoleOp was successfully executed
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: There is no signer role with such id or the source cannot manage a role
//       NOT_FOUND = -1, // does not exist or owner mismatched
//       //: It is not allowed to remove role if it is attached to at least one singer
//       ROLE_IS_USED = -2
//   };
//
// ===========================================================================
xdr.enum("RemoveRoleResultCode", {
  success: 0,
  notFound: -1,
  roleIsUsed: -2,
});

// === xdr source ============================================================
//
//   //: Result of operation application
//   union RemoveRoleResult switch (RemoveRoleResultCode code)
//   {
//   case SUCCESS:
//       EmptyExt ext;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("RemoveRoleResult", {
  switchOn: xdr.lookup("RemoveRoleResultCode"),
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
xdr.union("RemoveRuleOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: RemoveSignerRuleData is used to pass necessary params to remove existing signer rule
//   struct RemoveRuleOp
//   {
//       //: Identifier of an existing signer rule
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
xdr.struct("RemoveRuleOp", [
  ["ruleId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("RemoveRuleOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of ManageSignerRuleOp
//   enum RemoveRuleResultCode
//   {
//       //: Specified action in `data` of ManageSignerRuleOp was successfully executed
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: There is no signer rule with such id or source cannot manage the rule
//       NOT_FOUND = -1, // does not exists or owner mismatched
//       //: It is not allowed to remove the rule if it is attached to at least one role
//       RULE_IS_USED = -2
//   };
//
// ===========================================================================
xdr.enum("RemoveRuleResultCode", {
  success: 0,
  notFound: -1,
  ruleIsUsed: -2,
});

// === xdr source ============================================================
//
//   //: Result of operation application
//   union RemoveRuleResult switch (RemoveRuleResultCode code)
//   {
//   case SUCCESS:
//       EmptyExt ext;
//   case RULE_IS_USED:
//       //: ids of roles which use a rule that cannot be removed
//       uint64 roleIDs<>;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("RemoveRuleResult", {
  switchOn: xdr.lookup("RemoveRuleResultCode"),
  switchName: "code",
  switches: [
    ["success", "ext"],
    ["ruleIsUsed", "roleIDs"],
  ],
  arms: {
    ext: xdr.lookup("EmptyExt"),
    roleIDs: xdr.varArray(xdr.lookup("Uint64"), 2147483647),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   //: RemoveSignerData is used to pass necessary data to remove a signer
//   struct RemoveSignerOp
//   {
//       //: Public key of an existing signer
//       PublicKey publicKey;
//   
//       //: reserved for future extension
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("RemoveSignerOp", [
  ["publicKey", xdr.lookup("PublicKey")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of ManageSignerOp
//   enum RemoveSignerResultCode
//   {
//       //: Specified action in `data` of ManageSignerOp was successfully executed
//       SUCCESS = 0,
//   
//       //: Source account does not have a signer with the provided public key
//       NOT_FOUND = -1 // there is no signer with such public key
//   };
//
// ===========================================================================
xdr.enum("RemoveSignerResultCode", {
  success: 0,
  notFound: -1,
});

// === xdr source ============================================================
//
//   //: Result of operation application
//   union RemoveSignerResult switch (RemoveSignerResultCode code)
//   {
//   case SUCCESS:
//       //: reserved for future extension
//       EmptyExt ext;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("RemoveSignerResult", {
  switchOn: xdr.lookup("RemoveSignerResultCode"),
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
//   //: Actions that can be performed on request that is being reviewed
//   enum ReviewRequestOpAction {
//       //: Approve request
//       APPROVE = 1,
//       //: Reject request
//       REJECT = 2,
//       //: Permanently reject request
//       PERMANENT_REJECT = 3
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
//   //: Review Request operation
//   struct ReviewRequestOp
//   {
//       //: ID of a request that is being reviewed
//       uint64 requestID;
//       //: Hash of a request that is being reviewed
//       Hash requestHash;
//   
//       //: Review action defines an action performed on the pending ReviewableRequest
//       ReviewRequestOpAction action;
//       //: Contains reject reason
//       longstring reason;
//   
//       //: Tasks to add to pending
//       uint64 tasksToAdd;
//       //: Tasks to remove from pending
//       uint64 tasksToRemove;
//       //: Details of the current review
//       longstring externalDetails;
//   
//       //: Reserved for future use
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
  ["action", xdr.lookup("ReviewRequestOpAction")],
  ["reason", xdr.lookup("Longstring")],
  ["tasksToAdd", xdr.lookup("Uint64")],
  ["tasksToRemove", xdr.lookup("Uint64")],
  ["externalDetails", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("ReviewRequestOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result code of the ReviewRequest operation
//   enum ReviewRequestResultCode
//   {
//       //: Codes considered as "success" for an operation
//       //: Operation is applied successfuly 
//       SUCCESS = 0,
//   
//       //: Codes considered as "failure" for an operation
//       //: Reject reason must be empty on approve and not empty on reject/permanent 
//       INVALID_REASON = -1,
//       //: Unknown action to perform on ReviewableRequest
//       INVALID_ACTION = -2,
//       //: Actual hash of the request and provided hash are mismatched
//       HASH_MISMATCHED = -3,
//       //: ReviewableRequest is not found
//       NOT_FOUND = -4,
//       //: Actual type of a reviewable request and provided type are mismatched
//       TYPE_MISMATCHED = -5,
//       //: Reject is not allowed. Only permanent reject should be used
//       REJECT_NOT_ALLOWED = -6,
//       //: External details must be a valid JSON
//       INVALID_EXTERNAL_DETAILS = -7,
//       //: Source of ReviewableRequest is blocked
//       REQUESTOR_IS_BLOCKED = -8,
//       //: Permanent reject is not allowed. Only reject should be used
//       PERMANENT_REJECT_NOT_ALLOWED = -9,
//       //: Trying to remove tasks which are not set
//       REMOVING_NOT_SET_TASKS = -10,// cannot remove tasks which are not set
//       //: CheckValid or Confirm of operation is failed
//       INVALID_OPERATION = -11
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
  removingNotSetTask: -10,
  invalidOperation: -11,
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
//   //: Extended result of a Review Request operation containing details specific to certain request types
//   struct ExtendedResult {
//       //: Indicates whether or not the request that is being reviewed was applied
//       bool fulfilled;
//   
//       OperationResult operationResults<>;
//   
//       //: Reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ExtendedResult", [
  ["fulfilled", xdr.bool()],
  ["operationResults", xdr.varArray(xdr.lookup("OperationResult"), 2147483647)],
  ["ext", xdr.lookup("ExtendedResultExt")],
]);

// === xdr source ============================================================
//
//   //: Result of applying the review request with result code
//   union ReviewRequestResult switch (ReviewRequestResultCode code)
//   {
//   case SUCCESS:
//       ExtendedResult success;
//   case INVALID_OPERATION:
//       OperationResult operationResult;
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
    ["invalidOperation", "operationResult"],
  ],
  arms: {
    success: xdr.lookup("ExtendedResult"),
    operationResult: xdr.lookup("OperationResult"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   struct UpdateAssetOp 
//   {
//       AssetCode code;
//       longstring *details;
//   	uint64 *maxIssuanceAmount;
//   	uint32 *state;
//   
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("UpdateAssetOp", [
  ["code", xdr.lookup("AssetCode")],
  ["details", xdr.option(xdr.lookup("Longstring"))],
  ["maxIssuanceAmount", xdr.option(xdr.lookup("Uint64"))],
  ["state", xdr.option(xdr.lookup("Uint32"))],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   enum UpdateAssetResultCode 
//   {
//       SUCCESS = 0,
//   
//       NOT_FOUND = -1,
//       INVALID_DETAILS = -2,
//       UNSUFFICIENT_MAX_ISSUANCE_AMOUNT = -3,
//       NOT_DEFINED_UPDATE = -4
//   };
//
// ===========================================================================
xdr.enum("UpdateAssetResultCode", {
  success: 0,
  notFound: -1,
  invalidDetail: -2,
  unsufficientMaxIssuanceAmount: -3,
  notDefinedUpdate: -4,
});

// === xdr source ============================================================
//
//   union UpdateAssetResult switch(UpdateAssetResultCode code) 
//   {
//   case SUCCESS:
//       EmptyExt ext;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("UpdateAssetResult", {
  switchOn: xdr.lookup("UpdateAssetResultCode"),
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
//   struct UpdateDataOp 
//   {
//       uint64 dataID;
//   
//       longstring value;
//   
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("UpdateDataOp", [
  ["dataId", xdr.lookup("Uint64")],
  ["value", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   enum UpdateDataResultCode 
//   {
//       SUCCESS = 0,
//   
//       INVALID_DATA = -1,
//       NOT_FOUND = -2,
//       NOT_ALLOWED = -3
//   };
//
// ===========================================================================
xdr.enum("UpdateDataResultCode", {
  success: 0,
  invalidDatum: -1,
  notFound: -2,
  notAllowed: -3,
});

// === xdr source ============================================================
//
//   union UpdateDataResult switch (UpdateDataResultCode code)
//   {
//   case SUCCESS:
//       EmptyExt ext;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("UpdateDataResult", {
  switchOn: xdr.lookup("UpdateDataResultCode"),
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
//   struct UpdateReviewableRequestOp
//   {
//       uint64 requestID;
//   
//       ReviewableRequestOperation operations<>;
//       longstring creatorDetails;
//   
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("UpdateReviewableRequestOp", [
  ["requestId", xdr.lookup("Uint64")],
  ["operations", xdr.varArray(xdr.lookup("ReviewableRequestOperation"), 2147483647)],
  ["creatorDetails", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   enum UpdateReviewableRequestResultCode
//   {
//       SUCCESS = 0,
//   
//       INVALID_OPERATION = -1,
//       TASKS_NOT_FOUND = -2,
//       TOO_MANY_OPERATIONS = -3,
//       NOT_FOUND = -4,
//       SECURITY_TYPE_MISMATCH = -5,
//       INVALID_CREATOR_DETAILS = -6
//   };
//
// ===========================================================================
xdr.enum("UpdateReviewableRequestResultCode", {
  success: 0,
  invalidOperation: -1,
  tasksNotFound: -2,
  tooManyOperation: -3,
  notFound: -4,
  securityTypeMismatch: -5,
  invalidCreatorDetail: -6,
});

// === xdr source ============================================================
//
//   union UpdateReviewableRequestResult switch (UpdateReviewableRequestResultCode code)
//   {
//   case SUCCESS:
//       EmptyExt ext;
//   case INVALID_OPERATION:
//       OperationResult operationResult;
//   case TOO_MANY_OPERATIONS:
//       uint32 maxOperationsCount;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("UpdateReviewableRequestResult", {
  switchOn: xdr.lookup("UpdateReviewableRequestResultCode"),
  switchName: "code",
  switches: [
    ["success", "ext"],
    ["invalidOperation", "operationResult"],
    ["tooManyOperation", "maxOperationsCount"],
  ],
  arms: {
    ext: xdr.lookup("EmptyExt"),
    operationResult: xdr.lookup("OperationResult"),
    maxOperationsCount: xdr.lookup("Uint32"),
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
xdr.union("UpdateRoleOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: UpdateSignerRoleData is used to pass necessary params to update an existing signer role
//   struct UpdateRoleOp
//   {
//       //: ID of an existing signer role
//       uint64 roleID;
//       //: Array of ids of existing, unique and not default rules
//       uint64 ruleIDs<>;
//   
//       //: Arbitrary stringified json object with details to attach to the role
//       longstring details;
//   
//       //: reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("UpdateRoleOp", [
  ["roleId", xdr.lookup("Uint64")],
  ["ruleIDs", xdr.varArray(xdr.lookup("Uint64"), 2147483647)],
  ["details", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("UpdateRoleOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of ManageSignerRoleResultCode
//   enum UpdateRoleResultCode
//   {
//       //: Means that the specified action in `data` of ManageSignerRoleOp was successfully executed
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: There is no signer role with such id or the source cannot manage a role
//       NOT_FOUND = -1, // does not exist or owner mismatched
//       //: Passed details have invalid json structure
//       INVALID_DETAILS = -2,
//       //: There is no rule with id passed through `ruleIDs`
//       NO_SUCH_RULE = -3,
//       //: It is not allowed to duplicate ids in `ruleIDs` array
//       RULE_ID_DUPLICATION = -4,
//       //: It is not allowed to pass ruleIDs that are more than maxSignerRuleCount (by default, 128)
//       TOO_MANY_RULE_IDS = -5
//   };
//
// ===========================================================================
xdr.enum("UpdateRoleResultCode", {
  success: 0,
  notFound: -1,
  invalidDetail: -2,
  noSuchRule: -3,
  ruleIdDuplication: -4,
  tooManyRuleId: -5,
});

// === xdr source ============================================================
//
//   //: Result of operation application
//   union UpdateRoleResult switch (UpdateRoleResultCode code)
//   {
//   case SUCCESS:
//       EmptyExt ext;
//   case RULE_ID_DUPLICATION:
//   case NO_SUCH_RULE:
//       //: ID of a rule that was either duplicated or is default or does not exist
//       uint64 ruleID;
//   case TOO_MANY_RULE_IDS:
//       //: max count of rule ids that can be passed in `ruleIDs` array
//       uint32 maxRuleIDsCount;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("UpdateRoleResult", {
  switchOn: xdr.lookup("UpdateRoleResultCode"),
  switchName: "code",
  switches: [
    ["success", "ext"],
    ["ruleIdDuplication", "ruleId"],
    ["noSuchRule", "ruleId"],
    ["tooManyRuleId", "maxRuleIDsCount"],
  ],
  arms: {
    ext: xdr.lookup("EmptyExt"),
    ruleId: xdr.lookup("Uint64"),
    maxRuleIDsCount: xdr.lookup("Uint32"),
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
xdr.union("UpdateRuleOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: UpdateSignerRuleData is used to pass necessary params to update an existing signer rule
//   struct UpdateRuleOp
//   {
//       //: Identifier of an existing signer rule
//       uint64 ruleID;
//       //: Resource is used to specify entity (for some, with properties) that can be managed through operations
//       RuleResource resource;
//       //: Value from enum that can be applied to `resource`
//       RuleAction action;
//       //: True means that such rule will be automatically added to each new or updated signer role
//       bool forbids;
//       //: Arbitrary stringified json object with details that will be attached to a rule
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
xdr.struct("UpdateRuleOp", [
  ["ruleId", xdr.lookup("Uint64")],
  ["resource", xdr.lookup("RuleResource")],
  ["action", xdr.lookup("RuleAction")],
  ["forbids", xdr.bool()],
  ["details", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("UpdateRuleOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of ManageSignerRuleOp
//   enum UpdateRuleResultCode
//   {
//       //: Specified action in `data` of ManageSignerRuleOp was successfully executed
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: There is no signer rule with such id or source cannot manage the rule
//       NOT_FOUND = -1, // does not exists or owner mismatched
//       //: Passed details have invalid json structure
//       INVALID_DETAILS = -2,
//   
//       INVALID_CUSTOM_ACTION = -3,
//       INVALID_CUSTOM_RESOURCE = -4
//   };
//
// ===========================================================================
xdr.enum("UpdateRuleResultCode", {
  success: 0,
  notFound: -1,
  invalidDetail: -2,
  invalidCustomAction: -3,
  invalidCustomResource: -4,
});

// === xdr source ============================================================
//
//   //: Result of operation application
//   union UpdateRuleResult switch (UpdateRuleResultCode code)
//   {
//   case SUCCESS:
//       EmptyExt ext;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("UpdateRuleResult", {
  switchOn: xdr.lookup("UpdateRuleResultCode"),
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
//   struct UpdateSignerOp
//   {
//       SignerData data;
//   
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("UpdateSignerOp", [
  ["data", xdr.lookup("SignerData")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   enum UpdateSignerResultCode
//   {
//       //: Specified action in `data` of ManageSignerOp was successfully executed
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: Passed details have invalid json structure
//       INVALID_DETAILS = -1, // invalid json details
//       //: Source account does not have a signer with the provided public key
//       NOT_FOUND = -2, // there is no signer with such public key
//       //: There is no role with such id
//       NO_SUCH_ROLE = -3,
//       //: It is not allowed to set weight more than 1000
//       INVALID_WEIGHT = -4, // more than 1000
//       NO_ROLE_IDS = -5,
//       ROLE_ID_DUPLICATION = -6,
//       TOO_MANY_ROLES = -7
//   };
//
// ===========================================================================
xdr.enum("UpdateSignerResultCode", {
  success: 0,
  invalidDetail: -1,
  notFound: -2,
  noSuchRole: -3,
  invalidWeight: -4,
  noRoleId: -5,
  roleIdDuplication: -6,
  tooManyRole: -7,
});

// === xdr source ============================================================
//
//   union UpdateSignerResult switch (UpdateSignerResultCode code)
//   {
//   case SUCCESS:
//       EmptyExt ext;
//   case NO_SUCH_ROLE:
//   case ROLE_ID_DUPLICATION:
//       uint64 roleID;
//   case TOO_MANY_ROLES:
//       uint32 maxRolesCount;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("UpdateSignerResult", {
  switchOn: xdr.lookup("UpdateSignerResultCode"),
  switchName: "code",
  switches: [
    ["success", "ext"],
    ["noSuchRole", "roleId"],
    ["roleIdDuplication", "roleId"],
    ["tooManyRole", "maxRolesCount"],
  ],
  arms: {
    ext: xdr.lookup("EmptyExt"),
    roleId: xdr.lookup("Uint64"),
    maxRolesCount: xdr.lookup("Uint32"),
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
//   //case SCP_QUORUMSET:
//   //    SCPQuorumSet qSet;
//   //case SCP_MESSAGE:
//   //    SCPEnvelope envelope;
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
//   struct CustomRuleAction
//   {
//       longstring actionType;
//   
//       longstring actionPayload;
//   };
//
// ===========================================================================
xdr.struct("CustomRuleAction", [
  ["actionType", xdr.lookup("Longstring")],
  ["actionPayload", xdr.lookup("Longstring")],
]);

// === xdr source ============================================================
//
//   struct CustomRuleResource
//   {
//       longstring resourceType;
//       longstring resourcePayload;
//   };
//
// ===========================================================================
xdr.struct("CustomRuleResource", [
  ["resourceType", xdr.lookup("Longstring")],
  ["resourcePayload", xdr.lookup("Longstring")],
]);

// === xdr source ============================================================
//
//   enum RuleResourceType
//   {
//       ANY = 1,
//       LEDGER_ENTRY = 2,
//       CUSTOM = 3
//   };
//
// ===========================================================================
xdr.enum("RuleResourceType", {
  any: 1,
  ledgerEntry: 2,
  custom: 3,
});

// === xdr source ============================================================
//
//   union RuleResource switch(RuleResourceType resourceType)
//   {
//       case ANY:
//           void;
//       case LEDGER_ENTRY:
//           InternalRuleResource internalRuleResource;
//       case CUSTOM:
//           CustomRuleResource customRuleResource;
//       default:
//           EmptyExt ext;
//   };
//
// ===========================================================================
xdr.union("RuleResource", {
  switchOn: xdr.lookup("RuleResourceType"),
  switchName: "resourceType",
  switches: [
    ["any", xdr.void()],
    ["ledgerEntry", "internalRuleResource"],
    ["custom", "customRuleResource"],
  ],
  arms: {
    internalRuleResource: xdr.lookup("InternalRuleResource"),
    customRuleResource: xdr.lookup("CustomRuleResource"),
    ext: xdr.lookup("EmptyExt"),
  },
  defaultArm: xdr.lookup("EmptyExt"),
});

// === xdr source ============================================================
//
//   struct
//       {
//           ReviewableRequestOperationRule opRules<>;
//   
//           uint32 securityType;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("InternalRuleResourceReviewableRequest", [
  ["opRules", xdr.varArray(xdr.lookup("ReviewableRequestOperationRule"), 2147483647)],
  ["securityType", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           AssetCode assetCode;
//           uint32 securityType;
//           uint32 state;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("InternalRuleResourceAsset", [
  ["assetCode", xdr.lookup("AssetCode")],
  ["securityType", xdr.lookup("Uint32")],
  ["state", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           //: For signer role creating resource will be triggered if `roleID` equals `0`
//           uint64 roleID;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("InternalRuleResourceRole", [
  ["roleId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           uint64 roleIDs<>;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("InternalRuleResourceSigner", [
  ["roleIDs", xdr.varArray(xdr.lookup("Uint64"), 2147483647)],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           //: prefix of key
//           longstring keyPrefix;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("InternalRuleResourceKeyValue", [
  ["keyPrefix", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           uint32 securityType;
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("InternalRuleResourceData", [
  ["securityType", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   //: Describes properties of some entries that can be used to restrict the usage of entries
//   union InternalRuleResource switch (LedgerEntryType type)
//   {
//   case REVIEWABLE_REQUEST:
//       //: Describes properties that are equal to managed reviewable request entry fields
//       struct
//       {
//           ReviewableRequestOperationRule opRules<>;
//   
//           uint32 securityType;
//   
//           EmptyExt ext;
//       } reviewableRequest;
//   case ASSET:
//       //: Describes properties that are equal to managed asset entry fields
//       struct
//       {
//           AssetCode assetCode;
//           uint32 securityType;
//           uint32 state;
//   
//           EmptyExt ext;
//       } asset;
//   case ROLE:
//       //: Describes properties that are equal to managed signer role entry fields
//       struct
//       {
//           //: For signer role creating resource will be triggered if `roleID` equals `0`
//           uint64 roleID;
//   
//           EmptyExt ext;
//       } role;
//   case SIGNER:
//       //: Describes properties that are equal to managed signer entry fields
//       struct
//       {
//           uint64 roleIDs<>;
//   
//           EmptyExt ext;
//       } signer;
//   case KEY_VALUE:
//       //: Describes properties that are equal to managed key value entry fields
//       struct
//       {
//           //: prefix of key
//           longstring keyPrefix;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       } keyValue;
//   case DATA:
//       struct
//       {
//           uint32 securityType;
//           EmptyExt ext;
//       } data;
//   default:
//       //: reserved for future extension
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.union("InternalRuleResource", {
  switchOn: xdr.lookup("LedgerEntryType"),
  switchName: "type",
  switches: [
    ["reviewableRequest", "reviewableRequest"],
    ["asset", "asset"],
    ["role", "role"],
    ["signer", "signer"],
    ["keyValue", "keyValue"],
    ["datum", "data"],
  ],
  arms: {
    reviewableRequest: xdr.lookup("InternalRuleResourceReviewableRequest"),
    asset: xdr.lookup("InternalRuleResourceAsset"),
    role: xdr.lookup("InternalRuleResourceRole"),
    signer: xdr.lookup("InternalRuleResourceSigner"),
    keyValue: xdr.lookup("InternalRuleResourceKeyValue"),
    data: xdr.lookup("InternalRuleResourceData"),
    ext: xdr.lookup("EmptyExt"),
  },
  defaultArm: xdr.lookup("EmptyExt"),
});

// === xdr source ============================================================
//
//   //: Actions that can be applied to a signer rule resource
//   enum RuleActionType
//   {
//       ANY = 1,
//       CREATE = 2,
//       READ = 3,
//       UPDATE = 4,
//       ISSUE = 5,
//       SEND = 6,
//       REMOVE = 7,
//       DESTROY = 8,
//       REVIEW = 9,
//       CHANGE_ROLES = 10,
//       INITIATE_RECOVERY = 11,
//       RECOVER = 12,
//       UPDATE_MAX_ISSUANCE = 13,
//       UPDATE_STATE = 14,
//       RECEIVE = 19,
//       RECEIVE_ISSUANCE = 20,
//       CUSTOM = 21
//   };
//
// ===========================================================================
xdr.enum("RuleActionType", {
  any: 1,
  create: 2,
  read: 3,
  update: 4,
  issue: 5,
  send: 6,
  remove: 7,
  destroy: 8,
  review: 9,
  changeRole: 10,
  initiateRecovery: 11,
  recover: 12,
  updateMaxIssuance: 13,
  updateState: 14,
  receive: 19,
  receiveIssuance: 20,
  custom: 21,
});

// === xdr source ============================================================
//
//   struct {
//           bool forOther;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("RuleActionCreate", [
  ["forOther", xdr.bool()],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct {
//           bool forOther;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("RuleActionUpdate", [
  ["forOther", xdr.bool()],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct {
//           uint32 securityType;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("RuleActionIssue", [
  ["securityType", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct {
//           uint32 securityType;
//           bool forOther;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("RuleActionDestroy", [
  ["securityType", xdr.lookup("Uint32")],
  ["forOther", xdr.bool()],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct {
//           uint32 securityType;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("RuleActionSend", [
  ["securityType", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct {
//           uint32 securityType;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("RuleActionReceive", [
  ["securityType", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct {
//           uint32 securityType;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("RuleActionReceiveIssuance", [
  ["securityType", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct {
//           uint64 roleIDs<>; // if roleIDsToSet (from operation body) the same, action will triggered
//           bool forOther;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("RuleActionChangeRoles", [
  ["roleIDs", xdr.varArray(xdr.lookup("Uint64"), 2147483647)],
  ["forOther", xdr.bool()],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct {
//           uint64 roleIDs<>;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("RuleActionInitiateRecovery", [
  ["roleIDs", xdr.varArray(xdr.lookup("Uint64"), 2147483647)],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct {
//           //: Bit mask of tasks that is allowed to add to reviewable request pending tasks
//           uint64 tasksToAdd;
//           //: Bit mask of tasks that is allowed to remove from reviewable request pending tasks
//           uint64 tasksToRemove;
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("RuleActionReview", [
  ["tasksToAdd", xdr.lookup("Uint64")],
  ["tasksToRemove", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   union RuleAction switch (RuleActionType type) 
//   {
//   case ANY:
//       void;
//   case CREATE:
//       struct {
//           bool forOther;
//   
//           EmptyExt ext;
//       } create;
//   case UPDATE:
//       struct {
//           bool forOther;
//   
//           EmptyExt ext;
//       } update;
//   case ISSUE:
//       struct {
//           uint32 securityType;
//   
//           EmptyExt ext;
//       } issue;
//   case DESTROY:
//       struct {
//           uint32 securityType;
//           bool forOther;
//   
//           EmptyExt ext;
//       } destroy;
//   case SEND:
//       struct {
//           uint32 securityType;
//   
//           EmptyExt ext;
//       } send;
//   case RECEIVE:
//       struct {
//           uint32 securityType;
//   
//           EmptyExt ext;
//       } receive;
//   case RECEIVE_ISSUANCE:
//       struct {
//           uint32 securityType;
//   
//           EmptyExt ext;
//       } receiveIssuance;
//   case CHANGE_ROLES:
//       struct {
//           uint64 roleIDs<>; // if roleIDsToSet (from operation body) the same, action will triggered
//           bool forOther;
//   
//           EmptyExt ext;
//       } changeRoles;
//   case INITIATE_RECOVERY:
//       struct {
//           uint64 roleIDs<>;
//   
//           EmptyExt ext;
//       } initiateRecovery;
//   case REVIEW:
//       struct {
//           //: Bit mask of tasks that is allowed to add to reviewable request pending tasks
//           uint64 tasksToAdd;
//           //: Bit mask of tasks that is allowed to remove from reviewable request pending tasks
//           uint64 tasksToRemove;
//           EmptyExt ext;
//       } review;
//   case CUSTOM:
//       CustomRuleAction customRuleAction;
//   default:
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.union("RuleAction", {
  switchOn: xdr.lookup("RuleActionType"),
  switchName: "type",
  switches: [
    ["any", xdr.void()],
    ["create", "create"],
    ["update", "update"],
    ["issue", "issue"],
    ["destroy", "destroy"],
    ["send", "send"],
    ["receive", "receive"],
    ["receiveIssuance", "receiveIssuance"],
    ["changeRole", "changeRoles"],
    ["initiateRecovery", "initiateRecovery"],
    ["review", "review"],
    ["custom", "customRuleAction"],
  ],
  arms: {
    create: xdr.lookup("RuleActionCreate"),
    update: xdr.lookup("RuleActionUpdate"),
    issue: xdr.lookup("RuleActionIssue"),
    destroy: xdr.lookup("RuleActionDestroy"),
    send: xdr.lookup("RuleActionSend"),
    receive: xdr.lookup("RuleActionReceive"),
    receiveIssuance: xdr.lookup("RuleActionReceiveIssuance"),
    changeRoles: xdr.lookup("RuleActionChangeRoles"),
    initiateRecovery: xdr.lookup("RuleActionInitiateRecovery"),
    review: xdr.lookup("RuleActionReview"),
    customRuleAction: xdr.lookup("CustomRuleAction"),
    ext: xdr.lookup("EmptyExt"),
  },
  defaultArm: xdr.lookup("EmptyExt"),
});

// === xdr source ============================================================
//
//   struct ReviewableRequestOperationRule 
//   {
//       RuleResource resource;
//   
//       RuleAction action;
//   
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("ReviewableRequestOperationRule", [
  ["resource", xdr.lookup("RuleResource")],
  ["action", xdr.lookup("RuleAction")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   union switch (OperationType type)
//       {
//       case CREATE_ACCOUNT:
//           CreateAccountOp createAccountOp;
//   	case DESTRUCTION:
//   		DestructionOp destructionOp;
//   	case CREATE_BALANCE:
//   		CreateBalanceOp createBalanceOp;
//       case CREATE_ASSET:
//           CreateAssetOp createAssetOp;
//       case UPDATE_ASSET:
//           UpdateAssetOp updateAssetOp;
//       case CREATE_DATA:
//           CreateDataOp createDataOp;
//       case UPDATE_DATA:
//           UpdateDataOp updateDataOp;
//       case REMOVE_DATA:
//           RemoveDataOp removeDataOp;
//       case REVIEW_REQUEST:
//   		ReviewRequestOp reviewRequestOp;
//   	case PUT_KEY_VALUE:
//   	    PutKeyValueOp putKeyValueOp;
//       case REMOVE_KEY_VALUE:
//   	    RemoveKeyValueOp removeKeyValueOp;
//   	case CHANGE_ACCOUNT_ROLES:
//   		ChangeAccountRolesOp changeAccountRolesOp;
//       case PAYMENT:
//           PaymentOp paymentOp;
//       case CREATE_SIGNER:
//           CreateSignerOp createSignerOp;
//       case UPDATE_SIGNER:
//           UpdateSignerOp updateSignerOp;
//       case REMOVE_SIGNER:
//           RemoveSignerOp removeSignerOp;
//       case CREATE_ROLE:
//           CreateRoleOp createRoleOp;
//       case UPDATE_ROLE:
//           UpdateRoleOp updateRoleOp;
//       case REMOVE_ROLE:
//           RemoveRoleOp removeRoleOp;
//       case CREATE_RULE:
//           CreateRuleOp createRuleOp;
//       case UPDATE_RULE:
//           UpdateRuleOp updateRuleOp;
//       case REMOVE_RULE:
//           RemoveRuleOp removeRuleOp;
//       case CREATE_REVIEWABLE_REQUEST:
//           CreateReviewableRequestOp createReviewableRequestOp;
//       case UPDATE_REVIEWABLE_REQUEST:
//           UpdateReviewableRequestOp updateReviewableRequestOp;
//       case REMOVE_REVIEWABLE_REQUEST:
//           RemoveReviewableRequestOp removeReviewableRequestOp;
//       case INITIATE_KYC_RECOVERY:
//           InitiateKYCRecoveryOp initiateKYCRecoveryOp;
//       case KYC_RECOVERY:
//           KYCRecoveryOp kycRecoveryOp;
//       case ISSUANCE:
//           IssuanceOp issuanceOp;
//       }
//
// ===========================================================================
xdr.union("OperationBody", {
  switchOn: xdr.lookup("OperationType"),
  switchName: "type",
  switches: [
    ["createAccount", "createAccountOp"],
    ["destruction", "destructionOp"],
    ["createBalance", "createBalanceOp"],
    ["createAsset", "createAssetOp"],
    ["updateAsset", "updateAssetOp"],
    ["createDatum", "createDataOp"],
    ["updateDatum", "updateDataOp"],
    ["removeDatum", "removeDataOp"],
    ["reviewRequest", "reviewRequestOp"],
    ["putKeyValue", "putKeyValueOp"],
    ["removeKeyValue", "removeKeyValueOp"],
    ["changeAccountRole", "changeAccountRolesOp"],
    ["payment", "paymentOp"],
    ["createSigner", "createSignerOp"],
    ["updateSigner", "updateSignerOp"],
    ["removeSigner", "removeSignerOp"],
    ["createRole", "createRoleOp"],
    ["updateRole", "updateRoleOp"],
    ["removeRole", "removeRoleOp"],
    ["createRule", "createRuleOp"],
    ["updateRule", "updateRuleOp"],
    ["removeRule", "removeRuleOp"],
    ["createReviewableRequest", "createReviewableRequestOp"],
    ["updateReviewableRequest", "updateReviewableRequestOp"],
    ["removeReviewableRequest", "removeReviewableRequestOp"],
    ["initiateKycRecovery", "initiateKycRecoveryOp"],
    ["kycRecovery", "kycRecoveryOp"],
    ["issuance", "issuanceOp"],
  ],
  arms: {
    createAccountOp: xdr.lookup("CreateAccountOp"),
    destructionOp: xdr.lookup("DestructionOp"),
    createBalanceOp: xdr.lookup("CreateBalanceOp"),
    createAssetOp: xdr.lookup("CreateAssetOp"),
    updateAssetOp: xdr.lookup("UpdateAssetOp"),
    createDataOp: xdr.lookup("CreateDataOp"),
    updateDataOp: xdr.lookup("UpdateDataOp"),
    removeDataOp: xdr.lookup("RemoveDataOp"),
    reviewRequestOp: xdr.lookup("ReviewRequestOp"),
    putKeyValueOp: xdr.lookup("PutKeyValueOp"),
    removeKeyValueOp: xdr.lookup("RemoveKeyValueOp"),
    changeAccountRolesOp: xdr.lookup("ChangeAccountRolesOp"),
    paymentOp: xdr.lookup("PaymentOp"),
    createSignerOp: xdr.lookup("CreateSignerOp"),
    updateSignerOp: xdr.lookup("UpdateSignerOp"),
    removeSignerOp: xdr.lookup("RemoveSignerOp"),
    createRoleOp: xdr.lookup("CreateRoleOp"),
    updateRoleOp: xdr.lookup("UpdateRoleOp"),
    removeRoleOp: xdr.lookup("RemoveRoleOp"),
    createRuleOp: xdr.lookup("CreateRuleOp"),
    updateRuleOp: xdr.lookup("UpdateRuleOp"),
    removeRuleOp: xdr.lookup("RemoveRuleOp"),
    createReviewableRequestOp: xdr.lookup("CreateReviewableRequestOp"),
    updateReviewableRequestOp: xdr.lookup("UpdateReviewableRequestOp"),
    removeReviewableRequestOp: xdr.lookup("RemoveReviewableRequestOp"),
    initiateKycRecoveryOp: xdr.lookup("InitiateKycRecoveryOp"),
    kycRecoveryOp: xdr.lookup("KycRecoveryOp"),
    issuanceOp: xdr.lookup("IssuanceOp"),
  },
});

// === xdr source ============================================================
//
//   //: An operation is the lowest unit of work that a transaction does
//   struct Operation
//   {
//       //: sourceAccount is the account used to run the operation
//       //: if not set, the runtime defaults to "sourceAccount" specified at
//       //: the transaction level
//       AccountID* sourceAccount;
//   
//       union switch (OperationType type)
//       {
//       case CREATE_ACCOUNT:
//           CreateAccountOp createAccountOp;
//   	case DESTRUCTION:
//   		DestructionOp destructionOp;
//   	case CREATE_BALANCE:
//   		CreateBalanceOp createBalanceOp;
//       case CREATE_ASSET:
//           CreateAssetOp createAssetOp;
//       case UPDATE_ASSET:
//           UpdateAssetOp updateAssetOp;
//       case CREATE_DATA:
//           CreateDataOp createDataOp;
//       case UPDATE_DATA:
//           UpdateDataOp updateDataOp;
//       case REMOVE_DATA:
//           RemoveDataOp removeDataOp;
//       case REVIEW_REQUEST:
//   		ReviewRequestOp reviewRequestOp;
//   	case PUT_KEY_VALUE:
//   	    PutKeyValueOp putKeyValueOp;
//       case REMOVE_KEY_VALUE:
//   	    RemoveKeyValueOp removeKeyValueOp;
//   	case CHANGE_ACCOUNT_ROLES:
//   		ChangeAccountRolesOp changeAccountRolesOp;
//       case PAYMENT:
//           PaymentOp paymentOp;
//       case CREATE_SIGNER:
//           CreateSignerOp createSignerOp;
//       case UPDATE_SIGNER:
//           UpdateSignerOp updateSignerOp;
//       case REMOVE_SIGNER:
//           RemoveSignerOp removeSignerOp;
//       case CREATE_ROLE:
//           CreateRoleOp createRoleOp;
//       case UPDATE_ROLE:
//           UpdateRoleOp updateRoleOp;
//       case REMOVE_ROLE:
//           RemoveRoleOp removeRoleOp;
//       case CREATE_RULE:
//           CreateRuleOp createRuleOp;
//       case UPDATE_RULE:
//           UpdateRuleOp updateRuleOp;
//       case REMOVE_RULE:
//           RemoveRuleOp removeRuleOp;
//       case CREATE_REVIEWABLE_REQUEST:
//           CreateReviewableRequestOp createReviewableRequestOp;
//       case UPDATE_REVIEWABLE_REQUEST:
//           UpdateReviewableRequestOp updateReviewableRequestOp;
//       case REMOVE_REVIEWABLE_REQUEST:
//           RemoveReviewableRequestOp removeReviewableRequestOp;
//       case INITIATE_KYC_RECOVERY:
//           InitiateKYCRecoveryOp initiateKYCRecoveryOp;
//       case KYC_RECOVERY:
//           KYCRecoveryOp kycRecoveryOp;
//       case ISSUANCE:
//           IssuanceOp issuanceOp;
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
//       //: specifies inclusive min ledger close time after which transaction is valid
//       uint64 minTime;
//       //: specifies inclusive max ledger close time before which transaction is valid.
//       //: note: transaction will be rejected if max time exceeds close time of current ledger on more then [`tx_expiration_period`](https://tokend.gitlab.io/horizon/#operation/info)
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
//   //: Transaction is a container for a set of operations
//   //:    - is executed by an account
//   //:    - operations are executed in order as one ACID transaction
//   //: (either all operations are applied or none are if any returns a failing code)
//   struct Transaction
//   {
//       //: account used to run the transaction
//       AccountID sourceAccount;
//   
//       //: random number used to ensure there is no hash collisions
//       Salt salt;
//   
//       //: validity range (inclusive) for the last ledger close time
//       TimeBounds timeBounds;
//   
//       //: allows to attach additional data to the transactions
//       Memo memo;
//   
//       //: list of operations to be applied. Max size is 100
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
//       //: list of signatures used to authorize transaction
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
//       opBAD_AUTH_EXTRA = -8,
//       opNO_ROLE_PERMISSION = -9, // not allowed for this role of source account
//       opNO_ENTRY = -10,
//       opNOT_SUPPORTED = -11,
//       opLICENSE_VIOLATION = -12, // number of admins is greater than allowed
//       //: operation was skipped cause of failure validation of previous operation
//       opSKIPPED = -13
//   };
//
// ===========================================================================
xdr.enum("OperationResultCode", {
  opInner: 0,
  opBadAuth: -1,
  opNoAccount: -2,
  opNotAllowed: -3,
  opAccountBlocked: -4,
  opBadAuthExtra: -8,
  opNoRolePermission: -9,
  opNoEntry: -10,
  opNotSupported: -11,
  opLicenseViolation: -12,
  opSkipped: -13,
});

// === xdr source ============================================================
//
//   //: Defines requirements for tx or operation which were not fulfilled
//   struct RuleRequirement
//   {
//   	//: defines resources to which access was denied
//       RuleResource resource;
//   	//: defines action which was denied
//       RuleAction action;
//   	//: defines account for which requirements were not met
//   	AccountID account;
//   
//   	//: reserved for future extension
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("RuleRequirement", [
  ["resource", xdr.lookup("RuleResource")],
  ["action", xdr.lookup("RuleAction")],
  ["account", xdr.lookup("AccountId")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   union OperationResultTr switch (OperationType type)
//   {
//   case CREATE_ACCOUNT:
//       CreateAccountResult createAccountResult;
//   case DESTRUCTION:
//       DestructionResult destructionResult;
//   case CREATE_BALANCE:
//       CreateBalanceResult createBalanceResult;
//   case CREATE_ASSET:
//       CreateAssetResult createAssetResult;
//   case UPDATE_ASSET:
//       UpdateAssetResult updateAssetResult;
//   case CREATE_DATA:
//       CreateDataResult createDataResult;
//   case UPDATE_DATA:
//       UpdateDataResult updateDataResult;
//   case REMOVE_DATA:
//       RemoveDataResult removeDataResult;
//   case REVIEW_REQUEST:
//       ReviewRequestResult reviewRequestResult;
//   case PUT_KEY_VALUE:
//       PutKeyValueResult putKeyValueResult;
//   case REMOVE_KEY_VALUE:
//       RemoveKeyValueResult removeKeyValueResult;
//   case CHANGE_ACCOUNT_ROLES:
//       ChangeAccountRolesResult changeAccountRolesResult;
//   case PAYMENT:
//       PaymentResult paymentResult;
//   case CREATE_SIGNER:
//       CreateSignerResult createSignerResult;
//   case UPDATE_SIGNER:
//       UpdateSignerResult updateSignerResult;
//   case REMOVE_SIGNER:
//       RemoveSignerResult removeSignerResult;
//   case CREATE_ROLE:
//       CreateRoleResult createRoleResult;
//   case UPDATE_ROLE:
//       UpdateRoleResult updateRoleResult;
//   case REMOVE_ROLE:
//       RemoveRoleResult removeRoleResult;
//   case CREATE_RULE:
//       CreateRuleResult createRuleResult;
//   case UPDATE_RULE:
//       UpdateRuleResult updateRuleResult;
//   case REMOVE_RULE:
//       RemoveRuleResult removeRuleResult;
//   case CREATE_REVIEWABLE_REQUEST:
//       CreateReviewableRequestResult createReviewableRequestResult;
//   case UPDATE_REVIEWABLE_REQUEST:
//       UpdateReviewableRequestResult updateReviewableRequestResult;
//   case REMOVE_REVIEWABLE_REQUEST:
//       RemoveReviewableRequestResult removeReviewableRequestResult;
//   case KYC_RECOVERY:
//       KYCRecoveryResult kycRecoveryResult;
//   case INITIATE_KYC_RECOVERY:
//       InitiateKYCRecoveryResult initiateKYCRecoveryResult;
//   case ISSUANCE:
//       IssuanceResult issuanceResult;
//   };
//
// ===========================================================================
xdr.union("OperationResultTr", {
  switchOn: xdr.lookup("OperationType"),
  switchName: "type",
  switches: [
    ["createAccount", "createAccountResult"],
    ["destruction", "destructionResult"],
    ["createBalance", "createBalanceResult"],
    ["createAsset", "createAssetResult"],
    ["updateAsset", "updateAssetResult"],
    ["createDatum", "createDataResult"],
    ["updateDatum", "updateDataResult"],
    ["removeDatum", "removeDataResult"],
    ["reviewRequest", "reviewRequestResult"],
    ["putKeyValue", "putKeyValueResult"],
    ["removeKeyValue", "removeKeyValueResult"],
    ["changeAccountRole", "changeAccountRolesResult"],
    ["payment", "paymentResult"],
    ["createSigner", "createSignerResult"],
    ["updateSigner", "updateSignerResult"],
    ["removeSigner", "removeSignerResult"],
    ["createRole", "createRoleResult"],
    ["updateRole", "updateRoleResult"],
    ["removeRole", "removeRoleResult"],
    ["createRule", "createRuleResult"],
    ["updateRule", "updateRuleResult"],
    ["removeRule", "removeRuleResult"],
    ["createReviewableRequest", "createReviewableRequestResult"],
    ["updateReviewableRequest", "updateReviewableRequestResult"],
    ["removeReviewableRequest", "removeReviewableRequestResult"],
    ["kycRecovery", "kycRecoveryResult"],
    ["initiateKycRecovery", "initiateKycRecoveryResult"],
    ["issuance", "issuanceResult"],
  ],
  arms: {
    createAccountResult: xdr.lookup("CreateAccountResult"),
    destructionResult: xdr.lookup("DestructionResult"),
    createBalanceResult: xdr.lookup("CreateBalanceResult"),
    createAssetResult: xdr.lookup("CreateAssetResult"),
    updateAssetResult: xdr.lookup("UpdateAssetResult"),
    createDataResult: xdr.lookup("CreateDataResult"),
    updateDataResult: xdr.lookup("UpdateDataResult"),
    removeDataResult: xdr.lookup("RemoveDataResult"),
    reviewRequestResult: xdr.lookup("ReviewRequestResult"),
    putKeyValueResult: xdr.lookup("PutKeyValueResult"),
    removeKeyValueResult: xdr.lookup("RemoveKeyValueResult"),
    changeAccountRolesResult: xdr.lookup("ChangeAccountRolesResult"),
    paymentResult: xdr.lookup("PaymentResult"),
    createSignerResult: xdr.lookup("CreateSignerResult"),
    updateSignerResult: xdr.lookup("UpdateSignerResult"),
    removeSignerResult: xdr.lookup("RemoveSignerResult"),
    createRoleResult: xdr.lookup("CreateRoleResult"),
    updateRoleResult: xdr.lookup("UpdateRoleResult"),
    removeRoleResult: xdr.lookup("RemoveRoleResult"),
    createRuleResult: xdr.lookup("CreateRuleResult"),
    updateRuleResult: xdr.lookup("UpdateRuleResult"),
    removeRuleResult: xdr.lookup("RemoveRuleResult"),
    createReviewableRequestResult: xdr.lookup("CreateReviewableRequestResult"),
    updateReviewableRequestResult: xdr.lookup("UpdateReviewableRequestResult"),
    removeReviewableRequestResult: xdr.lookup("RemoveReviewableRequestResult"),
    kycRecoveryResult: xdr.lookup("KycRecoveryResult"),
    initiateKycRecoveryResult: xdr.lookup("InitiateKycRecoveryResult"),
    issuanceResult: xdr.lookup("IssuanceResult"),
  },
});

// === xdr source ============================================================
//
//   union OperationResult switch (OperationResultCode code)
//   {
//   case opINNER:
//       OperationResultTr tr;
//   case opNO_ENTRY:
//       LedgerKey entryKey;
//   case opNO_ROLE_PERMISSION:
//   case opBAD_AUTH:
//       RuleRequirement requirement;
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
    ["opNoEntry", "entryKey"],
    ["opNoRolePermission", "requirement"],
    ["opBadAuth", "requirement"],
  ],
  arms: {
    tr: xdr.lookup("OperationResultTr"),
    entryKey: xdr.lookup("LedgerKey"),
    requirement: xdr.lookup("RuleRequirement"),
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
//       case txNO_ROLE_PERMISSION:
//           RuleRequirement requirement;
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
    ["txNoRolePermission", "requirement"],
  ],
  arms: {
    results: xdr.varArray(xdr.lookup("OperationResult"), 2147483647),
    requirement: xdr.lookup("RuleRequirement"),
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
//       case txNO_ROLE_PERMISSION:
//           RuleRequirement requirement;
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
//   enum LedgerVersion
//   {
//       EMPTY_VERSION = 0
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
//       ACCOUNT = 1,
//       SIGNER = 2,
//       BALANCE = 3,
//       DATA = 4,
//       ASSET = 5,
//       REFERENCE = 6,
//       REVIEWABLE_REQUEST = 7,
//   	ACCOUNT_KYC = 8,
//       KEY_VALUE = 9,
//       RULE = 10,
//       ROLE = 11
//   };
//
// ===========================================================================
xdr.enum("LedgerEntryType", {
  account: 1,
  signer: 2,
  balance: 3,
  datum: 4,
  asset: 5,
  reference: 6,
  reviewableRequest: 7,
  accountKyc: 8,
  keyValue: 9,
  rule: 10,
  role: 11,
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
//   //: `Fee` is used to unite fixed and percent fee amounts
//   struct Fee {
//       //: Fixed amount to pay for the operation
//   	uint64 fixed;
//   	//: Part of the managed amount in percents
//   	uint64 percent;
//   
//       //: reserved for future use
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
//       PUT_KEY_VALUE = 2,
//       REMOVE_KEY_VALUE = 3,
//       CREATE_ASSET = 4,
//       UPDATE_ASSET = 5,
//       PAYMENT = 6,
//       ISSUANCE = 7,
//       DESTRUCTION = 8,
//       CREATE_BALANCE = 9,
//       CREATE_DATA = 10,
//       UPDATE_DATA = 11,
//       REMOVE_DATA = 12,
//       REVIEW_REQUEST = 13,
//   	CHANGE_ACCOUNT_ROLES = 14,
//       CREATE_SIGNER = 15,
//       UPDATE_SIGNER = 16,
//       REMOVE_SIGNER = 17,
//       CREATE_ROLE = 18,
//       UPDATE_ROLE = 19,
//       REMOVE_ROLE = 20,
//       CREATE_RULE = 21,
//       UPDATE_RULE = 22,
//       REMOVE_RULE = 23,
//       CREATE_REVIEWABLE_REQUEST = 24,
//       UPDATE_REVIEWABLE_REQUEST = 25,
//       REMOVE_REVIEWABLE_REQUEST = 26,
//       INITIATE_KYC_RECOVERY = 27,
//       KYC_RECOVERY = 28
//   };
//
// ===========================================================================
xdr.enum("OperationType", {
  createAccount: 1,
  putKeyValue: 2,
  removeKeyValue: 3,
  createAsset: 4,
  updateAsset: 5,
  payment: 6,
  issuance: 7,
  destruction: 8,
  createBalance: 9,
  createDatum: 10,
  updateDatum: 11,
  removeDatum: 12,
  reviewRequest: 13,
  changeAccountRole: 14,
  createSigner: 15,
  updateSigner: 16,
  removeSigner: 17,
  createRole: 18,
  updateRole: 19,
  removeRole: 20,
  createRule: 21,
  updateRule: 22,
  removeRule: 23,
  createReviewableRequest: 24,
  updateReviewableRequest: 25,
  removeReviewableRequest: 26,
  initiateKycRecovery: 27,
  kycRecovery: 28,
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
//   //: Defines the type of destination for operation
//   enum DestinationType {
//       ACCOUNT = 0,
//       BALANCE = 1
//   };
//
// ===========================================================================
xdr.enum("DestinationType", {
  account: 0,
  balance: 1,
});

// === xdr source ============================================================
//
//   union MovementDestination switch (DestinationType type) {
//       case ACCOUNT:
//           AccountID accountID;
//       case BALANCE:
//           BalanceID balanceID;
//   };
//
// ===========================================================================
xdr.union("MovementDestination", {
  switchOn: xdr.lookup("DestinationType"),
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

});
export default types;
