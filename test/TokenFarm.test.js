const DappToken = artifacts.require('DappToken');
const DaiToken = artifacts.require('DaiToken');
const TokenFarm = artifacts.require('TokenFarm');

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether')
}

contract('TokenFarm', ([owner, investor]) => {

  let daiToken, dappToken, tokenFarm

  before(async () => {
    daiToken = await DaiToken.new()
    dappToken = await DappToken.new()
    tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address)

    // Transfer all DaapTokens to TokenFarm (1 million)
    await dappToken.transfer(tokenFarm.address, tokens('1000000'))

    // Transfer 100 Mock DAI tokens to investor
    await daiToken.transfer(investor, tokens('100'), { from: owner });
  })

  describe('Mock Dai deployment', async () => {
    it('has a name', async () => {
      const name = await daiToken.name()
      assert.equal(name, 'Mock DAI Token')
    })
  })

  describe('Dapp Token deployment', async () => {
    it('has a name', async () => {
      const name = await dappToken.name()
      assert.equal(name, 'DApp Token')
    })
  })
})