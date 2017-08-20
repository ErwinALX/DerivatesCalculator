// @flow

import { compose as reduxCompose } from 'redux';

type Fn<T, I1, I2, I3, I4, I5, I6, I7> =
  (i1: I1, i2: I2, i3: I3, i4: I4, i5: I5, i6: I6, i7: I7) => T;

const compose: (
  // compose(f1)
  & <R, I1, I2, I3, I4, I5, I6, I7>
    (f1: Fn<R, I1, I2, I3, I4, I5, I6, I7>) =>
      Fn<R, I1, I2, I3, I4, I5, I6, I7>
  // compose(f1, f2)
  & <R, I1, I2, I3, I4, I5, I6, I7, T2>
    (f2: (t2: T2) => R,
     f1: Fn<T2, I1, I2, I3, I4, I5, I6, I7>) =>
      Fn<R, I1, I2, I3, I4, I5, I6, I7>
  // compose(f1, f2, f3)
  & <R, I1, I2, I3, I4, I5, I6, I7, T2, T3>
    (f3: (t3: T3) => R,
     f2: (t2: T2) => T3,
     f1: Fn<T2, I1, I2, I3, I4, I5, I6, I7>) =>
      Fn<R, I1, I2, I3, I4, I5, I6, I7>
  // compose(f1, f2, f3, f4)
  & <R, I1, I2, I3, I4, I5, I6, I7, T2, T3, T4>
    (f4: (t4: T4) => R,
     f3: (t3: T3) => T4,
     f2: (t2: T2) => T3,
     f1: Fn<T2, I1, I2, I3, I4, I5, I6, I7>) =>
      Fn<R, I1, I2, I3, I4, I5, I6, I7>
  // compose(f1, f2, f3, f4, f5)
  & <R, I1, I2, I3, I4, I5, I6, I7, T2, T3, T4, T5>
    (f5: (t5: T5) => R,
     f4: (t4: T4) => T5,
     f3: (t3: T3) => T4,
     f2: (t2: T2) => T3,
     f1: Fn<T2, I1, I2, I3, I4, I5, I6, I7>) =>
      Fn<R, I1, I2, I3, I4, I5, I6, I7>
) = (reduxCompose: any);

export default compose;
