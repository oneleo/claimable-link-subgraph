import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts";
import {
  Cancelled as CancelledEvent,
  Claimed as ClaimedEvent,
  Deposited as DepositedEvent,
  EIP712DomainChanged as EIP712DomainChangedEvent,
  OwnershipTransferStarted as OwnershipTransferStartedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  Refunded as RefundedEvent,
  SignerUpdated as SignerUpdatedEvent,
  Unpaused as UnpausedEvent,
} from "../generated/ClaimableLink/ClaimableLink";
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
  Unpaused,
  DepositClaimed,
} from "../generated/schema";

export function handleCancelled(event: CancelledEvent): void {
  let entity = new Cancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.giver = event.params.giver;
  entity.token = event.params.token;
  entity.transferID = event.params.transferID;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  const depositClaimedId = getDepositId(
    event.params.giver,
    event.params.token,
    event.params.transferID
  );

  let depositClaimedEntity = DepositClaimed.load(depositClaimedId);
  if (depositClaimedEntity !== null) {
    depositClaimedEntity.cancelled = true;
    depositClaimedEntity.save();
  }
}

export function handleClaimed(event: ClaimedEvent): void {
  let entity = new Claimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.giver = event.params.giver;
  entity.token = event.params.token;
  entity.transferID = event.params.transferID;
  entity.amount = event.params.amount;
  entity.recipient = event.params.recipient;
  entity.signer = event.params.signer;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  const depositClaimedId = getDepositId(
    event.params.giver,
    event.params.token,
    event.params.transferID
  );

  let depositClaimedEntity = DepositClaimed.load(depositClaimedId);
  if (depositClaimedEntity !== null) {
    depositClaimedEntity.recipient = event.params.recipient;
    depositClaimedEntity.signer = event.params.signer;
    depositClaimedEntity.claimed = true;
    depositClaimedEntity.save();
  }
}

export function handleDeposited(event: DepositedEvent): void {
  let entity = new Deposited(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.giver = event.params.giver;
  entity.token = event.params.token;
  entity.transferID = event.params.transferID;
  entity.amount = event.params.amount;
  entity.expiration = event.params.expiration;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  const depositClaimedId = getDepositId(
    event.params.giver,
    event.params.token,
    event.params.transferID
  );

  let depositClaimedEntity = DepositClaimed.load(depositClaimedId);
  if (depositClaimedEntity == null) {
    depositClaimedEntity = new DepositClaimed(depositClaimedId);
    depositClaimedEntity.giver = event.params.giver;
    depositClaimedEntity.token = event.params.token;
    depositClaimedEntity.transferID = event.params.transferID;
    depositClaimedEntity.amount = event.params.amount;
    depositClaimedEntity.recipient = null;
    depositClaimedEntity.signer = null;
    depositClaimedEntity.claimed = false;
    depositClaimedEntity.cancelled = false;
    depositClaimedEntity.refunded = false;
    depositClaimedEntity.save();
  }
}

export function handleEIP712DomainChanged(
  event: EIP712DomainChangedEvent
): void {
  let entity = new EIP712DomainChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferStarted(
  event: OwnershipTransferStartedEvent
): void {
  let entity = new OwnershipTransferStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.account = event.params.account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRefunded(event: RefundedEvent): void {
  let entity = new Refunded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.giver = event.params.giver;
  entity.token = event.params.token;
  entity.transferID = event.params.transferID;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  const depositClaimedId = getDepositId(
    event.params.giver,
    event.params.token,
    event.params.transferID
  );

  let depositClaimedEntity = DepositClaimed.load(depositClaimedId);
  if (depositClaimedEntity !== null) {
    depositClaimedEntity.refunded = true;
    depositClaimedEntity.save();
  }
}

export function handleSignerUpdated(event: SignerUpdatedEvent): void {
  let entity = new SignerUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.signer = event.params.signer;
  entity.isActivated = event.params.isActivated;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.account = event.params.account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

const getDepositId = (
  giver: Address,
  token: Address,
  transferID: BigInt
): Bytes => {
  let hex = transferID.toHex().slice(2); // remove '0x'
  if (hex.length % 2 !== 0) {
    hex = `0` + hex;
  }
  return giver.concat(token).concat(Bytes.fromHexString(`0x` + hex));
};
