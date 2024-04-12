const SHA256 = require("crypto-js/sha256");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate(
  "2b322a946747201fd0a6b21cffbe0afefee7bd9ded727e7e8239aafa62d01852"
);
const myWalletAddress = myKey.getPublic("hex");

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
  calculateDataHash() {
    return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
  }
  signTransaction(signingKey) {
    if (signingKey.getPublic("hex") !== this.fromAddress) {
      throw new Error("you can't sign transactions for other wallets");
    }
    const hashTx = this.calculateDataHash();
    const sig = signingKey.sign(hashTx, "base64");
    this.signature = sig.toDER("hex");
  }
  isValid() {
    if (this.fromAddress === null) return true;
    if (!this.signature || this.signature.length === 0) {
      throw new Error("no Signature in this transaction");
    }
    const publicKey = ec.keyFromPublic(this.fromAddress, "hex");
    return publicKey.verify(this.calculateDataHash(), this.signature);
  }
}

class Block {
  constructor(timestamp, transactions, previousHash = "") {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  // calculate hashing
  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce
    ).toString();
  }
  // mainning and setting the difficulty
  mainBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log(this.hash);
  }
  hasValidTransAction() {
    for (const tx of this.transactions) {
      if (!tx.isValid()) {
        return false;
      }
    }
    return true;
  }
}

// blockchain  class
class Blockchain {
  constructor() {
    // array of blocks
    this.chain = [this.createGensisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }
  createGensisBlock() {
    return new Block("07/04/2024", "premier block", "0");
  }

  // get latest block created
  getLatesBlock() {
    return this.chain[this.chain.length - 1];
  }

  miningPendingTransaction(miningRewardAddress) {
    let block = new Block(Date.now(), this.pendingTransactions);
    block.mainBlock(this.difficulty);
    console.log("block successfully mined");
    this.chain.push(block);
    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward),
    ];
  }

  addTransaction(transaction) {
    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error("Transaction must includes from and to address");
    }
    if (!transaction.isValid()) {
      throw new Error("cannot add invalid transaction to chain");
    }
    this.pendingTransactions.push(transaction);
  }

  getBlanceOfAddress(address) {
    let balance = 0;
    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }
        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }
    return balance;
  }

  // check  chain is valid
  isChainIsvalid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      if (currentBlock.hasValidTransAction()) {
        return false;
      }
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

let wildcode = new Blockchain();

const tx1 = new Transaction(myWalletAddress, "the public key ", 90);
tx1.signTransaction(myKey);
wildcode.addTransaction(tx1);

console.log("\n Starting the miner...");
wildcode.miningPendingTransaction(myWalletAddress);

console.log(
  "\n The Balance of My Wallet is ",
  wildcode.getBlanceOfAddress(myWalletAddress)
);
