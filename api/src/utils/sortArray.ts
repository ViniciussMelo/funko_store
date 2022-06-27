const sortArray = (arr: Array<any>, key: string, isAscending = true): Array<any> => {
  return arr.sort((a, b) => {
    const x = typeof a === "string" ? a[key.toLowerCase() as keyof typeof a] : a[key];
    const y = typeof b === "string" ? b[key.toLowerCase() as keyof typeof b] : b[key];

    if (isAscending) return ((x < y) ? -1 : ((x > y) ? 1 : 0));

    return ((x < y) ? 1 : ((x > y) ? -1 : 0));
  });
}

export { sortArray }
