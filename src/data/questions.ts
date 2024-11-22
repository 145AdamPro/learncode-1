interface Question {
  question: string;
  options: string[];
  correct: number;
  concept: string;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const jsQuestions: Question[] = [
  {
    question: 'What is the output and why?\n```javascript\nconsole.log(typeof typeof 1);\n```',
    options: ['"number"', '"string"', '"undefined"', '"object"'],
    correct: 1,
    concept: 'typeof operator and type coercion',
    explanation: 'typeof 1 returns "number", then typeof "number" returns "string" because typeof always returns a string.',
    difficulty: 'intermediate'
  },
  {
    question: 'What will happen?\n```javascript\nPromise.race([Promise.resolve(1), Promise.reject(2), Promise.resolve(3)])\n  .then(console.log)\n  .catch(console.error);\n```',
    options: ['Logs 1', 'Logs 2', 'Logs 3', 'Throws an error'],
    correct: 0,
    concept: 'Promise.race',
    explanation: 'Promise.race returns the first settled promise, whether fulfilled or rejected. Here, Promise.resolve(1) settles first.',
    difficulty: 'advanced'
  },
  {
    question: 'What is the value of x?\n```javascript\nlet x = 5;\n(() => {\n  let x = 10;\n})();\nconsole.log(x);\n```',
    options: ['5', '10', 'undefined', 'ReferenceError'],
    correct: 0,
    concept: 'scope and closures',
    explanation: 'The x inside the IIFE is a different variable due to block scoping with let. The outer x remains 5.',
    difficulty: 'intermediate'
  },
  {
    question: 'What is logged?\n```javascript\nconst obj = { a: 1 };\nObject.defineProperty(obj, "b", { value: 2, enumerable: false });\nconsole.log(Object.keys(obj));\n```',
    options: ['["a", "b"]', '["a"]', '["b"]', 'TypeError'],
    correct: 1,
    concept: 'Object property descriptors',
    explanation: 'Object.keys only returns enumerable properties. Property "b" is non-enumerable, so only "a" is returned.',
    difficulty: 'advanced'
  },
  {
    question: 'What is the output?\n```javascript\nconst arr = [1, 2, 3];\narr[100] = 4;\nconsole.log(arr.length);\n```',
    options: ['3', '4', '100', '101'],
    correct: 3,
    concept: 'array length property',
    explanation: 'Array length is automatically updated to be one more than the highest numeric index. Setting index 100 makes length 101.',
    difficulty: 'intermediate'
  },
  {
    question: 'What happens?\n```javascript\nclass A extends null {\n  constructor() { super(); }\n}\nnew A();\n```',
    options: ['Creates instance of A', 'TypeError', 'ReferenceError', 'SyntaxError'],
    correct: 1,
    concept: 'class inheritance',
    explanation: 'While you can extend null, calling super() will throw TypeError because null has no constructor.',
    difficulty: 'advanced'
  },
  {
    question: 'What is logged?\n```javascript\nconsole.log(1 + "2" + "2");',
    options: ['"122"', '"14"', '122', '14'],
    correct: 0,
    concept: 'type coercion',
    explanation: 'The + operator with a string operand converts the expression to a string concatenation.',
    difficulty: 'beginner'
  },
  {
    question: 'What is the result?\n```javascript\nconst sym1 = Symbol("foo");\nconst sym2 = Symbol("foo");\nconsole.log(sym1 === sym2);\n```',
    options: ['true', 'false', 'TypeError', 'SyntaxError'],
    correct: 1,
    concept: 'Symbols',
    explanation: 'Every Symbol() call creates a new and unique symbol, even with the same description.',
    difficulty: 'intermediate'
  },
  {
    question: 'What is logged?\n```javascript\nconst proto = { value: 42 };\nconst obj = Object.create(proto);\nobj.value = undefined;\nconsole.log("value" in obj);\n```',
    options: ['true', 'false', 'undefined', 'TypeError'],
    correct: 0,
    concept: 'prototypal inheritance',
    explanation: 'The "in" operator checks both own and inherited properties, regardless of the value.',
    difficulty: 'advanced'
  },
  {
    question: 'What is the output?\n```javascript\nfunction* gen() {\n  yield 1;\n  yield* [2, 3];\n  yield 4;\n}\nconsole.log([...gen()]);\n```',
    options: ['[1, 2, 3, 4]', '[1, [2, 3], 4]', '[1, undefined, 4]', 'TypeError'],
    correct: 0,
    concept: 'generators',
    explanation: 'yield* delegates iteration to another iterable. The spread operator [...] collects all yielded values.',
    difficulty: 'advanced'
  }
];

export const reactQuestions: Question[] = [
  {
    question: 'What happens when setState is called multiple times in an event handler?',
    options: [
      'Each setState causes an immediate re-render',
      'React batches the updates and performs a single re-render',
      'Only the last setState is processed',
      'It throws an error'
    ],
    correct: 1,
    concept: 'setState batching',
    explanation: 'React batches multiple setState calls for performance optimization. Updates are processed together in a single re-render.',
    difficulty: 'intermediate'
  },
  {
    question: 'What is the correct way to pass a method to a child component?',
    options: [
      '<Child onClick={this.handleClick()}',
      '<Child onClick={this.handleClick}',
      '<Child onClick={() => this.handleClick()}',
      'Both B and C are correct'
    ],
    correct: 3,
    concept: 'event handling and props',
    explanation: 'Both passing the method reference directly and using an arrow function are valid approaches, each with their own use cases.',
    difficulty: 'beginner'
  },
  {
    question: 'What happens in this code?\n```jsx\nfunction App() {\n  const [count, setCount] = useState(0);\n  useEffect(() => {\n    setCount(count + 1);\n  }, []);\n  return <div>{count}</div>;\n}\n```',
    options: [
      'Infinite re-renders',
      'Renders once with count as 1',
      'Renders twice with count as 1',
      'Throws an error'
    ],
    correct: 2,
    concept: 'useEffect and strict mode',
    explanation: 'In development and strict mode, React runs effects twice to help find bugs. The count will be 1 after the second render.',
    difficulty: 'advanced'
  },
  {
    question: 'What is the purpose of the key prop in lists?',
    options: [
      'It\'s required syntax for lists',
      'It helps React track which items have changed',
      'It improves rendering performance',
    ],
    correct: 1,
    concept: 'list rendering and reconciliation',
    explanation: 'Keys help React identify which items have changed, are added, or are removed, optimizing the rendering process.',
    difficulty: 'intermediate'
  },
  {
    question: 'What happens when you call setState with a function?',
    options: [
      'It always causes a re-render',
      'It guarantees access to the latest state',
      'It\'s slower than passing an object',
      'It\'s only needed for complex state updates'
    ],
    correct: 1,
    concept: 'setState with function updates',
    explanation: 'Using a function updater guarantees access to the latest state value, especially important for multiple updates.',
    difficulty: 'intermediate'
  },
  {
    question: 'What is the difference between useMemo and useCallback?',
    options: [
      'useMemo is for values, useCallback is for functions',
      'useCallback is more performant',
      'useMemo can only be used with primitives',
      'They are interchangeable'
    ],
    correct: 0,
    concept: 'memoization hooks',
    explanation: 'useMemo memoizes values while useCallback memoizes functions. They serve different but related purposes for optimization.',
    difficulty: 'advanced'
  },
  {
    question: 'What happens in this code?\n```jsx\nfunction App() {\n  const [state, setState] = useState({ count: 0 });\n  return (\n    <button onClick={() => setState({ count: state.count + 1 })}>\n      {state.count}\n    </button>\n  );\n}\n```',
    options: [
      'Works as expected',
      'Loses other state properties',
      'Causes infinite re-renders',
      'Throws an error'
    ],
    correct: 1,
    concept: 'state updates with objects',
    explanation: 'Unlike class components, setState in hooks doesn\'t merge objects automatically. You need to spread the previous state.',
    difficulty: 'intermediate'
  },
  {
    question: 'What is the purpose of useLayoutEffect?',
    options: [
      'It\'s the same as useEffect',
      'It runs before browser paint',
      'It\'s only for CSS updates',
      'It\'s deprecated'
    ],
    correct: 1,
    concept: 'useLayoutEffect',
    explanation: 'useLayoutEffect runs synchronously after DOM mutations but before browser paint, useful for DOM measurements.',
    difficulty: 'advanced'
  },
  {
    question: 'What is the correct way to fetch data with hooks?',
    options: [
      'Use useState in useEffect',
      'Use useEffect with cleanup',
      'Use async/await directly in useEffect',
      'Both A and B are correct'
    ],
    correct: 3,
    concept: 'data fetching with hooks',
    explanation: 'Proper data fetching combines useState for data storage, useEffect for fetching, and cleanup for cancellation.',
    difficulty: 'intermediate'
  },
  {
    question: 'What is the purpose of React.memo?',
    options: [
      'Memoizes component render output',
      'Caches component props',
      'Prevents unnecessary re-renders',
      'All of the above'
    ],
    correct: 2,
    concept: 'component memoization',
    explanation: 'React.memo is a higher-order component that prevents re-renders if props haven\'t changed, optimizing performance.',
    difficulty: 'advanced'
  }
];