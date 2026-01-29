let product1, product2, product3;
function sum() {
  product1 = parseFloat(document.getElementById("product1").value);
  product2 = parseFloat(document.getElementById("product2").value);
  product3 = parseFloat(document.getElementById("product3").value);

  document.getElementById("result").innerHTML =
    `The sum amount is: ${product1 + product2 + product3} `;
}
