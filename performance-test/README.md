Add 200/2000/20000 elements inside an array;

Updating array state with spread operator:

| Lib\Iterations | 200         | 2000         | 20000        |
| -------------- | ----------- | ------------ | ------------ |
| vanilla        | `~  0.31ms` | `~ 4.016ms`  | `~ 900.59s`  |
| immerjs\*      |           - |            - |           -  |
| mobx\*\*       | `~ 20.42ms` | `~ 395.65ms` | `~  34.48s`  |
| xstate         | `~  9.85ms` | `~  74.14ms` | `~   1.57s`  |
| effector       | `~  4.01ms` | `~  14.10ms` | `~ 925.78ms` |

> \* not relevant and not idiomatic since the library is based on mutatable state that produce new immutable state.
> \*\* not idiomatic no reason to use spread in real world the library is based on mutable states.

Updating array state with push method:

| Lib\Iterations | 200         | 2000         | 20000        |
| -------------- | ----------- | ------------ | ------------ |
| vanilla        | `~  0.05ms` | `~   0.41ms` | `~   3.32ms` |
| immerjs\*      | `~ 11.90ms` | `~ 250.63ms` | `~   17.87s` |
| mobx           | `~ 12.72ms` | `~  58.19ms` | `~ 317.47ms` |
| xstate\*\*     | `~  6.90ms` | `~  47.06ms` | `~ 155.88ms` |
| effector       | `~  0.95ms` | `~   6.40ms` | `~  20.03ms` |

> run 5 times for each iteration

> \* running produce for every iteration
> \*\* not idiomatic the library is built with purity in mind, `push` is indeed impure and mutate base context.
