'use strict';

//Every merkle tree starts with raw data, which is an array of strings. 
// The merkle tree is built by hashing pairs of data together until only one hash remains, which is the root of the tree.

const transactions = [
    'tx1: Peter pays Promise 10 BTC',
    'tx2:Promise pays Unique 5 BTC',
    'tx3: Bash pays Joe 2 BTC',
    'tx4: Joe pays NewKing 1 BTC'
];

//We will use node's built in crypto module to create hashes - In a real implementation, you would use a more secure hashing algorithm like SHA-256.
 const crypto = require('crypto');

 function hash(data) {
    return crypto
        .createHash('sha256')
        .update(data)
        .digest('hex');
 }

 // create leave nodes by hashing the transactions
 const leaves = transactions.map(tx => hash(tx));
 console.log('Leave Nodes:');

 // Building the tree level by level until we get to the root
 // Take the hashes in pairs, concatenate them, and hash the result to get the parent node.
 //  If there's an odd number of nodes, duplicate the last one.

 function buildMerkleTree(leaves) {
    let level = leaves;

    if(level.length === 0) {
        return null;
    }
    if (level.length === 1) {
        return level[0];
    }
    if (level.length % 2 !== 0) {
        level.push(level[level.length - 1]);
    }

    const nextLevel = [];
    //if there a odd number of nodes, duplicate the last one
    for (let i = 0; i < level.length; i += 2) {
        const left = level[i];
        const right = level[i + 1];

        // combine the left and right node and hash them to get the parent node
        const parentHash = hash(left + right);
        nextLevel.push(parentHash);
    }   
    return buildMerkleTree(nextLevel);
 }

 // Repeat until one hash remains
 function getMerkleRoot(transactions){
    let level = transactions.map(tx => hash(tx));
    
    while (level.length > 1){

      if (level.length % 2 !== 0){
        level.push(level[level.length -1]);
    }
    level = buildMerkleTree(level);
    }

     return level[0];

 }

 
