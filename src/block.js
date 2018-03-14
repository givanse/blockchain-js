import sha256 from 'crypto-js/sha256';

export default class Block {

  constructor(timestamp, data) {
    this.timestamp = timestamp;
    this.data = data;
    this.height = null;
    this.previousHash = null;
  }

  calculateHash() {
    const blockContents = this.height +
                      this.previousHash +
                      this.timestamp +
                      JSON.stringify(this.data);
    const hash = sha256(blockContents);
    return hash.toString(); 
  }

  isHashValid() {
    return this.hash === this.calculateHash();
  }

}
