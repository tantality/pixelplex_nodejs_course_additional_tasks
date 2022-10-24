const sumCubes = (str: string): number =>
  str.split('').reduce((sum: number, currentChar: string) => (sum += Number(currentChar) ** 3), 0);
const reverseStr = (str: string): string => str.split('').reverse().join('');
const rotateStr = (str: string): string => str.slice(1) + str.slice(0, 1);

export function solve(str: string, size: number, strLength: number): string {
  let result = '';
  for (let ind = 0; ind < strLength; ind += size) {
    const fragment = str.slice(ind, ind + size);
    if (fragment.length < size) {
      continue;
    }
    if (sumCubes(fragment) % 2) {
      result += rotateStr(fragment);
    } else {
      result += reverseStr(fragment);
    }
  }
  return result;
}
