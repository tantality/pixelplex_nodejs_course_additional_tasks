export interface INumberCounter {
  [key: string]: number;
}

export const solve = (arr: number[]): number => getOddInt(getNumberCounter(arr));

export function getNumberCounter(arr: number[]): INumberCounter {
  return arr.reduce((accumulator: INumberCounter, currentNumber: number) => {
    currentNumber in accumulator ? (accumulator[currentNumber] += 1) : (accumulator[currentNumber] = 1);
    return accumulator;
  }, {} as INumberCounter);
}

function getOddInt(numberCounter: INumberCounter): number {
  let oddInt = 0;
  for (const key in numberCounter) {
    if (numberCounter[key] % 2) {
      oddInt = Number(key);
      break;
    }
  }
  return oddInt;
}
