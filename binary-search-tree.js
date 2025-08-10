const TreePrototype = {
  merge(array1, array2) {
    let i = 0;
    let j = 0;
    const mergedArray = [];
    while (array1.length > i && array2.length > j) {
      if (array1[i] <= array2[j]) {
        mergedArray.push(array1[i]);
        i++;
      } else {
        mergedArray.push(array2[j]);
        j++;
      }
    }
    if (array1.length > i && array2.length <= j) {
      mergedArray.push(...array1.splice(i));
    } else if (array2.length > j && array1.length <= i) {
      mergedArray.push(...array2.splice(j));
    }
    return mergedArray;
  },
  mergeSort(array) {
    if (array.length < 2) return array;
    const leftArray = array.slice(0, array.length / 2);
    const rightArray = array.slice(array.length / 2, array.length);
    return this.merge(this.mergeSort(leftArray), this.mergeSort(rightArray));
  },
  removeDuplicate(sortedArray) {
    if (!sortedArray?.length) return [];
    const newSortedArray = [sortedArray[0]];
    for (let i = 1; i < sortedArray.length; i++)
      if (newSortedArray[newSortedArray.length - 1] !== sortedArray[i]) newSortedArray.push(sortedArray[i]);
    return newSortedArray;
  },
  processArray(array) {
    if (!Array.isArray(array)) return null;
    if (array.length < 1) return null;
    if (array.length === 1) return this.Node(array[0]);
    return this.removeDuplicate(this.mergeSort(array));
  },
  Node(data, left = null, right = null) {
    return { data, left, right };
  },
  build(array, start, end) {
    if (start > end) return null;
    let mid = Math.floor(start + (end - start) / 2);
    const root = this.Node(array[mid]);
    root.left = this.build(array, start, mid - 1);
    root.right = this.build(array, mid + 1, end);
    return root;
  },
  buildTree(array) {
    if (!Array.isArray(array)) return null;
    if (array.length < 1) return null;
    if (array.length === 1) return this.Node(array[0]);
    const processedArray = this.processArray(array);
    return this.build(processedArray, 0, processedArray.length - 1);
  },
  insert(value) {
    if (!Number.isInteger(value) || (!value && value !== 0)) return false;
    if (this.root === null) {
      this.root = this.Node(value);
      return true;
    }
    let pointer = this.root;
    while (true) {
      if (pointer.data === value) return false;
      if (value < pointer.data) {
        if (pointer.left) {
          pointer = pointer.left;
        } else {
          pointer.left = this.Node(value);
          return true;
        }
      } else {
        if (pointer.right) {
          pointer = pointer.right;
        } else {
          pointer.right = this.Node(value);
          return true;
        }
      }
    }
  },

  deleteItem(value) {
    const findMin = node => {
      while (node.left) node = node.left;
      return node;
    };
    let parent = null;
    let current = this.root;
    let direction = null;

    while (current && current.data !== value) {
      parent = current;
      if (value < current.data) {
        current = current.left;
        direction = "left";
      } else {
        current = current.right;
        direction = "right";
      }
    }
    if (!current) return false;

    // Case 1: No children
    if (!current.left && !current.right) {
      if (!parent) this.root = null;
      else parent[direction] = null;
    }
    // Case 2: One child
    else if (!current.left || !current.right) {
      const child = current.left || current.right;
      if (!parent) this.root = child;
      else parent[direction] = child;
    }
    // Case 3: Two children
    else {
      const successor = findMin(current.right);
      const successorData = successor.data;
      this.deleteItem(successorData);
      current.data = successorData;
    }
    return true;
  },
};
function Tree(array) {
  const tree = Object.create(TreePrototype);
  tree.root = TreePrototype.buildTree(array);
  return tree;
}