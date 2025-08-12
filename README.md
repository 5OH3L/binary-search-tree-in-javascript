# Binary Search Tree in JavaScript
A fully featured **Binary Search Tree (BST)** implementation in JavaScript.  
Includes methods for building, traversing, modifying, and balancing the tree, along with an automated test suite using Node.js `assert`.

## Features
- **Tree Construction**

  - Build from an array (sorted and duplicates removed automatically)
  - Node creation via factory function
  - Merge sort + duplicate removal for preprocessing

- **Insertion & Deletion**

  - Insert unique values only (duplicates are ignored)
  - Delete nodes with 0, 1, or 2 children

- **Search**

  - Find a node by value
  - Get node height or depth

- **Traversals** (both recursive and iterative)

  - Level-order
  - In-order
  - Pre-order
  - Post-order

- **Tree Properties**

  - Check if the tree is balanced
  - Calculate height and depth
  - Rebalance the tree

- **Debugging**
  - Pretty print the tree structure in console

## Usage
```javascript
const { Tree } = require("./binary-search-tree.js");

// Create a BST from an array
const tree = Tree([10, 5, 15, 3, 7, 12, 18]);

// Insert values
tree.insert(6);

// Delete values
tree.deleteItem(10);

// Traversals
tree.inOrderForEach(node => console.log(node.data));

// Check balance
console.log(tree.isBalanced());

// Pretty print
tree.prettyPrint();
```

## Running Tests
```bash
node binary-search-tree.test.js
```

### Tests include:
- Balanced tree creation
- All traversal methods
- Depth and height calculations
- Balance checking
- Rebalancing
- Randomized test data generation

## File Structure
```bash
binary-search-tree.js       # Main BST implementation
binary-search-tree.test.js  # Test suite with random data helper
```