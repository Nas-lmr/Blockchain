const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
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
        JSON.stringify(this.data) +
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
    this.difficulty = 4;
  }
  createGensisBlock() {
    return new Block(0, "07/04/2024", "premier block", "0");
  }

  // get latest block created
  getLatesBlock() {
    return this.chain[this.chain.length - 1];
  }

  // add new block
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatesBlock().hash;
    newBlock.mainBlock(this.difficulty);
    this.chain.push(newBlock);
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
console.log("main block 1");
wildcode.addBlock(new Block(1, "08/04/2024", { amount: 4 }));
console.log("main block 2");

wildcode.addBlock(new Block(2, "09/04/2024", { amount: 10 }));


