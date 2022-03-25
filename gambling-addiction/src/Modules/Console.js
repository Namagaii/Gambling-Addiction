import React from 'react'
import ConsoleEntry from './ConsoleEntry'

function Console(props) {
  return (
    <div>
      
      {
        !props || !props.gameData || !props.gameData.consoleLines
        ?
        <ConsoleEntry text = "Error no text found" /> 
        :
        props.gameData.consoleLines.map((line, index) => {
          return <ConsoleEntry text = {line.text} key = {index} />
        })
      }
    </div>
  )
}

export default Console;