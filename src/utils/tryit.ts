export function tryit<Args extends unknown[], Return>(
  func: (...args: Args) => Return,
  thisArg?: unknown,
) {
  return (
    ...args: Args
  ): Return extends Promise<unknown>
    ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
    : [Error, undefined] | [undefined, Return] => {
    try {
      const result = func.call(thisArg, ...args);

      if (result instanceof Promise) {
        return result
          .then((value) => [undefined, value])
          .catch((error) => [error, undefined]) as Return extends Promise<unknown>
          ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
          : [Error, undefined] | [undefined, Return];
      }

      return [undefined, result] as Return extends Promise<unknown>
        ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
        : [Error, undefined] | [undefined, Return];
    } catch (error) {
      return [error, undefined] as Return extends Promise<unknown>
        ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
        : [Error, undefined] | [undefined, Return];
    }
  };
}
