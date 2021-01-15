export function dijkstra(matrix, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(matrix);
    while(!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        // If it is wall, skip it
        if(closestNode.isWall) {
            continue;
        }        
        // If we reach infinity then we are trapped and must backtrack
        if(closestNode.distance === Infinity) {
            return visitedNodesInOrder;
        }
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if(closestNode === finishNode) {
            return visitedNodesInOrder;
        }
        updateVisitedNeighbors(closestNode, matrix);

    }
}
function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort( (node_a, node_b) => node_a.distance - node_b.distance);
}

function updateVisitedNeighbors(node, matrix) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, matrix);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function getUnvisitedNeighbors(node, matrix) {
    const neighbors = [];
    const {row, col} = node;
    if (row - 1 >= 0) {
        neighbors.push(matrix[row - 1][col]);
    }
    if(row + 1 < matrix.length) {
        neighbors.push(matrix[row + 1][col]);
    }
    if (col - 1 >= 0) {
        neighbors.push(matrix[row][col - 1]);
    }
    if(col + 1 < matrix[0].length) {
        neighbors.push(matrix[row][col + 1]);
    }
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(matrix) {
    const nodes = [];
    for (const row of matrix) {
        for (const col of row) {
            nodes.push(col);
        }
    }
    return nodes;
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