import Block from './block';

const blockHeight = 0;
const previousHash = 'B1GB4NGBL0CK';
const timestamp = Date.now();
const data = 'ᕦ(ò_óˇ)ᕤ';

const genesisBlock = new Block(blockHeight, previousHash, timestamp, data);
console.log(genesisBlock.getHash());


export default function() {};
