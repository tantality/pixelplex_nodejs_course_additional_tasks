import { Command } from 'commander';
import { generateError, showMessage } from '../../index.js';
import { solve } from './solution';

const program = new Command();

const canStringBeInt = (str: string): boolean => Array.from(str).every((char) => canCharBeInt(char));
const canCharBeInt = (char: string): boolean => Number.isInteger(Number(char));

program
  .version('1.0.0', '-v, --version')
  .requiredOption('-str, --string <value>', 'a string consisting of integers')
  .requiredOption('-sz, --size <value>', 'the number that is the length of the fragments')
  .action(({ string, size }) => {
    const strLength = string.length;
    if (!canCharBeInt(size) || size <= 0) {
      generateError('-sz (--size) must be an integer >= 0');
      return;
    }

    if (size > strLength) {
      generateError('-sz (--size) must be less than the length of the -str (--string)');
      return;
    }

    if (canStringBeInt(string)) {
      showMessage(`reverse and rotate result is ${solve(string, size, strLength)}`);
    } else {
      generateError('-str (--string). Please enter a string consisting of integers');
    }
  })
  .parse(process.argv);
