export const sortByProperty = (a: any, b: any, prop: string, order: 'asc' | 'desc') => {
  if (a[prop] > b[prop]) {
    return order === 'asc' ? 1 : -1;
  }
  if (a[prop] < b[prop]) {
    return order === 'asc' ? -1 : 1;
  }
  return 0;
};
