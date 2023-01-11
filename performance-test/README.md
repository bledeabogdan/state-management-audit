Add 200/2000/20000 elements inside an array;

| Lib\Iterations | 200         | 2000         | 20000        |
| -------------- | ----------- | ------------ | ------------ |
| vanilla        | `~ 0.35ms`  | `~ 12.26ms`  | `~ 1.17s`    |
| immerjs        | `~ 2.72ms`  | `~ 19.30ms`  | `~ 74.97ms`  |
| mobx           | `~ 17.24ms` | `~ 81.63ms`  | `~ 490.25ms` |
| xstate         | `~ 12.94ms` | `~ 104.51ms` | `~ 2.13s`    |
| effector       | `~ 5.01ms`  | `~ 25.55ms`  | `~ 1.17s`    |

\*run 5 times for each iteration
