import { Command } from 'commander';
import { solve, getNumberCounter, INumberCounter } from './solution';

type NumberArrOrNull=number[] | null;

const program = new Command();

program
  .version('1.0.0', '-v, --version')
  .requiredOption('-inp, --input <value>', 'an array of integers. There should be only one number in the array that occurs an odd number of times')
  .action(({ input }) => {
    const arr:NumberArrOrNull=parseArr(input);
    if (arr) {
      // eslint-disable-next-line no-console
      console.log(`a number that occurs an odd number of times is ${ solve(arr)}`);
    }
  })
  .parse(process.argv);

function parseArr(str:string):NumberArrOrNull {
  if (!isArray(str)) {
    return generateError('please enter an array of integers');
  }

  const arr:number[]= str.slice(1,str.length-1).split(' ').map((item:string) => {
    const number= Number(item);
    if (!Number.isInteger(number) || item==='') {
      return NaN;
    } else {
      return number;
    }
  });

  if (!AreArrayItemsInts(arr)) {
    return generateError('please enter an array of integers');
  }

  if (isCounterContainsOneOddNumber(getNumberCounter(arr))) {
    return arr;
  } else {
    return generateError('there should be only one number in the array that occurs an odd number of times');
  }
}

function isArray(str:string):boolean {
  return str[0]==='[' && str.slice(-1)===']';
};

function generateError(msg:string):null {
  // eslint-disable-next-line no-console
  console.log(`error: ${msg}`);
  return null;
};

function AreArrayItemsInts(arr:number[]):boolean {
  return arr.every(item => !isNaN(item));
};

function isCounterContainsOneOddNumber(numberCounter:INumberCounter):boolean {
  const result=Object.values(numberCounter).reduce((accumulator:number, currentNumber:number) => {
    if (currentNumber%2) {
      accumulator++;
    }
    return accumulator;
  },0);

  return (!result || result>1) ? false: true;
}
