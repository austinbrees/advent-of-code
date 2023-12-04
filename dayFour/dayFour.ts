const fs = require('fs');
const readline = require('readline');


function findWinners(line:string){
    let newLine = line.split(':')
    let partitionNums = newLine[1].split('|');
    const winningNums = partitionNums[0].trim().split(/\s+/).map(function(num){
        return parseInt(num);
    });
    const myNums = partitionNums[1].trim().split(/\s+/).map(function(item){
        return parseInt(item);
    });
    let tempTotal:number = 0;
    let tempCount: number = 0;
    for (let i = 0; i < myNums.length; i++){
        if (winningNums.includes(myNums[i])){
            tempCount++
            cardCount[tempCount] = 1;
            if (tempTotal <= 1){
                tempTotal ++;
            }else{
                tempTotal = 2**(tempCount-1);
            }
        }
    }
    total += tempTotal;
};

const readInterface = readline.createInterface({
    input: fs.createReadStream('dayFourInput.txt'),
    console: false,
});


let total:number = 0;
let cardCount:number[] = [];
let lineNumber:number = 1;

readInterface.on('line', function(line:string){
    /// place functions here
    if (cardCount.length <= lineNumber){
        cardCount.push(1);
    }
    findWinners(line);
    console.log(total);
    console.log(cardCount);
});

