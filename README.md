Simple Merkle Tree in JavaScript

This project demonstrates how to build a simple Merkle tree from scratch using JavaScript.
It focuses on explaining the fundamental concept behind Merkle trees: hashing data in pairs until a single root hash is produced.

No external Merkle tree libraries are used.

What Is a Merkle Tree?

A Merkle tree is a cryptographic data structure that:

hashes individual pieces of data (leaf nodes),

combines hashes in pairs,

repeats this process recursively until a single hash remains.

The final hash is known as the Merkle root.

Merkle trees are commonly used in blockchain systems to ensure data integrity, tamper detection, and efficient verification.

How It Works

Start with a list of data items (for example, transactions).

Hash each item to form the leaf nodes.

Pair adjacent hashes and hash them together.

Repeat the process until only one hash remains.

Any change to the input data results in a different Merkle root.

Requirements

Node.js (version 16 or later recommended)

Project Structure
.
├── index.js
└── README.md

Hash Function

For learning purposes, this implementation uses SHA-256 via Node.js’s built-in crypto module.

const crypto = require("crypto");

function hash(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

Creating Leaf Nodes

Each transaction is hashed to create the leaf level of the Merkle tree.

const transactions = ["tx1", "tx2", "tx3", "tx4"];

let level = transactions.map(tx => hash(tx));


At this stage, the level array contains only cryptographic hashes, not raw transaction data.

Building the Merkle Tree

Hashes are combined pairwise and hashed again until a single root remains.

function buildMerkleTree(leaves) {
  let level = leaves;

  while (level.length > 1) {
    // If the number of nodes is odd, duplicate the last node
    if (level.length % 2 !== 0) {
      level.push(level[level.length - 1]);
    }

    let nextLevel = [];

    for (let i = 0; i < level.length; i += 2) {
      let combinedHash = hash(level[i] + level[i + 1]);
      nextLevel.push(combinedHash);
    }

    level = nextLevel;
  }

  return level[0]; // Merkle root
}

Computing the Merkle Root
const merkleRoot = buildMerkleTree(level);
console.log("Merkle Root:", merkleRoot);


The Merkle root cryptographically represents all transactions in the dataset.

Visual Representation
        Merkle Root
          /    \
     Hash12    Hash34
      /  \      /  \
   H(tx1) H(tx2) H(tx3) H(tx4)

Key Properties

Any modification to the input data changes the Merkle root.

Verification is efficient and scalable.

Data integrity is preserved through cryptographic hashing.

The tree remains deterministic even when the number of nodes is odd.

Limitations

This implementation:

does not include Merkle proof generation,

does not verify inclusion proofs,

is not optimized for production use.

It is intended for educational purposes only.
