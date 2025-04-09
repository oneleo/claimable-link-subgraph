import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Cancelled,
  Claimed,
  Deposited,
  EIP712DomainChanged,
  OwnershipTransferStarted,
  OwnershipTransferred,
  Paused,
  Refunded,
  SignerUpdated,
  Unpaused
} from "../generated/ClaimableLink/ClaimableLink"

export function createCancelledEvent(
  giver: Address,
  token: Address,
  transferID: BigInt
): Cancelled {
  let cancelledEvent = changetype<Cancelled>(newMockEvent())

  cancelledEvent.parameters = new Array()

  cancelledEvent.parameters.push(
    new ethereum.EventParam("giver", ethereum.Value.fromAddress(giver))
  )
  cancelledEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  cancelledEvent.parameters.push(
    new ethereum.EventParam(
      "transferID",
      ethereum.Value.fromUnsignedBigInt(transferID)
    )
  )

  return cancelledEvent
}

export function createClaimedEvent(
  giver: Address,
  token: Address,
  transferID: BigInt,
  amount: BigInt,
  recipient: Address,
  signer: Address
): Claimed {
  let claimedEvent = changetype<Claimed>(newMockEvent())

  claimedEvent.parameters = new Array()

  claimedEvent.parameters.push(
    new ethereum.EventParam("giver", ethereum.Value.fromAddress(giver))
  )
  claimedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  claimedEvent.parameters.push(
    new ethereum.EventParam(
      "transferID",
      ethereum.Value.fromUnsignedBigInt(transferID)
    )
  )
  claimedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  claimedEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  claimedEvent.parameters.push(
    new ethereum.EventParam("signer", ethereum.Value.fromAddress(signer))
  )

  return claimedEvent
}

export function createDepositedEvent(
  giver: Address,
  token: Address,
  transferID: BigInt,
  amount: BigInt,
  expiration: BigInt
): Deposited {
  let depositedEvent = changetype<Deposited>(newMockEvent())

  depositedEvent.parameters = new Array()

  depositedEvent.parameters.push(
    new ethereum.EventParam("giver", ethereum.Value.fromAddress(giver))
  )
  depositedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  depositedEvent.parameters.push(
    new ethereum.EventParam(
      "transferID",
      ethereum.Value.fromUnsignedBigInt(transferID)
    )
  )
  depositedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  depositedEvent.parameters.push(
    new ethereum.EventParam(
      "expiration",
      ethereum.Value.fromUnsignedBigInt(expiration)
    )
  )

  return depositedEvent
}

export function createEIP712DomainChangedEvent(): EIP712DomainChanged {
  let eip712DomainChangedEvent = changetype<EIP712DomainChanged>(newMockEvent())

  eip712DomainChangedEvent.parameters = new Array()

  return eip712DomainChangedEvent
}

export function createOwnershipTransferStartedEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferStarted {
  let ownershipTransferStartedEvent =
    changetype<OwnershipTransferStarted>(newMockEvent())

  ownershipTransferStartedEvent.parameters = new Array()

  ownershipTransferStartedEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferStartedEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferStartedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent())

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createRefundedEvent(
  giver: Address,
  token: Address,
  transferID: BigInt
): Refunded {
  let refundedEvent = changetype<Refunded>(newMockEvent())

  refundedEvent.parameters = new Array()

  refundedEvent.parameters.push(
    new ethereum.EventParam("giver", ethereum.Value.fromAddress(giver))
  )
  refundedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  refundedEvent.parameters.push(
    new ethereum.EventParam(
      "transferID",
      ethereum.Value.fromUnsignedBigInt(transferID)
    )
  )

  return refundedEvent
}

export function createSignerUpdatedEvent(
  signer: Address,
  isActivated: boolean
): SignerUpdated {
  let signerUpdatedEvent = changetype<SignerUpdated>(newMockEvent())

  signerUpdatedEvent.parameters = new Array()

  signerUpdatedEvent.parameters.push(
    new ethereum.EventParam("signer", ethereum.Value.fromAddress(signer))
  )
  signerUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "isActivated",
      ethereum.Value.fromBoolean(isActivated)
    )
  )

  return signerUpdatedEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}
