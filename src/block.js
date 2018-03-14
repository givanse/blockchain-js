import sha256 from 'crypto-js/sha256';

export default class Block {

  constructor(timestamp, data) {
    this.timestamp = timestamp;
    this.data = data;
    this.height = null;
    this.previousHash = null;

    // cryptographic nonce, similar in spirit to a nonce word
    // modify this value as many times as you want to produce different hashes.
    this.nonce = 0;
  }

  calculateHash() {
    const blockContents = this.height +
                      this.previousHash +
                      this.timestamp +
                      JSON.stringify(this.data) +
                      this.nonce;
    const hash = sha256(blockContents);
    return hash.toString(); 
  }

  isHashValid() {
    return this.hash === this.calculateHash();
  }

  mineBlock(difficulty) {
    const zeros = Array(difficulty + 1).join('0');
    let hash = '';
    while (hash.substring(0, difficulty) !== zeros) {
      this.nonce++;
      hash = this.calculateHash();
    }
    return hash;
  }

}
