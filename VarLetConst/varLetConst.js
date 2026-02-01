function show() {
  var functionVar = "I'm a block-scoped var";
  let functionLet = "I'm a block-scoped let";
  const functionConst = "I'm a block-scoped const";
  console.log(functionVar);
}
show();
console.log("Hello");
// console.log(functionVar); // Throws ReferenceError
// console.log(functionLet); // Throws ReferenceError
// console.log(functionConst); // Throws ReferenceError
