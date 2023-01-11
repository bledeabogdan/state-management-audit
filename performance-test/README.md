Add 200/2000/20000 elements inside an array;

| Lib\Iterations | 200         | 2000         | 20000        |
| -------------- | ----------- | ------------ | ------------ |
| vanilla        | `~ 0.35ms`  | `~ 12.26ms`  | `~ 1.17s`    |
| immerjs\*\*    | `~ 11.90ms` | `~ 250.63ms` | `~ 23.76s`   |
| mobx\*\*\*     | `~ 17.24ms` | `~ 81.63ms`  | `~ 490.25ms` |
| xstate         | `~ 13.24ms` | `~ 107.93ms` | `~ 2.07s`    |
| effector       | `~ 1.45ms`  | `~ 18.05ms`  | `~ 1.23s`    |

> run 5 times for each iteration

> \*\* running produce for every iteration

> \*\*\* using `array.push(element)` instead of `[...array, element]`
