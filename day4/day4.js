var fs = require("fs");


// Load text from static text file
var text = fs.readFileSync("./day4/pairs.txt").toString('utf-8');


// Convert the text stuff into beautiful JSON serializable format
var textEntries = text.split("\n").map((text) => {
    var split = text.split(",")

    var _leftSplit = split[0].split("-")
    var _rightSplit = split[1].split("-")

    var left = {
        lowerInterval : _leftSplit[0],
        upperInterval : _leftSplit[1]
    }

    var right = {
        lowerInterval : _rightSplit[0],
        upperInterval : _rightSplit[1]
    }

    return {left, right}
})


// Initialize number of duplications
var NUMBER_OF_DUPES = 0

// Loop over entries and determine dupes
textEntries.forEach((entry) => {
    let lowest  = Math.min(entry.left.lowerInterval, entry.right.lowerInterval)
    let highest = Math.max(entry.left.upperInterval, entry.right.upperInterval)

    // Debug
    let debug = {left: entry.left, right: entry.right, lowest: lowest, highest: highest, check: false}


    // Dupe is detected if the lowest and highest value equals the pair
    if(lowest == entry.left.lowerInterval && highest == entry.left.upperInterval) {
        NUMBER_OF_DUPES++
        debug.check = true
        return;
    }
    
    if(lowest == entry.right.lowerInterval && highest == entry.right.upperInterval) {
        NUMBER_OF_DUPES++
        debug.check = true
        return;
    }
    
    
    console.log(debug)
})



console.log(NUMBER_OF_DUPES)