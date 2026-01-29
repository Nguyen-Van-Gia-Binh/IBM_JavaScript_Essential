const breakfastMenu = [
  "Pancakes- $12",
  "Eggs Benedict -$22.99",
  "Oatmeal -$21.99",
  "Frittata -$15",
];
const mainCourseMenu = ["Steak", "Pasta", "Burger", "Salmon"];
const dessertMenu = ["Cake", "Ice Cream", "Pudding", "Fruit Salad"];

document.getElementById("breakfastMenuItems").innerHTML = breakfastMenu
  .map((item, index) => `<p> Item ${index + 1} : ${item} </p>`)
  .join("");

let mainCourse = "";
mainCourseMenu.forEach(
  (item, index) => (mainCourse += `<p>Item ${index + 1} : ${item} `),
);
document.getElementById("maincourseMenuItems").innerHTML = mainCourse;

let dessertItem = "";
for (let i = 0; i < dessertMenu.length; i++) {
  dessertItem += `<p>Item ${i + 1}: ${dessertMenu[i]}</p>`;
}
document.getElementById("dessertMenuItems").innerHTML = dessertItem;
