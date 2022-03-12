# `eslint-plugin-react-hooks-configurable`

Fork of `eslint-plugin-react-hooks` that allow a bit more configuration than the original plugin.

The configurable part was originally made by Stephen Sugden (@grncdr) (you can see his [package on NPM](https://www.npmjs.com/package/@grncdr/eslint-plugin-react-hooks)).  
The difference with this version is that this one uses the same numbering as the official version for an 
easy replacement (in one way or the other), the source are publicly accessible, it contains some documentation (see below :)) and, 
at the time of writing anyway, it is synchronized with the original version and solves compatibility issues with ESLint.

## Rules

### `eslint-plugin-react-hooks-configurable/exhaustive-deps`

The rule works the same way as the original one, you just have more options to best configure it, see below.

#### `additionalHooks` option

This option allow to validate dependencies of your custom hooks.

```json
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

```json
{
  "plugins": ["react-hooks-configurable"],
  "rules": {
    // ...
    "react-hooks-configurable/exhaustive-deps": ["warn", {
      "additionalHooks": {
        "(useMyCustomHook|useMyOtherCustomHook)": 0,
        "useMyImperativeHandle": 1
      }
    }]
  }
}
```

_(original idea of @squirly, see here https://github.com/facebook/react/issues/16873#issuecomment-610702001)_

### `eslint-plugin-react-hooks-configurable/rules-of-hooks`

No change from the way the original rule worked.  
Please see [the React doc](https://reactjs.org/docs/hooks-rules.html) for more details about the "rules of hooks". 

