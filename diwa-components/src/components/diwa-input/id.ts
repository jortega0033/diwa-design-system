let inputInstanceCounter = 0;

export const createInputInstanceId = (tag: string): string => {
  inputInstanceCounter += 1;
  return `${tag}-${inputInstanceCounter}`;
};