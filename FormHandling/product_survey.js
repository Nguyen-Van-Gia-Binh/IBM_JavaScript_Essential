function submitFeedback() {
  // 1. Capture the values INSIDE the function so they are "fresh"
  const username = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const email = document.getElementById("email").value;
  const job = document.getElementById("job").value;
  const designation = document.getElementById("designation").value;
  const productType = document.getElementById("productType").value;
  const feedback = document.getElementById("feedbackText").value;
  const userEx = document.getElementById("userEx").value;

  // 2. Simple validation (Optional but recommended)
  if (!username || !feedback) {
    alert("Please fill out the required fields.");
    return;
  }

  // 3. Display the alert
  alert("Thank you for your valuable feedback");

  // 4. Update the display area
  document.getElementById("userName").innerHTML = username;
  document.getElementById("userAge").innerHTML = age;
  document.getElementById("userEmail").innerHTML = email;
  document.getElementById("userJob").innerHTML = job;
  document.getElementById("userDesignation").innerHTML = designation;
  document.getElementById("userProductChoice").innerHTML = productType;
  document.getElementById("userFeedback").innerHTML = feedback;
  document.getElementById("userExperience").innerHTML = userEx;

  // 5. Show the hidden div
  document.getElementById("userInfo").style.display = "block";
}

// Event Listeners
const submitButton = document.getElementById("submitBtn");
submitButton.onclick = submitFeedback;

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    submitFeedback();
  }
});
