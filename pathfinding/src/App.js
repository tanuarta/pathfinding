import { useEffect, useState } from 'react';
import './App.css';
import style from './App.module.scss'
import Box from './Components/Box';

function App() {

  const [board, setBoard] = useState([[]])
  const [size, setSize] = useState(0);
  const [finish, setFinish] = useState('');
  

  let [selectedQueue, changeSelectedQueue] = useState([]);

  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  const reset = () => {
    let tmpBoard = [];
    for (let i = 0; i < size; i++) {
      tmpBoard.push([]);
      for (let j = 0; j < 9; j++) {
        tmpBoard[i].push(0);
      }
    }
    setBoard(tmpBoard)
    changeSelectedQueue([]);
    setFinish('');
  }

  const populateBoard = () => {
    let tmpBoard = [];
    for (let i = 0; i < size; i++) {
      tmpBoard.push([]);
      for (let j = 0; j < 9; j++) {
        tmpBoard[i].push(0);
      }
    }
    
    setBoard(tmpBoard)
  }

  const handleSize = (e) => {
    console.log(e.target.value)
    setSize(e.target.value)
  }

  const nextStep = (newBoard, oldQueue) => {
    let i = 0;
    let queue = [];
    while (i < oldQueue.length) {
      let x = oldQueue[i][0];
      let y = oldQueue[i][1];
      newBoard[x][y] = -1

      if (x - 1 >= 0 && (newBoard[x - 1][y] === 0 || newBoard[x - 1][y] === 3)) {
        if (newBoard[x - 1][y] === 3) {
          console.log('found end')
          queue = [];
          setFinish('Finish Found');
          break;
        }
        queue.push([x - 1, y])
        newBoard[x - 1][y] = -1
      }
      if (y - 1 >= 0 && (newBoard[x][y - 1] === 0 || newBoard[x][y - 1] === 3)) {
        if (newBoard[x][y - 1] === 3) {
          console.log('found end')
          queue = [];
          setFinish('Finish Found');
          break;
        }
        queue.push([x, y - 1])
        newBoard[x][y - 1] = -1
      }
      if (x + 1 < size && (newBoard[x + 1][y] === 0 || newBoard[x + 1][y] === 3)) {
        if (newBoard[x + 1][y] === 3) {
          console.log('found end')
          queue = [];
          setFinish('Finish Found');
          break;
        }
        queue.push([x + 1, y])
        newBoard[x + 1][y] = -1
      }
      if (y + 1 < 9 && (newBoard[x][y + 1] === 0 || newBoard[x][y + 1] === 3)) {
        if (newBoard[x][y + 1] === 3) {
          console.log('found end')
          queue = [];
          setFinish('Finish Found');
          break;
        }
        queue.push([x, y + 1])
        newBoard[x][y + 1] = -1
      }
      selectedQueue.splice(i, 1)

      setBoard([...newBoard])
      i++;
      setFinish('Path not found!')
    }
    console.log(queue)
    return queue;
  }


  async function pathFind() {
    setFinish('');
    let tmpBoard = [...board]
    let tmpQueue = [...selectedQueue]
    
    let i = 0
    while (tmpQueue.length != 0) {
      await delay(800);
      tmpQueue = nextStep(tmpBoard, tmpQueue)
      i++;
    }
    
  }

  return (
    <div className="style.mainBox">
      <button onClick={populateBoard}>start</button>
      <input onChange={handleSize} />
      <button onClick={pathFind}>FIND THAT PATH!</button>
      <button onClick={reset}>reset</button>
      <div>{finish}</div>
      <div className={style.gameBoard}>
        {board.map((x, indexx) => x.map((value, indexy) => 
            <Box x={indexx} y={indexy} value={value} selectedQueue={selectedQueue} changeSelectedQueue={changeSelectedQueue} board={board} setBoard={setBoard}/>
          )
        )}
      </div>
    </div>
  );
}

export default App;
