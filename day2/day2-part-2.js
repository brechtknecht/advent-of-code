var fs = require("fs");


// Load text from static text file
var text = fs.readFileSync("./day2/data.txt").toString('utf-8');

// Rules: rock defeats scissors, scissors defeat paper, paper defeats rock
// loose 0 Points, 3 for draw, 6 for win

// 0 — ROCK A & X        & 1 Point
// 1 — PAPER B & Y       & 2 Points
// 2 — SCISSORS C & Z    & 3 Points

// The interesting thing about this example is that you can also represent A,B,C
// and X,Y,Z as 0,1,2. When you imagine this is a loop-list (it's when you add +1 to the 
// number 2, you'll get 0 — see modulo operator) the winning condition is simple counting.

// For example, player 1 is playing rock, which is represented by 0, the winning condition
// would be scissors, wich is 2. This is valid for all situations. The (index + 2) mod 3
// wins the round. *So no if-voodoo*

var playerOneScore = 0;
var playerTwoScrore = 0;

var games = text.split("\n").map((gameStrategy) => {
    
    let split = gameStrategy.split(" ")
    
    var numericRepresentation = split.map((turn) => {
        return (turn.charCodeAt(0) - 65);
    })

    // Bring X,Y,Z into the 1,2,3 notation
    numericRepresentation[1] = (numericRepresentation[1] + 1) % 3 

    return numericRepresentation
})

// Determine wich player has won the game
games.forEach((players) => {
    
    // Part two of the challenge needs a modulo helper function
    // to correctly display negative modulo values
    // same winning conditions as before 
    if(players[1] == 0) {
        // Loose the game by setting to the winning condition of player 0
        players[1] = mod(players[0] + 2, 3)
    } else if(players[1] == 1) {
        // Draft, by setting simply to the same valie
        players[1] = players[0]
    } else if(players[1] == 2) {
        // Win by setting the winning condition for player 1 which is index - 2
        players[1] = mod(players[0] - 2, 3)
    }

    console.log(players[1])


    // give each player points for their chosen shapes
    playerOneScore = playerOneScore + (players[0] + 1)
    playerTwoScrore = playerTwoScrore + (players[1] + 1)

    // determine if the game is a draft
    if(players[0] == players[1]){
        console.log("Draft — both get two points")
        playerOneScore = playerOneScore + 3
        playerTwoScrore = playerTwoScrore + 3
    }
    
    // As written above, if the first players item plus two (modulo 3)
    // is the second item, player one wins. Else player 2 wins.
    else if( (players[0] + 2) % 3 == players[1] ) {
        console.log("Player 1 Wins — six points")
        playerOneScore = playerOneScore + 6
    } else {
        console.log("Player 2 Wins — six points")
        playerTwoScrore = playerTwoScrore + 6
    }
})

console.log("Player One: " + playerOneScore, " Player Two: ", playerTwoScrore)


function mod(n, m) {
    return ((n % m) + m) % m;
}