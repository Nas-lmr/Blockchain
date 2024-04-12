const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  // calculate hashing
  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString();
  }
}

// blockchain  class

class Blockchain {
  constructor() {
    // array of blocks
    this.chain = [this.createGensisBlock()];
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
    newBlock.hash = newBlock.calculateHash();
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
wildcode.addBlock(new Block(1, "08/04/2024", { amount: 4 }));
wildcode.addBlock(new Block(2, "09/04/2024", { amount: 10 }));

console.log(wildcode.isChainIsvalid());

console.log(JSON.stringify(wildcode, null, 4));

// after the block get changed

// wildcode.chain[1].data = {amount: 100}
// wildcode.chain[1].hash = wildcode.chain[1].calculateHash()
// console.log(wildcode.isChainIsvalid());
