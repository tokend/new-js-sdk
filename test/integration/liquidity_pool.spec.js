import {lpAddLiquidity} from "../scripts/lp_add_liquidity";

describe('Liquidity pool', () => {
  it('Should create liquidity pool and provide liquidity', async () => {
    await lpAddLiquidity()
  })
})