import Block from './block';

export default class Chain {

  constructor() {
    this.difficulty = 2; // how many zeros should prefix the blocks hashes
  }

  createGenesisBlock() {
    const blockHeight = 0;
    const timestamp = Date.now();
    const data = 'ᕦ(ò_óˇ)ᕤ';

    const genesisBlock = new Block(timestamp, data);
    const hash = genesisBlock.calculateHash();
    genesisBlock.hash = hash;

    console.log('genesis block created:');
    console.log(hash);

    this.chain = [];
    this.chain[blockHeight] = genesisBlock;
  }

  getLastBlock() {
    const blockHeight = this.chain.length - 1;
    return this.chain[blockHeight];
  }

  addBlock(newBlock) {
    const lastBlock = this.getLastBlock();
    newBlock.height = lastBlock.height + 1;
    newBlock.previousHash = lastBlock.hash; 
    
    newBlock.hash = newBlock.mineBlock(this.difficulty);
    console.log('block mined: ' + newBlock.hash);

    this.chain[newBlock.height] = newBlock;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (!currentBlock.isHashValid()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }

      console.log('block ' + currentBlock.height + ' is valid.');
    }

    return true;
  }

}
