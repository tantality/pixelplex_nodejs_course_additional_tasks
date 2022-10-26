import { Command } from 'commander';
import { solve } from './solution';
import { showMessage } from './../../index';

const program = new Command();

program
  .version('1.0.0', '-v, --version')
  .requiredOption(
    '-inp, --input <value>',
    'an array of integers. There should be only one number in the array that occurs an odd number of times',
  )
  .action(({ input }) => {
    try {
      const arr: number[] = parseArr(input);
      if (arr) {
        const result = solve(arr);
        if (result) {
          showMessage(`a number that occurs an odd number of times is ${result}`);
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        showMessage(`error: ${err.message}`);
      }
    }
  })
  .parse(process.argv);

function parseArr(str: string): number[] {
  if (!isIntArr(str)) {
    throw new Error('please enter an array of integers');
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
