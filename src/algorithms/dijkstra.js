export function dijkstra(matrix, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, -1, 1];
  const q = [];
  const N = matrix.length,
    M = matrix[0].length;
  startNode.isVisited = true;
  q.push(startNode);
  visitedNodesInOrder.push(startNode);
  while (q.length > 0) {
    const currentNode = q.shift();
    for (let k = 0; k < 4; ++k) {
      let x = currentNode.row + dx[k];
      let y = currentNode.col + dy[k];
      if (
        x >= 0 &&
        x < N &&
        y >= 0 &&
        y < M &&
        !matrix[x][y].isVisited &&
        !matrix[x][y].isWall
      ) {
        matrix[x][y].distance = currentNode.distance + 1;
        matrix[x][y].isVisited = true;
        matrix[x][y].previousNode = currentNode;
        visitedNodesInOrder.push(matrix[x][y]);
        if (matrix[x][y] === finishNode) {
          return visitedNodesInOrder;
        }
        q.push(matrix[x][y]);
      }
    }
  }
  // Finish node not found
  return null;
}

// backtracks from the finish node when called after dijsktra
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
