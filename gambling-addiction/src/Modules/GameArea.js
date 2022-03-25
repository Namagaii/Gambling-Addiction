import React from 'react'
import InputBox from './InputBox.js';
import Console from './Console.js';
import Game from '../Logic/Game.js';
let gameData = {};
gameData = Game.main();
function GameArea() {
  const [gameConsole, setGameConsole] = React.useState(<Console gameData = {gameData} />);
  const inputEventHandler = (event) => {
    event.preventDefault();
    const input = event.target.InputBox.value;
    gameData = Game.main({ input: input })
    setGameConsole(<Console gameData = {gameData} />)
  }
  return (
    <div>
        {gameConsole}
        <InputBox inputHandler = {inputEventHandler}/>
    </div>
  )
}

export default GameArea