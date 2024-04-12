const SHA256 = require("crypto-js/sha256");

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
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

  createTransaction(transaction) {
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
wildcode.createTransaction(new Transaction("address1", "address2", 100));
wildcode.createTransaction(new Transaction("address2", "address1", 50));

console.log("\n Starting the miner...");
wildcode.miningPendingTransaction("John-address");

console.log(
  "\n Balance of John is ",
  wildcode.getBlanceOfAddress("John-address")
);

// console.log("\n Starting the miner again...");
// wildcode.miningPendingTransaction("John-address");
// console.log(
//   "\n Balance of John is ",
//   wildcode.getBlanceOfAddress("John-address")
// );

// console.log("\n Starting the miner again2...");
// wildcode.miningPendingTransaction("John-address");
// console.log(
//   "\n Balance of John is ",
//   wildcode.getBlanceOfAddress("John-address")
// );

