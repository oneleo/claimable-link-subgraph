import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { Cancelled } from "../generated/schema"
import { Cancelled as CancelledEvent } from "../generated/ClaimableLink/ClaimableLink"
import { handleCancelled } from "../src/claimable-link"
import { createCancelledEvent } from "./claimable-link-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let giver = Address.fromString("0x0000000000000000000000000000000000000001")
    let token = Address.fromString("0x0000000000000000000000000000000000000001")
    let transferID = BigInt.fromI32(234)
    let newCancelledEvent = createCancelledEvent(giver, token, transferID)
    handleCancelled(newCancelledEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Cancelled created and stored", () => {
    assert.entityCount("Cancelled", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Cancelled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "giver",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Cancelled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "token",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Cancelled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "transferID",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
