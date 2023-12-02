const fs = require('fs');
const readline = require('readline');

interface ResultsDict {
    [key: string]: boolean;
}
interface TestAgainst {
    [key: string]: number;
}

const testAgainst = {
    'red': 12,
    'blue': 14,
    'green': 13
}

const resultsDict: ResultsDict = {};


let gameNumber = 1;
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
       console.log(key, dictionary[key], sum)
    }
    return sum;
}

const readInterface = readline.createInterface({
    input: fs.createReadStream('inputDayTwo.txt'),
    console: false
});

readInterface.on('line', function(line:string){
    isValidGame(line, resultsDict);
    gameNumber++
});

readInterface.on('close', function(){
    sumValidGames(resultsDict, total);
});

