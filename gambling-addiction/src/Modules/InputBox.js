import React from 'react'

const InputBox = (props) => {
  return (
    <form onSubmit={props.inputHandler}>
      <input type="text" name="InputBox" id="input-box" />
    </form>
  );
}

export default InputBox;