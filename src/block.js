import sha256 from 'crypto-js/sha256';

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.getHash();
  }

  getHash() {
    const blockData = this.index +
                      this.previousHash +
                      this.timestamp +
                      JSON.stringify(this.data);
    const hash = sha256(blockData);
    return hash.toString(); 
  }
}

export default Block;
