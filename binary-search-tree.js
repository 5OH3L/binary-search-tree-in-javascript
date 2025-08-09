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
      return mergedArray;
    } else if (array2.length > j && array1.length <= i) {
      mergedArray.push(...array2.splice(j));
      return mergedArray;
    }
    return mergedArray;
  },
  mergeSort(array) {
    if (array.length < 2) return array;
    const leftArray = array.slice(0, array.length / 2);
    const rightArray = array.slice(array.length / 2, array.length);
    return this.merge(this.mergeSort(leftArray), this.mergeSort(rightArray));
  },
  removeDuplicate(array) {
    if (array.length < 1) return null;
    const newArray = [array[0]];
    for (let i = 1; i < array.length; i++) if (newArray[newArray.length - 1] !== array[i]) newArray.push(array[i]);
    return newArray;
  },
  processArray(array) {
    if (!Array.isArray(array)) return null;
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
    if (!Array.isArray(array) || array.length < 3) return null;
    const processedArray = this.processArray(array);
    return this.build(processedArray, 0, processedArray.length - 1);
  },
  insert(value) {
    let currentNode = this.root;
    while (true) {
      if (currentNode.data === value) return false;
      if (value < currentNode.data) {
        if (currentNode.left) {
          lastNode = currentNode;
          currentNode = currentNode.left;
        } else {
          currentNode.left = this.Node(value);
          return true;
        }
      }
      if (currentNode.data < value) {
        if (currentNode.right) {
          lastNode = currentNode;
          currentNode = currentNode.right;
        } else {
          currentNode.right = this.Node(value);
          return true;
        }
      }
    }
  }
};
function Tree(array) {
  const tree = Object.create(TreePrototype);
  tree.root = TreePrototype.buildTree(array);
  return tree;
}