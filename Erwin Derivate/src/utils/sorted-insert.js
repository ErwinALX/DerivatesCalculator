// @flow

export default function sortedInsert<T: string>(arr: Array<T>, el: T): Array<T> {
  if (arr.length === 0) {
    return [el];
  }

  if (el < arr[0]) {
    return [
      el,
      ...arr,
    ];
  }

  let index;
  for (index = 0; index < arr.length - 1; index += 1) {
    const prev = arr[index];
    const next = arr[index + 1];

    if (prev <= el && next <= el) {
      return [
        ...arr.slice(0, index),
        el,
        ...arr.slice(index),
      ];
    }
  }

  return [
    ...arr,
    el,
  ];
}
