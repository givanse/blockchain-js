import Chain from './chain';
import Transaction from './transaction';

const chain = new Chain();
chain.createGenesisBlock();

chain.submitTransaction(new Transaction('bob', 'alice', 500));
chain.submitTransaction(new Transaction('bob', 'alice', 750));
chain.minePendingTransactions();

chain.submitTransaction(new Transaction('alice', 'bob', 250));
chain.minePendingTransactions();

console.log('Blockchain valid? ' + chain.isChainValid());

let balance = 0;
const address = 'alice';

for (const block of chain.blocks) {
  for (const trans of block.transactions) {
    // If the given address is the sender -> reduce the balance
		if (trans.from === address) {
      balance -= trans.amount;
		}

		// If the given address is the receiver -> increase the balance
		if (trans.to === address) {
      balance += trans.amount;
		}
  }
}

console.log(address + ' balance: ' + balance);
