/*******************UN BLOCK******** */
// const Blockchain = require("./NAS/blockchain/Blockchain.js");
// let unBlock = new Blockchain();
// unBlock.addBlock("JE VIENS D'ETRE CREE");

// console.log(JSON.stringify(unBlock, null, 4));

/*********************************BLOCKCHAIN DE BASE********************************** */

// const Blockchain = require("./NAS/blockchain/Blockchain.js");
// let wildCoin = new Blockchain();
// wildCoin.addBlock("Je suis le deuxieme");
// wildCoin.addBlock("Moi le troisieme");
// wildCoin.addBlock("Et moi le dernier");

/****VERIF VALIDE OU PAS */

// console.log("La blockchain est-elle valide ?", wildCoin.isChainValid());
// console.log(JSON.stringify(wildCoin, null, 4));

/**********MODIF DU BLOCK**** */

// wildCoin.chain[1].data = "JE NE SUIS PAS DEUXIEME";
// wildCoin.chain[1].hash = wildCoin.chain[1].calculateHash();
// console.log(JSON.stringify(wildCoin, null, 4));
// console.log("La blockchain est-elle valide ?", wildCoin.isChainValid());

/************************************************************************************ */
