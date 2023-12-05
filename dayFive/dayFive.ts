import * as fs from 'fs/promises';

async function readFileContent(filePath:string) {
   try {
       const data = await fs.readFile(filePath, 'utf8');

       return data;
   } catch (err) {
       console.error('Error reading file: ', err);
       throw err;
   }
}

readFileContent('inputDayFive.txt')
    .then(data => {
        const input = data.split(/\n/);
        const seeds = input[0].split(':')[1].trim().split(' ').map(str => parseInt(str));
        const mappings = input.slice(1).filter(line => line.trim() != '');
        console.log(seeds);
        console.log(mappings);
    })
    .catch(err => {
        console.error('Failed to proccess file: ', err);
    })
