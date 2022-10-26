export interface INumberCounter {
  [key: string]: number;
}

export const solve = (arr: number[]): number | never => {
  const numberCounter: INumberCounter = getNumberCounter(arr);
  if (isCounterContainsOneOddNumber(numberCounter)) {
    return getOddInt(numberCounter);
  } else {
    throw new Error('there should be only one number in the array that occurs an odd number of times');
  }
};

function getNumberCounter(arr: number[]): INumberCounter {
  return arr.reduce((accumulator: INumberCounter, currentNumber: number) => {
    currentNumber in accumulator ? (accumulator[currentNumber] += 1) : (accumulator[currentNumber] = 1);
    return accumulator;
  }, {} as INumberCounter);
}

function isCounterContainsOneOddNumber(numberCounter: INumberCounter): boolean {
  const result = Object.values(numberCounter).reduce((accumulator: number, currentNumber: number) => {
    if (currentNumber % 2) {
      accumulator++;
    }
    return accumulator;
  }, 0);

  return !!result && result <= 1;
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
