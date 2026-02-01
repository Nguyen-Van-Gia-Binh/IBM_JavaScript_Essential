# 📝 Var, Let & Const Demo

A JavaScript demonstration showing the differences between `var`, `let`, and `const` declarations.

## Features
- Visual examples of variable scope
- Hoisting behavior demonstration
- Block scope vs function scope
- Constant reassignment examples

## Technologies
- HTML5
- CSS3
- JavaScript (ES6+)

## How to Use
1. Open `index.html` in a browser
2. Open browser console (F12 → Console)
3. View the output demonstrating variable behaviors
4. Read inline comments for explanations

## Concepts Demonstrated

### `var`
- Function-scoped
- Can be redeclared
- Hoisted (initialized as undefined)

### `let`
- Block-scoped
- Cannot be redeclared in same scope
- Hoisted but not initialized (TDZ)

### `const`
- Block-scoped
- Must be initialized at declaration
- Cannot be reassigned
- Objects/arrays are still mutable
