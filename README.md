# `eslint-plugin-react-hooks-configurable`

Fork of `eslint-plugin-react-hooks` that allow a bit more configuration than the original plugin.

The configurable part was originally made by Stephen Sugden (@grncdr) (you can see its [package on NPM](https://www.npmjs.com/package/@grncdr/eslint-plugin-react-hooks)).  
The difference with this version is that this one uses the same numbering as the official version for an 
easy replacement (in one way or the other), the source are publicly accessible, it contains some documentation (see below :)) and, 
at the time of writing anyway, it is synchronized with the original version and solves compatibility issues with ESLint.

## Rules

### Rule `react-hooks-configurable/exhaustive-deps`

The rule works the same way as the original one, you just have more options to best configure it, see below.

#### `additionalHooks` option

This option allow to validate dependencies of your custom hooks.

```js
{
  "plugins": ["react-hooks-configurable"],
  "rules": {
    // ...
    "react-hooks-configurable/exhaustive-deps": ["warn", {
      "additionalHooks": "(useMyCustomHook|useMyOtherCustomHook)"
    }]
  }
}
```

The original rule already allowed you to do this, but with this plugin's rule, you have in addition the 
possibility to specify at which position the function that uses the dependencies is located in your custom hook.  
(the original rule ALWAYS assumes that the function is placed first in the arguments)

Suppose you have the following custom hook:

```js
const useMyImperativeHandle = (ref, fn, deps) => {
    // ...
};

export default useMyImperativeHandle;
```

In this case, you will configure the rule as follows:

```js
// ... In configuration of the `react-hooks-configurable/exhaustive-deps` rule:
"additionalHooks": {
  "(useMyCustomHook|useMyOtherCustomHook)": 0,
  "useMyImperativeHandle": 1
}
```

_(original idea of @squirly, see here https://github.com/facebook/react/issues/16873#issuecomment-610702001)_

#### `additionalStableHooks` option

This option allow you to specify additional stable hooks in addition to those provided by react (`useState`, `useRef`, etc.).

```js
{
  "plugins": ["react-hooks-configurable"],
  "rules": {
    // ...
    "react-hooks-configurable/exhaustive-deps": ["warn", {
      "additionalStableHooks": {
        "use.+Ref": true,
        "useMyCustomUseState": [false, true],
        "useMyQuery": {
          "data": false,
          "refetch": true,
        },
      },
    }]
  }
}
```

With the original rule, only some core hooks are known to return stable elements:
- The return value from `useRef`.
- The setter from `useState`.
- The dispatcher function from `useReducer`.
- The `startTransition` function from `useTransition`.

The `additionalStableHooks` option of this plugin allows you to define some of your custom hooks as stable, fully or partially.   
(By "partially" i mean that some of the elements returned by your hook are stable but not some others, as for `useState`, `useReducer` above)

Note that you can use a regex as a custom hook name if you use a naming convention for some of your stables hooks.
For example, if you always return a stable ref from your components named `use___Ref` (`useFunctionRef`, `useUpdatedRef`, etc.), you could define: 

```js
// ... In configuration of the `react-hooks-configurable/exhaustive-deps` rule:
"additionalStableHooks": { "use.+Ref": true }
```

#### Partially stable custom hooks

If at least part of what your custom hook returns is not stable, you should avoid marking it as completely stable (e.g. `{ "useMyHook": true }`)
Instead of doing that, you can specify which returns are stable and which are not.

- __If your custom hook returns a tuple (like `useState`)__, instead of passing `true` in front of your hook name in the rule configuration, 
  pass an array with, for each element of the tuple returned by your hook, `true` or `false` depending on whether it is stable or not.

  _Example with a custom hook named `useMyCustomUseState` which have the same return type as `useState`:_

  ```js
  // ... In configuration of the `react-hooks-configurable/exhaustive-deps` rule:
  "additionalStableHooks": { 
    "useMyCustomUseState": [false, true] 
  }
  ```

- __If your custom hook returns an object of which only a few keys are stable__, instead of passing `true` in front of your hook name in the rule configuration, 
 pass an object with, for each key of your hook's return object, `true` or `false` depending on whether it is stable or not.

  _Example:_  
  Supposes we have a `useQuery` hook that return an object with: 
  - a `data` key containing the data from an external source.
  - a `refetch` key which will contain a function allowing you to refetch the data whenever you want.  
    => You have made this function stable (like the `dispatch` function from `useReducer`).

  ```js
  const useQuery = (endpoint) => {
    // ...

    return { data, refetch };
  };

  export default useQuery;
  ```

  In this case, you will configure the rule as follows:

  ```js
  // ... In configuration of the `react-hooks-configurable/exhaustive-deps` rule:
  "additionalStableHooks": { 
    "useQuery": { "data": false, "refetch": true }
  }
  ```

### Rule `react-hooks-configurable/rules-of-hooks`

No change from the way the original rule worked.  
Please see [the React doc](https://reactjs.org/docs/hooks-rules.html) for more details about the "rules of hooks". 

