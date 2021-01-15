import React from 'react';
import './Node.css';

function Node(props) {
    const { col, isFinish, isStart, isWall, row } = props;

    const extraClassName = (isFinish ? 'node-finish' : (isStart ? 'node-start' : (isWall ? 'node-wall' : '')));

    return (
        <div
            id={'node-' + row + '-' + col}
            className={`node ${extraClassName}`}
            onMouseDown={props.onMouseDown.bind(this, row, col)}
            onMouseEnter={props.onMouseEnter.bind(this, row, col)}
            onMouseUp={props.onMouseUp}
        >
        </div>
    );
}

export default Node;