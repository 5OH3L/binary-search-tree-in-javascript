const assert = require("assert");
const { Tree } = require("./binary-search-tree.js");

// Local randomArray for tests
function randomArray(maxValue, arrayLength) {
  if (!Number.isInteger(maxValue) || maxValue < 1 || maxValue >= 100) {
    throw new Error("Max value must be between 1 and 99 (inclusive)");
  }
  if (!Number.isInteger(arrayLength) || arrayLength < 1 || arrayLength >= 100) {
    throw new Error("Array length must be between 1 and 99 (inclusive)");
  }
  if (arrayLength > maxValue) {
    throw new Error("Array length cannot exceed max value for unique numbers");
  }

  const set = new Set();
  while (set.size < arrayLength) {
    set.add(Math.floor(Math.random() * maxValue) + 1);
  }
  return [...set];
}

// Helper to collect traversal results
function collectTraversal(traversalFunction, root) {
  const arr = [];
  traversalFunction(node => arr.push(node.data), root);
  return arr;
}

// Create random BST
const tree = Tree(randomArray(99, 15));
assert.strictEqual(tree.isBalanced(), true, "Tree should start balanced");

// Traversal outputs should be arrays of numbers
assert.ok(Array.isArray(collectTraversal(tree.preOrderForEach, tree.root)));
assert.ok(Array.isArray(collectTraversal(tree.inOrderForEach, tree.root)));
assert.ok(Array.isArray(collectTraversal(tree.postOrderForEach, tree.root)));

// Unbalance tree
{
  const values = [];
  tree.inOrderForEach(node => values.push(node.data));
  let unbalancedTree = Tree(values);
  while (unbalancedTree.isBalanced()) {
    unbalancedTree.insert(Math.floor(Math.random() * 99) + 1);
  }
  tree.root = unbalancedTree.root;
}
assert.strictEqual(tree.isBalanced(), false, "Tree should be unbalanced after modification");

// Rebalance tree
tree.rebalance();
assert.strictEqual(tree.isBalanced(), true, "Tree should be balanced after rebalancing");

// Depth checks
const firstValue = collectTraversal(tree.inOrderForEach, tree.root)[0];
assert.strictEqual(tree.depth(firstValue) >= 0, true, "Depth should be >= 0 for existing value");
assert.strictEqual(tree.depth(200), null, "Depth should be null for non-existing value");

console.log("All tests passed ✅");