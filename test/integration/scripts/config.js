import { TokenD, Wallet, base } from '../../../src'

let masterSeeds = require('./master_seeds');
const _ = require('lodash');

var admins = {
    // supported value keys:
    // * identity:int
    // * weight:int
    // * type:int
    // * name:str
    local: {},
    dev: _.mapValues({
        'GBTRUMWH23MNME2TR6RBW3KOQPRIXGRDZPI3HVVUF5S32JQ6MM2NC4VF': {
            identity: 1,
        },
        'GDTEA7JYI2TNJF7ZIMCBGGJLGDSH3MOUZK5N4ZTEILQYSP4FS2SC6MYL': {
            identity: 2,
        },
        'GDWZZKOSXMUKYW5NUNDH4AIPRBROUI67GNAPCIQ3PXWYTBSNV6HIYWBB': {
            identity: 3,
        },
        'GBNH45C5RDSFJ6JV75IQA6OTXV2OQJZ37LBLULIIXN6K4RBTRHEXFF5O': {
            identity: 4,
        },
        'GBCKATEJYCBY5V7JIRHHTENPDF7AYDRSO3VDFMUXRAEE7CXBAYZPDTKS': {
            identity: 5,
        },
        'GAELAOCC44DFPXEHF2DEWRGQK6DUW2NEIRONGDDJ5ET7BWSE3ZB2YE6G': {
            identity: 6,
        },
        'GC7SVJFGSXNPPZ3RS2KJOWG3OSBOSSERXAEKBVW6YM7SHYCHLYRW4VTO': {
            identity: 7,
        },
        'GDVTUNOJ2BNYLTZTKMEZ3BKLMVFUIVGFUJEKLDF5KIWD4KRBXUA55IBR': {
            identity: 8,
        },
        'GCN4GZ625NUUJ64XLXQNDZVLCGKHHM6DFEQ4HJMNKC34CSQCCCZD7LDL': {
            identity: 9,
        },
        'GDSAIMPNUGCT5GTRKYZME65YS7SFVLJSD6HFPJZT2FNYPRNTZVSPIYSF': {
            identity: 10,
        },
        // withdraw
        'GAR47OMBKHXZ55CEODNBG6L34LJRSFJ7QRBL7MTCFFCK6CGLHUWZ246N': {
            identity: 11,
            weight: 51,
            type: 16 | 128,
            name: `Withdraw signer 1`
        },
        'GAJHBDSVNMZVBJP24TMULBXK5VNJQEMCQKNWA2NRZ7HNA7OVJXLTKGZD': {
            identity: 12,
            weight: 51,
            type: 16 | 128,
            name: `Withdraw signer 2`
        },
        'GBUNYKBS45LXOFQV3TMYJ36IPLGK3K7AS2ORETANGA7C5SOOGRWBUTMA': {
            identity: 1,
            name: "Secure Vote",
        },
        'GB6TQCONBUGTZDLORH4YWV3ISGAM3PO3UCGBKH3MTCJO3V6VDQQTHYXL': {
            identity: 1,
            name: "admin_1",
            weight: 255,
        }
    }, details => ({
        identity: details.identity,
        weight: details.weight || 255,
        type: details.type || 2147483647,
        name: details.name || `Admin ${details.identity}`
    })),
    staging: _.mapValues({
        'GA6HRCUJY4WIDWE3PSBQDMRO5M4RHP6GL2OFBCXXEFU5CFU744OTNDKL': {
            identity: 1,
        },
        'GAOYBHSVM6E55S5TFLFRZIYIY5O3U34675NUHPA5U2XEPQDKUF3JIQDR': {
            identity: 2,
        },
        'GCJN5KZ2ZKPV3PXHGE6M7QQ5Q7XY4JT2F7K3GEYELEPYDRSNR3OSQPBL': {
            identity: 3,
        },
        'GB3I7QXFFSHWT7UAHZI2QGT7PCWOMFLYFE3CAFB374X36DNXLFUIQK6S': {
            identity: 4,
        },
    }, details => ({
        identity: details.identity,
        weight: details.weight || 255,
        type: details.type || 2147483647,
    })),
}

const passphrases = {
    local: 'Test SDF Network ; September 2015',
    dev: 'Swarm New Dev; Feb 18',
    staging: 'SUN Staging Network ; December 2017'
}

const urls = {
    local: 'http://127.0.0.1:8000',
    dev: 'https://api-dev.swarm.fund',
    staging: 'http://staging.api.sun.swarm.fund'
}

//env is one of the {'local', 'dev', 'staging'}

module.exports = {
    getConfig: function (env) {
        const url = urls[env]
        const master = base.Keypair.fromSecret(masterSeeds[env])
        const sdk = new TokenD()
        sdk.useWallet(new Wallet(
          'any@mail.com',
          master,
          master.accountId(),
          'anything'
        ))
        const networkPassphrase = passphrases[env]
        sdk._useNetworkPassphrase(networkPassphrase)
        const config = {
            url,
            networkPassphrase,
            master,
            issuance: master,
            admins: admins[env],
            thresholds: {
                master: 255,
                high: 100,
            },
            sdk
        };

        return config
    }
};
