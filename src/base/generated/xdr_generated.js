// revision: be194d6153bc1e7fe66b4bb6a6bb0f0bc7265389
// branch:   feature/remove-asset
// Automatically generated on 2019-08-23T16:27:25+00:00
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
xdr.union("AccountSpecificRuleEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct AccountSpecificRuleEntry
//   {
//       uint64 id;
//   
//       LedgerKey ledgerKey;
//       AccountID* accountID;
//       bool forbids;
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
xdr.struct("AccountSpecificRuleEntry", [
  ["id", xdr.lookup("Uint64")],
  ["ledgerKey", xdr.lookup("LedgerKey")],
  ["accountId", xdr.option(xdr.lookup("AccountId"))],
  ["forbids", xdr.bool()],
  ["ext", xdr.lookup("AccountSpecificRuleEntryExt")],
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
//   //: Policies that could be applied to AssetPair entry and define applicable operations for AssetPair
//   enum AssetPairPolicy
//   {
//       //: If not set pair can not be traded on secondary market
//   	TRADEABLE_SECONDARY_MARKET = 1,
//   	//: If set, then prices for new offers must be greater then physical price with correction
//   	PHYSICAL_PRICE_RESTRICTION = 2,
//   	//: if set, then price for new offers must be in interval of (1 ± maxPriceStep)*currentPrice
//   	CURRENT_PRICE_RESTRICTION = 4
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
//   //: `AssetPairEntry` is used in system to group different assets into pairs and set particular policies and properties for them
//   struct AssetPairEntry
//   {
//       //: Code of base asset of the asset pair
//       AssetCode base;
//       //: Code of quote asset of the asset pair
//       AssetCode quote;
//   
//       //: defines an asset pair price as quote asset divided by base asset (i.e., amount of quote asset per 1 base asset)
//       int64 currentPrice;
//       //: Price of the asset pair assigned on creation. Can only be updated by application
//       //: the `ManageAssetPair` operation with action `UPDATE_PRICE`
//       int64 physicalPrice;
//   
//       //: Price of the asset pair assigned on creation. Can only be updated by application
//       //: the `ManageAssetPair` operation with action `UPDATE_PRICE`
//       int64 physicalPriceCorrection;
//   
//       //: Max price step in percent. User is allowed to set offer only if both of
//       //: `price < (1 - maxPriceStep) * currentPrice` and `price > (1 + maxPriceStep) * currentPrice` are `true`
//       int64 maxPriceStep;
//   
//       //: Bitmask of asset policies set by creator or corrected by `ManageAssetPair` operations
//       int32 policies;
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
xdr.union("AtomicSwapAskQuoteAssetExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: AtomicSwapAskQuoteAsset represents asset with price which can be used to buy base asset
//   struct AtomicSwapAskQuoteAsset
//   {
//       //: Code of quote asset
//       AssetCode quoteAsset;
//       //: amount of quote asset which is needed to buy one base asset
//       uint64 price;
//       //: reserved for the future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("AtomicSwapAskQuoteAsset", [
  ["quoteAsset", xdr.lookup("AssetCode")],
  ["price", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("AtomicSwapAskQuoteAssetExt")],
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
xdr.union("AtomicSwapAskEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct AtomicSwapAskEntry
//   {
//       uint64 id;
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
//       AtomicSwapAskQuoteAsset quoteAssets<>;
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
xdr.struct("AtomicSwapAskEntry", [
  ["id", xdr.lookup("Uint64")],
  ["ownerId", xdr.lookup("AccountId")],
  ["baseAsset", xdr.lookup("AssetCode")],
  ["baseBalance", xdr.lookup("BalanceId")],
  ["amount", xdr.lookup("Uint64")],
  ["lockedAmount", xdr.lookup("Uint64")],
  ["createdAt", xdr.lookup("Uint64")],
  ["isCancelled", xdr.bool()],
  ["details", xdr.lookup("Longstring")],
  ["quoteAssets", xdr.varArray(xdr.lookup("AtomicSwapAskQuoteAsset"), 2147483647)],
  ["ext", xdr.lookup("AtomicSwapAskEntryExt")],
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
//   //: `FeeType` represents different types of fees for different operations (e.g. fee charged on withdrawal or on investment)
//   enum FeeType
//   {
//       PAYMENT_FEE = 0,
//       OFFER_FEE = 1,
//       WITHDRAWAL_FEE = 2,
//       ISSUANCE_FEE = 3,
//       INVEST_FEE = 4, // fee to be taken while creating the sale participation
//       CAPITAL_DEPLOYMENT_FEE = 5, // fee to be taken when the sale closes
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
//   //: (not used) `EmissionFeeType` is a subtype of `ISSUANCE_FEE`
//   enum EmissionFeeType
//   {
//       PRIMARY_MARKET = 1,
//       SECONDARY_MARKET = 2
//   };
//
// ===========================================================================
xdr.enum("EmissionFeeType", {
  primaryMarket: 1,
  secondaryMarket: 2,
});

// === xdr source ============================================================
//
//   //: `PaymentFeeType` is a subtype of the Fee used for payments
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
//   //: `FeeEntry` is used in the system configuration to set fees for different assets, operations (according to FeeType), particular account roles, particular accounts,
//   //: or globally (only if both parameters particular account role and paticular account are not specified).
//   struct FeeEntry
//   {
//       //: Type of a particular fee depending on the operation (e.g., PAYMENT_FEE for payment operation, WITHDRAWAL_FEE for withdrawal operation, etc.)
//       FeeType feeType;
//       //: Code of an asset used in the operation for which the fee will be charged
//       AssetCode asset;
//   
//       //: Fixed amount of fee that will be charged for the operation
//       int64 fixedFee;
//       //: Percent from the operation amount that will be charged for the corresponding operation
//       int64 percentFee;
//   
//       //: (optional) Account for which a fee is set in the system
//       AccountID* accountID;
//       //: (optional) Account for which a fee is set in the system
//       uint64*    accountRole;
//       //: Defines a `subtype` of a fee if such exists (e.g., `OUTGOING` or `INCOMING` for `PAYMENT_FEE`)
//       int64 subtype;
//   
//       //: Defines the lower bound of operation amount for which this fee is applicable
//       int64 lowerBound;
//       //: Defines the upper bound of operation amount for which this fee is applicable
//       int64 upperBound;
//   
//       //: Hash of `type:<feeType>asset:<asset>subtype:<subtype>`
//       //: (Add `accountID:<accountID>` or `accountRole:<accountRole>` if corresponding fields are defined)
//       Hash hash;
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
//   //: `StatsOpType` is a type of operation for which statistics is maintained
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
//   //: `LimitsV2Entry` is used in the system configuration to set limits (daily, weekly, montly, annual)
//   //: for different assets, operations (according to StatsOpType), particular account roles, particular accounts,
//   //: or globally (only if both parameters particular account role and paticular account are not specified),
//   struct LimitsV2Entry
//   {
//       //: ID of limits entry
//       uint64      id;
//       //: (optional) ID of an account role that will be imposed with limits
//       uint64*     accountRole;
//       //: (optional) ID of an account that will be imposed with limits
//       AccountID*  accountID;
//       //: Operation type that will be imposed with limits. See `enum StatsOpType`
//       StatsOpType statsOpType;
//       //: Asset that will be imposed with limits
//       AssetCode   assetCode;
//       //: `isConvertNeeded` indicates whether or not the asset conversion is needed for the limits entry.
//       //: If this field is `true`, limits are applied to all balances of an account (to every asset that account owns).
//       //: Otherwise, limits from particular limits entry are applied only to  balances with `AssetCode` provided by entry.
//       bool        isConvertNeeded;
//   
//       //: daily out limit
//       uint64 dailyOut;
//       //: weekly out limit
//       uint64 weeklyOut;
//       //: monthly out limit
//       uint64 monthlyOut;
//       //: annual out limit
//       uint64 annualOut;
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
//   //: Functional type of poll
//   enum PollType
//   {
//       SINGLE_CHOICE = 0
//   };
//
// ===========================================================================
xdr.enum("PollType", {
  singleChoice: 0,
});

// === xdr source ============================================================
//
//   //: PollData is used to pass `PollType` with necessary params
//   union PollData switch (PollType type)
//   {
//   case SINGLE_CHOICE:
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.union("PollData", {
  switchOn: xdr.lookup("PollType"),
  switchName: "type",
  switches: [
    ["singleChoice", "ext"],
  ],
  arms: {
    ext: xdr.lookup("EmptyExt"),
  },
});

// === xdr source ============================================================
//
//   struct PollEntry
//   {
//       uint64 id;
//       uint32 permissionType;
//   
//       uint32 numberOfChoices;
//       PollData data;
//   
//       uint64 startTime;
//       uint64 endTime;
//   
//       AccountID ownerID;
//       AccountID resultProviderID;
//   
//       bool voteConfirmationRequired;
//   
//       longstring details;
//   
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("PollEntry", [
  ["id", xdr.lookup("Uint64")],
  ["permissionType", xdr.lookup("Uint32")],
  ["numberOfChoices", xdr.lookup("Uint32")],
  ["data", xdr.lookup("PollData")],
  ["startTime", xdr.lookup("Uint64")],
  ["endTime", xdr.lookup("Uint64")],
  ["ownerId", xdr.lookup("AccountId")],
  ["resultProviderId", xdr.lookup("AccountId")],
  ["voteConfirmationRequired", xdr.bool()],
  ["details", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("EmptyExt")],
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
//   	CREATE_POLL = 14,
//   	CREATE_ATOMIC_SWAP_ASK = 16,
//   	CREATE_ATOMIC_SWAP_BID = 17,
//   	KYC_RECOVERY = 18
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
  createPoll: 14,
  createAtomicSwapAsk: 16,
  createAtomicSwapBid: 17,
  kycRecovery: 18,
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
//           case CREATE_ATOMIC_SWAP_ASK:
//               CreateAtomicSwapAskRequest createAtomicSwapAskRequest;
//           case CREATE_ATOMIC_SWAP_BID:
//               CreateAtomicSwapBidRequest createAtomicSwapBidRequest;
//           case CREATE_POLL:
//               CreatePollRequest createPollRequest;
//           case KYC_RECOVERY:
//               KYCRecoveryRequest kycRecoveryRequest;
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
    ["createAtomicSwapAsk", "createAtomicSwapAskRequest"],
    ["createAtomicSwapBid", "createAtomicSwapBidRequest"],
    ["createPoll", "createPollRequest"],
    ["kycRecovery", "kycRecoveryRequest"],
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
    createAtomicSwapAskRequest: xdr.lookup("CreateAtomicSwapAskRequest"),
    createAtomicSwapBidRequest: xdr.lookup("CreateAtomicSwapBidRequest"),
    createPollRequest: xdr.lookup("CreatePollRequest"),
    kycRecoveryRequest: xdr.lookup("KycRecoveryRequest"),
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
//           case CREATE_ATOMIC_SWAP_ASK:
//               CreateAtomicSwapAskRequest createAtomicSwapAskRequest;
//           case CREATE_ATOMIC_SWAP_BID:
//               CreateAtomicSwapBidRequest createAtomicSwapBidRequest;
//           case CREATE_POLL:
//               CreatePollRequest createPollRequest;
//           case KYC_RECOVERY:
//               KYCRecoveryRequest kycRecoveryRequest;
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
//       case ADD_SALE_WHITELISTS:
//           void;
//       }
//
// ===========================================================================
xdr.union("SaleEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
    ["addSaleWhitelist", xdr.void()],
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
//       case ADD_SALE_WHITELISTS:
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
//   struct SingleChoiceVote
//   {
//       uint32 choice;
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("SingleChoiceVote", [
  ["choice", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   union VoteData switch (PollType pollType)
//   {
//   case SINGLE_CHOICE:
//       SingleChoiceVote single;
//   //case MULTIPLE_CHOICE:
//   //    MultipleChoiceVote multiple;
//   };
//
// ===========================================================================
xdr.union("VoteData", {
  switchOn: xdr.lookup("PollType"),
  switchName: "pollType",
  switches: [
    ["singleChoice", "single"],
  ],
  arms: {
    single: xdr.lookup("SingleChoiceVote"),
  },
});

// === xdr source ============================================================
//
//   struct VoteEntry
//   {
//       uint64 pollID;
//   
//       AccountID voterID;
//   
//       VoteData data;
//   
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.struct("VoteEntry", [
  ["pollId", xdr.lookup("Uint64")],
  ["voterId", xdr.lookup("AccountId")],
  ["data", xdr.lookup("VoteData")],
  ["ext", xdr.lookup("EmptyExt")],
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
//       case ATOMIC_SWAP_ASK:
//           AtomicSwapAskEntry atomicSwapAsk;
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
//       case POLL:
//           PollEntry poll;
//       case VOTE:
//           VoteEntry vote;
//       case ACCOUNT_SPECIFIC_RULE:
//           AccountSpecificRuleEntry accountSpecificRule;
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
    ["atomicSwapAsk", "atomicSwapAsk"],
    ["accountRole", "accountRole"],
    ["accountRule", "accountRule"],
    ["signerRule", "signerRule"],
    ["signerRole", "signerRole"],
    ["license", "license"],
    ["stamp", "stamp"],
    ["poll", "poll"],
    ["vote", "vote"],
    ["accountSpecificRule", "accountSpecificRule"],
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
    atomicSwapAsk: xdr.lookup("AtomicSwapAskEntry"),
    accountRole: xdr.lookup("AccountRoleEntry"),
    accountRule: xdr.lookup("AccountRuleEntry"),
    signerRule: xdr.lookup("SignerRuleEntry"),
    signerRole: xdr.lookup("SignerRoleEntry"),
    license: xdr.lookup("LicenseEntry"),
    stamp: xdr.lookup("StampEntry"),
    poll: xdr.lookup("PollEntry"),
    vote: xdr.lookup("VoteEntry"),
    accountSpecificRule: xdr.lookup("AccountSpecificRuleEntry"),
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
//       case ATOMIC_SWAP_ASK:
//           AtomicSwapAskEntry atomicSwapAsk;
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
//       case POLL:
//           PollEntry poll;
//       case VOTE:
//           VoteEntry vote;
//       case ACCOUNT_SPECIFIC_RULE:
//           AccountSpecificRuleEntry accountSpecificRule;
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
//           int64 lowerBound;
//           int64 upperBound;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
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
//           {
//           case EMPTY_VERSION:
//               void;
//           }
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
//           AssetCode base;
//           AssetCode quote;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
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
//           uint64 offerID;
//           AccountID ownerID;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyOffer", [
  ["offerId", xdr.lookup("Uint64")],
  ["ownerId", xdr.lookup("AccountId")],
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
//           {
//           case EMPTY_VERSION:
//               void;
//           }
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
//           uint64 saleID;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       }
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
xdr.union("LedgerKeyAtomicSwapAskExt", {
  switchOn: xdr.lookup("LedgerVersion"),
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
xdr.struct("LedgerKeyAtomicSwapAsk", [
  ["id", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("LedgerKeyAtomicSwapAskExt")],
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
xdr.struct("LedgerKeyPoll", [
  ["id", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct {
//           uint64 pollID;
//           AccountID voterID;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyVote", [
  ["pollId", xdr.lookup("Uint64")],
  ["voterId", xdr.lookup("AccountId")],
  ["ext", xdr.lookup("EmptyExt")],
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
xdr.struct("LedgerKeyAccountSpecificRule", [
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
//   case FEE:
//       struct {
//           Hash hash;
//           int64 lowerBound;
//           int64 upperBound;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       } feeState;
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
//       struct {
//           AssetCode base;
//           AssetCode quote;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       } assetPair;
//   case OFFER_ENTRY:
//       struct {
//           uint64 offerID;
//           AccountID ownerID;
//       } offer;
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
//       struct {
//           uint64 saleID;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       } sale;
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
//   case ATOMIC_SWAP_ASK:
//       struct {
//           uint64 id;
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       } atomicSwapAsk;
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
//   case POLL:
//       struct {
//           uint64 id;
//   
//           EmptyExt ext;
//       } poll;
//   case VOTE:
//       struct {
//           uint64 pollID;
//           AccountID voterID;
//   
//           EmptyExt ext;
//       } vote;
//   case ACCOUNT_SPECIFIC_RULE:
//       struct {
//           uint64 id;
//   
//           EmptyExt ext;
//       } accountSpecificRule;
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
    ["atomicSwapAsk", "atomicSwapAsk"],
    ["accountRole", "accountRole"],
    ["accountRule", "accountRule"],
    ["signerRole", "signerRole"],
    ["signerRule", "signerRule"],
    ["stamp", "stamp"],
    ["license", "license"],
    ["poll", "poll"],
    ["vote", "vote"],
    ["accountSpecificRule", "accountSpecificRule"],
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
    atomicSwapAsk: xdr.lookup("LedgerKeyAtomicSwapAsk"),
    accountRole: xdr.lookup("LedgerKeyAccountRole"),
    accountRule: xdr.lookup("LedgerKeyAccountRule"),
    signerRole: xdr.lookup("LedgerKeySignerRole"),
    signerRule: xdr.lookup("LedgerKeySignerRule"),
    stamp: xdr.lookup("LedgerKeyStamp"),
    license: xdr.lookup("LedgerKeyLicense"),
    poll: xdr.lookup("LedgerKeyPoll"),
    vote: xdr.lookup("LedgerKeyVote"),
    accountSpecificRule: xdr.lookup("LedgerKeyAccountSpecificRule"),
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
//   //: BindExternalSystemAccountIdOp is used to bind a particular account to the external system account which is represented by account ID taken from the pool
//   struct BindExternalSystemAccountIdOp
//   {
//       //: Type of external system to bind
//       int32 externalSystemType;
//   
//       //: Reserved for the future use
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
//   //: Result codes of BindExternalSystemAccountIdOp
//   enum BindExternalSystemAccountIdResultCode
//   {
//       // codes considered as "success" for the operation
//       //: Source account has been successfully bound to external system ID taken from the pool
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: (deprecated)
//       MALFORMED = -1,
//       //: There is no available external system account ID pool entry for such external system type
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
//   //: `BindExternalSystemAccountIdSuccess` represents details of successful result of operation application
//   struct BindExternalSystemAccountIdSuccess
//   {
//       //: `data` is used to pass data about account from external system ID
//       longstring data;
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
xdr.struct("BindExternalSystemAccountIdSuccess", [
  ["data", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("BindExternalSystemAccountIdSuccessExt")],
]);

// === xdr source ============================================================
//
//   //: Result of operation application
//   union BindExternalSystemAccountIdResult switch (BindExternalSystemAccountIdResultCode code)
//   {
//   case SUCCESS:
//       //: `success` is used to pass useful fields after successful operation applying
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
xdr.union("CancelAtomicSwapAskOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: CancelAtomicSwapAskOp is used to cancel existing atomic swap ask
//   struct CancelAtomicSwapAskOp
//   {
//       //: id of existing atomic swap ask
//       uint64 askID;
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
xdr.struct("CancelAtomicSwapAskOp", [
  ["askId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("CancelAtomicSwapAskOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of CancelAtomicSwapAskOp
//   enum CancelAtomicSwapAskResultCode
//   {
//       //: Atomic swap ask was successfully removed or marked as canceled
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: There is no atomic swap ask with such id
//       NOT_FOUND = -1, // atomic swap bid does not exist
//       //: Not allowed to mark canceled atomic swap ask as canceled
//       ALREADY_CANCELLED = -2 // atomic swap ask already cancelled
//   };
//
// ===========================================================================
xdr.enum("CancelAtomicSwapAskResultCode", {
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
xdr.union("CancelAtomicSwapAskResultSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: Success result of CancelASwapAskOp application
//   struct CancelAtomicSwapAskResultSuccess
//   {
//       //: Sum of `CREATE_ATOMIC_SWAP_BID` requests' base amounts which are waiting for applying.
//       //: Zero means that ask successfully removed
//       uint64 lockedAmount;
//   
//       //: reserved for the future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("CancelAtomicSwapAskResultSuccess", [
  ["lockedAmount", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("CancelAtomicSwapAskResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   //: Result of CancelASwapAskOp application
//   union CancelAtomicSwapAskResult switch (CancelAtomicSwapAskResultCode code)
//   {
//   case SUCCESS:
//       //: is used to pass useful fields after successful operation applying
//       CancelAtomicSwapAskResultSuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("CancelAtomicSwapAskResult", {
  switchOn: xdr.lookup("CancelAtomicSwapAskResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("CancelAtomicSwapAskResultSuccess"),
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
xdr.union("CancelChangeRoleRequestOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: CancelChangeRoleRequestOp is used to cancel reviwable request for changing role.
//   //: If successful, request with the corresponding ID will be deleted
//   struct CancelChangeRoleRequestOp
//   {
//       //: ID of the ChangeRoleRequest request to be canceled
//       uint64 requestID;
//   
//       //: Reserved for future use
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
xdr.struct("CancelChangeRoleRequestOp", [
  ["requestId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("CancelChangeRoleRequestOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes for CancelChangeRoleRequest operation
//   enum CancelChangeRoleRequestResultCode
//   {
//       // codes considered as "success" for the operation
//       //: Operation is successfully applied
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: ID of a request cannot be 0
//       REQUEST_ID_INVALID = -1, // request id can not be equal zero
//       //: ChangeRole request with provided ID is not found
//       REQUEST_NOT_FOUND = -2 // trying to cancel not existing reviewable request
//   };
//
// ===========================================================================
xdr.enum("CancelChangeRoleRequestResultCode", {
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
xdr.union("CancelChangeRoleSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: Result of successful `CancelChangeRoleRequestOp` application
//   struct CancelChangeRoleSuccess {
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
xdr.struct("CancelChangeRoleSuccess", [
  ["ext", xdr.lookup("CancelChangeRoleSuccessExt")],
]);

// === xdr source ============================================================
//
//   //: Result of CancelChangeRoleRequest operation application along with the result code
//   union CancelChangeRoleRequestResult switch (CancelChangeRoleRequestResultCode code)
//   {
//       case SUCCESS:
//           CancelChangeRoleSuccess success;
//       default:
//           void;
//   };
//
// ===========================================================================
xdr.union("CancelChangeRoleRequestResult", {
  switchOn: xdr.lookup("CancelChangeRoleRequestResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("CancelChangeRoleSuccess"),
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
//   //: CancelSaleCreationRequest operation is used to cancel sale creation request.
//   //: If successful, request with the corresponding ID will be deleted
//   //: SaleCreationRequest with provided ID
//   struct CancelSaleCreationRequestOp
//   {
//       //: ID of the SaleCreation request to be canceled
//       uint64 requestID;
//   
//       //: Reserved for future use
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
//   //: Result codes for CancelSaleCreationRequest operation
//   enum CancelSaleCreationRequestResultCode
//   {
//       // codes considered as "success" for the operation
//       //: Operation is successfully applied
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: ID of a request cannot be 0
//       REQUEST_ID_INVALID = -1, // request id can not be equal zero
//       //: SaleCreation request with provided ID is not found
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
//   //: Result of successful `CancelSaleCreationRequestOp` application 
//   struct CancelSaleCreationSuccess {
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
xdr.struct("CancelSaleCreationSuccess", [
  ["ext", xdr.lookup("CancelSaleCreationSuccessExt")],
]);

// === xdr source ============================================================
//
//   //: Result of CancelSaleCreationRequest operation application along with the result code
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
//   //: CheckSaleState operation is used to perform check on sale state - whether the sale was successful or not
//   struct CheckSaleStateOp
//   {
//       //:ID of the sale to check
//       uint64 saleID;
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
xdr.struct("CheckSaleStateOp", [
  ["saleId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("CheckSaleStateOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of CheckSaleState operation
//   enum CheckSaleStateResultCode
//   {
//       // codes considered as "success" for the operation
//       //: CheckSaleState operation was successfully applied
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: Sale with provided ID not found
//       NOT_FOUND = -1,
//       //: Sale was not processed, because it's still active
//       NOT_READY = -2
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
//   //: Effect of performed check sale state operation
//   enum CheckSaleStateEffect {
//       //: Sale hasn't reached the soft cap before end time
//       CANCELED = 1,
//       //: Sale has either reached the soft cap and ended or reached hard cap
//       CLOSED = 2,
//       //: Crowdfunding sale was successfully closed and the price for the base asset was updated according to participants contribution
//       UPDATED = 3
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
//   //: Entry for additional information regarding sale cancel
//   struct SaleCanceled {
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
//   //: Entry for additional information regarding sale update
//   struct SaleUpdated {
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
xdr.struct("SaleUpdated", [
  ["ext", xdr.lookup("SaleUpdatedExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//         void;
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
//   //: Entry for additional information regarding sub sale closing
//   struct CheckSubSaleClosedResult {
//       //: Balance in base asset of the closed sale
//       BalanceID saleBaseBalance;
//       //: Balance in one of the quote assets of the closed sale
//       BalanceID saleQuoteBalance;
//       //: Result of an individual offer made during the sale and completed on its close
//       ManageOfferSuccessResult saleDetails;
//       //: Reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//         void;
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
//         case EMPTY_VERSION:
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
//   //: Entry for additional information regarding sale closing
//   struct CheckSaleClosedResult {
//       //: AccountID of the sale owner
//       AccountID saleOwner;
//       //: Array of individual's contribution details
//       CheckSubSaleClosedResult results<>;
//       //: Reserved for future use
//       union switch (LedgerVersion v)
//       {
//         case EMPTY_VERSION:
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
//       case CLOSED:
//           CheckSaleClosedResult saleClosed;
//       case UPDATED:
//           SaleUpdated saleUpdated;
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
//         case EMPTY_VERSION:
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
//   //: Result of the successful application of CheckSaleState operation
//   struct CheckSaleStateSuccess
//   {
//       //: ID of the sale being checked
//       uint64 saleID;
//       //: Additional information regarding eventual result
//       union switch (CheckSaleStateEffect effect)
//       {
//       case CANCELED:
//           SaleCanceled saleCanceled;
//       case CLOSED:
//           CheckSaleClosedResult saleClosed;
//       case UPDATED:
//           SaleUpdated saleUpdated;
//       }
//       effect;
//        //: Reserved for future use
//       union switch (LedgerVersion v)
//       {
//         case EMPTY_VERSION:
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
//   //: Result of the CheckSaleState operation along with the result code
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
//   //: CreateAMLAlertRequest operation creates a reviewable request 
//   //: that will void the specified amount from target balance after the reviewer's approval
//   struct CreateAMLAlertRequestOp
//   {
//       //: Reference of AMLAlertRequest
//       string64 reference; // TODO longstring ?
//       //: Parameters of AMLAlertRequest
//       AMLAlertRequest amlAlertRequest;
//       //: (optional) Bit mask whose flags must be cleared in order for AMLAlertRequest to be approved, which will be used by key aml_alert_tasks:<asset_code>
//       //: instead of key-value
//       uint32* allTasks;
//   
//       //: Reserved for future use
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
xdr.struct("CreateAmlAlertRequestOp", [
  ["reference", xdr.lookup("String64")],
  ["amlAlertRequest", xdr.lookup("AmlAlertRequest")],
  ["allTasks", xdr.option(xdr.lookup("Uint32"))],
  ["ext", xdr.lookup("CreateAmlAlertRequestOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes for CreateAMLAlert operation
//   enum CreateAMLAlertRequestResultCode
//   {
//       // codes considered as "success" for the operation
//       //: Operation has been successfully performed
//       SUCCESS = 0,
//       //: DEPRECATED: Balance with provided balance ID does not exist
//       OLD_BALANCE_NOT_EXIST = 1, // balance doesn't exist
//       //: DEPRECATED: Creator details are not in a valid JSON format
//       OLD_INVALID_CREATOR_DETAILS = 2, //invalid reason for request
//       //: DEPRECATED: Specified amount is greater than the amount on the balance
//       OLD_UNDERFUNDED = 3, //when couldn't lock balance
//       //: DEPRECATED: AML Alert request with the same reference already exists
//       OLD_REFERENCE_DUPLICATION = 4, // reference already exists
//       //: DEPRECATED: Amount must be positive
//       OLD_INVALID_AMOUNT = 5, // amount must be positive
//       //: DEPRECATED: Amount precision and asset precision set in the system are mismatched
//       OLD_INCORRECT_PRECISION = 6,
//   
//       //codes considered as "failure" for the operation
//       //: Update aml alert tasks are not set in the system, i.e. it's not allowed to perform aml alert
//       AML_ALERT_TASKS_NOT_FOUND = -1,
//       //: Balance with provided balance ID does not exist
//       BALANCE_NOT_EXIST = -2, // balance doesn't exist
//       //: Creator details are not in a valid JSON format
//       INVALID_CREATOR_DETAILS = -3, //invalid reason for request
//       //: Specified amount is greater than the amount on the balance
//       UNDERFUNDED = -4, //when couldn't lock balance
//       //: AML Alert request with the same reference already exists
//       REFERENCE_DUPLICATION = -5, // reference already exists
//       //: Amount must be positive
//       INVALID_AMOUNT = -6, // amount must be positive
//       //: Amount precision and asset precision set in the system are mismatched
//       INCORRECT_PRECISION = -7
//   
//   };
//
// ===========================================================================
xdr.enum("CreateAmlAlertRequestResultCode", {
  success: 0,
  oldBalanceNotExist: 1,
  oldInvalidCreatorDetail: 2,
  oldUnderfunded: 3,
  oldReferenceDuplication: 4,
  oldInvalidAmount: 5,
  oldIncorrectPrecision: 6,
  amlAlertTasksNotFound: -1,
  balanceNotExist: -2,
  invalidCreatorDetail: -3,
  underfunded: -4,
  referenceDuplication: -5,
  invalidAmount: -6,
  incorrectPrecision: -7,
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
//   //: Result of successful application of `CreateAMLAlertRequest` operation
//   struct CreateAMLAlertRequestSuccess {
//       //: ID of a newly created reviewable request
//       uint64 requestID;
//       //: Indicates  whether or not the AMLAlert request was auto approved and fulfilled 
//       bool fulfilled;
//       //: Reserved for future use
//        union switch (LedgerVersion v)
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
//   //: Result of `CreateAMLAlertRequest` operation application along with the result code
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
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreateAtomicSwapAskRequestOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: CreateAtomicSwapAskRequestOp is used to create `CREATE_ATOMIC_SWAP_ASK` request
//   struct CreateAtomicSwapAskRequestOp
//   {
//       //: Body of request which will be created
//       CreateAtomicSwapAskRequest request;
//   
//       //: (optional) Bit mask whose flags must be cleared in order for `CREATE_ATOMIC_SWAP_BID` request to be approved,
//       //: which will be used instead of key-value by `atomic_swap_bid_tasks` key
//       uint32* allTasks;
//       //: reserved for the future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CreateAtomicSwapAskRequestOp", [
  ["request", xdr.lookup("CreateAtomicSwapAskRequest")],
  ["allTasks", xdr.option(xdr.lookup("Uint32"))],
  ["ext", xdr.lookup("CreateAtomicSwapAskRequestOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of CreateAtomicSwapBidRequestOp
//   enum CreateAtomicSwapAskRequestResultCode
//   {
//       //: `CREATE_ATOMIC_SWAP_BID` request has either been successfully created
//       //: or auto approved
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: Not allowed to create atomic swap bid with zero amount
//       INVALID_AMOUNT = -1, // amount is equal to 0
//       //: Not allowed to create atomic swap bid with quote asset price equals zero
//       INVALID_PRICE = -2, // price is equal to 0
//       //: Not allowed to create atomic swap bid with json invalid details
//       INVALID_DETAILS = -3,
//       //: Not allowed to create atomic swap bid in which product of baseAmount precision does not matched precision of base asset
//       INCORRECT_PRECISION = -4,
//       //: There is no asset with such code
//       BASE_ASSET_NOT_FOUND = -5, // base asset does not exist
//       //: Not allowed to use asset as base asset for atomic swap bid which has not `CAN_BE_BASE_IN_ATOMIC_SWAP` policy
//       BASE_ASSET_CANNOT_BE_SWAPPED = -6,
//       //: There is no asset with such code
//       QUOTE_ASSET_NOT_FOUND = -7, // quote asset does not exist
//       //: Not allowed to use asset as base asset for atomic swap bid which has not `CAN_BE_QUOTE_IN_ATOMIC_SWAP` policy
//       QUOTE_ASSET_CANNOT_BE_SWAPPED = -8,
//       //: There is no balance with such id and source account as owner
//       BASE_BALANCE_NOT_FOUND = -9,
//       //: Not allowed to create atomic swap bid in which base and quote assets are the same
//       ASSETS_ARE_EQUAL = -10, // base and quote assets are the same
//       //: There is not enough amount on `baseBalance` or `baseAmount` precision does not fit asset precision
//       BASE_BALANCE_UNDERFUNDED = -11,
//       //: Not allowed to pass invalid or duplicated quote asset codes
//       INVALID_QUOTE_ASSET = -12, // one of the quote assets is invalid
//       //: There is no key-value entry by `atomic_swap_ask_tasks` key in the system;
//       //: configuration does not allow create atomic swap asks
//       ATOMIC_SWAP_ASK_TASKS_NOT_FOUND = -13
//   };
//
// ===========================================================================
xdr.enum("CreateAtomicSwapAskRequestResultCode", {
  success: 0,
  invalidAmount: -1,
  invalidPrice: -2,
  invalidDetail: -3,
  incorrectPrecision: -4,
  baseAssetNotFound: -5,
  baseAssetCannotBeSwapped: -6,
  quoteAssetNotFound: -7,
  quoteAssetCannotBeSwapped: -8,
  baseBalanceNotFound: -9,
  assetsAreEqual: -10,
  baseBalanceUnderfunded: -11,
  invalidQuoteAsset: -12,
  atomicSwapAskTasksNotFound: -13,
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
xdr.union("CreateAtomicSwapAskRequestSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: Success result of CreateASwapAskCreationRequestOp application
//   struct CreateAtomicSwapAskRequestSuccess
//   {
//       //: id of created request
//       uint64 requestID;
//       //: Indicates whether or not the `CREATE_ATOMIC_SWAP_ASK` request was auto approved and fulfilled
//       bool fulfilled;
//       //: ID of a newly created ask (if the ask  creation request has been auto approved)
//       uint64 askID;
//   
//       //: reserved for the future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("CreateAtomicSwapAskRequestSuccess", [
  ["requestId", xdr.lookup("Uint64")],
  ["fulfilled", xdr.bool()],
  ["askId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("CreateAtomicSwapAskRequestSuccessExt")],
]);

// === xdr source ============================================================
//
//   //: Result of CreateAtomicSwapAskRequestOp application
//   union CreateAtomicSwapAskRequestResult switch (CreateAtomicSwapAskRequestResultCode code)
//   {
//   case SUCCESS:
//       //: is used to pass useful fields after successful operation applying
//       CreateAtomicSwapAskRequestSuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("CreateAtomicSwapAskRequestResult", {
  switchOn: xdr.lookup("CreateAtomicSwapAskRequestResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("CreateAtomicSwapAskRequestSuccess"),
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
xdr.union("CreateAtomicSwapBidRequestOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: CreateAtomicSwapBidRequestOp is used to create `CREATE_ATOMIC_SWAP_BID` request
//   struct CreateAtomicSwapBidRequestOp
//   {
//       //: Body of request which will be created
//       CreateAtomicSwapBidRequest request;
//   
//       //: reserved for the future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("CreateAtomicSwapBidRequestOp", [
  ["request", xdr.lookup("CreateAtomicSwapBidRequest")],
  ["ext", xdr.lookup("CreateAtomicSwapBidRequestOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of CreateAtomicSwapBidRequestOp
//   enum CreateAtomicSwapBidRequestResultCode
//   {
//       //: request was successfully created
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: Not allowed to create `CREATE_ATOMIC_SWAP` request with zero base amount
//       INVALID_BASE_AMOUNT = -1,
//       //: Not allowed to pass invalid quote asset code
//       INVALID_QUOTE_ASSET = -2,
//       //: There is no atomic swap bid with such id
//       ASK_NOT_FOUND = -3,
//       //: There is no quote asset with such code
//       QUOTE_ASSET_NOT_FOUND = -4,
//       //: Not allowed to create `CREATE_ATOMIC_SWAP_BID` request with amount which exceeds available amount of atomic swap ask
//       ASK_UNDERFUNDED = -5, // ask has not enough base amount available for lock
//       //: There is no key-value entry by `atomic_swap_bid_tasks` key in the system;
//       //: configuration does not allow create `CREATE_ATOMIC_SWAP_BID` request
//       ATOMIC_SWAP_BID_TASKS_NOT_FOUND = -6,
//       //: Base amount precision and asset precision are mismatched
//       INCORRECT_PRECISION = -7,
//       //: Not allowed to create `CREATE_ATOMIC_SWAP_BID` request for atomic swap ask which is marked as `canceled`
//       ASK_IS_CANCELLED = -8,
//       //: Not allowed to create `CREATE_ATOMIC_SWAP_BID` request for own atomic swap ask
//       SOURCE_ACCOUNT_EQUALS_ASK_OWNER = -9,
//       //: 0 value is received from key value entry by `atomic_swap_bid_tasks` key
//       ATOMIC_SWAP_BID_ZERO_TASKS_NOT_ALLOWED = -10,
//       //: Not allowed to create atomic swap ask in which product of `baseAmount` and price of the `quoteAsset` exceeds MAX_INT64 value
//       QUOTE_AMOUNT_OVERFLOWS = -11
//   };
//
// ===========================================================================
xdr.enum("CreateAtomicSwapBidRequestResultCode", {
  success: 0,
  invalidBaseAmount: -1,
  invalidQuoteAsset: -2,
  askNotFound: -3,
  quoteAssetNotFound: -4,
  askUnderfunded: -5,
  atomicSwapBidTasksNotFound: -6,
  incorrectPrecision: -7,
  askIsCancelled: -8,
  sourceAccountEqualsAskOwner: -9,
  atomicSwapBidZeroTasksNotAllowed: -10,
  quoteAmountOverflow: -11,
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
xdr.union("CreateAtomicSwapBidRequestSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: Success request of CreateAtomicSwapBidRequestOp application
//   struct CreateAtomicSwapBidRequestSuccess
//   {
//       //: id of created request
//       uint64 requestID;
//       //: id of ask owner
//       AccountID askOwnerID;
//       //: amount in quote asset which required for request applying
//       uint64 quoteAmount;
//   
//       //: reserved for the future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("CreateAtomicSwapBidRequestSuccess", [
  ["requestId", xdr.lookup("Uint64")],
  ["askOwnerId", xdr.lookup("AccountId")],
  ["quoteAmount", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("CreateAtomicSwapBidRequestSuccessExt")],
]);

// === xdr source ============================================================
//
//   //: Result of CreateAtomicSwapBidRequestOp application
//   union CreateAtomicSwapBidRequestResult switch (CreateAtomicSwapBidRequestResultCode code)
//   {
//   case SUCCESS:
//       //: is used to pass useful fields after successful operation applying
//       CreateAtomicSwapBidRequestSuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("CreateAtomicSwapBidRequestResult", {
  switchOn: xdr.lookup("CreateAtomicSwapBidRequestResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("CreateAtomicSwapBidRequestSuccess"),
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
//   //: `CreateChangeRoleRequestOp` is used to create reviewable requests
//   //: that, with admin's approval, will change the role of `destinationAccount`
//   //: from current role to `accountRoleToSet`
//   struct CreateChangeRoleRequestOp
//   {
//       //: Set zero to create new request, set non zero to update existing request
//       uint64 requestID;
//   
//       //: AccountID of an account whose role will be changed
//       AccountID destinationAccount;
//       //: ID of account role that will be attached to `destinationAccount`
//       uint64 accountRoleToSet;
//       //: Arbitrary stringified json object that can be used to attach data to be reviewed by an admin
//       longstring creatorDetails;
//   
//       //: Bit mask that will be used instead of the value from key-value entry by
//       //: `change_role_tasks:<currentRoleID>:<accountRoleToSet>` key
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
  ["creatorDetails", xdr.lookup("Longstring")],
  ["allTasks", xdr.option(xdr.lookup("Uint32"))],
  ["ext", xdr.lookup("CreateChangeRoleRequestOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of CreateChangeRoleRequestOp
//   enum CreateChangeRoleRequestResultCode
//   {
//       //: Change role request has either been successfully created
//       //: or auto approved
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: There is no destination account with such accountID
//       ACC_TO_UPDATE_DOES_NOT_EXIST = -1,
//       //: There is another change role request for such destination account
//       REQUEST_ALREADY_EXISTS = -2,
//       //: There is no request with such `requestID`
//       REQUEST_DOES_NOT_EXIST = -4,
//       //: Only `destinationAccount` can update change role request
//       //: `destinationAccount` must be equal source Account
//       NOT_ALLOWED_TO_UPDATE_REQUEST = -6,
//       //: It is not allowed to change `destinationAccount`, `accountRoleToSet`
//       //: or set `allTasks` on update change role request
//       INVALID_CHANGE_ROLE_REQUEST_DATA = -7,
//       //: `creatorDetails` must be in a valid JSON format
//       INVALID_CREATOR_DETAILS = -8,
//       //: There is no key-value entry by `change_role_tasks` key in the system;
//       //: configuration does not allow changing the role from current to `accountRoleToSet`
//       CHANGE_ROLE_TASKS_NOT_FOUND = -9,
//       //: There is no account role with provided id
//       ACCOUNT_ROLE_TO_SET_DOES_NOT_EXIST = -10
//   };
//
// ===========================================================================
xdr.enum("CreateChangeRoleRequestResultCode", {
  success: 0,
  accToUpdateDoesNotExist: -1,
  requestAlreadyExist: -2,
  requestDoesNotExist: -4,
  notAllowedToUpdateRequest: -6,
  invalidChangeRoleRequestDatum: -7,
  invalidCreatorDetail: -8,
  changeRoleTasksNotFound: -9,
  accountRoleToSetDoesNotExist: -10,
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
//           //: ID of a created or updated request
//           uint64 requestID;
//           //: True if request was auto approved (pending tasks == 0),
//           //: `destinationAccount` must have new account role
//           bool fulfilled;
//           // Reserved for future use
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
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
//   //: Result of operation application 
//   union CreateChangeRoleRequestResult switch (CreateChangeRoleRequestResultCode code)
//   {
//   case SUCCESS:
//       struct {
//           //: ID of a created or updated request
//           uint64 requestID;
//           //: True if request was auto approved (pending tasks == 0),
//           //: `destinationAccount` must have new account role
//           bool fulfilled;
//           // Reserved for future use
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
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
//   //: CreateIssuanceRequestOp is used to create a reviewable request that, after reviewer's approval,
//   //: will issue the specified amount of asset to a receiver's balance
//   struct CreateIssuanceRequestOp
//   {
//       //: Issuance request to create
//       IssuanceRequest request;
//       //: Reference of the request
//       string64 reference;
//       //: (optional) Bit mask whose flags must be cleared in order for IssuanceRequest to be approved, which will be used by key issuance_tasks:<asset_code>
//       //: instead of key-value
//       uint32* allTasks;
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
xdr.struct("CreateIssuanceRequestOp", [
  ["request", xdr.lookup("IssuanceRequest")],
  ["reference", xdr.lookup("String64")],
  ["allTasks", xdr.option(xdr.lookup("Uint32"))],
  ["ext", xdr.lookup("CreateIssuanceRequestOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of the CreateIssuanceRequestOp
//   enum CreateIssuanceRequestResultCode
//   {
//       // codes considered as "success" for the operation
//       //: CreateIssuanceRequest operation application was successful
//       SUCCESS = 0,
//       
//       // codes considered as "failure" for the operation
//       //: Asset to issue is not found
//       ASSET_NOT_FOUND = -1,
//       //: Trying to create an issuance request with negative/zero amount
//       INVALID_AMOUNT = -2,
//       //: Request with the same reference already exists
//       REFERENCE_DUPLICATION = -3,
//       //: Either the target balance is not found or there is a mismatch between the target balance asset and an asset in the request 
//       NO_COUNTERPARTY = -4,
//       //: Source of operation is not an owner of the asset 
//       NOT_AUTHORIZED = -5,
//       //: Issued amount plus amount to issue will exceed max issuance amount
//       EXCEEDS_MAX_ISSUANCE_AMOUNT = -6,
//       //: Amount to issue plus amount on balance would exceed UINT64_MAX 
//       RECEIVER_FULL_LINE = -7,
//       //: Creator details are not valid JSON
//       INVALID_CREATOR_DETAILS = -8,
//       //: Fee is greater than the amount to issue
//       FEE_EXCEEDS_AMOUNT = -9,
//       //: Deprecated
//       REQUIRES_KYC = -10,
//       //: Deprecated
//       REQUIRES_VERIFICATION = -11, //asset requires receiver to be verified
//       //: Issuance tasks are not set in the system (i.e. performing issuance is not allowed)
//       ISSUANCE_TASKS_NOT_FOUND = -12,
//       //: It is not allowed to set system tasks: 1, 2, 4
//       SYSTEM_TASKS_NOT_ALLOWED = -13,
//       //: Amount precision and asset precision are mismatched
//       INVALID_AMOUNT_PRECISION = -14
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
  invalidCreatorDetail: -8,
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
//       {
//       case EMPTY_VERSION:
//           void;
//       }
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
//   //:Result of successful application of CreateIssuanceRequest operation
//   struct CreateIssuanceRequestSuccess {
//       //: ID of a newly created issuance request
//       uint64 requestID;
//       //: Account address of the receiver
//       AccountID receiver;
//       //: Indicates whether or not the Issuance request was auto approved and fulfilled
//       bool fulfilled;
//       //: Paid fee
//       Fee fee;
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
xdr.struct("CreateIssuanceRequestSuccess", [
  ["requestId", xdr.lookup("Uint64")],
  ["receiver", xdr.lookup("AccountId")],
  ["fulfilled", xdr.bool()],
  ["fee", xdr.lookup("Fee")],
  ["ext", xdr.lookup("CreateIssuanceRequestSuccessExt")],
]);

// === xdr source ============================================================
//
//   //: Create issuance request result with result code
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
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreateKycRecoveryRequestOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: CreateKYCRecoveryRequestOp to create KYC recovery request and set new signers for account
//   struct CreateKYCRecoveryRequestOp
//   {
//       //: ID of a reviewable request. If set 0, request is created, else - request is updated
//       uint64 requestID;
//       //: Account for which signers will be set
//       AccountID targetAccount;
//       //: New signers to set
//       UpdateSignerData signersData<>;
//   
//        //: Arbitrary stringified json object that can be used to attach data to be reviewed by an admin
//       longstring creatorDetails; // details set by requester
//   
//       //: (optional) Bit mask whose flags must be cleared in order for KYC recovery request to be approved, which will be used by key `create_kyc_recovery_tasks`
//       //: instead of key-value
//       uint32* allTasks;
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
xdr.struct("CreateKycRecoveryRequestOp", [
  ["requestId", xdr.lookup("Uint64")],
  ["targetAccount", xdr.lookup("AccountId")],
  ["signersData", xdr.varArray(xdr.lookup("UpdateSignerData"), 2147483647)],
  ["creatorDetails", xdr.lookup("Longstring")],
  ["allTasks", xdr.option(xdr.lookup("Uint32"))],
  ["ext", xdr.lookup("CreateKycRecoveryRequestOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of CreateKYCRecoveryRequestOp
//   enum CreateKYCRecoveryRequestResultCode
//   {
//       //: KYC Recovery request was successfully created
//       SUCCESS = 0,
//   
//       //: Creator details are not in a valid JSON format
//       INVALID_CREATOR_DETAILS = -1,
//       //: KYC recovery tasks are not set in the system
//       KYC_RECOVERY_TASKS_NOT_FOUND = -2,
//       //: Not allowed to provide empty slice of signers
//       NO_SIGNER_DATA = -3,
//       //: SignerData contains duplicates
//       SIGNER_DUPLICATION = -4,
//       //: Signer has weight > threshold
//       INVALID_WEIGHT = -5,
//       //: Signer has invalid details
//       INVALID_DETAILS = -6,
//       //: Request with provided parameters already exists
//       REQUEST_ALREADY_EXISTS = -7,
//       //: Account with provided account address does not exist
//       TARGET_ACCOUNT_NOT_FOUND = -8,
//       //: System configuration forbids KYC recovery
//       RECOVERY_NOT_ALLOWED = -10,
//       //: Only target account can update request
//       NOT_ALLOWED_TO_UPDATE_REQUEST = -11,
//       //: There is no request with such ID
//       REQUEST_NOT_FOUND = -12,
//       //: It is forbidden to change target account on update
//       INVALID_UPDATE_DATA = -13,
//       //: It is forbidden to set `allTasks` on update
//       NOT_ALLOWED_TO_SET_TASKS_ON_UPDATE = -14
//   };
//
// ===========================================================================
xdr.enum("CreateKycRecoveryRequestResultCode", {
  success: 0,
  invalidCreatorDetail: -1,
  kycRecoveryTasksNotFound: -2,
  noSignerDatum: -3,
  signerDuplication: -4,
  invalidWeight: -5,
  invalidDetail: -6,
  requestAlreadyExist: -7,
  targetAccountNotFound: -8,
  recoveryNotAllowed: -10,
  notAllowedToUpdateRequest: -11,
  requestNotFound: -12,
  invalidUpdateDatum: -13,
  notAllowedToSetTasksOnUpdate: -14,
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
xdr.union("CreateKycRecoveryRequestResultSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
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
//           //: id of the created request
//           uint64 requestID;
//   
//           //: Indicates whether or not the KYC Recovery request was auto approved and fulfilled
//           bool fulfilled;
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
xdr.struct("CreateKycRecoveryRequestResultSuccess", [
  ["requestId", xdr.lookup("Uint64")],
  ["fulfilled", xdr.bool()],
  ["ext", xdr.lookup("CreateKycRecoveryRequestResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   //: Result of operation applying
//   union CreateKYCRecoveryRequestResult switch (CreateKYCRecoveryRequestResultCode code)
//   {
//   case SUCCESS:
//       //: Is used to pass useful params if operation is success
//       struct {
//           //: id of the created request
//           uint64 requestID;
//   
//           //: Indicates whether or not the KYC Recovery request was auto approved and fulfilled
//           bool fulfilled;
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
xdr.union("CreateKycRecoveryRequestResult", {
  switchOn: xdr.lookup("CreateKycRecoveryRequestResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("CreateKycRecoveryRequestResultSuccess"),
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
//   //: CreateManageLimitsRequestOp is used to create a reviewable request which, after approval, will update the limits set in the system
//   struct CreateManageLimitsRequestOp
//   {
//       //: Body of the `UpdateLimits` reviewable request to be created
//       LimitsUpdateRequest manageLimitsRequest;
//   
//       //: (optional) Bit mask whose flags must be cleared in order for ManageLimits request to be approved, which will be used instead of value from the key-value pair 
//       //: by key `limits_update_tasks`
//       uint32* allTasks;
//       //: ID of the LimitsUpdateRequest
//       //: If `requestID == 0`, operation creates a new limits entry; otherwise, it updates the existing one
//       uint64 requestID;
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
xdr.struct("CreateManageLimitsRequestOp", [
  ["manageLimitsRequest", xdr.lookup("LimitsUpdateRequest")],
  ["allTasks", xdr.option(xdr.lookup("Uint32"))],
  ["requestId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("CreateManageLimitsRequestOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes for CreateManageLimitsRequest operation
//   enum CreateManageLimitsRequestResultCode
//   {
//       // codes considered as "success" for the operation
//       //: Operation was successfully applied and ManageLimitsRequest was successfully created
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: There is another manage limits request for the source account
//       MANAGE_LIMITS_REQUEST_REFERENCE_DUPLICATION = -1,
//       //: There is no request with such ID
//       MANAGE_LIMITS_REQUEST_NOT_FOUND = -2,
//       //: Details must be in a valid JSON format
//       INVALID_CREATOR_DETAILS = -3,
//       //: Tasks are not set in the system (i.e., it is not allowed to perform the limits update request)
//       LIMITS_UPDATE_TASKS_NOT_FOUND = -5,
//       //: Cannot set allTasks on the rejected request update
//       NOT_ALLOWED_TO_SET_TASKS_ON_UPDATE = -6,
//       //: 0 value is either not allowed for `allTasks` or for the value entry received by key `limits_update_tasks`
//       LIMITS_UPDATE_ZERO_TASKS_NOT_ALLOWED = -7
//   };
//
// ===========================================================================
xdr.enum("CreateManageLimitsRequestResultCode", {
  success: 0,
  manageLimitsRequestReferenceDuplication: -1,
  manageLimitsRequestNotFound: -2,
  invalidCreatorDetail: -3,
  limitsUpdateTasksNotFound: -5,
  notAllowedToSetTasksOnUpdate: -6,
  limitsUpdateZeroTasksNotAllowed: -7,
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
//           //: ID of the created manage limits request
//           uint64 manageLimitsRequestID;
//           //: Indicates whether or not the `limits update request` request was auto approved and fulfilled
//           bool fulfilled;
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
xdr.struct("CreateManageLimitsRequestResultSuccess", [
  ["manageLimitsRequestId", xdr.lookup("Uint64")],
  ["fulfilled", xdr.bool()],
  ["ext", xdr.lookup("CreateManageLimitsRequestResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   //: `CreateManageLimitsRequestResult` represents the result of the `CreateManageLimitsRequestOp` with corresponding details based on given `CreateManageLimitsRequestResultCode`
//   union CreateManageLimitsRequestResult switch (CreateManageLimitsRequestResultCode code)
//   {
//   case SUCCESS:
//       struct {
//           //: ID of the created manage limits request
//           uint64 manageLimitsRequestID;
//           //: Indicates whether or not the `limits update request` request was auto approved and fulfilled
//           bool fulfilled;
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
//   //: CreatePreIssuanceRequestOp is used to create a reviewable request,
//   //: which, after admin's approval, will change `availableForIssuance` amount of asset
//   struct CreatePreIssuanceRequestOp
//   {
//       //: Body of PreIssuanceRequest to be created
//       PreIssuanceRequest request;
//   
//       //: (optional) Bit mask whose flags must be cleared in order for PreIssuanceRequest to be approved, which will be used by key `preissuance_tasks` 
//       //: instead of key-value
//       uint32* allTasks;
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
xdr.struct("CreatePreIssuanceRequestOp", [
  ["request", xdr.lookup("PreIssuanceRequest")],
  ["allTasks", xdr.option(xdr.lookup("Uint32"))],
  ["ext", xdr.lookup("CreatePreIssuanceRequestOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of CreatePreIssuanceRequestOp
//   enum CreatePreIssuanceRequestResultCode
//   {
//       //: Preissuance request is either successfully created
//       //: or auto approved if pending tasks of requests is equal to 0
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: There is no asset with such an asset code
//       ASSET_NOT_FOUND = -1,
//       //: Preissuance request with such reference already exists
//       REFERENCE_DUPLICATION = -2,      // reference is already used
//       //: Source of operation must be the owner of the asset
//       NOT_AUTHORIZED_UPLOAD = -3,      // tries to preissue asset for not owned asset
//       //: Only current preissuer can perform preissuance
//       INVALID_SIGNATURE = -4,
//       //: The summ of preissue, issued, pendingIssuance, available for issuance amounts must not exceed max issued amount
//       EXCEEDED_MAX_AMOUNT = -5,
//       //: The preissue amount in the preissuance request must exceed 0
//       INVALID_AMOUNT = -6,             // amount is 0
//       //: The reference field must not be empty
//       INVALID_REFERENCE = -7,
//       //: Preissue amount must fit the precision of an asset to be issued
//       INCORRECT_AMOUNT_PRECISION = -8,  // amount does not fit this asset's precision
//       //: Preissuance tasks are not set in the system (i.e., it is not allowed to perform the preissuance)
//       PREISSUANCE_TASKS_NOT_FOUND = -9,
//       //: `creatorDetails` must be valid json structure
//       INVALID_CREATOR_DETAILS = -10
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
  invalidCreatorDetail: -10,
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
//   struct
//       {
//           //: ID of created or updated request
//           uint64 requestID;
//           //: Indicates whether or not the request was auto approved and fulfilled
//           bool fulfilled;
//           //: reserved for future use
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
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
//   //: Result of `CreatePreIssuanceRequest` operation application along with the result code
//   union CreatePreIssuanceRequestResult switch (CreatePreIssuanceRequestResultCode code)
//   {
//   case SUCCESS:
//       //: Result of successful application of `CreatePreIssuanceRequest` operation
//       struct
//       {
//           //: ID of created or updated request
//           uint64 requestID;
//           //: Indicates whether or not the request was auto approved and fulfilled
//           bool fulfilled;
//           //: reserved for future use
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
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
//   //: CreateSaleCreationRequest operation creates SaleCreationRequest or updates the rejected request
//   struct CreateSaleCreationRequestOp
//   {
//       //: ID of the SaleCreationRequest. If set to 0, a new request is created
//       uint64 requestID;
//       //: SaleCreationRequest details
//       SaleCreationRequest request;
//       //: (optional) Bit mask whose flags must be cleared in order for CreateSale request to be approved, which will be used by key sale_create_tasks:<asset_code>
//       //: instead of key-value
//       uint32* allTasks;
//       
//       //: Reserved for future use
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
xdr.struct("CreateSaleCreationRequestOp", [
  ["requestId", xdr.lookup("Uint64")],
  ["request", xdr.lookup("SaleCreationRequest")],
  ["allTasks", xdr.option(xdr.lookup("Uint32"))],
  ["ext", xdr.lookup("CreateSaleCreationRequestOpExt")],
]);

// === xdr source ============================================================
//
//   //: CreateSaleCreationRequest result codes
//   enum CreateSaleCreationRequestResultCode
//   {
//       // codes considered as "success" for the operation
//       //: CreateSaleCreationRequest operation was successfully applied
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: Trying to update a reviewable request that does not exist
//       REQUEST_NOT_FOUND = -1,
//       //: Trying to create a sale for an asset that does not exist
//       BASE_ASSET_OR_ASSET_REQUEST_NOT_FOUND = -2,
//       //: Trying to create a sale either for a non-existing quote asset or for a non-existing asset pair
//       QUOTE_ASSET_NOT_FOUND = -3,
//       //: Trying to create a sale with start time > end time
//       START_END_INVALID = -4,
//       //: Trying to create a sale with end time in the past
//       INVALID_END = -5,
//       //: Trying to create a sale with 0 price
//       INVALID_PRICE = -6,
//       //: Trying to create a sale with hard cap < soft cap
//       INVALID_CAP = -7,
//       //: Max issuance amount is less than sale's soft cap
//       INSUFFICIENT_MAX_ISSUANCE = -8,
//       //: Trying to create a sale with either an invalid asset code of one of the assets or with a base asset that is the same as one of the quote assets 
//       INVALID_ASSET_PAIR = -9,
//       //: Deprecated
//       REQUEST_OR_SALE_ALREADY_EXISTS = -10,
//       //: Trying to create SaleCreationRequest with preissued amount that is less than the hard cap
//       INSUFFICIENT_PREISSUED = -11,
//       //: Creator details are not in a valid JSON format
//       INVALID_CREATOR_DETAILS = -12,
//       //: Version specified in the request is not supported yet
//       VERSION_IS_NOT_SUPPORTED_YET = -13,
//       //: Tasks for the sale creation request were neither provided in the request nor loaded through KeyValue
//       SALE_CREATE_TASKS_NOT_FOUND = -14,
//       //: It is not allowed to set all tasks on rejected SaleCreationRequest update
//       NOT_ALLOWED_TO_SET_TASKS_ON_UPDATE = -15,
//       //: Auto review failed due to a particular reason (e.g., hard cap exceeded either max issuance amount or preissued amount of an asset)
//       AUTO_REVIEW_FAILED = -16,
//       //: Not allowed to pass more account sale rule than allowed by `max_sale_rules_number` key value
//       EXCEEDED_MAX_RULES_SIZE = -17,
//       //: Not allowed to pass rules with the same ledger key and null accountID
//       GLOBAL_SPECIFIC_RULE_DUPLICATION = -18,
//       //: Not allowed to pass rules with the same accountID and ledger key
//       ACCOUNT_SPECIFIC_RULE_DUPLICATION = -19,
//       //: Not allowed to pass rules with out global one (`accountID == null`)
//       GLOBAL_SPECIFIC_RULE_REQUIRED = -20,
//       //: There is no account with id specified in sale rules
//       ACCOUNT_NOT_FOUND = -21
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
  invalidCreatorDetail: -12,
  versionIsNotSupportedYet: -13,
  saleCreateTasksNotFound: -14,
  notAllowedToSetTasksOnUpdate: -15,
  autoReviewFailed: -16,
  exceededMaxRulesSize: -17,
  globalSpecificRuleDuplication: -18,
  accountSpecificRuleDuplication: -19,
  globalSpecificRuleRequired: -20,
  accountNotFound: -21,
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
//   //: Result of the successful application of CreateSaleCreationRequest operation
//   struct CreateSaleCreationSuccess {
//       //: ID of the SaleCreation request
//       uint64 requestID;
//       //: ID of a newly created sale (if the sale creation request has been auto approved)
//       uint64 saleID;
//       //: Indicates whether or not the sale creation request was auto approved and fulfilled
//       bool fulfilled;
//       union switch (LedgerVersion v)
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
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreateSaleCreationAutoReviewFailedExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: specifies details on why an auto review has failed
//   struct CreateSaleCreationAutoReviewFailed {
//       //: auto review result
//       ReviewRequestResult reviewRequestRequest;
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
xdr.struct("CreateSaleCreationAutoReviewFailed", [
  ["reviewRequestRequest", xdr.lookup("ReviewRequestResult")],
  ["ext", xdr.lookup("CreateSaleCreationAutoReviewFailedExt")],
]);

// === xdr source ============================================================
//
//   //: CreateSaleCreationRequest result along with the result code
//   union CreateSaleCreationRequestResult switch (CreateSaleCreationRequestResultCode code)
//   {
//   case SUCCESS:
//       CreateSaleCreationSuccess success;
//   case AUTO_REVIEW_FAILED:
//       CreateSaleCreationAutoReviewFailed autoReviewFailed;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("CreateSaleCreationRequestResult", {
  switchOn: xdr.lookup("CreateSaleCreationRequestResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
    ["autoReviewFailed", "autoReviewFailed"],
  ],
  arms: {
    success: xdr.lookup("CreateSaleCreationSuccess"),
    autoReviewFailed: xdr.lookup("CreateSaleCreationAutoReviewFailed"),
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
//   //: CreateWithdrawalRequest operation is used to create a reviewable request,
//   //: which, after reviewer's approval, will charge the specified amount from balance and send it to external wallet/account
//   struct CreateWithdrawalRequestOp
//   {
//       //: Withdrawal request to create 
//       WithdrawalRequest request;
//       //: (optional) Bit mask whose flags must be cleared in order for WithdrawalRequest to be approved, which will be used by key withdrawal_tasks:<asset_code> 
//       //: instead of key-value
//       uint32* allTasks;
//       //: Reserved for future use
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
xdr.struct("CreateWithdrawalRequestOp", [
  ["request", xdr.lookup("WithdrawalRequest")],
  ["allTasks", xdr.option(xdr.lookup("Uint32"))],
  ["ext", xdr.lookup("CreateWithdrawalRequestOpExt")],
]);

// === xdr source ============================================================
//
//   //: CreateWithdrawalRequest operation result codes
//   enum CreateWithdrawalRequestResultCode
//   {
//       // codes considered as "success" for the operation
//       //: CreateWithdrawalRequest operation successfully applied
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
//       //: Deprecated
//       CONVERSION_PRICE_IS_NOT_AVAILABLE = -5, // failed to find conversion price - conversion is not allowed
//       //: Expected fee and actual fee mismatch
//       FEE_MISMATCHED = -6,
//       //: Deprecated
//       CONVERSION_OVERFLOW = -7,
//       //: Deprecated
//       CONVERTED_AMOUNT_MISMATCHED = -8,
//       //: Trying to lock balance, locked amount would exceed UINT64_MAX
//       BALANCE_LOCK_OVERFLOW = -9,
//       //: Insufficient balance to withdraw the requested amount
//       UNDERFUNDED = -10,
//       //: Non zero universal amount
//       INVALID_UNIVERSAL_AMOUNT = -11,
//       //: Applying operation would overflow statistics
//       STATS_OVERFLOW = -12,
//       //: Applying operation would exceed limits set in the system
//       LIMITS_EXCEEDED = -13,
//       //: Deprecated
//       INVALID_PRE_CONFIRMATION_DETAILS = -14, // it's not allowed to pass pre confirmation details
//       //: Amount withdrawn is smaller than the minimal withdrawable amount set in the system
//       LOWER_BOUND_NOT_EXCEEDED = -15,
//       //: Withdrawal tasks are not set in the system, i.e. it's not allowed to perform withdraw operations
//       WITHDRAWAL_TASKS_NOT_FOUND = -16,
//       //: Not allowed to set withdrawal tasks on the request creation
//       NOT_ALLOWED_TO_SET_WITHDRAWAL_TASKS = -17,
//       //: Not allowed to set zero tasks
//       WITHDRAWAL_ZERO_TASKS_NOT_ALLOWED = -18
//   };
//
// ===========================================================================
xdr.enum("CreateWithdrawalRequestResultCode", {
  success: 0,
  invalidAmount: -1,
  invalidCreatorDetail: -2,
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
//   //: Result of the successful withdrawal request creation
//   struct CreateWithdrawalSuccess {
//       //: ID of a newly created WithdrawalRequest
//       uint64 requestID;
//       //: Indicates whether or not the withdrawal request was auto approved and fulfilled
//       bool fulfilled;
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
xdr.struct("CreateWithdrawalSuccess", [
  ["requestId", xdr.lookup("Uint64")],
  ["fulfilled", xdr.bool()],
  ["ext", xdr.lookup("CreateWithdrawalSuccessExt")],
]);

// === xdr source ============================================================
//
//   //: Result of applying CreateWithdrawalRequst operation along with the result code
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
//       AccountID account;
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
  ["account", xdr.lookup("AccountId")],
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
//   //: Actions that can be performed with account specific rule
//   enum ManageAccountSpecificRuleAction
//   {
//       CREATE = 0,
//       REMOVE = 1
//   };
//
// ===========================================================================
xdr.enum("ManageAccountSpecificRuleAction", {
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
xdr.union("CreateAccountSpecificRuleDataExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: CreateAccountSpecificRuleData is used to pass necessary params to create a new account specific rule
//   struct CreateAccountSpecificRuleData
//   {
//       //: ledgerKey is used to specify an entity with primary key that can be used through operations
//       LedgerKey ledgerKey;
//       //: Certain account for which rule is applied, null means rule is global
//       AccountID* accountID;
//       //: True if such rule is deniable, otherwise allows
//       bool forbids;
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
xdr.struct("CreateAccountSpecificRuleData", [
  ["ledgerKey", xdr.lookup("LedgerKey")],
  ["accountId", xdr.option(xdr.lookup("AccountId"))],
  ["forbids", xdr.bool()],
  ["ext", xdr.lookup("CreateAccountSpecificRuleDataExt")],
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
xdr.union("RemoveAccountSpecificRuleDataExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: RemoveAccountSpecificRuleData is used to pass necessary params to remove existing account specific rule
//   struct RemoveAccountSpecificRuleData
//   {
//       //: Identifier of existing account specific rule
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
xdr.struct("RemoveAccountSpecificRuleData", [
  ["ruleId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("RemoveAccountSpecificRuleDataExt")],
]);

// === xdr source ============================================================
//
//   union switch (ManageAccountSpecificRuleAction action)
//       {
//       case CREATE:
//           CreateAccountSpecificRuleData createData;
//       case REMOVE:
//           RemoveAccountSpecificRuleData removeData;
//       }
//
// ===========================================================================
xdr.union("ManageAccountSpecificRuleOpData", {
  switchOn: xdr.lookup("ManageAccountSpecificRuleAction"),
  switchName: "action",
  switches: [
    ["create", "createData"],
    ["remove", "removeData"],
  ],
  arms: {
    createData: xdr.lookup("CreateAccountSpecificRuleData"),
    removeData: xdr.lookup("RemoveAccountSpecificRuleData"),
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
xdr.union("ManageAccountSpecificRuleOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: ManageAccountSpecificRuleOp is used to create or remove account specific rule
//   struct ManageAccountSpecificRuleOp
//   {
//       //: data is used to pass one of `ManageAccountSpecificRuleAction` with required params
//       union switch (ManageAccountSpecificRuleAction action)
//       {
//       case CREATE:
//           CreateAccountSpecificRuleData createData;
//       case REMOVE:
//           RemoveAccountSpecificRuleData removeData;
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
xdr.struct("ManageAccountSpecificRuleOp", [
  ["data", xdr.lookup("ManageAccountSpecificRuleOpData")],
  ["ext", xdr.lookup("ManageAccountSpecificRuleOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of ManageAccountSpecificRuleResult
//   enum ManageAccountSpecificRuleResultCode
//   {
//       //: Means that specified action in `data` of ManageAccountSpecificRuleOp was successfully performed
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: There is no rule with such id
//       NOT_FOUND = -1,
//       //: There is no sale with such id
//       SALE_NOT_FOUND = -2,
//       //: Only entry (sale) owner or admin can perform such operation
//       NOT_AUTHORIZED = -3,
//       //: Not allowed to create duplicated rules
//       ALREADY_EXISTS = -4,
//       //: Not allowed to create rule with the same accountID and ledger key, but different forbids value
//       REVERSED_ALREADY_EXISTS = -5,
//       //: Not allowed to use such entry type in ledger key
//       ENTRY_TYPE_NOT_SUPPORTED = -6,
//       //: There is no account rule with such id
//       ACCOUNT_NOT_FOUND = -7,
//       //: Version of entry does not allow to add specific rules
//       SPECIFIC_RULE_NOT_SUPPORTED = -8,
//       //: Not allowed to remove global rule
//       REMOVING_GLOBAL_RULE_FORBIDDEN = -9
//   };
//
// ===========================================================================
xdr.enum("ManageAccountSpecificRuleResultCode", {
  success: 0,
  notFound: -1,
  saleNotFound: -2,
  notAuthorized: -3,
  alreadyExist: -4,
  reversedAlreadyExist: -5,
  entryTypeNotSupported: -6,
  accountNotFound: -7,
  specificRuleNotSupported: -8,
  removingGlobalRuleForbidden: -9,
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
xdr.union("ManageAccountSpecificRuleResultSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
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
xdr.struct("ManageAccountSpecificRuleResultSuccess", [
  ["ruleId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("ManageAccountSpecificRuleResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   //: Result of operation applying
//   union ManageAccountSpecificRuleResult switch (ManageAccountSpecificRuleResultCode code)
//   {
//   case SUCCESS:
//       //: Is used to pass useful params if operation is success
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
xdr.union("ManageAccountSpecificRuleResult", {
  switchOn: xdr.lookup("ManageAccountSpecificRuleResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("ManageAccountSpecificRuleResultSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   //: Actions that can be performed on the asset pair
//   enum ManageAssetPairAction
//   {
//       //: Create new asset pair
//       CREATE = 0,
//       //: Update price of the asset pair
//       UPDATE_PRICE = 1,
//       //: Update asset pair policies bitmask
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
//   //: `ManageAssetPairOp` either creates new asset pairs or updates prices or policies of existing [asset pairs](#operation/assetPairResources)
//   struct ManageAssetPairOp
//   {
//       //: Defines a ManageBalanceAction that will be performed on an asset pair
//       ManageAssetPairAction action;
//       //: Defines a base asset of an asset pair
//       AssetCode base;
//       //: Defines a base asset of an asset pair
//       AssetCode quote;
//   
//       //: New physical price of the asset pair which would be set after successful `ManageAssetPairOp` application
//       int64 physicalPrice;
//   
//       //: New correction of the asset pair physical price in percents
//       int64 physicalPriceCorrection;
//       //: New maximal price step of asset pair
//       int64 maxPriceStep;
//   
//       //: Bitmask of asset policies set by the creator or corrected by manage asset operations
//       int32 policies;
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
//   //: Result codes for ManageAssetPair operation
//   enum ManageAssetPairResultCode
//   {
//       // codes considered as "success" for the operation
//       //: Indicates that `ManageAssetPairOp` has been successfully applied
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: Failed to find an asset pair with given `base` and `quote` asset codes
//       NOT_FOUND = -1,
//       //: Asset pair with given `base` and `quote` asset codes is already present in the system
//       ALREADY_EXISTS = -2,
//       //: Invalid input (e.g. physicalPrice < 0 or physicalPriceCorrection < 0 or maxPriceStep is not in an interval [0..100])
//       MALFORMED = -3,
//       //: Either `base` or `quote`  asset code  (or both) is invalid 
//       //: (e.g. asset code does not consist of alphanumeric symbols)
//       INVALID_ASSET = -4,
//       //: `action` is not in the set of valid actions (see `ManageAssetPairAction`)
//       INVALID_ACTION = -5,
//       //: `policies` field is invalid (`policies < 0`)
//       INVALID_POLICIES = -6,
//       //: Asset with such code is not found
//       ASSET_NOT_FOUND = -7,
//       //: Not allowed for base and quote asset to be the same
//       SAME_ASSET = -8
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
  sameAsset: -8,
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
//   //: `ManageAssetPairSuccess` represents a successful result of `ManageAssetPairOp`
//   struct ManageAssetPairSuccess
//   {
//       //: Price of an asset pair after the operation
//       int64 currentPrice;
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
xdr.struct("ManageAssetPairSuccess", [
  ["currentPrice", xdr.lookup("Int64")],
  ["ext", xdr.lookup("ManageAssetPairSuccessExt")],
]);

// === xdr source ============================================================
//
//   //: `ManageAssetPairResult` defines the result of `ManageBalanceOp` based on given `ManageAssetPairResultCode`
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
//   //: ManageAssetAction is used to specify an action to be performed with an asset or asset create/update request
//   enum ManageAssetAction
//   {
//       CREATE_ASSET_CREATION_REQUEST = 0,
//       CREATE_ASSET_UPDATE_REQUEST = 1,
//       CANCEL_ASSET_REQUEST = 2,
//       CHANGE_PREISSUED_ASSET_SIGNER = 3,
//       UPDATE_MAX_ISSUANCE = 4
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
//   //: CancelAssetRequest is used to cancel an `UPDATE_ASSET` or `CREATE_ASSET` request
//   struct CancelAssetRequest
//   {
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
//   //: UpdateMaxIssuance is used to update max issuance amount of an asset.
//   struct UpdateMaxIssuance
//   {
//       //: `assetCode` defines an asset entry that will be updated
//       AssetCode assetCode;
//       //: new max issuance amount for an asset entry
//       uint64 maxIssuanceAmount;
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
xdr.struct("UpdateMaxIssuance", [
  ["assetCode", xdr.lookup("AssetCode")],
  ["maxIssuanceAmount", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("UpdateMaxIssuanceExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//               {
//               case EMPTY_VERSION:
//                   void;
//               }
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
//   struct
//           {
//               //: Is used to pass required fields to create an asset entry
//               AssetCreationRequest createAsset;
//               //: (optional) Bit mask whose flags must be cleared in order for `CREATE_ASSET` request to be approved, which will be used by key `asset_create_tasks`
//               //: instead of key-value
//               uint32* allTasks;
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
xdr.struct("ManageAssetOpCreateAssetCreationRequest", [
  ["createAsset", xdr.lookup("AssetCreationRequest")],
  ["allTasks", xdr.option(xdr.lookup("Uint32"))],
  ["ext", xdr.lookup("ManageAssetOpCreateAssetCreationRequestExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//               {
//               case EMPTY_VERSION:
//                   void;
//               }
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
//   struct
//           {
//               //: Is used to pass required fields to update an asset entry
//               AssetUpdateRequest updateAsset;
//               //: (optional) Bit mask whose flags must be cleared in order for `UPDATE_ASSET` request to be approved, which will be used
//               //: instead of key-value by key `asset_update_tasks`
//               uint32* allTasks;
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
xdr.struct("ManageAssetOpCreateAssetUpdateRequest", [
  ["updateAsset", xdr.lookup("AssetUpdateRequest")],
  ["allTasks", xdr.option(xdr.lookup("Uint32"))],
  ["ext", xdr.lookup("ManageAssetOpCreateAssetUpdateRequestExt")],
]);

// === xdr source ============================================================
//
//   union switch (ManageAssetAction action)
//       {
//       case CREATE_ASSET_CREATION_REQUEST:
//           //: Is used to pass required fields for `CREATE_ASSET`
//           struct
//           {
//               //: Is used to pass required fields to create an asset entry
//               AssetCreationRequest createAsset;
//               //: (optional) Bit mask whose flags must be cleared in order for `CREATE_ASSET` request to be approved, which will be used by key `asset_create_tasks`
//               //: instead of key-value
//               uint32* allTasks;
//   
//               //: reserved for future use
//               union switch (LedgerVersion v)
//               {
//               case EMPTY_VERSION:
//                   void;
//               }
//               ext;
//           } createAssetCreationRequest;
//       case CREATE_ASSET_UPDATE_REQUEST:
//           //: Is used to pass needed fields for `UPDATE_ASSET`
//           struct
//           {
//               //: Is used to pass required fields to update an asset entry
//               AssetUpdateRequest updateAsset;
//               //: (optional) Bit mask whose flags must be cleared in order for `UPDATE_ASSET` request to be approved, which will be used
//               //: instead of key-value by key `asset_update_tasks`
//               uint32* allTasks;
//   
//               //: reserved for future use
//               union switch (LedgerVersion v)
//               {
//               case EMPTY_VERSION:
//                   void;
//               }
//               ext;
//           } createAssetUpdateRequest;
//       case CANCEL_ASSET_REQUEST:
//           //: Reserved for future use
//           CancelAssetRequest cancelRequest;
//       case CHANGE_PREISSUED_ASSET_SIGNER:
//           //: Is used to pass required fields to change an asset pre issuer
//           AssetChangePreissuedSigner changePreissuedSigner;
//       case UPDATE_MAX_ISSUANCE:
//           //: Is used to update max issuance of asset
//           UpdateMaxIssuance updateMaxIssuance;
//       }
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
//   //: ManageAssetOp is used to:
//   //: * create or update `CREATE_ASSET` request;
//   //: * create or update `UPDATE_ASSET` request;
//   //: * cancel `CREATE_ASSET` or `UPDATE_ASSET` request
//   //: * change asset pre issuer
//   //: * update max issuance of an asset
//   struct ManageAssetOp
//   {
//       //: ID of a reviewable request
//       //: If `requestID == 0`, operation creates a new reviewable request; otherwise, it updates the existing one 
//       uint64 requestID;
//   
//       //: data is used to pass one of `ManageAssetAction` with required params
//       union switch (ManageAssetAction action)
//       {
//       case CREATE_ASSET_CREATION_REQUEST:
//           //: Is used to pass required fields for `CREATE_ASSET`
//           struct
//           {
//               //: Is used to pass required fields to create an asset entry
//               AssetCreationRequest createAsset;
//               //: (optional) Bit mask whose flags must be cleared in order for `CREATE_ASSET` request to be approved, which will be used by key `asset_create_tasks`
//               //: instead of key-value
//               uint32* allTasks;
//   
//               //: reserved for future use
//               union switch (LedgerVersion v)
//               {
//               case EMPTY_VERSION:
//                   void;
//               }
//               ext;
//           } createAssetCreationRequest;
//       case CREATE_ASSET_UPDATE_REQUEST:
//           //: Is used to pass needed fields for `UPDATE_ASSET`
//           struct
//           {
//               //: Is used to pass required fields to update an asset entry
//               AssetUpdateRequest updateAsset;
//               //: (optional) Bit mask whose flags must be cleared in order for `UPDATE_ASSET` request to be approved, which will be used
//               //: instead of key-value by key `asset_update_tasks`
//               uint32* allTasks;
//   
//               //: reserved for future use
//               union switch (LedgerVersion v)
//               {
//               case EMPTY_VERSION:
//                   void;
//               }
//               ext;
//           } createAssetUpdateRequest;
//       case CANCEL_ASSET_REQUEST:
//           //: Reserved for future use
//           CancelAssetRequest cancelRequest;
//       case CHANGE_PREISSUED_ASSET_SIGNER:
//           //: Is used to pass required fields to change an asset pre issuer
//           AssetChangePreissuedSigner changePreissuedSigner;
//       case UPDATE_MAX_ISSUANCE:
//           //: Is used to update max issuance of asset
//           UpdateMaxIssuance updateMaxIssuance;
//       } request;
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
xdr.struct("ManageAssetOp", [
  ["requestId", xdr.lookup("Uint64")],
  ["request", xdr.lookup("ManageAssetOpRequest")],
  ["ext", xdr.lookup("ManageAssetOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of ManageAssetOp
//   enum ManageAssetResultCode
//   {
//       //: Specified action in `data` of ManageSignerOp was successfully performed
//       SUCCESS = 0,                       // request was successfully created/updated/canceled
//   
//       // codes considered as "failure" for an operation
//       //: There is no `CREATE_ASSET` or `UPDATE_ASSET` request with such id
//       REQUEST_NOT_FOUND = -1,           // failed to find an asset request with such id
//       //: only asset pre issuer can manage asset
//       INVALID_SIGNATURE = -2,
//       //: It is not allowed to create an asset with a code that is already used for another asset
//       ASSET_ALREADY_EXISTS = -3,	      // asset with such code already exist
//       //: It is not allowed to set max issuance amount that is
//       //: less than the sum of issued, pending issuance and available for issuance amounts
//       INVALID_MAX_ISSUANCE_AMOUNT = -4, // max issuance amount is 0
//       //: It is not allowed to use an asset code that is empty or contains space
//       INVALID_CODE = -5,                // asset code is invalid (empty or contains space)
//       //: It is not allowed to set a pre issuer that is the same as an existing one
//       INVALID_PRE_ISSUER = -6,          // pre issuer is the same as an existing one
//       //: It is not allowed to set policies that are not declared
//       INVALID_POLICIES = -7,            // asset policies (has flag which does not belong to AssetPolicies enum)
//       //: There is no asset with such code
//       ASSET_NOT_FOUND = -8,             // asset does not exists
//       //: Request for such asset already exists
//       REQUEST_ALREADY_EXISTS = -9,      // request for creation of unique entry already exists
//       //: It is not allowed to create two or more assets with `STATS_QUOTE_ASSET` policy
//       STATS_ASSET_ALREADY_EXISTS = -10, // statistics quote asset already exists
//       //: It is not allowed to set a pre issued amount that is greater than the max issuance amount
//       INITIAL_PREISSUED_EXCEEDS_MAX_ISSUANCE = -11, // initial pre issued amount exceeds max issuance amount
//       //: It is not allowed to use details with invalid json structure
//       INVALID_CREATOR_DETAILS = -12,                        // details must be a valid json
//       //: It is not allowed to set a trailing digits count greater than the maximum trailing digits count (6 at the moment)
//       INVALID_TRAILING_DIGITS_COUNT = -13,          // invalid number of trailing digits
//       //: Pre issued amount precision and asset precision are mismatched
//       INVALID_PREISSUED_AMOUNT_PRECISION = -14,
//       //: Maximum issuance amount precision and asset precision are mismatched
//       INVALID_MAX_ISSUANCE_AMOUNT_PRECISION = -15,
//       //: There is no value in the key value by `asset_create_tasks` key
//       //: (i.e., it is not allowed to perform asset creation)
//       ASSET_CREATE_TASKS_NOT_FOUND = -16,
//       //: There is no value in key value by `asset_update_tasks` key,
//       //:  (i.e., it is not allowed to perform asset update)
//       ASSET_UPDATE_TASKS_NOT_FOUND = -17,
//       //: It is not allowed to set `allTasks` on the update of a rejected request.
//       NOT_ALLOWED_TO_SET_TASKS_ON_UPDATE = -18
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
  invalidCreatorDetail: -12,
  invalidTrailingDigitsCount: -13,
  invalidPreissuedAmountPrecision: -14,
  invalidMaxIssuanceAmountPrecision: -15,
  assetCreateTasksNotFound: -16,
  assetUpdateTasksNotFound: -17,
  notAllowedToSetTasksOnUpdate: -18,
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
//   //: Is used to pass useful params after the successful operation application
//   struct ManageAssetSuccess
//   {
//       //: ID of the request that was created in the process of operation application 
//       uint64 requestID;
//       //: True means that the request was applied and execution flow was successful
//       bool fulfilled;
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
xdr.struct("ManageAssetSuccess", [
  ["requestId", xdr.lookup("Uint64")],
  ["fulfilled", xdr.bool()],
  ["ext", xdr.lookup("ManageAssetSuccessExt")],
]);

// === xdr source ============================================================
//
//   //: Is used to return the result of operation application
//   union ManageAssetResult switch (ManageAssetResultCode code)
//   {
//   case SUCCESS:
//       //: Result of successful operation application
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
//   //: Actions that can be performed on balances
//   enum ManageBalanceAction
//   {
//       //: Create new balance
//       CREATE = 0,
//       //: Delete existing balance by ID. Is reserved and not implemented yet.
//       DELETE_BALANCE = 1,
//       //: Ensures that the balance will not be created if the balance of the provided asset exists and is attached to the provided account
//       CREATE_UNIQUE = 2
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
//   //: `ManageBalanceOp` applies an `action` of the `ManageBalanceAction` type on the balance of a particular `asset` (referenced to by its AssetCode)
//   //: of the `destination` account (referenced to by its AccountID)
//   struct ManageBalanceOp
//   {
//       //: Defines a ManageBalanceAction to be performed. `DELETE_BALANCE` is reserved and not implemented yet.
//       ManageBalanceAction action;
//       //: Defines an account whose balance will be managed
//       AccountID destination;
//       //: Defines an asset code of the balance to which `action` will be applied
//       AssetCode asset;
//       union switch (LedgerVersion v)
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
//   //: Result codes for the ManageBalance operation
//   enum ManageBalanceResultCode
//   {
//       // codes considered as "success" for the operation
//       //: Indicates that `ManageBalanceOp` is successfully applied
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: It is not allowed to delete a balance
//       MALFORMED = -1,
//       //: (deprecated)
//       NOT_FOUND = -2,
//       //: Cannot find an account provided by the `destination` AccountID
//       DESTINATION_NOT_FOUND = -3,
//       //: Cannot find an asset with a provided asset code
//       ASSET_NOT_FOUND = -4,
//       //: AssetCode `asset` is invalid (e.g. `AssetCode` does not consist of alphanumeric symbols)
//       INVALID_ASSET = -5,
//       //: Balance of the provided `asset` already exists and is owned by the `destination` account
//       BALANCE_ALREADY_EXISTS = -6,
//       //: version specified in the request is not supported yet
//       VERSION_IS_NOT_SUPPORTED_YET = -7
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
//   //: Actions that can be applied to a `CREATE_POLL` request
//   enum ManageCreatePollRequestAction
//   {
//       CREATE = 0,
//       CANCEL = 1
//   };
//
// ===========================================================================
xdr.enum("ManageCreatePollRequestAction", {
  create: 0,
  cancel: 1,
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
xdr.union("CreatePollRequestDataExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: CreatePollRequestData is used to pass necessary data to create a `CREATE_POLL` request
//   struct CreatePollRequestData
//   {
//       //: Body of `CREATE_POLL` request
//       CreatePollRequest request;
//   
//       //: Bit mask that will be used instead of the value from key-value entry by
//       //: `create_poll_tasks:<permissionType>` key
//       uint32* allTasks;
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
xdr.struct("CreatePollRequestData", [
  ["request", xdr.lookup("CreatePollRequest")],
  ["allTasks", xdr.option(xdr.lookup("Uint32"))],
  ["ext", xdr.lookup("CreatePollRequestDataExt")],
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
xdr.union("CancelPollRequestDataExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: CancelPollRequestData is used to pass necessary data to remove a `CREATE_POLL` request
//   struct CancelPollRequestData
//   {
//       //: ID of `CREATE_POLL` request to remove
//       uint64 requestID;
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
xdr.struct("CancelPollRequestData", [
  ["requestId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("CancelPollRequestDataExt")],
]);

// === xdr source ============================================================
//
//   union switch (ManageCreatePollRequestAction action)
//       {
//       case CREATE:
//           CreatePollRequestData createData;
//       case CANCEL:
//           CancelPollRequestData cancelData;
//       }
//
// ===========================================================================
xdr.union("ManageCreatePollRequestOpData", {
  switchOn: xdr.lookup("ManageCreatePollRequestAction"),
  switchName: "action",
  switches: [
    ["create", "createData"],
    ["cancel", "cancelData"],
  ],
  arms: {
    createData: xdr.lookup("CreatePollRequestData"),
    cancelData: xdr.lookup("CancelPollRequestData"),
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
xdr.union("ManageCreatePollRequestOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: ManageCreatePollRequestOp is used to create or remove a `CREATE_POLL` request
//   struct ManageCreatePollRequestOp
//   {
//       //: data is used to pass one of `ManageCreatePollRequestAction` with required params
//       union switch (ManageCreatePollRequestAction action)
//       {
//       case CREATE:
//           CreatePollRequestData createData;
//       case CANCEL:
//           CancelPollRequestData cancelData;
//       }
//       data;
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
xdr.struct("ManageCreatePollRequestOp", [
  ["data", xdr.lookup("ManageCreatePollRequestOpData")],
  ["ext", xdr.lookup("ManageCreatePollRequestOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of ManageCreatePollRequestOp
//   enum ManageCreatePollRequestResultCode
//   {
//       //: `CREATE_POLL` request has either been successfully created
//       //: or auto approved
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: Passed details have invalid json structure
//       INVALID_CREATOR_DETAILS = -1,
//       //: There is no `CREATE_POLL` request with such id
//       NOT_FOUND = -2,
//       //: Not allowed to create poll which has `endTime` not later than `startTime`
//       INVALID_DATES = -3,
//       //: Not allowed to create poll which `endTime` early than currentTime
//       INVALID_END_TIME = -4,
//       //: There is no account which such id
//       RESULT_PROVIDER_NOT_FOUND = -5,
//       //: There is no key-value entry by `create_poll_tasks:<permissionType>` key in the system;
//       //: configuration does not allow to create `CREATE_POLL` request with such `permissionType`
//       CREATE_POLL_TASKS_NOT_FOUND = -6,
//       //: Not allowed to create poll with zero number of choices
//       INVALID_NUMBER_OF_CHOICES = -7
//   };
//
// ===========================================================================
xdr.enum("ManageCreatePollRequestResultCode", {
  success: 0,
  invalidCreatorDetail: -1,
  notFound: -2,
  invalidDate: -3,
  invalidEndTime: -4,
  resultProviderNotFound: -5,
  createPollTasksNotFound: -6,
  invalidNumberOfChoice: -7,
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
xdr.union("CreatePollRequestResponseExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: CreatePollRequestResponse is used to pass useful fields after `CREATE_POLL` request creation
//   struct CreatePollRequestResponse
//   {
//       //: ID of a created request
//       uint64 requestID;
//   
//       //: Indicates whether or not the `CREATE_POLL` request was auto approved and fulfilled
//       //: True means that poll was successfully created
//       bool fulfilled;
//   
//       //: ID of created poll if request was fulfilled
//       uint64* pollID;
//   
//       //: reserved for the future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CreatePollRequestResponse", [
  ["requestId", xdr.lookup("Uint64")],
  ["fulfilled", xdr.bool()],
  ["pollId", xdr.option(xdr.lookup("Uint64"))],
  ["ext", xdr.lookup("CreatePollRequestResponseExt")],
]);

// === xdr source ============================================================
//
//   union switch (ManageCreatePollRequestAction action)
//       {
//       case CREATE:
//           CreatePollRequestResponse response;
//       case CANCEL:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageCreatePollRequestSuccessResultDetails", {
  switchOn: xdr.lookup("ManageCreatePollRequestAction"),
  switchName: "action",
  switches: [
    ["create", "response"],
    ["cancel", xdr.void()],
  ],
  arms: {
    response: xdr.lookup("CreatePollRequestResponse"),
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
xdr.union("ManageCreatePollRequestSuccessResultExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: Success result of operation application
//   struct ManageCreatePollRequestSuccessResult
//   {
//       //: `details` id used to pass useful fields
//       union switch (ManageCreatePollRequestAction action)
//       {
//       case CREATE:
//           CreatePollRequestResponse response;
//       case CANCEL:
//           void;
//       } details;
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
xdr.struct("ManageCreatePollRequestSuccessResult", [
  ["details", xdr.lookup("ManageCreatePollRequestSuccessResultDetails")],
  ["ext", xdr.lookup("ManageCreatePollRequestSuccessResultExt")],
]);

// === xdr source ============================================================
//
//   //: Result of ManageCreatePollRequestOp application
//   union ManageCreatePollRequestResult switch (ManageCreatePollRequestResultCode code)
//   {
//   case SUCCESS:
//       ManageCreatePollRequestSuccessResult success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ManageCreatePollRequestResult", {
  switchOn: xdr.lookup("ManageCreatePollRequestResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("ManageCreatePollRequestSuccessResult"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   //: Actions that can be performed with an external system account ID in the external system ID pool
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
//   //: CreateExternalSystemAccountIdPoolEntryActionInput is used to
//   //: pass necessary params to create a new external system account ID in the external system ID pool
//   struct CreateExternalSystemAccountIdPoolEntryActionInput
//   {
//       //: Type of external system, selected arbitrarily
//       int32 externalSystemType;
//       //: Data for external system binding
//       longstring data;
//       //: External system ID of the creator
//       uint64 parent;
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
//   //: DeleteExternalSystemAccountIdPoolEntryActionInput is used to
//   //: pass necessary params to remove an existing external system account ID in the external system ID pool
//   struct DeleteExternalSystemAccountIdPoolEntryActionInput
//   {
//       //: ID of an existing external system account ID pool
//       uint64 poolEntryID;
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
//   //: ManageExternalSystemAccountIdPoolEntryOp is used to create or remove
//   //: an external system account ID from the external system ID pool
//   struct ManageExternalSystemAccountIdPoolEntryOp
//   {
//       //: `actionInput` is used to pass one of
//       //: `ManageExternalSystemAccountIdPoolEntryAction` with required params
//       union switch (ManageExternalSystemAccountIdPoolEntryAction action)
//       {
//       case CREATE:
//           CreateExternalSystemAccountIdPoolEntryActionInput createExternalSystemAccountIdPoolEntryActionInput;
//       case REMOVE:
//           DeleteExternalSystemAccountIdPoolEntryActionInput deleteExternalSystemAccountIdPoolEntryActionInput;
//       } actionInput;
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
xdr.struct("ManageExternalSystemAccountIdPoolEntryOp", [
  ["actionInput", xdr.lookup("ManageExternalSystemAccountIdPoolEntryOpActionInput")],
  ["ext", xdr.lookup("ManageExternalSystemAccountIdPoolEntryOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of ManageExternalSystemAccountIdPoolEntryOp
//   enum ManageExternalSystemAccountIdPoolEntryResultCode
//   {
//       //: Specified action in `actionInput` of ManageExternalSystemAccountIdPoolEntryOp
//       //: was performed successfully 
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: It is not allowed to pass empty `data`
//       MALFORMED = -1,
//       //: It is not allowed to create external system account ID pool with duplicated
//       //: data and external system type
//       ALREADY_EXISTS = -2,
//       //: There is no external system account ID pool with passed ID
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
//   //: Success result of operation application
//   struct ManageExternalSystemAccountIdPoolEntrySuccess
//   {
//       //: ID of the created external system account ID pool
//       uint64 poolEntryID;
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
xdr.struct("ManageExternalSystemAccountIdPoolEntrySuccess", [
  ["poolEntryId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("ManageExternalSystemAccountIdPoolEntrySuccessExt")],
]);

// === xdr source ============================================================
//
//   //: Result of operation application
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
//   //: `ManageLimitsAction` defines which action can be performed on the Limits entry
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
//   //: `LimitsCreateDetails` is used in the system configuration to set limits (daily, weekly, montly, annual)
//   //: for different assets, operations (according to StatsOpType), particular account roles, particular accounts,
//   //: or globally (only if both parameters particular account role and paticular account are not specified)
//   struct LimitsCreateDetails
//   {
//       //: (optional) ID of an account role that will be imposed with limits
//       uint64*     accountRole;
//       //: (optional) ID of an account that will be imposed with limits
//       AccountID*  accountID;
//       //: Operation type to which limits will be applied. See `enum StatsOpType`
//       StatsOpType statsOpType;
//       //: `AssetCode` defines an asset to which limits will be applied
//       AssetCode   assetCode;
//       //: `isConvertNeeded` indicates whether the asset conversion is needed for the limits entry or not needed.
//       //: If this field is `true` - limits are applied to all balances of the account (to every asset account owns).
//       //: Otherwise limits from particular limits entry are applied only to the balances with `AssetCode` provided by entry.
//       bool        isConvertNeeded;
//   
//       //: daily out limit
//       uint64 dailyOut;
//       //: weekly out limit
//       uint64 weeklyOut;
//       //: monthly out limit
//       uint64 monthlyOut;
//       //: annual out limit
//       uint64 annualOut;
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
//   //: `ManageLimitsOp` is used to update limits set in the system
//   struct ManageLimitsOp
//   {
//       //: `details` defines all details of an operation based on given `ManageLimitsAction`
//       union switch (ManageLimitsAction action)
//       {
//       case CREATE:
//           LimitsCreateDetails limitsCreateDetails;
//       case REMOVE:
//           uint64 id;
//       } details;
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
xdr.struct("ManageLimitsOp", [
  ["details", xdr.lookup("ManageLimitsOpDetails")],
  ["ext", xdr.lookup("ManageLimitsOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes for ManageLimits operation
//   enum ManageLimitsResultCode
//   {
//       // codes considered as "success" for the operation
//       //: `ManageLimitsOp` was successfully applied
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: There is no account with passed ID
//       ACCOUNT_NOT_FOUND = -1,
//       //: Limits entry is not found
//       NOT_FOUND = -2,
//       //: There is no role with passed ID
//       ROLE_NOT_FOUND = -3,
//       //: Limits cannot be created for account ID and account role simultaneously
//       CANNOT_CREATE_FOR_ACC_ID_AND_ACC_TYPE = -4, // FIXME ACC_ROLE ?
//       //: Limits entry is invalid (e.g. weeklyOut is less than dailyOut)
//       INVALID_LIMITS = -5
//   };
//
// ===========================================================================
xdr.enum("ManageLimitsResultCode", {
  success: 0,
  accountNotFound: -1,
  notFound: -2,
  roleNotFound: -3,
  cannotCreateForAccIdAndAccType: -4,
  invalidLimit: -5,
});

// === xdr source ============================================================
//
//   union switch (ManageLimitsAction action)
//           {
//           case CREATE:
//               //: ID of the created limits entry
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
//           {
//           case EMPTY_VERSION:
//               void;
//           }
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
//           //: `details` represents an additional information of the `ManageLimitsOp` application result
//           union switch (ManageLimitsAction action)
//           {
//           case CREATE:
//               //: ID of the created limits entry
//               uint64 id;
//           case REMOVE:
//               void;
//           } details;
//   
//           //: reserved for future use
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//   }
//
// ===========================================================================
xdr.struct("ManageLimitsResultSuccess", [
  ["details", xdr.lookup("ManageLimitsResultSuccessDetails")],
  ["ext", xdr.lookup("ManageLimitsResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   //: `ManageLimitsResult` defines the result of ManageLimitsOp application based on given `ManageLimitsResultCode`
//   union ManageLimitsResult switch (ManageLimitsResultCode code)
//   {
//   case SUCCESS:
//       struct {
//           //: `details` represents an additional information of the `ManageLimitsOp` application result
//           union switch (ManageLimitsAction action)
//           {
//           case CREATE:
//               //: ID of the created limits entry
//               uint64 id;
//           case REMOVE:
//               void;
//           } details;
//   
//           //: reserved for future use
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//   } success;
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
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//               void;
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
//   //: ManageOfferOp is used to create or delete offer
//   struct ManageOfferOp
//   {
//       //: Balance for base asset of an offer creator
//       BalanceID baseBalance; 
//       
//       //: Balance for quote asset of an offer creator
//       BalanceID quoteBalance; 
//       
//       //: Direction of an offer (to buy or to sell)
//       bool isBuy;
//       
//       //: Amount in base asset to buy or sell (to delete an offer, set 0)
//       int64 amount; 
//       
//       //: Price of base asset in the ratio of quote asset
//       int64 price;
//       
//       //: Fee in quote asset to pay 
//       int64 fee;
//       
//       //: ID of an offer to be managed. 0 to create a new offer, otherwise to edit an existing offer
//       uint64 offerID;
//       
//       //: ID of an orderBook to put an offer in and to find a match in
//       uint64 orderBookID;
//        
//       //: Reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//               void;
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
//       //: ManageOfferOp was successfully applied
//       SUCCESS = 0,
//       
//       // codes considered as "failure" for the operation
//       //: Either the quote amount is less than the fee or the new fee is less than the old one
//       MALFORMED = -1,
//       //: Asset pair does not allow creating offers with it
//       PAIR_NOT_TRADED = -2, 
//       //: Source account of an operation does not owns one of the provided balances
//       BALANCE_NOT_FOUND = -3,
//       //: One of the balances does not hold the amount that it is trying to sell
//       UNDERFUNDED = -4,
//       //: Offer will cross with another offer of the same user 
//       CROSS_SELF = -5,
//       //: Overflow happened during the quote amount or fee calculation
//       OFFER_OVERFLOW = -6,
//       //: Either an asset pair does not exist or base and quote assets are the same
//       ASSET_PAIR_NOT_TRADABLE = -7,
//       //: Offer price violates the physical price restriction
//       PHYSICAL_PRICE_RESTRICTION = -8,
//       //: Offer price violates the current price restriction
//       CURRENT_PRICE_RESTRICTION = -9,
//       //: Offer with provided offerID is not found
//       NOT_FOUND = -10,
//       //: Negative fee is not allowed
//       INVALID_PERCENT_FEE = -11,
//       //: Price is too small
//       INSUFFICIENT_PRICE = -12,
//       //: Order book with provided ID does not exist
//       ORDER_BOOK_DOES_NOT_EXISTS = -13,
//       //: Sale has not started yet
//       SALE_IS_NOT_STARTED_YET = -14,
//       //: Sale has already ended
//       SALE_ALREADY_ENDED = -15,
//       //: CurrentCap of sale + offer amount will exceed the hard cap of the sale
//       ORDER_VIOLATES_HARD_CAP = -16,
//       //: Offer creator cannot participate in their own sale
//       CANT_PARTICIPATE_OWN_SALE = -17,
//       //: Sale assets and assets for specified balances are mismatched
//       ASSET_MISMATCHED = -18,
//       //: Sale price and offer price are mismatched
//       PRICE_DOES_NOT_MATCH = -19,
//       //: Price must be positive
//       PRICE_IS_INVALID = -20,
//       //: Offer update is not allowed
//       UPDATE_IS_NOT_ALLOWED = -21,
//       //: Amount must be positive
//       INVALID_AMOUNT = -22,
//       //: Sale is not active
//       SALE_IS_NOT_ACTIVE = -23,
//       //: Source must have KYC in order to participate
//       REQUIRES_KYC = -24,
//       //: Source account is underfunded
//       SOURCE_UNDERFUNDED = -25,
//       //: Overflow happened during the balance lock
//       SOURCE_BALANCE_LOCK_OVERFLOW = -26,
//       //: Source account must be verified in order to participate
//       REQUIRES_VERIFICATION = -27,
//       //: Precision set in the system and precision of the amount are mismatched
//       INCORRECT_AMOUNT_PRECISION = -28,
//       //: Sale specific rule forbids to participate in sale for source account
//       SPECIFIC_RULE_FORBIDS = -29
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
  specificRuleForbid: -29,
});

// === xdr source ============================================================
//
//   enum ManageOfferEffect
//   {
//       //: Offer created 
//       CREATED = 0,
//       //: Offer updated
//       UPDATED = 1,
//       //: Offer deleted
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
//   //: Used when offers are taken during the operation
//   struct ClaimOfferAtom
//   {
//       // emitted to identify the offer
//       //: ID of an account that created the matched offer
//       AccountID bAccountID;
//       //: ID of the matched offer
//       uint64 offerID;
//       //: Amount in base asset taken during the match
//       int64 baseAmount;
//       //: Amount in quote asset taked during the match
//       int64 quoteAmount;
//       //: Fee paid by an offer owner
//       int64 bFeePaid;
//       //: Fee paid by the source of an operation
//       int64 aFeePaid;
//       //: Balance in base asset of an offer owner
//       BalanceID baseBalance;
//       //: Balance in quote asset of an offer owner
//       BalanceID quoteBalance;
//       //: Match price
//       int64 currentPrice;
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
//           //: Updated offer entry
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
//   //: Contains details of successful operation application
//   struct ManageOfferSuccessResult
//   {
//   
//       //: Offers that matched a created offer
//       ClaimOfferAtom offersClaimed<>;
//       //: Base asset of an offer
//       AssetCode baseAsset;
//       //: Quote asset of an offer
//       AssetCode quoteAsset;
//       
//       //: Effect of operation
//       union switch (ManageOfferEffect effect)
//       {
//       case CREATED:
//       case UPDATED:
//           //: Updated offer entry
//           OfferEntry offer;
//       default:
//           void;
//       }
//       offer;
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
//           {
//           case EMPTY_VERSION:
//               void;
//           }
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
//           //: Physical price of the base asset
//           int64 physicalPrice;
//           //: Reserved for future use
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       }
//
// ===========================================================================
xdr.struct("ManageOfferResultPhysicalPriceRestriction", [
  ["physicalPrice", xdr.lookup("Int64")],
  ["ext", xdr.lookup("ManageOfferResultPhysicalPriceRestrictionExt")],
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
//           //: Current price of the base asset
//           int64 currentPrice;
//           //: Reserved for future use
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       }
//
// ===========================================================================
xdr.struct("ManageOfferResultCurrentPriceRestriction", [
  ["currentPrice", xdr.lookup("Int64")],
  ["ext", xdr.lookup("ManageOfferResultCurrentPriceRestrictionExt")],
]);

// === xdr source ============================================================
//
//   //: Result of `ManageOfferOp`
//   union ManageOfferResult switch (ManageOfferResultCode code)
//   {
//   case SUCCESS:
//       ManageOfferSuccessResult success;
//   case PHYSICAL_PRICE_RESTRICTION:
//       struct {
//           //: Physical price of the base asset
//           int64 physicalPrice;
//           //: Reserved for future use
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       } physicalPriceRestriction;
//   case CURRENT_PRICE_RESTRICTION:
//       struct {
//           //: Current price of the base asset
//           int64 currentPrice;
//           //: Reserved for future use
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
//       } currentPriceRestriction;
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
//   //: Actions that can be applied to a poll
//   enum ManagePollAction
//   {
//       CLOSE = 0,
//       UPDATE_END_TIME = 1,
//       CANCEL = 2
//   };
//
// ===========================================================================
xdr.enum("ManagePollAction", {
  close: 0,
  updateEndTime: 1,
  cancel: 2,
});

// === xdr source ============================================================
//
//   //: PollResult is used to specify result of voting
//   enum PollResult
//   {
//       PASSED = 0,
//       FAILED = 1
//   };
//
// ===========================================================================
xdr.enum("PollResult", {
  passed: 0,
  failed: 1,
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
xdr.union("ClosePollDataExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: ClosePollData is used to submit poll results
//   struct ClosePollData
//   {
//       //: result of voting
//       PollResult result;
//   
//       //: Arbitrary stringified json object with details about the result
//       longstring details;
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
xdr.struct("ClosePollData", [
  ["result", xdr.lookup("PollResult")],
  ["details", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("ClosePollDataExt")],
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
xdr.union("UpdatePollEndTimeDataExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct UpdatePollEndTimeData
//   {
//       uint64 newEndTime;
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
xdr.struct("UpdatePollEndTimeData", [
  ["newEndTime", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("UpdatePollEndTimeDataExt")],
]);

// === xdr source ============================================================
//
//   union switch (ManagePollAction action)
//       {
//       case CLOSE:
//           ClosePollData closePollData;
//       case UPDATE_END_TIME:
//           UpdatePollEndTimeData updateTimeData;
//       case CANCEL:
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.union("ManagePollOpData", {
  switchOn: xdr.lookup("ManagePollAction"),
  switchName: "action",
  switches: [
    ["close", "closePollData"],
    ["updateEndTime", "updateTimeData"],
    ["cancel", "ext"],
  ],
  arms: {
    closePollData: xdr.lookup("ClosePollData"),
    updateTimeData: xdr.lookup("UpdatePollEndTimeData"),
    ext: xdr.lookup("EmptyExt"),
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
xdr.union("ManagePollOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: ManagePollOp is used to close,  update end time or cancel the poll
//   struct ManagePollOp
//   {
//       //: ID of poll to manage
//       uint64 pollID;
//   
//       //: data is used to pass one of `ManagePollAction` with required params
//       union switch (ManagePollAction action)
//       {
//       case CLOSE:
//           ClosePollData closePollData;
//       case UPDATE_END_TIME:
//           UpdatePollEndTimeData updateTimeData;
//       case CANCEL:
//           EmptyExt ext;
//       }
//       data;
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
xdr.struct("ManagePollOp", [
  ["pollId", xdr.lookup("Uint64")],
  ["data", xdr.lookup("ManagePollOpData")],
  ["ext", xdr.lookup("ManagePollOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes of ManagePollOp
//   enum ManagePollResultCode
//   {
//       //: Specified action in `data` of ManagePollOp was successfully executed
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: There is no poll with such id
//       NOT_FOUND = -1,
//       //: Not allowed to close poll which
//       POLL_NOT_READY = -2,
//       //: Only result provider is allowed to close poll
//       NOT_AUTHORIZED_TO_CLOSE_POLL = -3,
//       //: End time is in the past
//       INVALID_END_TIME = -4,
//       //: Only poll owner and admin are allowed to cancel poll and update end time
//       NOT_AUTHORIZED = -5
//   };
//
// ===========================================================================
xdr.enum("ManagePollResultCode", {
  success: 0,
  notFound: -1,
  pollNotReady: -2,
  notAuthorizedToClosePoll: -3,
  invalidEndTime: -4,
  notAuthorized: -5,
});

// === xdr source ============================================================
//
//   //: Result of operation application
//   union ManagePollResult switch (ManagePollResultCode code)
//   {
//   case SUCCESS:
//       EmptyExt ext;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ManagePollResult", {
  switchOn: xdr.lookup("ManagePollResultCode"),
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
//   //: Details regarding the `Update Sale Details` request
//   struct UpdateSaleDetailsData {
//       //: ID of a reviewable request. If set 0, request is created, else - request is updated
//       uint64 requestID; // if requestID is 0 - create request, else - update
//       //: Arbitrary stringified json object that can be used to attach data to be reviewed by an admin
//       longstring creatorDetails;
//       //: (optional) Bit mask whose flags must be cleared in order for UpdateSaleDetailsRequest to be approved,
//       //: which will be used instead of key-value by key sale_update_tasks:<asset_code>
//       uint32* allTasks;
//   
//       //: Reserved for future use
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
  ["creatorDetails", xdr.lookup("Longstring")],
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
//   //: ManageSaleOp is used to cancel a sale, or create a reviewable request which, after approval, will update sale details.
//   struct ManageSaleOp
//   {
//       //: ID of the sale to manage
//       uint64 saleID;
//       //: data is used to pass ManageSaleAction along with required parameters
//       union switch (ManageSaleAction action) {
//       case CREATE_UPDATE_DETAILS_REQUEST:
//           UpdateSaleDetailsData updateSaleDetailsData;
//       case CANCEL:
//           void;
//       } data;
//   
//       //: Reserved for future use
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
//   //: Result codes for ManageSaleOperation
//   enum ManageSaleResultCode
//   {
//       //: Operation is successfully applied
//       SUCCESS = 0,
//       //: Sale with provided ID is not found
//       SALE_NOT_FOUND = -1, // sale not found
//   
//       // errors related to action "CREATE_UPDATE_DETAILS_REQUEST"
//       //: CreatorDetails is not a valid JSON
//       INVALID_CREATOR_DETAILS = -2, // newDetails field is invalid JSON
//       //: Request to update sale with provided ID already exists
//       UPDATE_DETAILS_REQUEST_ALREADY_EXISTS = -3,
//       //: UpdateSaleDetails request with provided ID is not found
//       UPDATE_DETAILS_REQUEST_NOT_FOUND = -4,
//       //: It is not allowed to set allTasks for a pending reviewable request
//       NOT_ALLOWED_TO_SET_TASKS_ON_UPDATE = -5, // not allowed to set allTasks on request update
//       //: Update sale details tasks are not set in the system, i.e. it's not allowed to perform the update of sale details 
//       SALE_UPDATE_DETAILS_TASKS_NOT_FOUND = -6
//   };
//
// ===========================================================================
xdr.enum("ManageSaleResultCode", {
  success: 0,
  saleNotFound: -1,
  invalidCreatorDetail: -2,
  updateDetailsRequestAlreadyExist: -3,
  updateDetailsRequestNotFound: -4,
  notAllowedToSetTasksOnUpdate: -5,
  saleUpdateDetailsTasksNotFound: -6,
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
//   //:Result of ManageSale operation successful application 
//   struct ManageSaleResultSuccess
//   {
//       //: Indicates  whether or not the ManageSale request was auto approved and fulfilled
//       bool fulfilled; // can be used for any reviewable request type created with manage sale operation   
//   
//       //: response is used for additional information regarding the action performed on sale during operation application
//       union switch (ManageSaleAction action) {
//       case CREATE_UPDATE_DETAILS_REQUEST:
//           uint64 requestID;
//       case CANCEL:
//           void;
//       } response;
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
xdr.struct("ManageSaleResultSuccess", [
  ["fulfilled", xdr.bool()],
  ["response", xdr.lookup("ManageSaleResultSuccessResponse")],
  ["ext", xdr.lookup("ManageSaleResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   //: Result of ManageSale operation application along with result code
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
//   //: Actions that can be applied to a vote entry
//   enum ManageVoteAction
//   {
//       CREATE = 0,
//       REMOVE = 1
//   };
//
// ===========================================================================
xdr.enum("ManageVoteAction", {
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
xdr.union("CreateVoteDataExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: CreateVoteData is used to pass needed params to create (send) vote
//   struct CreateVoteData
//   {
//       //: ID of poll to vote in
//       uint64 pollID;
//   
//       //: `data` is used to pass choice with functional type of poll
//       VoteData data;
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
xdr.struct("CreateVoteData", [
  ["pollId", xdr.lookup("Uint64")],
  ["data", xdr.lookup("VoteData")],
  ["ext", xdr.lookup("CreateVoteDataExt")],
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
xdr.union("RemoveVoteDataExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: RemoveVoteData is used to pass needed params to remove (cancel) own vote
//   struct RemoveVoteData
//   {
//       //: ID of poll
//       uint64 pollID;
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
xdr.struct("RemoveVoteData", [
  ["pollId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("RemoveVoteDataExt")],
]);

// === xdr source ============================================================
//
//   union switch (ManageVoteAction action)
//       {
//       case CREATE:
//           CreateVoteData createData;
//       case REMOVE:
//           RemoveVoteData removeData;
//       }
//
// ===========================================================================
xdr.union("ManageVoteOpData", {
  switchOn: xdr.lookup("ManageVoteAction"),
  switchName: "action",
  switches: [
    ["create", "createData"],
    ["remove", "removeData"],
  ],
  arms: {
    createData: xdr.lookup("CreateVoteData"),
    removeData: xdr.lookup("RemoveVoteData"),
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
xdr.union("ManageVoteOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: ManageVoteOp is used to create (send) or remove (cancel) vote
//   struct ManageVoteOp
//   {
//       //: `data` is used to pass `ManageVoteAction` with needed params
//       union switch (ManageVoteAction action)
//       {
//       case CREATE:
//           CreateVoteData createData;
//       case REMOVE:
//           RemoveVoteData removeData;
//       }
//       data;
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
xdr.struct("ManageVoteOp", [
  ["data", xdr.lookup("ManageVoteOpData")],
  ["ext", xdr.lookup("ManageVoteOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result code of ManageVoteOp
//   enum ManageVoteResultCode
//   {
//       // codes considered as "success" for the operation
//       //: Specified action in `data` of ManageVoteOp was successfully executed
//       SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       //: There is no vote from source account in such poll
//       VOTE_NOT_FOUND = -1, // vote to remove  not found
//       //: There is no poll with such id
//       POLL_NOT_FOUND = -2, // poll not found
//       //: Not allowed to create (send) two votes for one poll
//       VOTE_EXISTS = -3,
//       //: Not allowed to create (send) vote with functional type that is different from the poll functional type
//       POLL_TYPE_MISMATCHED = -4,
//       //: Not allowed to vote in poll which not started yet
//       POLL_NOT_STARTED = -5,
//       //: Not allowed to vote in poll which already was ended
//       POLL_ENDED = -6
//   };
//
// ===========================================================================
xdr.enum("ManageVoteResultCode", {
  success: 0,
  voteNotFound: -1,
  pollNotFound: -2,
  voteExist: -3,
  pollTypeMismatched: -4,
  pollNotStarted: -5,
  pollEnded: -6,
});

// === xdr source ============================================================
//
//   //: Result of ManageVoteOp application
//   union ManageVoteResult switch (ManageVoteResultCode code)
//   {
//   case SUCCESS:
//       EmptyExt ext;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ManageVoteResult", {
  switchOn: xdr.lookup("ManageVoteResultCode"),
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
//   //: Defines the type of destination of the payment
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
xdr.union("PaymentOpDestination", {
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
//       //: `destination` defines the type of instance that receives the payment based on given PaymentDestinationType
//       union switch (PaymentDestinationType type) {
//           case ACCOUNT:
//               AccountID accountID;
//           case BALANCE:
//               BalanceID balanceID;
//       } destination;
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
  ["destination", xdr.lookup("PaymentOpDestination")],
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
//       INCORRECT_AMOUNT_PRECISION = -15
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
//   //: `PaymentResponse` defines the response on the corresponding PaymentOp
//   struct PaymentResponse {
//       //: ID of the destination account
//       AccountID destination;
//       //: ID of the destination balance
//       BalanceID destinationBalanceID;
//   
//       //: Code of an asset used in payment
//       AssetCode asset;
//       //: Amount sent by the sender
//       uint64 sourceSentUniversal;
//       //: Unique ID of the payment
//       uint64 paymentID;
//   
//       //: Fee charged from the source balance
//       Fee actualSourcePaymentFee;
//       //: Fee charged from the destination balance
//       Fee actualDestinationPaymentFee;
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
xdr.struct("PaymentResponse", [
  ["destination", xdr.lookup("AccountId")],
  ["destinationBalanceId", xdr.lookup("BalanceId")],
  ["asset", xdr.lookup("AssetCode")],
  ["sourceSentUniversal", xdr.lookup("Uint64")],
  ["paymentId", xdr.lookup("Uint64")],
  ["actualSourcePaymentFee", xdr.lookup("Fee")],
  ["actualDestinationPaymentFee", xdr.lookup("Fee")],
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
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("RemoveAssetPairOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: `RemoveAssetPairOp` removes specified asset pair
//   struct RemoveAssetPairOp
//   {
//       //: Defines a base asset of an asset pair
//       AssetCode base;
//       //: Defines a base asset of an asset pair
//       AssetCode quote;
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
xdr.struct("RemoveAssetPairOp", [
  ["base", xdr.lookup("AssetCode")],
  ["quote", xdr.lookup("AssetCode")],
  ["ext", xdr.lookup("RemoveAssetPairOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes for `RemoveAssetPairOp`
//   enum RemoveAssetPairResultCode
//   {
//       //: Operation is successfully applied
//       SUCCESS = 0,
//       //: Asset pair not found
//       NOT_FOUND = -1,
//       //: Asset pair can't be deleted as it has active orders
//       HAS_ACTIVE_OFFERS = -2,
//       //: Asset pair can't be deleted as it has active sales
//       HAS_ACTIVE_SALES = -3,
//       //: Base or Quote asset is invalid
//       INVALID_ASSET_CODE = -4
//   };
//
// ===========================================================================
xdr.enum("RemoveAssetPairResultCode", {
  success: 0,
  notFound: -1,
  hasActiveOffer: -2,
  hasActiveSale: -3,
  invalidAssetCode: -4,
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
xdr.union("RemoveAssetPairSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: Result of successful `RemoveAssetPairOp` application
//   struct RemoveAssetPairSuccess
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
xdr.struct("RemoveAssetPairSuccess", [
  ["ext", xdr.lookup("RemoveAssetPairSuccessExt")],
]);

// === xdr source ============================================================
//
//   //: Result of RemoveAssetPair operation application along with the result code
//   union RemoveAssetPairResult switch (RemoveAssetPairResultCode code) {
//       case SUCCESS:
//           RemoveAssetPairSuccess success;
//       default:
//           void;
//   };
//
// ===========================================================================
xdr.union("RemoveAssetPairResult", {
  switchOn: xdr.lookup("RemoveAssetPairResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("RemoveAssetPairSuccess"),
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
xdr.union("RemoveAssetOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: `RemoveAssetOp` removes specified asset pair
//   struct RemoveAssetOp
//   {
//       //: Defines an asset
//       AssetCode code;
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
xdr.struct("RemoveAssetOp", [
  ["code", xdr.lookup("AssetCode")],
  ["ext", xdr.lookup("RemoveAssetOpExt")],
]);

// === xdr source ============================================================
//
//   //: Result codes for `RemoveAssetOp`
//   enum RemoveAssetResultCode
//   {
//       //: Operation is successfully applied
//       SUCCESS = 0,
//       //: Asset not found
//       //: Asset can't be deleted as there exist asset pairs with it
//       HAS_PAIR = -1,
//       //: Asset can't be deleted as it has active offers
//       HAS_ACTIVE_OFFERS = -2,
//       //: Asset can't be deleted as it has active sales
//       HAS_ACTIVE_SALES = -3
//   };
//
// ===========================================================================
xdr.enum("RemoveAssetResultCode", {
  success: 0,
  hasPair: -1,
  hasActiveOffer: -2,
  hasActiveSale: -3,
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
xdr.union("RemoveAssetSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: Result of successful `RemoveAssetOp` application
//   struct RemoveAssetSuccess
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
xdr.struct("RemoveAssetSuccess", [
  ["ext", xdr.lookup("RemoveAssetSuccessExt")],
]);

// === xdr source ============================================================
//
//   //: Result of RemoveAsset operation application along with the result code
//   union RemoveAssetResult switch (RemoveAssetResultCode code) {
//       case SUCCESS:
//           RemoveAssetSuccess success;
//       default:
//           void;
//   };
//
// ===========================================================================
xdr.union("RemoveAssetResult", {
  switchOn: xdr.lookup("RemoveAssetResultCode"),
  switchName: "code",
  switches: [
    ["success", "success"],
  ],
  arms: {
    success: xdr.lookup("RemoveAssetSuccess"),
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
//   //: Review details of a Limits Update request
//   struct LimitsUpdateDetails { 
//       //: Limits entry containing new limits to set 
//       LimitsV2Entry newLimitsV2;
//   
//       //:reserved for future use
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
//   //: Review details of a Withdraw Request
//   struct WithdrawalDetails {
//       //: External details updated on a Withdraw review
//       string externalDetails<>;
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
//   //: Details of AML Alert 
//   struct AMLAlertDetails {
//       //: Comment on reason of AML Alert
//       string comment<>;
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
xdr.struct("AmlAlertDetails", [
  ["comment", xdr.string()],
  ["ext", xdr.lookup("AmlAlertDetailsExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//               void;
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
//               void;
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
//   //: Details of a payment reviewable request
//   struct BillPayDetails {
//       //: Details of payment
//       PaymentOp paymentDetails;
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
xdr.struct("BillPayDetails", [
  ["paymentDetails", xdr.lookup("PaymentOp")],
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
//   //: Details of a request review
//   struct ReviewDetails {
//       //: Tasks to add to pending
//       uint32 tasksToAdd;
//       //: Tasks to remove from pending
//       uint32 tasksToRemove;
//       //: Details of the current review
//       string externalDetails<>;
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
//   //: Extended result of the review request operation containing details specific to a Create Sale Request
//   struct SaleExtended {
//       //: ID of the newly created sale as a result of Create Sale Request successful review
//       uint64 saleID;
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
xdr.union("AtomicSwapAskExtendedExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: Extended result of the review request operation containing details specific to a Create Atomic Swap Bid Request
//   struct AtomicSwapAskExtended
//   {
//       //: ID of the newly created ask as a result of Create Atomic Swap Ask Request successful review
//       uint64 askID;
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
xdr.struct("AtomicSwapAskExtended", [
  ["askId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("AtomicSwapAskExtendedExt")],
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
xdr.union("CreatePollExtendedExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: Extended result of the review request operation containing details specific to a `CREATE_POLL` request
//   struct CreatePollExtended
//   {
//       //: ID of the newly created poll
//       uint64 pollID;
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
xdr.struct("CreatePollExtended", [
  ["pollId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("CreatePollExtendedExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//               void;
//       }
//
// ===========================================================================
xdr.union("AtomicSwapBidExtendedExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: Extended result of a review request operation containing details specific to a Create Atomic Swap Request
//   struct AtomicSwapBidExtended
//   {
//       //: ID of a ask to apply atomic swap to
//       uint64 askID;
//       //: AccountID of a ask owner
//       AccountID askOwnerID;
//       //: Account id of an bid owner
//       AccountID bidOwnerID;
//       //: Base asset for the atomic swap
//       AssetCode baseAsset;
//       //: Quote asset for the atomic swap
//       AssetCode quoteAsset;
//       //: Amount in base asset to exchange
//       uint64 baseAmount;
//       //: Amount in quote asset to exchange
//       uint64 quoteAmount;
//       //: Price of base asset in terms of quote
//       uint64 price;
//       //: Balance in base asset of a ask owner
//       BalanceID askOwnerBaseBalanceID;
//       //: Balance in base asset of an bid owner
//       BalanceID bidOwnerBaseBalanceID;
//       //: Amount which was unlocked on bid owner base balance after bid removing
//       uint64 unlockedAmount;
//   
//       //: Reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//               void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("AtomicSwapBidExtended", [
  ["askId", xdr.lookup("Uint64")],
  ["askOwnerId", xdr.lookup("AccountId")],
  ["bidOwnerId", xdr.lookup("AccountId")],
  ["baseAsset", xdr.lookup("AssetCode")],
  ["quoteAsset", xdr.lookup("AssetCode")],
  ["baseAmount", xdr.lookup("Uint64")],
  ["quoteAmount", xdr.lookup("Uint64")],
  ["price", xdr.lookup("Uint64")],
  ["askOwnerBaseBalanceId", xdr.lookup("BalanceId")],
  ["bidOwnerBaseBalanceId", xdr.lookup("BalanceId")],
  ["unlockedAmount", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("AtomicSwapBidExtendedExt")],
]);

// === xdr source ============================================================
//
//   union switch(ReviewableRequestType requestType) {
//       case CREATE_SALE:
//           SaleExtended saleExtended;
//       case NONE:
//           void;
//       case CREATE_ATOMIC_SWAP_BID:
//           AtomicSwapBidExtended atomicSwapBidExtended;
//       case CREATE_ATOMIC_SWAP_ASK:
//           AtomicSwapAskExtended atomicSwapAskExtended;
//       case CREATE_POLL:
//           CreatePollExtended createPoll;
//       }
//
// ===========================================================================
xdr.union("ExtendedResultTypeExt", {
  switchOn: xdr.lookup("ReviewableRequestType"),
  switchName: "requestType",
  switches: [
    ["createSale", "saleExtended"],
    ["none", xdr.void()],
    ["createAtomicSwapBid", "atomicSwapBidExtended"],
    ["createAtomicSwapAsk", "atomicSwapAskExtended"],
    ["createPoll", "createPoll"],
  ],
  arms: {
    saleExtended: xdr.lookup("SaleExtended"),
    atomicSwapBidExtended: xdr.lookup("AtomicSwapBidExtended"),
    atomicSwapAskExtended: xdr.lookup("AtomicSwapAskExtended"),
    createPoll: xdr.lookup("CreatePollExtended"),
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
//       //: typeExt is used to pass ReviewableRequestType along with details specific to a request type
//       union switch(ReviewableRequestType requestType) {
//       case CREATE_SALE:
//           SaleExtended saleExtended;
//       case NONE:
//           void;
//       case CREATE_ATOMIC_SWAP_BID:
//           AtomicSwapBidExtended atomicSwapBidExtended;
//       case CREATE_ATOMIC_SWAP_ASK:
//           AtomicSwapAskExtended atomicSwapAskExtended;
//       case CREATE_POLL:
//           CreatePollExtended createPoll;
//       } typeExt;
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
  ["typeExt", xdr.lookup("ExtendedResultTypeExt")],
  ["ext", xdr.lookup("ExtendedResultExt")],
]);

// === xdr source ============================================================
//
//   union switch(ReviewableRequestType requestType) {
//       case CREATE_WITHDRAW:
//           WithdrawalDetails withdrawal;
//       case UPDATE_LIMITS:
//           LimitsUpdateDetails limitsUpdate;
//       case CREATE_AML_ALERT:
//           AMLAlertDetails amlAlertDetails;
//       case CREATE_INVOICE:
//           BillPayDetails billPay;
//       case MANAGE_CONTRACT:
//           ContractDetails contract;
//       default:
//           void;
//       }
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
//   //: Review Request operation
//   struct ReviewRequestOp
//   {
//       //: ID of a request that is being reviewed
//       uint64 requestID;
//       //: Hash of a request that is being reviewed
//       Hash requestHash;
//       //: requestDetails is used to pass request type along with details specific to it.
//       union switch(ReviewableRequestType requestType) {
//       case CREATE_WITHDRAW:
//           WithdrawalDetails withdrawal;
//       case UPDATE_LIMITS:
//           LimitsUpdateDetails limitsUpdate;
//       case CREATE_AML_ALERT:
//           AMLAlertDetails amlAlertDetails;
//       case CREATE_INVOICE:
//           BillPayDetails billPay;
//       case MANAGE_CONTRACT:
//           ContractDetails contract;
//       default:
//           void;
//       } requestDetails;
//       //: Review action defines an action performed on the pending ReviewableRequest
//       ReviewRequestOpAction action;
//       //: Contains reject reason
//       longstring reason;
//       //: Details of the ReviewRequest operation
//       ReviewDetails reviewDetails;
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
  ["requestDetails", xdr.lookup("ReviewRequestOpRequestDetails")],
  ["action", xdr.lookup("ReviewRequestOpAction")],
  ["reason", xdr.lookup("Longstring")],
  ["reviewDetails", xdr.lookup("ReviewDetails")],
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
//       REMOVING_NOT_SET_TASKS = -100,// cannot remove tasks which are not set
//   
//       //: Asset requests
//       //: Trying to create an asset that already exists
//       ASSET_ALREADY_EXISTS = -200,
//       //: Trying to update an asset that does not exist
//       ASSET_DOES_NOT_EXISTS = -210,
//   
//       //: Issuance requests
//       //: After the issuance request application, issued amount will exceed max issuance amount
//       MAX_ISSUANCE_AMOUNT_EXCEEDED = -400,
//       //: Trying to issue more than it is available for issuance
//       INSUFFICIENT_AVAILABLE_FOR_ISSUANCE_AMOUNT = -410,
//       //: Funding account will exceed UINT64_MAX
//       FULL_LINE = -420,
//       //: It is not allowed to set system tasks
//       SYSTEM_TASKS_NOT_ALLOWED = -430,
//       //: Incorrect amount precision
//       INCORRECT_PRECISION = -440,
//   
//       //: Sale creation requests
//       //: Trying to create a sale for a base asset that does not exist
//       BASE_ASSET_DOES_NOT_EXISTS = -500,
//       //: Trying to create a sale with hard cap that will exceed max issuance amount
//       HARD_CAP_WILL_EXCEED_MAX_ISSUANCE = -510,
//       //: Trying to create a sale with preissued amount that is less than the hard cap
//       INSUFFICIENT_PREISSUED_FOR_HARD_CAP = -520,
//       //: Trying to create a sale for a base asset that cannot be found
//       BASE_ASSET_NOT_FOUND = -530,
//       //: There is no asset pair between default quote asset and quote asset
//       ASSET_PAIR_NOT_FOUND = -540,
//       //: Trying to create a sale with one of the quote assets that doesn't exist
//       QUOTE_ASSET_NOT_FOUND = -550,
//   
//       //: Change role 
//       //: Trying to remove zero tasks
//       NON_ZERO_TASKS_TO_REMOVE_NOT_ALLOWED = -600,
//       //: There is no account role with provided id
//       ACCOUNT_ROLE_TO_SET_DOES_NOT_EXIST = -610,
//   
//   
//       //: Update sale details
//       //: Trying to update details of a non-existing sale
//       SALE_NOT_FOUND = -700,
//   
//       //: Deprecated: Invoice requests
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
//       //: Deprecated: Invoice requests
//       PAYMENT_V2_MALFORMED = -1100,
//       UNDERFUNDED = -1110,
//       LINE_FULL = -1120,
//       DESTINATION_BALANCE_NOT_FOUND = -1130,
//       BALANCE_ASSETS_MISMATCHED = -1140,
//       SRC_BALANCE_NOT_FOUND = -1150,
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
//       //: Limits update requests
//       //: Trying to create a limits update request for both account and account type at the same time
//       CANNOT_CREATE_FOR_ACC_ID_AND_ACC_TYPE = 1300,
//       //: Trying to set invalid limits, i.e. with dayly limit greater than weekly limit
//       INVALID_LIMITS = 1310,
//       //: There is no account with passed ID for limits update request
//       ACCOUNT_NOT_FOUND = -1311,
//       //: There is no role with passed ID for limits update request
//       ROLE_NOT_FOUND = -1312,
//   
//       //: Deprecated: Contract requests
//       CONTRACT_DETAILS_TOO_LONG = -1400, // customer details reached length limit
//   
//       // Atomic swap
//       BASE_ASSET_CANNOT_BE_SWAPPED = -1500,
//       QUOTE_ASSET_CANNOT_BE_SWAPPED = -1501,
//       ATOMIC_SWAP_BID_OWNER_FULL_LINE = -1504,
//   
//       //KYC
//       //:Signer data is invalid - either weight is wrong or details are invalid
//       INVALID_SIGNER_DATA = -1600
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
  assetPairNotFound: -540,
  quoteAssetNotFound: -550,
  nonZeroTasksToRemoveNotAllowed: -600,
  accountRoleToSetDoesNotExist: -610,
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
  accountNotFound: -1311,
  roleNotFound: -1312,
  contractDetailsTooLong: -1400,
  baseAssetCannotBeSwapped: -1500,
  quoteAssetCannotBeSwapped: -1501,
  atomicSwapBidOwnerFullLine: -1504,
  invalidSignerDatum: -1600,
});

// === xdr source ============================================================
//
//   //: Result of applying the review request with result code
//   union ReviewRequestResult switch (ReviewRequestResultCode code)
//   {
//   case SUCCESS:
//       ExtendedResult success;
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
//   union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
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
//   //: Allows to establish or remove a relationship between a particular fee entry with the different entities
//       struct SetFeesOp
//       {
//           //: Fee entry to set
//           FeeEntry* fee;
//           //: `isDelete` indicates that a fee should be either set or removed
//           bool isDelete;
//           //: reserved for future use
//           union switch (LedgerVersion v)
//           {
//           case EMPTY_VERSION:
//               void;
//           }
//           ext;
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
//   //: Result codes for SetFees operation
//       enum SetFeesResultCode
//       {
//           // codes considered as "success" for the operation
//           //: `SetFeesOp` was successfully applied and a fee was successfully set or deleted
//           SUCCESS = 0,
//   
//           // codes considered as "failure" for an operation
//           //: Fee amount is invalid (e.g. negative amount is ranked invalid)
//           INVALID_AMOUNT = -1,
//           //: `FeeType` is invalid (any `FeeType` that is not contained in the `FeeType` enum is ranked invalid)
//           INVALID_FEE_TYPE = -2,
//           //: `AssetCode` is not presented in the system
//           ASSET_NOT_FOUND = -3,
//           //: `AssetCode` is invalid (e.g. `AssetCode` that does not consist of alphanumeric symbols)
//           INVALID_ASSET = -4,
//           //: Malformed operation (e.g. `upperBound` from the `FeeEntry` structure is less than `lowerBound`)
//           MALFORMED = -5,
//           //: Malformed range is defined by `FeeEntry.lowerBound` and `FeeEntry.upperBound` (`lowerBound` must be equal to 0 & `upperBound` must be equal to `INT64_MAX`)
//           MALFORMED_RANGE = -6,
//           //: Range defined by `lowerBound` and `upperBound` in `FeeEntry` overlaps with at least one another `FeeEntry` range
//           RANGE_OVERLAP = -7,
//           //: There is no fee to delete (this code could be returned only on deleting a fee)
//           NOT_FOUND = -8,
//           //: `FeeEntry` does not have a default subtype or the fee asset is not base
//           SUB_TYPE_NOT_EXIST = -9,
//           //: Reserved for future use
//           INVALID_FEE_VERSION = -10,
//           //: Reserved for future use
//           INVALID_FEE_ASSET = -11,
//           //: Reserved for future use
//           FEE_ASSET_NOT_ALLOWED = -12, // feeAsset can be set only if feeType is PAYMENT
//           //: Reserved for future use
//           CROSS_ASSET_FEE_NOT_ALLOWED = -13, // feeAsset on payment fee type can differ from asset only if payment fee subtype is OUTGOING
//           //: Reserved for future use
//           FEE_ASSET_NOT_FOUND = -14,
//           //: Reserved for future use
//           ASSET_PAIR_NOT_FOUND = -15, // cannot create cross asset fee entry without existing asset pair
//           //: Reserved for future use
//           INVALID_ASSET_PAIR_PRICE = -16,
//           //: Calculated fee hash differs from a hash taken from the database
//           INVALID_FEE_HASH = -17,
//           //: Fixed fee amount must fit asset precision
//           INVALID_AMOUNT_PRECISION = -18,
//           //: There is no account with passed ID
//           ACCOUNT_NOT_FOUND = -19,
//           //: There is no role with passed ID
//           ROLE_NOT_FOUND = -20
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
  invalidAmountPrecision: -18,
  accountNotFound: -19,
  roleNotFound: -20,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//                   {
//                   case EMPTY_VERSION:
//                       void;
//                   }
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
//                   //: reserved for future use
//                   union switch (LedgerVersion v)
//                   {
//                   case EMPTY_VERSION:
//                       void;
//                   }
//                   ext;
//               }
//
// ===========================================================================
xdr.struct("SetFeesResultSuccess", [
  ["ext", xdr.lookup("SetFeesResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   //: Is used to pass result of operation applying
//       union SetFeesResult switch (SetFeesResultCode code)
//       {
//           case SUCCESS:
//               struct {
//                   //: reserved for future use
//                   union switch (LedgerVersion v)
//                   {
//                   case EMPTY_VERSION:
//                       void;
//                   }
//                   ext;
//               } success;
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
//           //: type of sale
//           uint64 type;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("ReviewableRequestResourceCreateSale", [
  ["type", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           //: code of asset
//           AssetCode assetCode;
//           //: type of asset
//           uint64 assetType;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("ReviewableRequestResourceCreateIssuance", [
  ["assetCode", xdr.lookup("AssetCode")],
  ["assetType", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           //: code of asset
//           AssetCode assetCode;
//           //: type of asset
//           uint64 assetType;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("ReviewableRequestResourceCreateWithdraw", [
  ["assetCode", xdr.lookup("AssetCode")],
  ["assetType", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//           {
//               //: code of asset
//               AssetCode assetCode;
//               //: type of asset
//               uint64 assetType;
//   
//               //: reserved for future extension
//               EmptyExt ext;
//           }
//
// ===========================================================================
xdr.struct("ReviewableRequestResourceCreateAtomicSwapAskExtCreateAtomicSwapAsk", [
  ["assetCode", xdr.lookup("AssetCode")],
  ["assetType", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       case ATOMIC_SWAP_RETURNING:
//           //: is used to restrict the usage of a reviewable request with create_atomic_swap_ask type
//           struct
//           {
//               //: code of asset
//               AssetCode assetCode;
//               //: type of asset
//               uint64 assetType;
//   
//               //: reserved for future extension
//               EmptyExt ext;
//           } createAtomicSwapAsk;
//       }
//
// ===========================================================================
xdr.union("ReviewableRequestResourceCreateAtomicSwapAskExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
    ["atomicSwapReturning", "createAtomicSwapAsk"],
  ],
  arms: {
    createAtomicSwapAsk: xdr.lookup("ReviewableRequestResourceCreateAtomicSwapAskExtCreateAtomicSwapAsk"),
  },
});

// === xdr source ============================================================
//
//   struct
//           {
//               //: code of asset
//               AssetCode assetCode;
//               //: type of asset
//               uint64 assetType;
//   
//               //: reserved for future extension
//               EmptyExt ext;
//           }
//
// ===========================================================================
xdr.struct("ReviewableRequestResourceCreateAtomicSwapBidExtCreateAtomicSwapBid", [
  ["assetCode", xdr.lookup("AssetCode")],
  ["assetType", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       case ATOMIC_SWAP_RETURNING:
//           //: is used to restrict the usage of a reviewable request with create_atomic_swap_bid type
//           struct
//           {
//               //: code of asset
//               AssetCode assetCode;
//               //: type of asset
//               uint64 assetType;
//   
//               //: reserved for future extension
//               EmptyExt ext;
//           } createAtomicSwapBid;
//       }
//
// ===========================================================================
xdr.union("ReviewableRequestResourceCreateAtomicSwapBidExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
    ["atomicSwapReturning", "createAtomicSwapBid"],
  ],
  arms: {
    createAtomicSwapBid: xdr.lookup("ReviewableRequestResourceCreateAtomicSwapBidExtCreateAtomicSwapBid"),
  },
});

// === xdr source ============================================================
//
//   struct
//       {
//           //: permission type of poll
//           uint32 permissionType;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("ReviewableRequestResourceCreatePoll", [
  ["permissionType", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   //: Describes properties of some reviewable request types that
//   //: can be used to restrict the usage of reviewable requests
//   union ReviewableRequestResource switch (ReviewableRequestType requestType)
//   {
//   case CREATE_SALE:
//       //: is used to restrict the usage of a reviewable request with create_sale type
//       struct
//       {
//           //: type of sale
//           uint64 type;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       } createSale;
//   case CREATE_ISSUANCE:
//       //: is used to restrict the usage of a reviewable request with create_issuance type
//       struct
//       {
//           //: code of asset
//           AssetCode assetCode;
//           //: type of asset
//           uint64 assetType;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       } createIssuance;
//   case CREATE_WITHDRAW:
//       //: is used to restrict the usage of a reviewable request with create_withdraw type
//       struct
//       {
//           //: code of asset
//           AssetCode assetCode;
//           //: type of asset
//           uint64 assetType;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       } createWithdraw;
//   case CREATE_ATOMIC_SWAP_ASK:
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       case ATOMIC_SWAP_RETURNING:
//           //: is used to restrict the usage of a reviewable request with create_atomic_swap_ask type
//           struct
//           {
//               //: code of asset
//               AssetCode assetCode;
//               //: type of asset
//               uint64 assetType;
//   
//               //: reserved for future extension
//               EmptyExt ext;
//           } createAtomicSwapAsk;
//       } createAtomicSwapAskExt;
//   case CREATE_ATOMIC_SWAP_BID:
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       case ATOMIC_SWAP_RETURNING:
//           //: is used to restrict the usage of a reviewable request with create_atomic_swap_bid type
//           struct
//           {
//               //: code of asset
//               AssetCode assetCode;
//               //: type of asset
//               uint64 assetType;
//   
//               //: reserved for future extension
//               EmptyExt ext;
//           } createAtomicSwapBid;
//       } createAtomicSwapBidExt;
//   case CREATE_POLL:
//       //: is used to restrict the creating of a `CREATE_POLL` reviewable request type
//       struct
//       {
//           //: permission type of poll
//           uint32 permissionType;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       } createPoll;
//   default:
//       //: reserved for future extension
//       EmptyExt ext;
//   };
//
// ===========================================================================
xdr.union("ReviewableRequestResource", {
  switchOn: xdr.lookup("ReviewableRequestType"),
  switchName: "requestType",
  switches: [
    ["createSale", "createSale"],
    ["createIssuance", "createIssuance"],
    ["createWithdraw", "createWithdraw"],
    ["createAtomicSwapAsk", "createAtomicSwapAskExt"],
    ["createAtomicSwapBid", "createAtomicSwapBidExt"],
    ["createPoll", "createPoll"],
  ],
  arms: {
    createSale: xdr.lookup("ReviewableRequestResourceCreateSale"),
    createIssuance: xdr.lookup("ReviewableRequestResourceCreateIssuance"),
    createWithdraw: xdr.lookup("ReviewableRequestResourceCreateWithdraw"),
    createAtomicSwapAskExt: xdr.lookup("ReviewableRequestResourceCreateAtomicSwapAskExt"),
    createAtomicSwapBidExt: xdr.lookup("ReviewableRequestResourceCreateAtomicSwapBidExt"),
    createPoll: xdr.lookup("ReviewableRequestResourceCreatePoll"),
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
//           //: Describes properties of some reviewable request types that
//           //: can be used to restrict the usage of reviewable requests
//           ReviewableRequestResource details;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("AccountRuleResourceReviewableRequest", [
  ["details", xdr.lookup("ReviewableRequestResource")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           //: type of base asset
//           uint64 baseAssetType;
//           //: type of quote asset
//           uint64 quoteAssetType;
//   
//           //: code of base asset
//           AssetCode baseAssetCode;
//           //: code of quote asset
//           AssetCode quoteAssetCode;
//   
//           bool isBuy;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("AccountRuleResourceOffer", [
  ["baseAssetType", xdr.lookup("Uint64")],
  ["quoteAssetType", xdr.lookup("Uint64")],
  ["baseAssetCode", xdr.lookup("AssetCode")],
  ["quoteAssetCode", xdr.lookup("AssetCode")],
  ["isBuy", xdr.bool()],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           uint64 saleID;
//           uint64 saleType;
//   
//           //: reserved for future extension
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
xdr.struct("AccountRuleResourceAtomicSwapAsk", [
  ["assetType", xdr.lookup("Uint64")],
  ["assetCode", xdr.lookup("AssetCode")],
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
xdr.struct("AccountRuleResourceKeyValue", [
  ["keyPrefix", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           //: ID of the poll
//           uint64 pollID;
//   
//           //: permission type of poll
//           uint32 permissionType;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("AccountRuleResourcePoll", [
  ["pollId", xdr.lookup("Uint64")],
  ["permissionType", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           //: ID of the poll
//           uint64 pollID;
//   
//           //: permission type of poll
//           uint32 permissionType;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("AccountRuleResourceVote", [
  ["pollId", xdr.lookup("Uint64")],
  ["permissionType", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           //: Role id
//           uint64 roleID;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("AccountRuleResourceInitiateKycRecovery", [
  ["roleId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//           {
//               //: Describes properties of some ledger key that
//               //: can be used to restrict the usage of account specific rules
//               LedgerKey ledgerKey;
//   
//               //: reserved for future extension
//               EmptyExt ext;
//           }
//
// ===========================================================================
xdr.struct("AccountRuleResourceAccountSpecificRuleExtAccountSpecificRule", [
  ["ledgerKey", xdr.lookup("LedgerKey")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   union switch(LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       case ADD_ACC_SPECIFIC_RULE_RESOURCE:
//           struct
//           {
//               //: Describes properties of some ledger key that
//               //: can be used to restrict the usage of account specific rules
//               LedgerKey ledgerKey;
//   
//               //: reserved for future extension
//               EmptyExt ext;
//           } accountSpecificRule;
//       }
//
// ===========================================================================
xdr.union("AccountRuleResourceAccountSpecificRuleExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
    ["addAccSpecificRuleResource", "accountSpecificRule"],
  ],
  arms: {
    accountSpecificRule: xdr.lookup("AccountRuleResourceAccountSpecificRuleExtAccountSpecificRule"),
  },
});

// === xdr source ============================================================
//
//   //: Describes properties of some entries that can be used to restrict the usage of entries
//   union AccountRuleResource switch (LedgerEntryType type)
//   {
//   case ASSET:
//       //: Describes properties that are equal to managed asset entry fields
//       struct
//       {
//           AssetCode assetCode;
//           uint64 assetType;
//   
//           EmptyExt ext;
//       } asset;
//   case REVIEWABLE_REQUEST:
//       //: Describes properties that are equal to managed reviewable request entry fields
//       struct
//       {
//           //: Describes properties of some reviewable request types that
//           //: can be used to restrict the usage of reviewable requests
//           ReviewableRequestResource details;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       } reviewableRequest;
//   case ANY:
//       void;
//   case OFFER_ENTRY:
//       //: Describes properties that are equal to managed offer entry fields and their properties
//       struct
//       {
//           //: type of base asset
//           uint64 baseAssetType;
//           //: type of quote asset
//           uint64 quoteAssetType;
//   
//           //: code of base asset
//           AssetCode baseAssetCode;
//           //: code of quote asset
//           AssetCode quoteAssetCode;
//   
//           bool isBuy;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       } offer;
//   case SALE:
//       //: Describes properties that are equal to managed offer entry fields
//       struct
//       {
//           uint64 saleID;
//           uint64 saleType;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       } sale;
//   case ATOMIC_SWAP_ASK:
//       struct
//       {
//           uint64 assetType;
//           AssetCode assetCode;
//   
//           EmptyExt ext;
//       } atomicSwapAsk;
//   case KEY_VALUE:
//       struct
//       {
//           //: prefix of key
//           longstring keyPrefix;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       } keyValue;
//   case POLL:
//       struct
//       {
//           //: ID of the poll
//           uint64 pollID;
//   
//           //: permission type of poll
//           uint32 permissionType;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       } poll;
//   case VOTE:
//       struct
//       {
//           //: ID of the poll
//           uint64 pollID;
//   
//           //: permission type of poll
//           uint32 permissionType;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       } vote;
//   case INITIATE_KYC_RECOVERY:
//       struct
//       {
//           //: Role id
//           uint64 roleID;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       } initiateKYCRecovery;
//   case ACCOUNT_SPECIFIC_RULE:
//       union switch(LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       case ADD_ACC_SPECIFIC_RULE_RESOURCE:
//           struct
//           {
//               //: Describes properties of some ledger key that
//               //: can be used to restrict the usage of account specific rules
//               LedgerKey ledgerKey;
//   
//               //: reserved for future extension
//               EmptyExt ext;
//           } accountSpecificRule;
//       } accountSpecificRuleExt;
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
    ["asset", "asset"],
    ["reviewableRequest", "reviewableRequest"],
    ["any", xdr.void()],
    ["offerEntry", "offer"],
    ["sale", "sale"],
    ["atomicSwapAsk", "atomicSwapAsk"],
    ["keyValue", "keyValue"],
    ["poll", "poll"],
    ["vote", "vote"],
    ["initiateKycRecovery", "initiateKycRecovery"],
    ["accountSpecificRule", "accountSpecificRuleExt"],
  ],
  arms: {
    asset: xdr.lookup("AccountRuleResourceAsset"),
    reviewableRequest: xdr.lookup("AccountRuleResourceReviewableRequest"),
    offer: xdr.lookup("AccountRuleResourceOffer"),
    sale: xdr.lookup("AccountRuleResourceSale"),
    atomicSwapAsk: xdr.lookup("AccountRuleResourceAtomicSwapAsk"),
    keyValue: xdr.lookup("AccountRuleResourceKeyValue"),
    poll: xdr.lookup("AccountRuleResourcePoll"),
    vote: xdr.lookup("AccountRuleResourceVote"),
    initiateKycRecovery: xdr.lookup("AccountRuleResourceInitiateKycRecovery"),
    accountSpecificRuleExt: xdr.lookup("AccountRuleResourceAccountSpecificRuleExt"),
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
//       CREATE_FOR_OTHER_WITH_TASKS = 19
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
});

// === xdr source ============================================================
//
//   struct
//       {
//           //: Describes properties of some reviewable request types that
//           //: can be used to restrict the usage of reviewable requests
//           ReviewableRequestResource details;
//   
//           //: Bit mask of tasks that is allowed to add to reviewable request pending tasks
//           uint64 tasksToAdd;
//           //: Bit mask of tasks that is allowed to remove from reviewable request pending tasks
//           uint64 tasksToRemove;
//           //: Bit mask of tasks that is allowed to use as reviewable request pending tasks
//           uint64 allTasks;
//   
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("SignerRuleResourceReviewableRequest", [
  ["details", xdr.lookup("ReviewableRequestResource")],
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
//           //: type of base asset
//           uint64 baseAssetType;
//           //: type of quote asset
//           uint64 quoteAssetType;
//   
//           //: code of base asset
//           AssetCode baseAssetCode;
//           //: code of quote asset
//           AssetCode quoteAssetCode;
//   
//           bool isBuy;
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
  ["isBuy", xdr.bool()],
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
xdr.struct("SignerRuleResourceAtomicSwapAsk", [
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
//           //: ID of the poll
//           uint64 pollID;
//   
//           //: permission type of poll
//           uint32 permissionType;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("SignerRuleResourcePoll", [
  ["pollId", xdr.lookup("Uint64")],
  ["permissionType", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           //: ID of the poll
//           uint64 pollID;
//   
//           //: permission type of poll
//           uint32 permissionType;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("SignerRuleResourceVote", [
  ["pollId", xdr.lookup("Uint64")],
  ["permissionType", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           //: Role id
//           uint64 roleID;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       }
//
// ===========================================================================
xdr.struct("SignerRuleResourceInitiateKycRecovery", [
  ["roleId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   struct
//           {
//               //: Describes properties of some ledger key that
//               //: can be used to restrict the usage of account specific rules
//               LedgerKey ledgerKey;
//   
//               //: reserved for future extension
//               EmptyExt ext;
//           }
//
// ===========================================================================
xdr.struct("SignerRuleResourceAccountSpecificRuleExtAccountSpecificRule", [
  ["ledgerKey", xdr.lookup("LedgerKey")],
  ["ext", xdr.lookup("EmptyExt")],
]);

// === xdr source ============================================================
//
//   union switch(LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       case ADD_ACC_SPECIFIC_RULE_RESOURCE:
//           struct
//           {
//               //: Describes properties of some ledger key that
//               //: can be used to restrict the usage of account specific rules
//               LedgerKey ledgerKey;
//   
//               //: reserved for future extension
//               EmptyExt ext;
//           } accountSpecificRule;
//       }
//
// ===========================================================================
xdr.union("SignerRuleResourceAccountSpecificRuleExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
    ["addAccSpecificRuleResource", "accountSpecificRule"],
  ],
  arms: {
    accountSpecificRule: xdr.lookup("SignerRuleResourceAccountSpecificRuleExtAccountSpecificRule"),
  },
});

// === xdr source ============================================================
//
//   //: Describes properties of some entries that can be used to restrict the usage of entries
//   union SignerRuleResource switch (LedgerEntryType type)
//   {
//   case REVIEWABLE_REQUEST:
//       //: Describes properties that are equal to managed reviewable request entry fields
//       struct
//       {
//           //: Describes properties of some reviewable request types that
//           //: can be used to restrict the usage of reviewable requests
//           ReviewableRequestResource details;
//   
//           //: Bit mask of tasks that is allowed to add to reviewable request pending tasks
//           uint64 tasksToAdd;
//           //: Bit mask of tasks that is allowed to remove from reviewable request pending tasks
//           uint64 tasksToRemove;
//           //: Bit mask of tasks that is allowed to use as reviewable request pending tasks
//           uint64 allTasks;
//   
//           EmptyExt ext;
//       } reviewableRequest;
//   case ASSET:
//       //: Describes properties that are equal to managed asset entry fields
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
//       //: Describes properties that are equal to managed offer entry fields and their properties
//       struct
//       {
//           //: type of base asset
//           uint64 baseAssetType;
//           //: type of quote asset
//           uint64 quoteAssetType;
//   
//           //: code of base asset
//           AssetCode baseAssetCode;
//           //: code of quote asset
//           AssetCode quoteAssetCode;
//   
//           bool isBuy;
//   
//           EmptyExt ext;
//       } offer;
//   case SALE:
//       //: Describes properties that are equal to managed offer entry fields
//       struct
//       {
//           uint64 saleID;
//           uint64 saleType;
//   
//           EmptyExt ext;
//       } sale;
//   case ATOMIC_SWAP_ASK:
//       struct
//       {
//           uint64 assetType;
//           AssetCode assetCode;
//   
//           EmptyExt ext;
//       } atomicSwapAsk;
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
//   case POLL:
//       struct
//       {
//           //: ID of the poll
//           uint64 pollID;
//   
//           //: permission type of poll
//           uint32 permissionType;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       } poll;
//   case VOTE:
//       struct
//       {
//           //: ID of the poll
//           uint64 pollID;
//   
//           //: permission type of poll
//           uint32 permissionType;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       } vote;
//   case INITIATE_KYC_RECOVERY:
//       struct
//       {
//           //: Role id
//           uint64 roleID;
//   
//           //: reserved for future extension
//           EmptyExt ext;
//       } initiateKYCRecovery;
//   case ACCOUNT_SPECIFIC_RULE:
//       //: reserved for future extension
//       union switch(LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       case ADD_ACC_SPECIFIC_RULE_RESOURCE:
//           struct
//           {
//               //: Describes properties of some ledger key that
//               //: can be used to restrict the usage of account specific rules
//               LedgerKey ledgerKey;
//   
//               //: reserved for future extension
//               EmptyExt ext;
//           } accountSpecificRule;
//       } accountSpecificRuleExt;
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
    ["reviewableRequest", "reviewableRequest"],
    ["asset", "asset"],
    ["any", xdr.void()],
    ["offerEntry", "offer"],
    ["sale", "sale"],
    ["atomicSwapAsk", "atomicSwapAsk"],
    ["signerRule", "signerRule"],
    ["signerRole", "signerRole"],
    ["signer", "signer"],
    ["keyValue", "keyValue"],
    ["poll", "poll"],
    ["vote", "vote"],
    ["initiateKycRecovery", "initiateKycRecovery"],
    ["accountSpecificRule", "accountSpecificRuleExt"],
  ],
  arms: {
    reviewableRequest: xdr.lookup("SignerRuleResourceReviewableRequest"),
    asset: xdr.lookup("SignerRuleResourceAsset"),
    offer: xdr.lookup("SignerRuleResourceOffer"),
    sale: xdr.lookup("SignerRuleResourceSale"),
    atomicSwapAsk: xdr.lookup("SignerRuleResourceAtomicSwapAsk"),
    signerRule: xdr.lookup("SignerRuleResourceSignerRule"),
    signerRole: xdr.lookup("SignerRuleResourceSignerRole"),
    signer: xdr.lookup("SignerRuleResourceSigner"),
    keyValue: xdr.lookup("SignerRuleResourceKeyValue"),
    poll: xdr.lookup("SignerRuleResourcePoll"),
    vote: xdr.lookup("SignerRuleResourceVote"),
    initiateKycRecovery: xdr.lookup("SignerRuleResourceInitiateKycRecovery"),
    accountSpecificRuleExt: xdr.lookup("SignerRuleResourceAccountSpecificRuleExt"),
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
//       CREATE_FOR_OTHER_WITH_TASKS = 18
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
//   //: Body of a reviewable AMLAlertRequest, contains parameters regarding AML alert
//   struct AMLAlertRequest {
//       //: Target balance to void tokens from
//       BalanceID balanceID;
//   
//       //: Amount to void
//       uint64 amount;
//   
//       //: Arbitrary stringified json object that can be used to attach data to be reviewed by an admin
//       longstring creatorDetails; // details set by requester
//   
//       //: Reserved for future use
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
//   //: AssetCreationRequest is used to create an asset with provided parameters
//   struct AssetCreationRequest {
//       //: Code of an asset to create
//       AssetCode code;
//       //: Public key of a signer that will perform pre issuance
//       AccountID preissuedAssetSigner;
//       //: Maximal amount to be issued
//       uint64 maxIssuanceAmount;
//       //: Amount to pre issue on asset creation
//       uint64 initialPreissuedAmount;
//       //: Bit mask of policies to create an asset with
//       uint32 policies;
//       //: Arbitrary stringified JSON object that can be used to attach data to be reviewed by an admin
//       longstring creatorDetails; // details set by requester
//        //: Type of asset, selected arbitrarily. Can be used to restrict the usage of an asset
//       uint64 type;
//       //: Used to keep track of rejected requests updates (`SequenceNumber` increases after each rejected AssetCreationRequest update)
//       uint32 sequenceNumber;
//       //: Number of significant decimal places
//       uint32 trailingDigitsCount;
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
//   //: AssetUpdateRequest is used to update an asset with provided parameters
//   struct AssetUpdateRequest {
//       //: Code of an asset to update
//       AssetCode code;
//       //: Arbitrary stringified JSON object that can be used to attach data to be reviewed by an admin
//       longstring creatorDetails; // details set by requester
//       //: New policies to set will override the existing ones
//       uint32 policies;
//       //: Used to keep track of rejected requests update (`SequenceNumber` increases after each rejected AssetUpdateRequest update).
//       uint32 sequenceNumber;
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
//   //: AssetChangePreissuedSigner is used to update a pre issued asset signer
//   struct AssetChangePreissuedSigner
//   {
//       //: code of an asset to update
//       AssetCode code;
//       //: Public key of a signer that will be the new pre issuer
//       AccountID accountID;
//       //: Content signature of a pre issuer signer
//       //: Content equals hash of `<code>:<accountID>`
//       DecoratedSignature signature;
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
xdr.union("CreateAtomicSwapAskRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: CreateAtomicSwapAskRequest is used to create atomic swap ask entry with passed fields
//   struct CreateAtomicSwapAskRequest
//   {
//       //: ID of balance with base asset
//       BalanceID baseBalance;
//       //: Amount to be sold through atomic swaps
//       uint64 amount;
//       //: Arbitrary stringified json object provided by a requester
//       longstring creatorDetails; // details set by requester
//       //: Array of assets with price which can be used to ask base asset
//       AtomicSwapAskQuoteAsset quoteAssets<>;
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
xdr.struct("CreateAtomicSwapAskRequest", [
  ["baseBalance", xdr.lookup("BalanceId")],
  ["amount", xdr.lookup("Uint64")],
  ["creatorDetails", xdr.lookup("Longstring")],
  ["quoteAssets", xdr.varArray(xdr.lookup("AtomicSwapAskQuoteAsset"), 2147483647)],
  ["ext", xdr.lookup("CreateAtomicSwapAskRequestExt")],
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
xdr.union("CreateAtomicSwapBidRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: CreateAtomicSwapBidRequest is used to create atomic swap bid request with passed fields
//   struct CreateAtomicSwapBidRequest
//   {
//       //: ID of existing bid
//       uint64 askID;
//       //: Amount in base asset to ask
//       uint64 baseAmount;
//       //: Code of asset which will be used to ask base asset
//       AssetCode quoteAsset;
//       //: Arbitrary stringified json object provided by a requester
//       longstring creatorDetails; // details set by requester
//   
//       //: reserved for the future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       } ext;
//   };
//
// ===========================================================================
xdr.struct("CreateAtomicSwapBidRequest", [
  ["askId", xdr.lookup("Uint64")],
  ["baseAmount", xdr.lookup("Uint64")],
  ["quoteAsset", xdr.lookup("AssetCode")],
  ["creatorDetails", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("CreateAtomicSwapBidRequestExt")],
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
xdr.union("CreatePollRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: CreatePollRequest is used to create poll entry with passed fields
//   struct CreatePollRequest
//   {
//       //: is used to restrict using of poll through rules
//       uint32 permissionType;
//   
//       //: Number of allowed choices
//       uint32 numberOfChoices;
//   
//       //: Specification of poll
//       PollData data;
//   
//       //: Arbitrary stringified json object with details about the poll
//       longstring creatorDetails; // details set by requester
//   
//       //: The date from which voting in the poll will be allowed
//       uint64 startTime;
//   
//       //: The date until which voting in the poll will be allowed
//       uint64 endTime;
//   
//       //: ID of account which is responsible for poll result submitting
//       AccountID resultProviderID;
//   
//       //: True means that signature of `resultProvider` is required to participate in poll voting
//       bool voteConfirmationRequired;
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
xdr.struct("CreatePollRequest", [
  ["permissionType", xdr.lookup("Uint32")],
  ["numberOfChoices", xdr.lookup("Uint32")],
  ["data", xdr.lookup("PollData")],
  ["creatorDetails", xdr.lookup("Longstring")],
  ["startTime", xdr.lookup("Uint64")],
  ["endTime", xdr.lookup("Uint64")],
  ["resultProviderId", xdr.lookup("AccountId")],
  ["voteConfirmationRequired", xdr.bool()],
  ["ext", xdr.lookup("CreatePollRequestExt")],
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
//   //: Is used to pass required values to perform pre issuance
//   struct PreIssuanceRequest
//   {
//       //: Code of an asset whose `available_for_issuance_amount` will increase
//       AssetCode asset;
//       //: Amount that will be added to current available for issuance amount
//       uint64 amount;
//       //: Pre issuer signer's signature of the `<reference>:<amount>:<asset>` hash
//       DecoratedSignature signature;
//       //: Unique string for such type of a reviewable request
//       string64 reference;
//       //: Arbitrary stringified json object provided by a requester
//       longstring creatorDetails; // details set by requester
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
//   //: Body of reviewable `IssuanceRequest`, contains parameters regarding issuance
//   struct IssuanceRequest {
//       //: Code of an asset to issue
//   	AssetCode asset;
//      //: Amount to issue
//   	uint64 amount;
//       //: Balance to issue on
//   	BalanceID receiver;
//       //: Arbitrary stringified json object that can be used to attach data to be reviewed by an admin
//   	longstring creatorDetails; // details of the issuance (External system id, etc.)
//       //: Total fee to pay, consists of fixed fee and percent fee, calculated automatically
//   	Fee fee; //totalFee to be payed (calculated automatically)
//   	//: Reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//     ext;
//   };
//
// ===========================================================================
xdr.struct("IssuanceRequest", [
  ["asset", xdr.lookup("AssetCode")],
  ["amount", xdr.lookup("Uint64")],
  ["receiver", xdr.lookup("BalanceId")],
  ["creatorDetails", xdr.lookup("Longstring")],
  ["fee", xdr.lookup("Fee")],
  ["ext", xdr.lookup("IssuanceRequestExt")],
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
xdr.union("KycRecoveryRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: KYCRecoveryRequest is used to change signers of target account
//   struct KYCRecoveryRequest {
//       //: Account to be recovered
//       AccountID targetAccount;
//       //: New signers for the target account
//       UpdateSignerData signersData<>;
//   
//       //: Arbitrary stringified json object that can be used to attach data to be reviewed by an admin
//       longstring creatorDetails; // details set by requester
//       //: Sequence number increases when request is rejected
//       uint32 sequenceNumber;
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
xdr.struct("KycRecoveryRequest", [
  ["targetAccount", xdr.lookup("AccountId")],
  ["signersData", xdr.varArray(xdr.lookup("UpdateSignerData"), 2147483647)],
  ["creatorDetails", xdr.lookup("Longstring")],
  ["sequenceNumber", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("KycRecoveryRequestExt")],
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
//   //: Body of reviewable `LimitsUpdateRequest` contains details regarding limit updates
//   struct LimitsUpdateRequest
//   {
//       //: Arbitrary stringified JSON object that can be used to attach data to be reviewed by an admin
//       longstring creatorDetails;
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
xdr.struct("LimitsUpdateRequest", [
  ["creatorDetails", xdr.lookup("Longstring")],
  ["ext", xdr.lookup("LimitsUpdateRequestExt")],
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
//   //: SaleCreationRequestQuoteAsset is a structure that contains an asset code with price
//   struct SaleCreationRequestQuoteAsset {
//       //: AssetCode of quote asset
//       AssetCode quoteAsset; // asset in which participation will be accepted
//       //: Price of sale base asset in relation to a quote asset
//       uint64 price; // price for 1 baseAsset in relation to a quote asset
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
//       }
//
// ===========================================================================
xdr.union("CreateAccountSaleRuleDataExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   //: CreateAccountSaleRuleData is used to pass necessary params to create a new account sale rule
//   struct CreateAccountSaleRuleData
//   {
//       //: Certain account for which rule is applied, null means rule is global
//       AccountID* accountID;
//       //: True if such rule is deniable, otherwise allows
//       bool forbids;
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
xdr.struct("CreateAccountSaleRuleData", [
  ["accountId", xdr.option(xdr.lookup("AccountId"))],
  ["forbids", xdr.bool()],
  ["ext", xdr.lookup("CreateAccountSaleRuleDataExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       case ADD_SALE_WHITELISTS:
//           //: array of rules that define participation rules. One global rule must be specified.
//           CreateAccountSaleRuleData saleRules<>;
//       }
//
// ===========================================================================
xdr.union("SaleCreationRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
    ["addSaleWhitelist", "saleRules"],
  ],
  arms: {
    saleRules: xdr.varArray(xdr.lookup("CreateAccountSaleRuleData"), 2147483647),
  },
});

// === xdr source ============================================================
//
//   //: SaleCreationRequest is used to create a sale with provided parameters
//   struct SaleCreationRequest
//   {
//       //: Some custom sale type that can be used while setting account rules 
//       uint64 saleType;
//       //: Asset code of an asset to sell on sale
//       AssetCode baseAsset; // asset for which sale will be performed
//       //: Asset code of an asset used to calculcate soft cap and hard cap
//       AssetCode defaultQuoteAsset; // asset for soft and hard cap
//       //: Time when the sale should start
//       uint64 startTime; // start time of the sale
//       //: Time when the sale should end
//       uint64 endTime; // close time of the sale
//       //: Minimal amount (in default quote asset) that has to be sold on sale for it to be considered successful
//       uint64 softCap; // minimum amount of quote asset to be received at which sale will be considered a successful
//       //: Maximal amount (in default quote asset) to be received during the sale. Sale closes immediately after reaching the hard cap
//       uint64 hardCap; // max amount of quote asset to be received
//       //: Arbitrary stringified JSON object that can be used to attach data to be reviewed by an admin
//       longstring creatorDetails; // details set by requester
//       //: Parameters specific to a particular sale type
//       SaleTypeExt saleTypeExt;
//       //:
//       uint64 requiredBaseAssetForHardCap;
//       //: Used to keep track of rejected requests updates. `SequenceNumber` increases after each rejected SaleCreationRequest update.
//       uint32 sequenceNumber;
//       //: Array of quote assets that are available for participation
//       SaleCreationRequestQuoteAsset quoteAssets<100>;
//       //: Use `EMPTY_VERSION` to allow anyone participate in sale,
//       //: use `ADD_SALE_WHITELISTS` to specify sale participation rules
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       case ADD_SALE_WHITELISTS:
//           //: array of rules that define participation rules. One global rule must be specified.
//           CreateAccountSaleRuleData saleRules<>;
//       }
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
//   //: UpdateSaleDetailsRequest is used to update details of an existing sale
//   struct UpdateSaleDetailsRequest {
//       //: ID of the sale whose details should be updated
//       uint64 saleID; // ID of sale to update details
//       //: Arbitrary stringified JSON object that can be used to attach data to be reviewed by an admin
//       longstring creatorDetails; // details set by requester
//       //: Used to keep track of rejected requests update.  `SequenceNumber increases` after each rejected UpdateSaleDetailsRequest update
//       uint32 sequenceNumber;
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
xdr.struct("UpdateSaleDetailsRequest", [
  ["saleId", xdr.lookup("Uint64")],
  ["creatorDetails", xdr.lookup("Longstring")],
  ["sequenceNumber", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("UpdateSaleDetailsRequestExt")],
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
//   //: WithdrawalRequest contains details regarding a withdraw
//   struct WithdrawalRequest {
//       //: Balance to withdraw from
//       BalanceID balance; // balance id from which withdrawal will be performed
//       //: Amount to withdraw
//       uint64 amount; // amount to be withdrawn
//       //: Amount in stats quote asset 
//       uint64 universalAmount; // amount in stats asset
//       //: Total fee to pay, contains fixed amount and calculated percent of the withdrawn amount
//       Fee fee; // expected fee to be paid
//       //: Arbitrary stringified json object that can be used to attach data to be reviewed by an admin
//       longstring creatorDetails; // details set by requester
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
//       case PAYMENT:
//           PaymentOp paymentOp;
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
//       case CREATE_ATOMIC_SWAP_ASK_REQUEST:
//           CreateAtomicSwapAskRequestOp createAtomicSwapAskRequestOp;
//       case CANCEL_ATOMIC_SWAP_ASK:
//           CancelAtomicSwapAskOp cancelAtomicSwapAskOp;
//       case CREATE_ATOMIC_SWAP_BID_REQUEST:
//           CreateAtomicSwapBidRequestOp createAtomicSwapBidRequestOp;
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
//       case STAMP:
//           StampOp stampOp;
//       case LICENSE:
//           LicenseOp licenseOp;
//       case MANAGE_CREATE_POLL_REQUEST:
//           ManageCreatePollRequestOp manageCreatePollRequestOp;
//       case MANAGE_POLL:
//           ManagePollOp managePollOp;
//       case MANAGE_VOTE:
//           ManageVoteOp manageVoteOp;
//       case MANAGE_ACCOUNT_SPECIFIC_RULE:
//           ManageAccountSpecificRuleOp manageAccountSpecificRuleOp;
//       case CANCEL_CHANGE_ROLE_REQUEST:
//           CancelChangeRoleRequestOp cancelChangeRoleRequestOp;
//       case REMOVE_ASSET_PAIR:
//           RemoveAssetPairOp removeAssetPairOp;
//       case INITIATE_KYC_RECOVERY:
//           InitiateKYCRecoveryOp initiateKYCRecoveryOp;
//       case CREATE_KYC_RECOVERY_REQUEST:
//           CreateKYCRecoveryRequestOp createKYCRecoveryRequestOp;
//       case REMOVE_ASSET:
//           RemoveAssetOp removeAssetOp;
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
    ["payment", "paymentOp"],
    ["manageSale", "manageSaleOp"],
    ["createManageLimitsRequest", "createManageLimitsRequestOp"],
    ["manageContractRequest", "manageContractRequestOp"],
    ["manageContract", "manageContractOp"],
    ["cancelSaleRequest", "cancelSaleCreationRequestOp"],
    ["createAtomicSwapAskRequest", "createAtomicSwapAskRequestOp"],
    ["cancelAtomicSwapAsk", "cancelAtomicSwapAskOp"],
    ["createAtomicSwapBidRequest", "createAtomicSwapBidRequestOp"],
    ["manageAccountRole", "manageAccountRoleOp"],
    ["manageAccountRule", "manageAccountRuleOp"],
    ["manageSigner", "manageSignerOp"],
    ["manageSignerRole", "manageSignerRoleOp"],
    ["manageSignerRule", "manageSignerRuleOp"],
    ["stamp", "stampOp"],
    ["license", "licenseOp"],
    ["manageCreatePollRequest", "manageCreatePollRequestOp"],
    ["managePoll", "managePollOp"],
    ["manageVote", "manageVoteOp"],
    ["manageAccountSpecificRule", "manageAccountSpecificRuleOp"],
    ["cancelChangeRoleRequest", "cancelChangeRoleRequestOp"],
    ["removeAssetPair", "removeAssetPairOp"],
    ["initiateKycRecovery", "initiateKycRecoveryOp"],
    ["createKycRecoveryRequest", "createKycRecoveryRequestOp"],
    ["removeAsset", "removeAssetOp"],
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
    paymentOp: xdr.lookup("PaymentOp"),
    manageSaleOp: xdr.lookup("ManageSaleOp"),
    createManageLimitsRequestOp: xdr.lookup("CreateManageLimitsRequestOp"),
    manageContractRequestOp: xdr.lookup("ManageContractRequestOp"),
    manageContractOp: xdr.lookup("ManageContractOp"),
    cancelSaleCreationRequestOp: xdr.lookup("CancelSaleCreationRequestOp"),
    createAtomicSwapAskRequestOp: xdr.lookup("CreateAtomicSwapAskRequestOp"),
    cancelAtomicSwapAskOp: xdr.lookup("CancelAtomicSwapAskOp"),
    createAtomicSwapBidRequestOp: xdr.lookup("CreateAtomicSwapBidRequestOp"),
    manageAccountRoleOp: xdr.lookup("ManageAccountRoleOp"),
    manageAccountRuleOp: xdr.lookup("ManageAccountRuleOp"),
    manageSignerOp: xdr.lookup("ManageSignerOp"),
    manageSignerRoleOp: xdr.lookup("ManageSignerRoleOp"),
    manageSignerRuleOp: xdr.lookup("ManageSignerRuleOp"),
    stampOp: xdr.lookup("StampOp"),
    licenseOp: xdr.lookup("LicenseOp"),
    manageCreatePollRequestOp: xdr.lookup("ManageCreatePollRequestOp"),
    managePollOp: xdr.lookup("ManagePollOp"),
    manageVoteOp: xdr.lookup("ManageVoteOp"),
    manageAccountSpecificRuleOp: xdr.lookup("ManageAccountSpecificRuleOp"),
    cancelChangeRoleRequestOp: xdr.lookup("CancelChangeRoleRequestOp"),
    removeAssetPairOp: xdr.lookup("RemoveAssetPairOp"),
    initiateKycRecoveryOp: xdr.lookup("InitiateKycRecoveryOp"),
    createKycRecoveryRequestOp: xdr.lookup("CreateKycRecoveryRequestOp"),
    removeAssetOp: xdr.lookup("RemoveAssetOp"),
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
//       case PAYMENT:
//           PaymentOp paymentOp;
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
//       case CREATE_ATOMIC_SWAP_ASK_REQUEST:
//           CreateAtomicSwapAskRequestOp createAtomicSwapAskRequestOp;
//       case CANCEL_ATOMIC_SWAP_ASK:
//           CancelAtomicSwapAskOp cancelAtomicSwapAskOp;
//       case CREATE_ATOMIC_SWAP_BID_REQUEST:
//           CreateAtomicSwapBidRequestOp createAtomicSwapBidRequestOp;
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
//       case STAMP:
//           StampOp stampOp;
//       case LICENSE:
//           LicenseOp licenseOp;
//       case MANAGE_CREATE_POLL_REQUEST:
//           ManageCreatePollRequestOp manageCreatePollRequestOp;
//       case MANAGE_POLL:
//           ManagePollOp managePollOp;
//       case MANAGE_VOTE:
//           ManageVoteOp manageVoteOp;
//       case MANAGE_ACCOUNT_SPECIFIC_RULE:
//           ManageAccountSpecificRuleOp manageAccountSpecificRuleOp;
//       case CANCEL_CHANGE_ROLE_REQUEST:
//           CancelChangeRoleRequestOp cancelChangeRoleRequestOp;
//       case REMOVE_ASSET_PAIR:
//           RemoveAssetPairOp removeAssetPairOp;
//       case INITIATE_KYC_RECOVERY:
//           InitiateKYCRecoveryOp initiateKYCRecoveryOp;
//       case CREATE_KYC_RECOVERY_REQUEST:
//           CreateKYCRecoveryRequestOp createKYCRecoveryRequestOp;
//       case REMOVE_ASSET:
//           RemoveAssetOp removeAssetOp;
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
//       case PAYMENT:
//           PaymentResult paymentResult;
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
//       case CREATE_ATOMIC_SWAP_ASK_REQUEST:
//           CreateAtomicSwapAskRequestResult createAtomicSwapAskRequestResult;
//       case CANCEL_ATOMIC_SWAP_ASK:
//           CancelAtomicSwapAskResult cancelAtomicSwapAskResult;
//       case CREATE_ATOMIC_SWAP_BID_REQUEST:
//           CreateAtomicSwapBidRequestResult createAtomicSwapBidRequestResult;
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
//       case MANAGE_POLL:
//           ManagePollResult managePollResult;
//       case MANAGE_CREATE_POLL_REQUEST:
//           ManageCreatePollRequestResult manageCreatePollRequestResult;
//       case MANAGE_VOTE:
//           ManageVoteResult manageVoteResult;
//       case MANAGE_ACCOUNT_SPECIFIC_RULE:
//           ManageAccountSpecificRuleResult manageAccountSpecificRuleResult;
//       case CANCEL_CHANGE_ROLE_REQUEST:
//           CancelChangeRoleRequestResult cancelChangeRoleRequestResult;
//       case REMOVE_ASSET_PAIR:
//           RemoveAssetPairResult removeAssetPairResult;
//       case CREATE_KYC_RECOVERY_REQUEST:
//           CreateKYCRecoveryRequestResult createKYCRecoveryRequestResult;
//       case INITIATE_KYC_RECOVERY:
//           InitiateKYCRecoveryResult initiateKYCRecoveryResult;
//       case REMOVE_ASSET:
//           RemoveAssetResult removeAssetResult;
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
    ["payment", "paymentResult"],
    ["manageSale", "manageSaleResult"],
    ["createManageLimitsRequest", "createManageLimitsRequestResult"],
    ["manageContractRequest", "manageContractRequestResult"],
    ["manageContract", "manageContractResult"],
    ["cancelSaleRequest", "cancelSaleCreationRequestResult"],
    ["createAtomicSwapAskRequest", "createAtomicSwapAskRequestResult"],
    ["cancelAtomicSwapAsk", "cancelAtomicSwapAskResult"],
    ["createAtomicSwapBidRequest", "createAtomicSwapBidRequestResult"],
    ["manageAccountRole", "manageAccountRoleResult"],
    ["manageAccountRule", "manageAccountRuleResult"],
    ["manageSigner", "manageSignerResult"],
    ["manageSignerRole", "manageSignerRoleResult"],
    ["manageSignerRule", "manageSignerRuleResult"],
    ["stamp", "stampResult"],
    ["license", "licenseResult"],
    ["managePoll", "managePollResult"],
    ["manageCreatePollRequest", "manageCreatePollRequestResult"],
    ["manageVote", "manageVoteResult"],
    ["manageAccountSpecificRule", "manageAccountSpecificRuleResult"],
    ["cancelChangeRoleRequest", "cancelChangeRoleRequestResult"],
    ["removeAssetPair", "removeAssetPairResult"],
    ["createKycRecoveryRequest", "createKycRecoveryRequestResult"],
    ["initiateKycRecovery", "initiateKycRecoveryResult"],
    ["removeAsset", "removeAssetResult"],
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
    paymentResult: xdr.lookup("PaymentResult"),
    manageSaleResult: xdr.lookup("ManageSaleResult"),
    createManageLimitsRequestResult: xdr.lookup("CreateManageLimitsRequestResult"),
    manageContractRequestResult: xdr.lookup("ManageContractRequestResult"),
    manageContractResult: xdr.lookup("ManageContractResult"),
    cancelSaleCreationRequestResult: xdr.lookup("CancelSaleCreationRequestResult"),
    createAtomicSwapAskRequestResult: xdr.lookup("CreateAtomicSwapAskRequestResult"),
    cancelAtomicSwapAskResult: xdr.lookup("CancelAtomicSwapAskResult"),
    createAtomicSwapBidRequestResult: xdr.lookup("CreateAtomicSwapBidRequestResult"),
    manageAccountRoleResult: xdr.lookup("ManageAccountRoleResult"),
    manageAccountRuleResult: xdr.lookup("ManageAccountRuleResult"),
    manageSignerResult: xdr.lookup("ManageSignerResult"),
    manageSignerRoleResult: xdr.lookup("ManageSignerRoleResult"),
    manageSignerRuleResult: xdr.lookup("ManageSignerRuleResult"),
    stampResult: xdr.lookup("StampResult"),
    licenseResult: xdr.lookup("LicenseResult"),
    managePollResult: xdr.lookup("ManagePollResult"),
    manageCreatePollRequestResult: xdr.lookup("ManageCreatePollRequestResult"),
    manageVoteResult: xdr.lookup("ManageVoteResult"),
    manageAccountSpecificRuleResult: xdr.lookup("ManageAccountSpecificRuleResult"),
    cancelChangeRoleRequestResult: xdr.lookup("CancelChangeRoleRequestResult"),
    removeAssetPairResult: xdr.lookup("RemoveAssetPairResult"),
    createKycRecoveryRequestResult: xdr.lookup("CreateKycRecoveryRequestResult"),
    initiateKycRecoveryResult: xdr.lookup("InitiateKycRecoveryResult"),
    removeAssetResult: xdr.lookup("RemoveAssetResult"),
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
//       case PAYMENT:
//           PaymentResult paymentResult;
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
//       case CREATE_ATOMIC_SWAP_ASK_REQUEST:
//           CreateAtomicSwapAskRequestResult createAtomicSwapAskRequestResult;
//       case CANCEL_ATOMIC_SWAP_ASK:
//           CancelAtomicSwapAskResult cancelAtomicSwapAskResult;
//       case CREATE_ATOMIC_SWAP_BID_REQUEST:
//           CreateAtomicSwapBidRequestResult createAtomicSwapBidRequestResult;
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
//       case MANAGE_POLL:
//           ManagePollResult managePollResult;
//       case MANAGE_CREATE_POLL_REQUEST:
//           ManageCreatePollRequestResult manageCreatePollRequestResult;
//       case MANAGE_VOTE:
//           ManageVoteResult manageVoteResult;
//       case MANAGE_ACCOUNT_SPECIFIC_RULE:
//           ManageAccountSpecificRuleResult manageAccountSpecificRuleResult;
//       case CANCEL_CHANGE_ROLE_REQUEST:
//           CancelChangeRoleRequestResult cancelChangeRoleRequestResult;
//       case REMOVE_ASSET_PAIR:
//           RemoveAssetPairResult removeAssetPairResult;
//       case CREATE_KYC_RECOVERY_REQUEST:
//           CreateKYCRecoveryRequestResult createKYCRecoveryRequestResult;
//       case INITIATE_KYC_RECOVERY:
//           InitiateKYCRecoveryResult initiateKYCRecoveryResult;
//       case REMOVE_ASSET:
//           RemoveAssetResult removeAssetResult;
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
//       ATOMIC_SWAP_ASK = 28,
//       TRANSACTION = 29, // is used for account rule resource
//       SIGNER_RULE = 30,
//       SIGNER_ROLE = 31,
//       STAMP = 32,
//       LICENSE = 33,
//       POLL = 34,
//       VOTE = 35,
//       ACCOUNT_SPECIFIC_RULE = 36,
//       INITIATE_KYC_RECOVERY = 37
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
  atomicSwapAsk: 28,
  transaction: 29,
  signerRule: 30,
  signerRole: 31,
  stamp: 32,
  license: 33,
  poll: 34,
  vote: 35,
  accountSpecificRule: 36,
  initiateKycRecovery: 37,
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
//       PAYMENT = 23,
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
//       CREATE_ATOMIC_SWAP_ASK_REQUEST = 35,
//       CANCEL_ATOMIC_SWAP_ASK = 36,
//       CREATE_ATOMIC_SWAP_BID_REQUEST = 37,
//       MANAGE_SIGNER = 38,
//       MANAGE_SIGNER_ROLE = 39,
//       MANAGE_SIGNER_RULE = 40,
//       STAMP = 41,
//       LICENSE = 42,
//       MANAGE_CREATE_POLL_REQUEST = 43,
//       MANAGE_POLL = 44,
//       MANAGE_VOTE = 45,
//       MANAGE_ACCOUNT_SPECIFIC_RULE = 46,
//       CANCEL_CHANGE_ROLE_REQUEST = 47,
//       INITIATE_KYC_RECOVERY = 48,
//       CREATE_KYC_RECOVERY_REQUEST = 49,
//       REMOVE_ASSET_PAIR = 50,
//       REMOVE_ASSET = 51
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
  payment: 23,
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
  createAtomicSwapAskRequest: 35,
  cancelAtomicSwapAsk: 36,
  createAtomicSwapBidRequest: 37,
  manageSigner: 38,
  manageSignerRole: 39,
  manageSignerRule: 40,
  stamp: 41,
  license: 42,
  manageCreatePollRequest: 43,
  managePoll: 44,
  manageVote: 45,
  manageAccountSpecificRule: 46,
  cancelChangeRoleRequest: 47,
  initiateKycRecovery: 48,
  createKycRecoveryRequest: 49,
  removeAssetPair: 50,
  removeAsset: 51,
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
