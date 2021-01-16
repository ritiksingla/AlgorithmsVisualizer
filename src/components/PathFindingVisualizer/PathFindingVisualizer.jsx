import React, { Component } from 'react';
import Node from '../Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../../algorithms/dijkstra';
import './PathFindingVisualizer.css';

const START_NODE = [0, 0];
const FINISH_NODE = [15, 15];

class PathFindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matrix: [],
            mouseIsPressed: false,
        };

        // helper functions
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.animateDijkstra = this.animateDijkstra.bind(this);
        this.animateShortestPath = this.animateShortestPath.bind(this);
        this.visualizeDijkstra = this.visualizeDijkstra.bind(this);
    }

    // Called after constructer only once
    componentDidMount() {
        const matrix = getInitialMatrix();
        this.setState({ matrix });
    }

    handleMouseDown(row, col) {
        const newMatrix = getNewMatrixWithWallToggled(this.state.matrix, row, col);
        this.setState({ matrix: newMatrix, mouseIsPressed: true });
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) {
            return;
        }
        const newMatrix = getNewMatrixWithWallToggled(this.state.matrix, row, col);
        this.setState({ matrix: newMatrix });
    }

    handleMouseUp() {
        this.setState({ mouseIsPressed: false });
    }

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; ++i) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
            }, 10 * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; ++i) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
            },50 * i);
        }
    }

    visualizeDijkstra() {
        const { matrix } = this.state;
        const startNode = matrix[START_NODE[0]][START_NODE[1]];
        const finishNode = matrix[FINISH_NODE[0]][FINISH_NODE[1]];
        const visitedNodesInOrder = dijkstra(matrix, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    render() {
        const { matrix, mouseIsPressed } = this.state;
        return (
            <>
                <button className = "button" onClick={this.visualizeDijkstra}>
                    Visualize Dijkstra's Algorithm
                </button>
                <div className='grid'>
                    {
                        matrix.map((row, rowIdx) => {
                            return (
                                <div key={rowIdx}> {
                                    row.map((node, nodeIdx) => {
                                        const { row, col, isFinish, isStart, isWall } = node;
                                        return (
                                            <Node
                                                key={nodeIdx}
                                                row={row}
                                                col={col}
                                                isFinish={isFinish}
                                                isStart={isStart}
                                                isWall={isWall}
                                                mouseIsPressed={mouseIsPressed}
                                                onMouseDown={this.handleMouseDown}
                                                onMouseEnter={this.handleMouseEnter}
                                                onMouseUp={this.handleMouseUp}
                                            />
                                        );
                                    })
                                }
                                </div>
                            );
                        })}
                </div>
            </>
        );
    }
}

// get the initial matrix
function getInitialMatrix() {
    const matrix = [];
    for (let i = 0; i < 20; ++i) {
        const row_matrix = [];
        for (let j = 0; j < 20; ++j) {
            row_matrix.push(createNode(i, j));
        }
        matrix.push(row_matrix);
    }
    return matrix;
}

// create a new node with necessary properties
function createNode(row, col) {
    return {
        row,
        col,
        isStart: (row === START_NODE[0] && col === START_NODE[1]),
        isFinish: (row === FINISH_NODE[0] && col === FINISH_NODE[1]),
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
}

// toggle the wall in the matrix
function getNewMatrixWithWallToggled(matrix, row, col) {
    const newMatrix = matrix.slice();
    const node = newMatrix[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newMatrix[row][col] = newNode;
    return newMatrix;
}
export default PathFindingVisualizer;