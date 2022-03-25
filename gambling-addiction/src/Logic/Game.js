let gameData
const setGameData = (value, debug) => {
    gameData = value
    if (debug){
        console.log("Set gameData from: " + debug);
    }
}
let characterData = {
    name: "",
    setName: function (value) {
        characterData.name = value
    }
    //Job: JobId
}
const INPUT = "input"
const PRINT = "print"
let gameStep = 0
const incrementGameStep = () => {
    if (gameStep < gameSteps.length - 1){
        gameStep++
        console.log("Game Step: " + gameStep)
    }
}
/*
    gameSteps format: 
    [
        {
            process: function that handles logic for the current point in the game
            type: enum with the options {print, input}. this will determine how the function handles moving on to the next step
            validInputs: used to validate input can be: an array with a set of valid inputs, the string "AnyValue"
            inputTarget: function that will handle the input and perform neccasary logic
            gameData: stores all data that will be returned for use in rendering what will be displayed to the user
        }
    ]
*/
const gameSteps = [
    {
        process: gameStart,
        type: PRINT,
        gameData: {
            consoleLines: [
                {
                    text: "Gambling Addiction"
                },
                {
                    text: "The Game"
                },
                {
                    text: "Press Enter to Start"
                }
            ]
        }
    },
    {
        process: characterCreation,
        type: INPUT,
        validInputs: "AnyValue",
        inputTarget: characterData.setName,
        gameData: {
            consoleLines: [
                {
                    text: "Enter your name: "
                }
            ]
        }
    },
    {
        process: debugPrint,
        type: PRINT,
        gameData: {
            consoleLines: [
                {
                    text: "Debug check console"
                }
            ]
        }
    }
]
function main(options){
    if (!gameData){
        init()
    }
    gameSteps[gameStep].process(options)
    // Decide to move to next step or not
    switch(gameSteps[gameStep].type){
        case "print":
            incrementGameStep()
            break;
        case "input":
            break;
        default: 
            console.log("No type @gameSteps["+gameStep+"]");
            console.log("Moving on to next step.");
            incrementGameStep()
            break;
    }
    return gameData;
}

function init(){
    gameStep = 0
}

function gameStart(){
    setGameData(gameSteps[gameStep].gameData, "gameStart")
}

function characterCreation(options){
    if (!gameSteps[gameStep].validInputs){
        console.log("No input @Game/Character Creation")
        setGameData(gameSteps[gameStep].gameData, "characterCreation1")
    }
    else{
        //If there are valid inputs check input in options and validate
        console.log("Has Input@Game/Character Creation")
        // If input in options has not been received yet just print console lines
        if (!options.input || options.input === ""){
            setGameData(gameSteps[gameStep].gameData, "characterCreation2")
            return
        }
        if (gameSteps[gameStep].validInputs === "AnyValue"){
            // This case represents situations where any input is valid
            console.log("Input AnyValue @Game/Character Creation")
            console.log("Input: " + options.input)
            gameSteps[gameStep].inputTarget(options.input)
        }
        //If invalid repeat add error message and repeat commands
        //Move on to next step
        incrementGameStep()
        main()
    }
}

//TODO
function dailyLoop(options){
    return
}

function debugPrint(){
    console.log("Character Data: ");
    console.log(characterData);
    setGameData(gameSteps[gameStep].gameData, "debugPrint")
}

const Game = {
    main,
}
export default Game; 

