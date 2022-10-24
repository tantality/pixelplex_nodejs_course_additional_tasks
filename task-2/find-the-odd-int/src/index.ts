import { Command } from 'commander';
import { solve } from './solution';

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
  if (!isArray(str)) {
    return generateError('please enter an array of integers');
  }

  const arr: number[] = str
    .slice(1, str.length - 1)
    .split(' ')
    .map((item: string) => {
      const number = Number(item);
      if (!Number.isInteger(number) || item === '') {
        return NaN;
      } else {
        return number;
      }
    });

  if (!areArrayItemsInts(arr)) {
    return generateError('please enter an array of integers');
  }
  return arr;
}

function isArray(str: string): boolean {
  return str[0] === '[' && str.slice(-1) === ']';
}

export function generateError(msg: string): null {
  try {
    throw new Error(msg);
  } catch (err) {
    if (err instanceof Error) {
      showMessage(`error: ${err.message}`);
    }
  }

  return null;
}

function showMessage(msg: string): void {
  // eslint-disable-next-line no-console
  console.log(msg);
}

function areArrayItemsInts(arr: number[]): boolean {
  return arr.every((item) => !isNaN(item));
}
