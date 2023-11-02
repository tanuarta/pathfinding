import { useEffect, useState } from 'react';
import style from './Box.module.scss'

const Box = ({ value, x, y, selectedQueue, changeSelectedQueue, board, setBoard }) => {
    function isItemInArray(array, item) {
        for (var i = 0; i < array.length; i++) {

            if (array[i][0] == item[0] && array[i][1] == item[1]) {
                return i;
            }
        }
        return -1;
    }

    const handleClick = () => {
        console.log(x,y)
        let tmpBoard = [...board]
        let tmpQueue = [...selectedQueue]
        console.log(tmpBoard[x][y])

        if (tmpBoard[x][y] === 0) {
            tmpQueue.push([x, y])
            tmpBoard[x][y] = 1
        } else if (tmpBoard[x][y] === 1) {
            let value = isItemInArray(tmpQueue, [x, y])
            tmpQueue.splice(value, 1)
            tmpBoard[x][y] = 2
        } else if (tmpBoard[x][y] === 2) {
            tmpBoard[x][y] = 3
        } else if (tmpBoard[x][y] === 3) {
            tmpBoard[x][y] = 0
        }

        changeSelectedQueue([...tmpQueue])
        setBoard([...tmpBoard])
    }

    return (
        <div className={`${style.box} ${value === 1 ? style.start : ''} ${value === -1 ? style.found : ''} ${value === 2 ? style.wall : ''}${value === 3 ? style.end : ''} `} onClick={handleClick}>
            {value}
        </div>
    )
}

export default Box;