export function generateError(msg: string): void {
  try {
    throw new Error(msg);
  } catch (err) {
    if (err instanceof Error) {
      showMessage(`error: ${err.message}`);
    }
  }
}

export function showMessage(msg: string): void {
  // eslint-disable-next-line no-console
  console.log(msg);
}
