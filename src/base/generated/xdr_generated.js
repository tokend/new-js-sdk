// revision: 527a6f2dd94b976af29835000620a35628ef82d2
// branch:   (HEAD
// Automatically generated on 2020-04-10T16:19:29+00:00
// DO NOT EDIT or your changes may be overwritten

/* jshint maxstatements:2147483647  */
/* jshint esnext:true  */

import * as XDR from 'js-xdr';


var types = XDR.config(xdr => {

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
xdr.struct("AccountRuleEntry", [
  ["id", xdr.lookup("Uint64")],
  ["resource", xdr.lookup("AccountRuleResource")],
  ["action", xdr.lookup("AccountRuleAction")],
  ["forbids", xdr.bool()],
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
//   struct DataEntry 
//   {
//       uint64 id;
//       uint64 type;
//       longstring value;
//   
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("DataEntry", [
  ["id", xdr.lookup("Uint64")],
  ["type", xdr.lookup("Uint64")],
  ["value", xdr.lookup("Longstring")],
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
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("LicenseEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct LicenseEntry
//   {
//       uint64 adminCount;
//       uint64 dueDate;
//       Hash ledgerHash;
//       Hash prevLicenseHash;
//       DecoratedSignature signatures<>;
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
xdr.struct("LicenseEntry", [
  ["adminCount", xdr.lookup("Uint64")],
  ["dueDate", xdr.lookup("Uint64")],
  ["ledgerHash", xdr.lookup("Hash")],
  ["prevLicenseHash", xdr.lookup("Hash")],
  ["signatures", xdr.varArray(xdr.lookup("DecoratedSignature"), 2147483647)],
  ["ext", xdr.lookup("LicenseEntryExt")],
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
//       bool forbids;
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
  ["forbids", xdr.bool()],
  ["isDefault", xdr.bool()],
  ["details", xdr.lookup("Longstring")],
  ["ownerId", xdr.lookup("AccountId")],
  ["ext", xdr.lookup("SignerRuleEntryExt")],
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
xdr.union("StampEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct StampEntry
//   {
//       Hash ledgerHash;
//       Hash licenseHash;
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
xdr.struct("StampEntry", [
  ["ledgerHash", xdr.lookup("Hash")],
  ["licenseHash", xdr.lookup("Hash")],
  ["ext", xdr.lookup("StampEntryExt")],
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
//       case KEY_VALUE:
//   	    KeyValueEntry keyValue;
//   	case ACCOUNT_KYC:
//           AccountKYCEntry accountKYC;
//       case ACCOUNT_ROLE:
//           AccountRoleEntry accountRole;
//       case ACCOUNT_RULE:
//           AccountRuleEntry accountRule;
//       case SIGNER_RULE:
//           SignerRuleEntry signerRule;
//       case SIGNER_ROLE:
//           SignerRoleEntry signerRole;
//       case LICENSE:
//           LicenseEntry license;
//       case STAMP:
//           StampEntry stamp;
//       case DATA:
//           DataEntry data;
//       }
//
// ===========================================================================
xdr.union("LedgerEntryData", {
  switchOn: xdr.lookup("LedgerEntryType"),
  switchName: "type",
  switches: [
    ["account", "account"],
    ["signer", "signer"],
    ["keyValue", "keyValue"],
    ["accountKyc", "accountKyc"],
    ["accountRole", "accountRole"],
    ["accountRule", "accountRule"],
    ["signerRule", "signerRule"],
    ["signerRole", "signerRole"],
    ["license", "license"],
    ["stamp", "stamp"],
    ["datum", "data"],
  ],
  arms: {
    account: xdr.lookup("AccountEntry"),
    signer: xdr.lookup("SignerEntry"),
    keyValue: xdr.lookup("KeyValueEntry"),
    accountKyc: xdr.lookup("AccountKycEntry"),
    accountRole: xdr.lookup("AccountRoleEntry"),
    accountRule: xdr.lookup("AccountRuleEntry"),
    signerRule: xdr.lookup("SignerRuleEntry"),
    signerRole: xdr.lookup("SignerRoleEntry"),
    license: xdr.lookup("LicenseEntry"),
    stamp: xdr.lookup("StampEntry"),
    data: xdr.lookup("DataEntry"),
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
//       case KEY_VALUE:
//   	    KeyValueEntry keyValue;
//   	case ACCOUNT_KYC:
//           AccountKYCEntry accountKYC;
//       case ACCOUNT_ROLE:
//           AccountRoleEntry accountRole;
//       case ACCOUNT_RULE:
//           AccountRuleEntry accountRule;
//       case SIGNER_RULE:
//           SignerRuleEntry signerRule;
//       case SIGNER_ROLE:
//           SignerRoleEntry signerRole;
//       case LICENSE:
//           LicenseEntry license;
//       case STAMP:
//           StampEntry stamp;
//       case DATA:
//           DataEntry data;
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
//   union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//
// ===========================================================================
xdr.union("LedgerKeyStampExt", {
  switchOn: xdr.lookup("LedgerVersion"),
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
//           Hash ledgerHash;
//           Hash licenseHash;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyStamp", [
  ["ledgerHash", xdr.lookup("Hash")],
  ["licenseHash", xdr.lookup("Hash")],
  ["ext", xdr.lookup("LedgerKeyStampExt")],
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
xdr.union("LedgerKeyLicenseExt", {
  switchOn: xdr.lookup("LedgerVersion"),
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
//           Hash licenseHash;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           } ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyLicense", [
  ["licenseHash", xdr.lookup("Hash")],
  ["ext", xdr.lookup("LedgerKeyLicenseExt")],
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
//   case STAMP:
//       struct {
//           Hash ledgerHash;
//           Hash licenseHash;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       } stamp;
//   case LICENSE:
//       struct {
//           Hash licenseHash;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           } ext;
//       } license;
//   case DATA:
//       struct {
//           uint64 id;
//   
//           EmptyExt ext;
//       } data;
//   };
//
// ===========================================================================
xdr.union("LedgerKey", {
  switchOn: xdr.lookup("LedgerEntryType"),
  switchName: "type",
  switches: [
    ["account", "account"],
    ["signer", "signer"],
    ["keyValue", "keyValue"],
    ["accountKyc", "accountKyc"],
    ["accountRole", "accountRole"],
    ["accountRule", "accountRule"],
    ["signerRole", "signerRole"],
    ["signerRule", "signerRule"],
    ["stamp", "stamp"],
    ["license", "license"],
    ["datum", "data"],
  ],
  arms: {
    account: xdr.lookup("LedgerKeyAccount"),
    signer: xdr.lookup("LedgerKeySigner"),
    keyValue: xdr.lookup("LedgerKeyKeyValue"),
    accountKyc: xdr.lookup("LedgerKeyAccountKyc"),
    accountRole: xdr.lookup("LedgerKeyAccountRole"),
    accountRule: xdr.lookup("LedgerKeyAccountRule"),
    signerRole: xdr.lookup("LedgerKeySignerRole"),
    signerRule: xdr.lookup("LedgerKeySignerRule"),
    stamp: xdr.lookup("LedgerKeyStamp"),
    license: xdr.lookup("LedgerKeyLicense"),
    data: xdr.lookup("LedgerKeyData"),
  },
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
//   struct ChangeRoleOp 
//   {
//       AccountID accountID;
//       uint64 roleID;
//   
//       longstring details;
//   
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("ChangeRoleOp", [
  ["accountId", xdr.lookup("AccountId")],
  ["roleId", xdr.lookup("Uint64")],
  ["details", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   enum ChangeRoleResultCode 
//   {
//       SUCCESS = 0,
//   
//       INVALID_DETAILS = -1,
//       ACCOUNT_NOT_FOUND = -2,
//       ROLE_NOT_FOUND = -3
//   };
//
// ===========================================================================
xdr.enum("ChangeRoleResultCode", {
  success: 0,
  invalidDetail: -1,
  accountNotFound: -2,
  roleNotFound: -3,
});

// === xdr source ============================================================
//
//   union ChangeRoleResult switch (ChangeRoleResultCode code)
//   {
//   case SUCCESS:
//       EmptyExt ext;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ChangeRoleResult", {
  switchOn: xdr.lookup("ChangeRoleResultCode"),
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
//       uint64 roleID;
//   
//       //: Array of data about 'destination' account signers to be created
//       UpdateSignerData signersData<>;
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
  ["roleId", xdr.lookup("Uint64")],
  ["signersData", xdr.varArray(xdr.lookup("UpdateSignerData"), 2147483647)],
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
//       NO_SIGNER_DATA = -6 // empty signer data array not allowed
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
//   struct CreateDataOp 
//   {
//       uint64 type;
//       longstring value;
//   
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("CreateDataOp", [
  ["type", xdr.lookup("Uint64")],
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
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("LicenseOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: License operation is used to increase the allowed number of admins and due date
//   struct LicenseOp
//   {
//       //: Allowed number of admins to set in the system
//       uint64 adminCount;
//       //: Expiration date of the license
//       uint64 dueDate;
//       //: Hash of a stamped ledger  
//       Hash ledgerHash;
//       //: Hash of the previous license
//       Hash prevLicenseHash;
//       //: Signatures are used to prove authenticity of license that is being submitted.
//       DecoratedSignature signatures<>;
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
xdr.struct("LicenseOp", [
  ["adminCount", xdr.lookup("Uint64")],
  ["dueDate", xdr.lookup("Uint64")],
  ["ledgerHash", xdr.lookup("Hash")],
  ["prevLicenseHash", xdr.lookup("Hash")],
  ["signatures", xdr.varArray(xdr.lookup("DecoratedSignature"), 2147483647)],
  ["ext", xdr.lookup("LicenseOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result code of the License operation application 
//   enum LicenseResultCode
//   {
//       //: License submit was successful, provided adminCount and dueDate were set in the system
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: Provided ledger hash and license hash were not stamped and are missing in the system.
//       INVALID_STAMP = -1,
//       //: Provided due date is in the past.
//       INVALID_DUE_DATE = -2,
//       //: Not enough valid signatures to submit a license (at least one valid signature is required)
//       INVALID_SIGNATURE = -3
//   };
//
// ===========================================================================
xdr.enum("LicenseResultCode", {
  success: 0,
  invalidStamp: -1,
  invalidDueDate: -2,
  invalidSignature: -3,
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
xdr.union("LicenseSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: LicenseSuccess is a result of successful LicenseOp application
//   struct LicenseSuccess {
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
xdr.struct("LicenseSuccess", [
  ["ext", xdr.lookup("LicenseSuccessExt")],
]);

// === xdr source ============================================================
//
//   //: Result of the License operation application
//   union LicenseResult switch (LicenseResultCode code)
//   {
//   case SUCCESS:
//       LicenseSuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("LicenseResult", {
  switchOn: xdr.lookup("LicenseResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("LicenseSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   //: Actions that can be performed with the account role
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
//   //: CreateAccountRoleData is used to pass necessary params to create a new account role
//   struct CreateAccountRoleData
//   {
//       //: Arbitrary stringified json object that will be attached to the role
//       longstring details;
//       //: Array of ids of existing unique rules
//       uint64 ruleIDs<>;
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
xdr.struct("CreateAccountRoleData", [
  ["details", xdr.lookup("Longstring")],
  ["ruleIDs", xdr.varArray(xdr.lookup("Uint64"), 2147483647)],
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
//   //: UpdateAccountRoleData is used to pass necessary params to update existing account role
//   struct UpdateAccountRoleData
//   {
//       //: Identifier of existing signer role
//       uint64 roleID;
//       //: Arbitrary stringified json object that will be attached to the role
//       longstring details;
//       //: Array of ids of existing unique rules
//       uint64 ruleIDs<>;
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
xdr.struct("UpdateAccountRoleData", [
  ["roleId", xdr.lookup("Uint64")],
  ["details", xdr.lookup("Longstring")],
  ["ruleIDs", xdr.varArray(xdr.lookup("Uint64"), 2147483647)],
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
//   //: RemoveAccountRoleData is used to pass necessary params to remove an existing account role
//   struct RemoveAccountRoleData
//   {
//       //: Identifier of an existing account role
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
xdr.struct("RemoveAccountRoleData", [
  ["roleId", xdr.lookup("Uint64")],
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
//   //: ManageAccountRoleOp is used to create, update or remove account role
//   struct ManageAccountRoleOp
//   {
//       //: data is used to pass one of `ManageAccountRoleAction` with required params
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
xdr.struct("ManageAccountRoleOp", [
  ["data", xdr.lookup("ManageAccountRoleOpData")],
  ["ext", xdr.lookup("ManageAccountRoleOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of ManageAccountRoleResultCode
//   enum ManageAccountRoleResultCode
//   {
//       //: This means that the specified action in `data` of ManageAccountRoleOp was successfully performed
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: There is no account role with such id
//       NOT_FOUND = -1,
//       //: THe role cannot be removed if it is attached to at least one account
//       ROLE_IS_USED = -2,
//       //: Passed details has an invalid json structure
//       INVALID_DETAILS = -3,
//       //: There is no rule with id passed through `ruleIDs`
//       NO_SUCH_RULE = -4,
//       //: It is not allowed to duplicate ids in `ruleIDs` array
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
//               //: id of the role that was managed
//               uint64 roleID;
//   
//               //: reserved for future use
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
//   //: Result of the operation performed 
//   union ManageAccountRoleResult switch (ManageAccountRoleResultCode code)
//   {
//       case SUCCESS:
//           //: Is used to pass useful params if the operation is successful
//           struct {
//               //: id of the role that was managed
//               uint64 roleID;
//   
//               //: reserved for future use
//               union switch (LedgerVersion v)
//               {
//               case EMPTY_VERSION:
//                   void;
//               }
//               ext;
//           } success;
//       case RULE_ID_DUPLICATION:
//       case NO_SUCH_RULE:
//           //: ID of a rule that was either duplicated or does not exist
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
//   //: Actions that can be performed with account rule
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
//   //: CreateAccountRuleData is used to pass necessary params to create a new account rule
//   struct CreateAccountRuleData
//   {
//       //: Resource is used to specify an entity (for some - with properties) that can be managed through operations
//       AccountRuleResource resource;
//       //: Value from enum that can be applied to `resource`
//       AccountRuleAction action;
//       //: True if such `action` on such `resource` is prohibited, otherwise allows
//       bool forbids;
//       //: Arbitrary stringified json object that will be attached to rule
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
xdr.struct("CreateAccountRuleData", [
  ["resource", xdr.lookup("AccountRuleResource")],
  ["action", xdr.lookup("AccountRuleAction")],
  ["forbids", xdr.bool()],
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
//   //: UpdateAccountRuleData is used to pass necessary params to update existing account rule
//   struct UpdateAccountRuleData
//   {
//       //: Identifier of existing signer rule
//       uint64 ruleID;
//       //: Resource is used to specify entity (for some - with properties) that can be managed through operations
//       AccountRuleResource resource;
//       //: Value from enum that can be applied to `resource`
//       AccountRuleAction action;
//       //: True if such `action` on such `resource` is prohibited, otherwise allows
//       bool forbids;
//       //: Arbitrary stringified json object that will be attached to rule
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
xdr.struct("UpdateAccountRuleData", [
  ["ruleId", xdr.lookup("Uint64")],
  ["resource", xdr.lookup("AccountRuleResource")],
  ["action", xdr.lookup("AccountRuleAction")],
  ["forbids", xdr.bool()],
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
//   //: RemoveAccountRuleData is used to pass necessary params to remove existing account rule
//   struct RemoveAccountRuleData
//   {
//       //: Identifier of existing account rule
//       uint64 ruleID;
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
xdr.struct("RemoveAccountRuleData", [
  ["ruleId", xdr.lookup("Uint64")],
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
//   //: ManageAccountRuleOp is used to create, update or remove account rule
//   struct ManageAccountRuleOp
//   {
//       //: data is used to pass one of `ManageAccountRuleAction` with required params
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
xdr.struct("ManageAccountRuleOp", [
  ["data", xdr.lookup("ManageAccountRuleOpData")],
  ["ext", xdr.lookup("ManageAccountRuleOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of ManageAccountRuleResultCode
//   enum ManageAccountRuleResultCode
//   {
//       //: Means that specified action in `data` of ManageAccountRuleOp was successfully performed
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: There is no account rule with such id
//       NOT_FOUND = -1,
//       //: It is not allowed to remove the rule if it is used at least in one role
//       RULE_IS_USED = -2,
//       //: Passed details has invalid json structure
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
//               //: id of the rule that was managed
//               uint64 ruleID;
//   
//               //: reserved for future use
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
//   //: Result of operation applying
//   union ManageAccountRuleResult switch (ManageAccountRuleResultCode code)
//   {
//       case SUCCESS:
//           //: Is used to pass useful params if operation is success
//           struct {
//               //: id of the rule that was managed
//               uint64 ruleID;
//   
//               //: reserved for future use
//               union switch (LedgerVersion v)
//               {
//               case EMPTY_VERSION:
//                   void;
//               }
//               ext;
//           } success;
//       case RULE_IS_USED:
//           //: ids of roles that use the rule that cannot be removed
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
//   //: Actions that can be performed on `KeyValueEntry`
//       enum ManageKVAction
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
//   //: `ManageKeyValueOp` is used to create the manage key-value operation which, if applied successfully, will update the key-value entry present in the system
//       struct ManageKeyValueOp
//       {
//           //: `key` is the key for KeyValueEntry
//           longstring key;
//           //: `action` defines an action applied to the KeyValue based on given ManageKVAction
//           //: * Action `PUT` stores new value for a particular key
//           //: * Action `REMOVE` removes the value by a particular key
//           union switch(ManageKVAction action)
//           {
//               case PUT:
//                    KeyValueEntryValue value;
//               case REMOVE:
//                   void;
//           }
//           action;
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
//   //: `ManageKeyValueSuccess` represents details returned after the successful application of `ManageKeyValueOp`
//       struct ManageKeyValueSuccess
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
xdr.struct("ManageKeyValueSuccess", [
  ["ext", xdr.lookup("ManageKeyValueSuccessExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes for `ManageKeyValueOp`
//       enum ManageKeyValueResultCode
//       {
//           //: `ManageKeyValueOp` is applied successfully
//           SUCCESS = 0,
//           //: There is no key value with such key
//           NOT_FOUND = -1,
//           //: Value type of the key-value entry is forbidden for the provided key
//           INVALID_TYPE = -2,
//           //: zero value is forbidden for the provided key
//           ZERO_VALUE_NOT_ALLOWED = -3
//       };
//
// ===========================================================================
xdr.enum("ManageKeyValueResultCode", {
  success: 0,
  notFound: -1,
  invalidType: -2,
  zeroValueNotAllowed: -3,
});

// === xdr source ============================================================
//
//   //: `ManageKeyValueResult` represents the result of ManageKeyValueOp
//       union ManageKeyValueResult switch (ManageKeyValueResultCode code)
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
//   //: Actions that can be performed on a signer role
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
//   //: CreateSignerRoleData is used to pass necessary params to create a new signer role
//   struct CreateSignerRoleData
//   {
//       //: Array of ids of existing, unique and not default rules
//       uint64 ruleIDs<>;
//       //: Indicates whether or not a rule can be modified in the future
//       bool isReadOnly;
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
//   //: UpdateSignerRoleData is used to pass necessary params to update an existing signer role
//   struct UpdateSignerRoleData
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
//   //: RemoveSignerRoleData is used to pass necessary params to remove existing signer role
//   struct RemoveSignerRoleData
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
//   //: ManageSignerRoleOp is used to create, update or remove a signer role
//   struct ManageSignerRoleOp
//   {
//       //: data is used to pass one of `ManageSignerRoleAction` with required params
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
xdr.struct("ManageSignerRoleOp", [
  ["data", xdr.lookup("ManageSignerRoleOpData")],
  ["ext", xdr.lookup("ManageSignerRoleOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of ManageSignerRoleResultCode
//   enum ManageSignerRoleResultCode
//   {
//       //: Means that the specified action in `data` of ManageSignerRoleOp was successfully executed
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: There is no signer role with such id or the source cannot manage a role
//       NOT_FOUND = -1, // does not exist or owner mismatched
//       //: It is not allowed to remove role if it is attached to at least one singer
//       ROLE_IS_USED = -2,
//       //: Passed details have invalid json structure
//       INVALID_DETAILS = -3,
//       //: There is no rule with id passed through `ruleIDs`
//       NO_SUCH_RULE = -4,
//       //: It is not allowed to duplicate ids in `ruleIDs` array
//       RULE_ID_DUPLICATION = -5,
//       //: It is not allowed to pass ids of default rules on `ruleIDs` array
//       DEFAULT_RULE_ID_DUPLICATION = -6,
//       //: It is not allowed to pass ruleIDs that are more than maxSignerRuleCount (by default, 128)
//       TOO_MANY_RULE_IDS = -7
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
  tooManyRuleId: -7,
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
//   struct
//           {
//               //: id of a role that was managed
//               uint64 roleID;
//   
//               //: reserved for future use
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
//   //: Result of operation application
//   union ManageSignerRoleResult switch (ManageSignerRoleResultCode code)
//   {
//       case SUCCESS:
//           struct
//           {
//               //: id of a role that was managed
//               uint64 roleID;
//   
//               //: reserved for future use
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
//           //: ID of a rule that was either duplicated or is default or does not exist
//           uint64 ruleID;
//       case TOO_MANY_RULE_IDS:
//           //: max count of rule ids that can be passed in `ruleIDs` array
//           uint64 maxRuleIDsCount;
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
    ["tooManyRuleId", "maxRuleIDsCount"],
  ],
  arms: {
    success: xdr.lookup("ManageSignerRoleResultSuccess"),
    ruleId: xdr.lookup("Uint64"),
    maxRuleIDsCount: xdr.lookup("Uint64"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   //: Actions that can be performed with a signer rule
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
//   //: CreateSignerRuleData is used to pass necessary params to create a new signer rule
//   struct CreateSignerRuleData
//   {
//       //: Resource is used to specify an entity (for some, with properties) that can be managed through operations
//       SignerRuleResource resource;
//       //: Value from enum that can be applied to `resource`
//       SignerRuleAction action;
//       //: Indicate whether or not an `action` on the provided `resource` is prohibited
//       bool forbids;
//       //: True means that such rule will be automatically added to each new or updated signer role
//       bool isDefault;
//       //: Indicates whether or not a rule can be modified in the future
//       bool isReadOnly;
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
xdr.struct("CreateSignerRuleData", [
  ["resource", xdr.lookup("SignerRuleResource")],
  ["action", xdr.lookup("SignerRuleAction")],
  ["forbids", xdr.bool()],
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
//   //: UpdateSignerRuleData is used to pass necessary params to update an existing signer rule
//   struct UpdateSignerRuleData
//   {
//       //: Identifier of an existing signer rule
//       uint64 ruleID;
//       //: Resource is used to specify entity (for some, with properties) that can be managed through operations
//       SignerRuleResource resource;
//       //: Value from enum that can be applied to `resource`
//       SignerRuleAction action;
//       //: True means that such rule will be automatically added to each new or updated signer role
//       bool forbids;
//       //: True means that no one can manage such rule after creating
//       bool isDefault;
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
xdr.struct("UpdateSignerRuleData", [
  ["ruleId", xdr.lookup("Uint64")],
  ["resource", xdr.lookup("SignerRuleResource")],
  ["action", xdr.lookup("SignerRuleAction")],
  ["forbids", xdr.bool()],
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
//   //: RemoveSignerRuleData is used to pass necessary params to remove existing signer rule
//   struct RemoveSignerRuleData
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
//   //: ManageSignerRuleOp is used to create, update or remove signer rule
//   struct ManageSignerRuleOp
//   {
//       //: data is used to pass one of `ManageSignerRuleAction` with required params
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
xdr.struct("ManageSignerRuleOp", [
  ["data", xdr.lookup("ManageSignerRuleOpData")],
  ["ext", xdr.lookup("ManageSignerRuleOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of ManageSignerRuleOp
//   enum ManageSignerRuleResultCode
//   {
//       //: Specified action in `data` of ManageSignerRuleOp was successfully executed
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: There is no signer rule with such id or source cannot manage the rule
//       NOT_FOUND = -1, // does not exists or owner mismatched
//       //: It is not allowed to remove the rule if it is attached to at least one role
//       RULE_IS_USED = -2,
//       //: Passed details have invalid json structure
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
//               //: id of the rule that was managed
//               uint64 ruleID;
//   
//               //: reserved for future use
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
//   //: Result of operation application
//   union ManageSignerRuleResult switch (ManageSignerRuleResultCode code)
//   {
//       case SUCCESS:
//           struct {
//               //: id of the rule that was managed
//               uint64 ruleID;
//   
//               //: reserved for future use
//               union switch (LedgerVersion v)
//               {
//               case EMPTY_VERSION:
//                   void;
//               }
//               ext;
//           } success;
//       case RULE_IS_USED:
//           //: ids of roles which use a rule that cannot be removed
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
//   //: Actions that can be applied to a signer
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
//   //: UpdateSignerData is used to pass necessary data to create or update the signer
//   struct UpdateSignerData
//   {
//       //: Public key of a signer
//       PublicKey publicKey;
//       //: id of the role that will be attached to a signer
//       uint64 roleID;
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
//   //: RemoveSignerData is used to pass necessary data to remove a signer
//   struct RemoveSignerData
//   {
//       //: Public key of an existing signer
//       PublicKey publicKey;
//   
//       //: reserved for future extension
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
//   //: ManageSignerOp is used to create, update or remove a signer
//   struct ManageSignerOp
//   {
//       //: data is used to pass one of `ManageSignerAction` with required params
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
//       //: reserved for future extension
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
//   //: Result codes of ManageSignerOp
//   enum ManageSignerResultCode
//   {
//       //: Specified action in `data` of ManageSignerOp was successfully executed
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: Passed details have invalid json structure
//       INVALID_DETAILS = -1, // invalid json details
//       //: Signer with such public key is already attached to the source account
//       ALREADY_EXISTS = -2, // signer already exist
//       //: There is no role with such id
//       NO_SUCH_ROLE = -3,
//       //: It is not allowed to set weight more than 1000
//       INVALID_WEIGHT = -4, // more than 1000
//       //: Source account does not have a signer with the provided public key
//       NOT_FOUND = -5, // there is no signer with such public key
//       //: only occurs during the creation of signers for admins if the number of signers exceeds the number specified in a license
//   	NUMBER_OF_ADMINS_EXCEEDS_LICENSE = -6
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
  numberOfAdminsExceedsLicense: -6,
});

// === xdr source ============================================================
//
//   //: Result of operation application
//   union ManageSignerResult switch (ManageSignerResultCode code)
//   {
//   case SUCCESS:
//       //: reserved for future extension
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
//       NOT_FOUND = -1
//   };
//
// ===========================================================================
xdr.enum("RemoveDataResultCode", {
  success: 0,
  notFound: -1,
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
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("StampOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: StampOp is used to save current ledger hash and current license hash
//   struct StampOp
//   {
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
xdr.struct("StampOp", [
  ["ext", xdr.lookup("StampOpExt")],
]);

// === xdr source ============================================================
//
//   enum StampResultCode
//   {
//       //: Stamp was successful 
//       SUCCESS = 0
//   
//   };
//
// ===========================================================================
xdr.enum("StampResultCode", {
  success: 0,
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
xdr.union("StampSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: StampSuccess is used to pass saved ledger hash and license hash
//   struct StampSuccess {
//       //: ledger hash saved into a database
//       Hash ledgerHash;
//   
//       //: current license hash
//       Hash licenseHash;
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
xdr.struct("StampSuccess", [
  ["ledgerHash", xdr.lookup("Hash")],
  ["licenseHash", xdr.lookup("Hash")],
  ["ext", xdr.lookup("StampSuccessExt")],
]);

// === xdr source ============================================================
//
//   //: StampResult is a result of Stamp operation application
//   union StampResult switch (StampResultCode code)
//   {
//   case SUCCESS:
//       StampSuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("StampResult", {
  switchOn: xdr.lookup("StampResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("StampSuccess"),
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
//       NOT_FOUND = -2
//   };
//
// ===========================================================================
xdr.enum("UpdateDataResultCode", {
  success: 0,
  invalidDatum: -1,
  notFound: -2,
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
xdr.struct("AccountRuleResourceKeyValue", [
  ["keyPrefix", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct 
//       {
//           uint64 type;
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("AccountRuleResourceData", [
  ["type", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   //: Describes properties of some entries that can be used to restrict the usage of entries
//   union AccountRuleResource switch (LedgerEntryType type)
//   {
//   case ANY:
//       void;
//   case KEY_VALUE:
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
//           uint64 type;
//           EmptyExt ext;
//       } data;
//   default:
//       //: reserved for future extension
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.union("AccountRuleResource", {
  switchOn: xdr.lookup("LedgerEntryType"),
  switchName: "type",
  switches: [
    ["any", xdr.void()],
    ["keyValue", "keyValue"],
    ["datum", "data"],
  ],
  arms: {
    keyValue: xdr.lookup("AccountRuleResourceKeyValue"),
    data: xdr.lookup("AccountRuleResourceData"),
    ext: xdr.lookup("EmptyExt"),
  },
  defaultArm: xdr.lookup("EmptyExt"),
});

// === xdr source ============================================================
//
//   //: Actions that can be applied to account rule resource
//   enum AccountRuleAction
//   {
//       ANY = 1,
//       CREATE = 2,
//       CREATE_FOR_OTHER = 3,
//       CREATE_WITH_TASKS = 4,
//       MANAGE = 5,
//       SEND = 6,
//       WITHDRAW = 7,
//       RECEIVE_ISSUANCE = 8,
//       RECEIVE_PAYMENT = 9,
//       RECEIVE_ATOMIC_SWAP = 10,
//       PARTICIPATE = 11,
//       BIND = 12,
//       UPDATE_MAX_ISSUANCE = 13,
//       CHECK = 14,
//       CANCEL = 15,
//       CLOSE = 16,
//       REMOVE = 17,
//       UPDATE_END_TIME = 18,
//       CREATE_FOR_OTHER_WITH_TASKS = 19,
//       UPDATE = 20,
//       CHANGE_ROLE = 21,
//       CHANGE_ROLE_FOR_OTHER = 22
//   };
//
// ===========================================================================
xdr.enum("AccountRuleAction", {
  any: 1,
  create: 2,
  createForOther: 3,
  createWithTask: 4,
  manage: 5,
  send: 6,
  withdraw: 7,
  receiveIssuance: 8,
  receivePayment: 9,
  receiveAtomicSwap: 10,
  participate: 11,
  bind: 12,
  updateMaxIssuance: 13,
  check: 14,
  cancel: 15,
  close: 16,
  remove: 17,
  updateEndTime: 18,
  createForOtherWithTask: 19,
  update: 20,
  changeRole: 21,
  changeRoleForOther: 22,
});

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
//           //: For signer role creating resource will be triggered if `roleID` equals `0`
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
xdr.struct("SignerRuleResourceKeyValue", [
  ["keyPrefix", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct 
//       {
//           uint64 type;
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("SignerRuleResourceData", [
  ["type", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   //: Describes properties of some entries that can be used to restrict the usage of entries
//   union SignerRuleResource switch (LedgerEntryType type)
//   {
//   case ANY:
//       void;
//   case SIGNER_RULE:
//       //: Describes properties that are equal to managed signer rule entry fields
//       struct
//       {
//           bool isDefault;
//   
//           EmptyExt ext;
//       } signerRule;
//   case SIGNER_ROLE:
//       //: Describes properties that are equal to managed signer role entry fields
//       struct
//       {
//           //: For signer role creating resource will be triggered if `roleID` equals `0`
//           uint64 roleID;
//   
//           EmptyExt ext;
//       } signerRole;
//   case SIGNER:
//       //: Describes properties that are equal to managed signer entry fields
//       struct
//       {
//           uint64 roleID;
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
//           uint64 type;
//           EmptyExt ext;
//       } data;
//   default:
//       //: reserved for future extension
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.union("SignerRuleResource", {
  switchOn: xdr.lookup("LedgerEntryType"),
  switchName: "type",
  switches: [
    ["any", xdr.void()],
    ["signerRule", "signerRule"],
    ["signerRole", "signerRole"],
    ["signer", "signer"],
    ["keyValue", "keyValue"],
    ["datum", "data"],
  ],
  arms: {
    signerRule: xdr.lookup("SignerRuleResourceSignerRule"),
    signerRole: xdr.lookup("SignerRuleResourceSignerRole"),
    signer: xdr.lookup("SignerRuleResourceSigner"),
    keyValue: xdr.lookup("SignerRuleResourceKeyValue"),
    data: xdr.lookup("SignerRuleResourceData"),
    ext: xdr.lookup("EmptyExt"),
  },
  defaultArm: xdr.lookup("EmptyExt"),
});

// === xdr source ============================================================
//
//   //: Actions that can be applied to a signer rule resource
//   enum SignerRuleAction
//   {
//       ANY = 1,
//       CREATE = 2,
//       CREATE_FOR_OTHER = 3,
//       UPDATE = 4,
//       MANAGE = 5,
//       SEND = 6,
//       REMOVE = 7,
//       CANCEL = 8,
//       REVIEW = 9,
//       RECEIVE_ATOMIC_SWAP = 10,
//       PARTICIPATE = 11,
//       BIND = 12,
//       UPDATE_MAX_ISSUANCE = 13,
//       CHECK = 14,
//       CLOSE = 15,
//       UPDATE_END_TIME = 16,
//       CREATE_WITH_TASKS = 17,
//       CREATE_FOR_OTHER_WITH_TASKS = 18,
//       CHANGE_ROLE = 19, 
//       CHANGE_ROLE_FOR_OTHER = 20
//   };
//
// ===========================================================================
xdr.enum("SignerRuleAction", {
  any: 1,
  create: 2,
  createForOther: 3,
  update: 4,
  manage: 5,
  send: 6,
  remove: 7,
  cancel: 8,
  review: 9,
  receiveAtomicSwap: 10,
  participate: 11,
  bind: 12,
  updateMaxIssuance: 13,
  check: 14,
  close: 15,
  updateEndTime: 16,
  createWithTask: 17,
  createForOtherWithTask: 18,
  changeRole: 19,
  changeRoleForOther: 20,
});

// === xdr source ============================================================
//
//   union switch (OperationType type)
//       {
//       case CREATE_ACCOUNT:
//           CreateAccountOp createAccountOp;
//   	case MANAGE_KEY_VALUE:
//   	    ManageKeyValueOp manageKeyValueOp;
//   	case MANAGE_ACCOUNT_ROLE:
//           ManageAccountRoleOp manageAccountRoleOp;
//       case MANAGE_ACCOUNT_RULE:
//           ManageAccountRuleOp manageAccountRuleOp;
//       case MANAGE_SIGNER:
//           ManageSignerOp manageSignerOp;
//       case MANAGE_SIGNER_ROLE:
//           ManageSignerRoleOp manageSignerRoleOp;
//       case MANAGE_SIGNER_RULE:
//           ManageSignerRuleOp manageSignerRuleOp;
//       case STAMP:
//           StampOp stampOp;
//       case LICENSE:
//           LicenseOp licenseOp;
//       case CREATE_DATA:
//           CreateDataOp createDataOp;
//       case UPDATE_DATA:
//           UpdateDataOp updateDataOp;
//       case REMOVE_DATA:
//           RemoveDataOp removeDataOp;
//       case CHANGE_ROLE:
//           ChangeRoleOp changeRoleOp;
//       }
//
// ===========================================================================
xdr.union("OperationBody", {
  switchOn: xdr.lookup("OperationType"),
  switchName: "type",
  switches: [
    ["createAccount", "createAccountOp"],
    ["manageKeyValue", "manageKeyValueOp"],
    ["manageAccountRole", "manageAccountRoleOp"],
    ["manageAccountRule", "manageAccountRuleOp"],
    ["manageSigner", "manageSignerOp"],
    ["manageSignerRole", "manageSignerRoleOp"],
    ["manageSignerRule", "manageSignerRuleOp"],
    ["stamp", "stampOp"],
    ["license", "licenseOp"],
    ["createDatum", "createDataOp"],
    ["updateDatum", "updateDataOp"],
    ["removeDatum", "removeDataOp"],
    ["changeRole", "changeRoleOp"],
  ],
  arms: {
    createAccountOp: xdr.lookup("CreateAccountOp"),
    manageKeyValueOp: xdr.lookup("ManageKeyValueOp"),
    manageAccountRoleOp: xdr.lookup("ManageAccountRoleOp"),
    manageAccountRuleOp: xdr.lookup("ManageAccountRuleOp"),
    manageSignerOp: xdr.lookup("ManageSignerOp"),
    manageSignerRoleOp: xdr.lookup("ManageSignerRoleOp"),
    manageSignerRuleOp: xdr.lookup("ManageSignerRuleOp"),
    stampOp: xdr.lookup("StampOp"),
    licenseOp: xdr.lookup("LicenseOp"),
    createDataOp: xdr.lookup("CreateDataOp"),
    updateDataOp: xdr.lookup("UpdateDataOp"),
    removeDataOp: xdr.lookup("RemoveDataOp"),
    changeRoleOp: xdr.lookup("ChangeRoleOp"),
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
//   	case MANAGE_KEY_VALUE:
//   	    ManageKeyValueOp manageKeyValueOp;
//   	case MANAGE_ACCOUNT_ROLE:
//           ManageAccountRoleOp manageAccountRoleOp;
//       case MANAGE_ACCOUNT_RULE:
//           ManageAccountRuleOp manageAccountRuleOp;
//       case MANAGE_SIGNER:
//           ManageSignerOp manageSignerOp;
//       case MANAGE_SIGNER_ROLE:
//           ManageSignerRoleOp manageSignerRoleOp;
//       case MANAGE_SIGNER_RULE:
//           ManageSignerRuleOp manageSignerRuleOp;
//       case STAMP:
//           StampOp stampOp;
//       case LICENSE:
//           LicenseOp licenseOp;
//       case CREATE_DATA:
//           CreateDataOp createDataOp;
//       case UPDATE_DATA:
//           UpdateDataOp updateDataOp;
//       case REMOVE_DATA:
//           RemoveDataOp removeDataOp;
//       case CHANGE_ROLE:
//           ChangeRoleOp changeRoleOp;
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
//       opNO_COUNTERPARTY = -5,
//       opCOUNTERPARTY_BLOCKED = -6,
//       opCOUNTERPARTY_WRONG_TYPE = -7,
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
  opNoCounterparty: -5,
  opCounterpartyBlocked: -6,
  opCounterpartyWrongType: -7,
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
//   struct AccountRuleRequirement
//   {
//   	//: defines resources to which access was denied
//       AccountRuleResource resource;
//   	//: defines action which was denied
//       AccountRuleAction action;
//   	//: defines account for which requirements were not met
//   	AccountID account;
//   
//   	//: reserved for future extension
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("AccountRuleRequirement", [
  ["resource", xdr.lookup("AccountRuleResource")],
  ["action", xdr.lookup("AccountRuleAction")],
  ["account", xdr.lookup("AccountId")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   union switch (OperationType type)
//       {
//       case CREATE_ACCOUNT:
//           CreateAccountResult createAccountResult;
//   	case MANAGE_KEY_VALUE:
//   	    ManageKeyValueResult manageKeyValueResult;
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
//       case STAMP:
//           StampResult stampResult;
//       case LICENSE:
//           LicenseResult licenseResult;
//       case CREATE_DATA:
//           CreateDataResult createDataResult;
//       case UPDATE_DATA:
//           UpdateDataResult updateDataResult;
//       case REMOVE_DATA:
//           RemoveDataResult removeDataResult;
//       case CHANGE_ROLE:
//           ChangeRoleResult changeRoleResult;
//       }
//
// ===========================================================================
xdr.union("OperationResultTr", {
  switchOn: xdr.lookup("OperationType"),
  switchName: "type",
  switches: [
    ["createAccount", "createAccountResult"],
    ["manageKeyValue", "manageKeyValueResult"],
    ["manageAccountRole", "manageAccountRoleResult"],
    ["manageAccountRule", "manageAccountRuleResult"],
    ["manageSigner", "manageSignerResult"],
    ["manageSignerRole", "manageSignerRoleResult"],
    ["manageSignerRule", "manageSignerRuleResult"],
    ["stamp", "stampResult"],
    ["license", "licenseResult"],
    ["createDatum", "createDataResult"],
    ["updateDatum", "updateDataResult"],
    ["removeDatum", "removeDataResult"],
    ["changeRole", "changeRoleResult"],
  ],
  arms: {
    createAccountResult: xdr.lookup("CreateAccountResult"),
    manageKeyValueResult: xdr.lookup("ManageKeyValueResult"),
    manageAccountRoleResult: xdr.lookup("ManageAccountRoleResult"),
    manageAccountRuleResult: xdr.lookup("ManageAccountRuleResult"),
    manageSignerResult: xdr.lookup("ManageSignerResult"),
    manageSignerRoleResult: xdr.lookup("ManageSignerRoleResult"),
    manageSignerRuleResult: xdr.lookup("ManageSignerRuleResult"),
    stampResult: xdr.lookup("StampResult"),
    licenseResult: xdr.lookup("LicenseResult"),
    createDataResult: xdr.lookup("CreateDataResult"),
    updateDataResult: xdr.lookup("UpdateDataResult"),
    removeDataResult: xdr.lookup("RemoveDataResult"),
    changeRoleResult: xdr.lookup("ChangeRoleResult"),
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
//   	case MANAGE_KEY_VALUE:
//   	    ManageKeyValueResult manageKeyValueResult;
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
//       case STAMP:
//           StampResult stampResult;
//       case LICENSE:
//           LicenseResult licenseResult;
//       case CREATE_DATA:
//           CreateDataResult createDataResult;
//       case UPDATE_DATA:
//           UpdateDataResult updateDataResult;
//       case REMOVE_DATA:
//           RemoveDataResult removeDataResult;
//       case CHANGE_ROLE:
//           ChangeRoleResult changeRoleResult;
//       }
//       tr;
//   case opNO_ENTRY:
//       LedgerEntryType entryType;
//   case opNO_ROLE_PERMISSION:
//       AccountRuleRequirement requirement;
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
    ["opNoRolePermission", "requirement"],
  ],
  arms: {
    tr: xdr.lookup("OperationResultTr"),
    entryType: xdr.lookup("LedgerEntryType"),
    requirement: xdr.lookup("AccountRuleRequirement"),
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
//           AccountRuleRequirement requirement;
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
    requirement: xdr.lookup("AccountRuleRequirement"),
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
//           AccountRuleRequirement requirement;
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
//       EMPTY_VERSION = 0,
//       CHECK_SET_FEE_ACCOUNT_EXISTING = 1,
//       FIX_PAYMENT_STATS = 2,
//       ADD_INVEST_FEE = 3,
//       ADD_SALE_WHITELISTS = 4,
//       ASSET_PAIR_RESTRICTIONS = 5,
//       FIX_CHANGE_TO_NON_EXISTING_ROLE = 6,
//       FIX_REVERSE_SALE_PAIR = 7,
//       FIX_NOT_CHECKING_SET_TASKS_PERMISSIONS = 8,
//       UNLIMITED_ADMIN_COUNT = 9,
//       FIX_AML_ALERT_ERROR_CODES = 10,
//       FIX_EXT_SYS_ACC_EXPIRATION_TIME = 11,
//       FIX_CHANGE_ROLE_REJECT_TASKS = 12,
//       FIX_SAME_ASSET_PAIR = 13,
//       ATOMIC_SWAP_RETURNING = 14,
//       FIX_INVEST_FEE = 15,
//       ADD_ACC_SPECIFIC_RULE_RESOURCE = 16,
//       FIX_SIGNER_CHANGES_REMOVE = 17,
//       FIX_DEPOSIT_STATS = 18,
//       FIX_CREATE_KYC_RECOVERY_PERMISSIONS = 19,
//       CLEAR_DATABASE_CACHE = 20
//   };
//
// ===========================================================================
xdr.enum("LedgerVersion", {
  emptyVersion: 0,
  checkSetFeeAccountExisting: 1,
  fixPaymentStat: 2,
  addInvestFee: 3,
  addSaleWhitelist: 4,
  assetPairRestriction: 5,
  fixChangeToNonExistingRole: 6,
  fixReverseSalePair: 7,
  fixNotCheckingSetTasksPermission: 8,
  unlimitedAdminCount: 9,
  fixAmlAlertErrorCode: 10,
  fixExtSysAccExpirationTime: 11,
  fixChangeRoleRejectTask: 12,
  fixSameAssetPair: 13,
  atomicSwapReturning: 14,
  fixInvestFee: 15,
  addAccSpecificRuleResource: 16,
  fixSignerChangesRemove: 17,
  fixDepositStat: 18,
  fixCreateKycRecoveryPermission: 19,
  clearDatabaseCache: 20,
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
//   	ACCOUNT_KYC = 18,
//       KEY_VALUE = 20,
//       DATA = 21,
//       ACCOUNT_ROLE = 26,
//       ACCOUNT_RULE = 27,
//       TRANSACTION = 29, // is used for account rule resource
//       SIGNER_RULE = 30,
//       SIGNER_ROLE = 31,
//       STAMP = 32,
//       LICENSE = 33
//   };
//
// ===========================================================================
xdr.enum("LedgerEntryType", {
  any: 1,
  account: 2,
  signer: 3,
  accountKyc: 18,
  keyValue: 20,
  datum: 21,
  accountRole: 26,
  accountRule: 27,
  transaction: 29,
  signerRule: 30,
  signerRole: 31,
  stamp: 32,
  license: 33,
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
//       CHANGE_ROLE = 2,
//       UPDATE_DATA = 8,
//       REMOVE_DATA = 10,
//       CREATE_DATA = 14,
//       MANAGE_KEY_VALUE = 27,
//       MANAGE_ACCOUNT_ROLE = 33,
//       MANAGE_ACCOUNT_RULE = 34,
//       MANAGE_SIGNER = 38,
//       MANAGE_SIGNER_ROLE = 39,
//       MANAGE_SIGNER_RULE = 40,
//       STAMP = 41,
//       LICENSE = 42
//   };
//
// ===========================================================================
xdr.enum("OperationType", {
  createAccount: 1,
  changeRole: 2,
  updateDatum: 8,
  removeDatum: 10,
  createDatum: 14,
  manageKeyValue: 27,
  manageAccountRole: 33,
  manageAccountRule: 34,
  manageSigner: 38,
  manageSignerRole: 39,
  manageSignerRule: 40,
  stamp: 41,
  license: 42,
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

});
export default types;
