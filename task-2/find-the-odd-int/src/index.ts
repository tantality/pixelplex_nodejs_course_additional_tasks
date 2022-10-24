import { Command } from 'commander';
import { solve } from './solution';
import { generateError, showMessage } from './../../index';

type NumberArrOrNull = number[] | null;

const program = new Command();

program
  .version('1.0.0', '-v, --version')
  .requiredOption(
    '-inp, --input <value>',
    'an array of integers. There should be only one number in the array that occurs an odd number of times',
  )
  .action(({ input }) => {
    const arr: NumberArrOrNull = parseArr(input);
    if (arr) {
      const result = solve(arr);
      if (result) {
        showMessage(`a number that occurs an odd number of times is ${result}`);
      }
    }
  })
  .parse(process.argv);

function parseArr(str: string): NumberArrOrNull {
  if (!isIntArr(str)) {
    generateError('please enter an array of integers');
    return null;
  }

  return getArr(str);
}

function isIntArr(str: string): boolean {
  const findAllNumbers = /(\d+)|([\+-]?\d+)/g;
  const matches: string[] | null = str.match(findAllNumbers);
  if (!matches) {
    return false;
  }
  const totalLengthOfMatches = matches.join('').length;
  const isStrContainsSquareBrackets = str[0] === '[' && str.slice(-1) === ']';
  const numberOfSquareBrackets = 2;
  str = str.split(' ').join('');
  const strLength = str.length;

  return isStrContainsSquareBrackets && totalLengthOfMatches + numberOfSquareBrackets === strLength;
}

function getArr(str: string): number[] {
  return str
    .slice(1, str.length - 1)
    .split(' ')
    .map((item: string) => Number(item));
}
