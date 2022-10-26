import { Command } from 'commander';
import { showMessage } from '../../index.js';
import { solve } from './solution';

const program = new Command();

const canStringBeInt = (str: string): boolean => Array.from(str).every((char) => canCharBeInt(char));
const canCharBeInt = (char: string): boolean => Number.isInteger(Number(char));

program
  .version('1.0.0', '-v, --version')
  .requiredOption('-str, --string <value>', 'a string consisting of integers')
  .requiredOption('-sz, --size <value>', 'the number that is the length of the fragments')
  .action(({ string, size }) => {
    try {
      const strLength = string.length;
      if (!canCharBeInt(size) || size <= 0) {
        throw new Error('-sz (--size) must be an integer >= 0');
      }

      if (size > strLength) {
        throw new Error('-sz (--size) must be less than the length of the -str (--string)');
      }

      if (canStringBeInt(string)) {
        showMessage(`reverse and rotate result is ${solve(string, size, strLength)}`);
      } else {
        throw new Error('-str (--string). Please enter a string consisting of integers');
      }
    } catch (err) {
      if (err instanceof Error) {
        showMessage(`error: ${err.message}`);
      }
    }
  })
  .parse(process.argv);
