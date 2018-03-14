import Chain from './chain';
import Block from './block';

const chain = new Chain();
chain.createGenesisBlock();

chain.addBlock(new Block(Date.now(), 'I am the block 001'));
chain.addBlock(new Block(Date.now(), 'I am the block 002'));

console.log('Blockchain valid? ' + chain.isChainValid());

