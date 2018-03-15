import Block from './block';
import Transaction from './transaction';

export default class Chain {

  constructor() {
    this.difficulty = 2; // how many zeros should prefix the blocks hashes

    this.pendingTransactions = [];

    this.miningReward = 100;
  }

  createGenesisBlock() {
    const blockHeight = 0;
    const timestamp = Date.now();
    const transactions = [];

    const genesisBlock = new Block(timestamp, transactions);
    const hash = genesisBlock.calculateHash();
    genesisBlock.hash = hash;

    console.log('genesis block created:');
    console.log(hash);

    this.blocks = [];
    this.blocks[blockHeight] = genesisBlock;
  }

  getLastBlock() {
    const blockHeight = this.blocks.length - 1;
    return this.blocks[blockHeight];
  }

  minePendingTransactions() {
    const t = new Transaction('network', 'miner', this.miningReward);
    this.pendingTransactions.push(t);

    //Note: Block size would limit the amount of transactions that can be mined.
    const newBlock = new Block(Date.now(), this.pendingTransactions);
    
    const lastBlock = this.getLastBlock();
    newBlock.previousHash = lastBlock.hash; 
    
    newBlock.hash = newBlock.mineBlock(this.difficulty);
    console.log('block mined: ' + newBlock.hash);

    this.blocks.push(newBlock);
    this.pendingTransactions = [];
  }

  submitTransaction(transaction) {
    //TODO: validate transaction
    this.pendingTransactions.push(transaction);
  }

  isChainValid() {
    for (let i = 1; i < this.blocks.length; i++){
      const currentBlock = this.blocks[i];
      const previousBlock = this.blocks[i - 1];

      if (!currentBlock.isHashValid()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }

      console.log('block ' + i + ' is valid.');
    }

    return true;
  }

}
