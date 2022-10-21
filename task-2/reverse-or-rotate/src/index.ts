import { Command } from 'commander';
import { solve } from './solution';

const program = new Command();

const canStringBeInt=(str:string):boolean => Array.from(str).every(char => canCharBeInt(char));
const canCharBeInt=(char:string):boolean => Number.isInteger(Number(char));
const showMessage=(msg:string):void => {
  // eslint-disable-next-line no-console
  console.log(msg);
};

program
  .version('1.0.0', '-v, --version')
  .requiredOption('-str, --string <value>', 'a string consisting of integers')
  .requiredOption('-sz, --size <value>', 'the number that is the length of the fragments')
  .action(({ string,size }) => {
    if (!canCharBeInt(size) || !size) {
      return showMessage('-sz (--size) must be an integer greater than 0');
    }
    if (canStringBeInt(string)) {
      return showMessage(`reverse and rotate result is ${solve(string,size)}`);
    } else {
      return showMessage('-str (--string). Please enter a string consisting of integers');
    }
  })
  .parse(process.argv);

