const Block = require("../block/Block");

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "08/04/2024", "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    const previousBlock = this.getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimeStamp = new Date().toISOString();
    const newBlock = new Block(
      newIndex,
      newTimeStamp,
      data,
      previousBlock.hash
    );
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return "Ton hachage a été modifié !!!!!!!!!!";
      }
      if (previousBlock.hash !== currentBlock.previousHash) {
        return "Un des blocks n'a pas le même hachage que le block précédent !!!!!!!!!!!";
      }
    }
    return "T'inquiète ça passe";
  }
}

module.exports = Blockchain;
