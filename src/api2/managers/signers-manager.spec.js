import sinon from 'sinon'

import { SignersManager } from './signers-manager'
import { ApiCaller } from '../api-caller'

import { Keypair } from '../../base'
import { default as xdr } from '../../base/generated/xdr_generated'
import { Operation } from '../../base/operation'

function parseTransactionEnvelope (envelope) {
  const buffer = Buffer.from(envelope, 'base64')
  const transaction = xdr.TransactionEnvelope.fromXDR(buffer)
  const operations = transaction.tx().operations()

  return operations
    .map(operation => Operation.operationToObject(operation))
}

describe('Signers manager', () => {
  let sandbox
  let signersManagerInstance

  beforeEach(() => {
    sandbox = sinon.createSandbox()
    signersManagerInstance = new SignersManager(
      ApiCaller.getInstance('https://api.test.com')
    )
  })

  describe('createChangeSignerTransaction', () => {
    beforeEach(() => {
      sandbox.stub(signersManagerInstance, '_getSigners').resolves([
        {
          id: 'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S',
          identity: 0
        },
        {
          id: 'GAJIMZYYBBU7XPXDLR2HUI6KIIV5LMUNJ2WOHY2FQ2Y5MCTDPMLOFLDY',
          identity: 0
        },
        {
          id: 'GBEHGGVNR6I4J3KV4WP5VONSGALNXJIXI3QHLLGXYVSVBEETR3YHFYDF',
          identity: 0
        },
        {
          id: 'GD2BSUAJPCN3UKRI64IJI53BJ22NKSVQ7OB6CM2D6OLAZU7U44GC23A7',
          identity: 1
        }
      ])
      sandbox.stub(signersManagerInstance, '_getDefaultSignerRole')
        .resolves('1')
    })

    it('should create a transaction, that changes master signer and removes signer to replace', async () => {
      const result = await signersManagerInstance
        .createChangeSignerTransaction({
          sourceAccount: 'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S',
          newPublicKey: 'GABMN37HVQYAX4YCUMSKCCEJNFV4YOMNZOZDUMNEW5FAX5QESM7QO63Q',
          signingKeypair: Keypair.fromSecret('SBLSDQ764O5IDRAFZXQJMBAJXWL3Z73SATJTAOIPGINPPUZ67E5VKIB3'),
          signerToReplace: 'GAJIMZYYBBU7XPXDLR2HUI6KIIV5LMUNJ2WOHY2FQ2Y5MCTDPMLOFLDY'
        })

      expect(parseTransactionEnvelope(result))
        .to.deep.equal([
          {
            type: 'manageSigner',
            publicKey: 'GABMN37HVQYAX4YCUMSKCCEJNFV4YOMNZOZDUMNEW5FAX5QESM7QO63Q',
            roleID: '1',
            weight: '1000',
            identity: '0',
            details: {}
          },
          {
            type: 'manageSigner',
            publicKey: 'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S'
          },
          {
            type: 'manageSigner',
            publicKey: 'GAJIMZYYBBU7XPXDLR2HUI6KIIV5LMUNJ2WOHY2FQ2Y5MCTDPMLOFLDY'
          }
        ])
    })

    it('should create a transaction, that changes master signer and removes all the signers', async () => {
      const result = await signersManagerInstance
        .createChangeSignerTransaction({
          sourceAccount: 'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S',
          newPublicKey: 'GABMN37HVQYAX4YCUMSKCCEJNFV4YOMNZOZDUMNEW5FAX5QESM7QO63Q',
          signingKeypair: Keypair.fromSecret('SBLSDQ764O5IDRAFZXQJMBAJXWL3Z73SATJTAOIPGINPPUZ67E5VKIB3')
        })

      expect(parseTransactionEnvelope(result))
        .to.deep.equal([
          {
            type: 'manageSigner',
            publicKey: 'GABMN37HVQYAX4YCUMSKCCEJNFV4YOMNZOZDUMNEW5FAX5QESM7QO63Q',
            roleID: '1',
            weight: '1000',
            identity: '0',
            details: {}
          },
          {
            type: 'manageSigner',
            publicKey: 'GBUQDWXPPEFREJPI45CUPACMY6AQINP4DQ2DFXAF6YISPF3C4FFJ3U5S'
          },
          {
            type: 'manageSigner',
            publicKey: 'GAJIMZYYBBU7XPXDLR2HUI6KIIV5LMUNJ2WOHY2FQ2Y5MCTDPMLOFLDY'
          },
          {
            type: 'manageSigner',
            publicKey: 'GBEHGGVNR6I4J3KV4WP5VONSGALNXJIXI3QHLLGXYVSVBEETR3YHFYDF'
          }
        ])
    })
  })
})
