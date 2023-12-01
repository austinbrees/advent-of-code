const fs = require('fs');
const readline = require('readline');

interface MyDictionary {
    [key: number]: string;
};

interface NumbersDict {
    [key: number]: string[];
}

interface StringToNum {
    [key: string]: string;
}

const calibrationDict: MyDictionary = {};

const numbersDict = {
    3: ['one', 'two', 'six'],
    4: ['four', 'five', 'nine', 'zero'],
    5: ['three', 'seven', 'eight']
};

const charChecker = ['z', 'o', 't', 's', 'f', 'n', 'e'];

const stringToNum: {[key: string]:string} = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
    zero: '0'
};

function calibrateDocument(line: string, dictionary: MyDictionary):any {
    let calibrationNumber = ""
    for (let i = 0; i < line.length; i++){
        if (line[i] >= '0' && line[i] <= '9'){
            calibrationNumber += line[i];
        } else {
        if (charChecker.includes(line[i])){
            for (let key in numbersDict){
                let keyLength = Number(key);
                let spliceNumChecker:string = line.slice(i, i + keyLength);
                if (spliceNumChecker in stringToNum){ 
                   calibrationNumber += stringToNum[spliceNumChecker]; 
                } 
            }
        }
        } 
    }
    if (calibrationNumber.length == 1){
       let  newCalibrationNumber = calibrationNumber + calibrationNumber;
       dictionary[lineNumber] = newCalibrationNumber;
    }
    if (calibrationNumber.length == 2){
        dictionary[lineNumber] = calibrationNumber;
    } else {
        let splicedCalibrationNumber = calibrationNumber.charAt(0) 
            + calibrationNumber.charAt(calibrationNumber.length -1);
        dictionary[lineNumber] = splicedCalibrationNumber;
    }
    return dictionary;
};

let lineNumber = 0;

function sumDictionary(dictionary: MyDictionary):number {
    let total = 0;
    for (let line in dictionary){
        total += Number(dictionary[line]);
    }
    return total
};

const readInterface = readline.createInterface({
    input: fs.createReadStream('inputDayOne.txt'),
    console: false
});

readInterface.on('line', function(line:string){
    calibrateDocument(line, calibrationDict)
    lineNumber ++;
});

readInterface.on('close', function(){
    const answer = sumDictionary(calibrationDict);
    console.log(answer);
});


