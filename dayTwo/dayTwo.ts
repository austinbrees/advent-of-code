const fs = require('fs');
const readline = require('readline');

interface ResultsDict {
    [key: string]: boolean;
}
interface TestAgainst {
    [key: string]: number;
}

interface partTwoResultsDict{
    [key: string]: {
        'red': number,
        'blue': number,
        'green': number
    };
}

const testAgainst = {
    'red': 12,
    'blue': 14,
    'green': 13
}

const partTwoResults: partTwoResultsDict = {}

const resultsDict: ResultsDict = {};

let gameNumber:number = 1;
function isValidGame(line: string, dictionary: ResultsDict){
    for (let i = 0; i < line.length; i++) {
        if (line[i] >= '0' && line[i] <= '9') {
            if (line[i+1] >= '0' && line[i+1] <= '9') {
                let concatNum = line[i] + line[i+1];
                let numCheck = Number(concatNum);
                if (line[i+3] === 'b'){
                    if (numCheck > testAgainst['blue']){
                        resultsDict[gameNumber] = false;
                        break;
                    }
                }
                if (line[i+3] === 'r'){
                    if (numCheck > testAgainst['red']){
                        resultsDict[gameNumber] = false;
                        break;
                    }
                }
                if (line[i+3] === 'g'){
                    if (numCheck > testAgainst['green']){
                        resultsDict[gameNumber] = false;
                        break;
                    }
                }
            }
        }
        resultsDict[gameNumber] = true;
    }
    return dictionary;
}

let total = 0;
function sumValidGames(dictionary: ResultsDict, sum:number){
    for (let key in dictionary){
        if (dictionary[key] == true){
        sum += Number(key);
       }
    }
    return sum;
}


let gameNumber2:number = 1;
function partTwoChecker(line: string, dictionary: partTwoResultsDict){
    for (let i = 0; i < line.length; i++) {
       if (!partTwoResults[gameNumber2]){
           partTwoResults[gameNumber2] = { red: 0, blue: 0, green: 0};
        }
        if (line[i] >= '0' && line[i] <= '9' && line[i+1] == ' ') {
                let concatNum = line[i-1] + line[i];
                let numCheck = Number(concatNum);
                
                if (line[i+2] === 'b' && line[i+2] != ' '){
                    if (numCheck > partTwoResults[gameNumber2]['blue']){
                        partTwoResults[gameNumber2]['blue'] = numCheck;
                    }
                }
                if (line[i+2] === 'r' && line[i+2] != ' '){
                    if (numCheck > partTwoResults[gameNumber2]['red']){
                        partTwoResults[gameNumber2]['red'] =  numCheck;
                    }
                }
                if (line[i+2] === 'g' && line[i+2] != ' '){
                    if (numCheck > partTwoResults[gameNumber2]['green']){
                        partTwoResults[gameNumber2]['green'] = numCheck;
                    }
                }
        }
    }
    return dictionary;
}

function powerOfGames(dictionary: partTwoResultsDict){
    let sum = 0;
    let gameNum = 1;
    while (gameNum <= Object.keys(dictionary).length){
        const game = partTwoResults[gameNum];
        let temp = game.red * game.blue * game.green;
        sum += temp;
        gameNum++
    }
    console.log(sum);
}

const readInterface = readline.createInterface({
    input: fs.createReadStream('inputDayTwo.txt'),
    console: false
});

readInterface.on('line', function(line:string){
    isValidGame(line, resultsDict);
    gameNumber++
    partTwoChecker(line, partTwoResults)
    gameNumber2++
});

readInterface.on('close', function(){
    sumValidGames(resultsDict, total);
    console.log(partTwoResults);
    powerOfGames(partTwoResults);
});

