export function groupBy<T, K extends keyof T>(
  array: T[],
  key: K
): { group: T[K]; items: T[] }[] {
  return array.reduce((groups, item) => {
    const value = item[key];
    const group = groups.find((group) => group.group === value);
    if (group) {
      group.items.push(item);
    } else {
      groups.push({ group: value, items: [item] });
    }
    return groups;
  }, [] as { group: T[K]; items: T[] }[]);
}
