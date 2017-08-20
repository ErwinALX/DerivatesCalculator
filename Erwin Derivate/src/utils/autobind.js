// @flow

type Instance = {
  [key: string]: mixed,
};

export default function autobind(obj: Instance) {
  const objectPrototype = Object.getPrototypeOf(obj);
  const propertyNames = Object.getOwnPropertyNames(objectPrototype);

  propertyNames.forEach((name: string) => {
    const method = obj[name];
    if (!(method instanceof Function) || method === obj.constructor) {
      return;
    }
    // eslint-disable-next-line no-param-reassign
    obj[name] = obj[name].bind(obj);
  });
}
