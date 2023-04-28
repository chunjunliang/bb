const employeeContainer = document.getElementById("employee-container");
const addEmployeeForm = document.getElementById("add-employee-form");

// Fetch and display initial employee data
fetch("employee.json")
  .then(response => response.json())
  .then(data => displayEmployeeData(data))
  .catch(error => console.log(error));

// Handle form submission
addEmployeeForm.addEventListener("submit", event => {
  event.preventDefault();

  // Get form values
  const name = event.target.elements.name.value;
  const age = event.target.elements.age.value;
  const email = event.target.elements.email.value;
  const phone = event.target.elements.phone.value;
  const department = event.target.elements.department.value;

  // Create new employee object
  const newEmployee = { name, age, email, phone, department };

  // Fetch employee data and add new employee object to array
  fetch("employee.json")
    .then(response => response.json())
    .then(data => {
      data.push(newEmployee);

      // Write updated data to JSON file
      const jsonData = JSON.stringify(data);
      const url = "https://api.github.com/repos/your-username/your-repository/contents/employee.json";

      fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "Add new employee",
          content: btoa(jsonData),
          sha: "your-file-sha" // Replace with the SHA value of your employee.json file
        })
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));

      // Display updated employee data
      displayEmployeeData(data);
    })
    .catch(error => console.log(error));

  // Reset form
  addEmployeeForm.reset();
});

// Function to display employee data in DOM
function displayEmployeeData(data) {
  let employeeHTML = "";
  data.forEach(employee => {
    employeeHTML += `
      <h2>${employee.name}</h2>
      <ul>
        <li><strong>Age:</strong> ${employee.age}</li>
        <li><strong>Email:</strong> ${employee.email}</li>
        <li><strong>Phone Number:</strong> ${employee.phone}</li>
        <li><strong>Department:</strong> ${employee.department}</li>
      </ul>
    `;
  });
  employeeContainer.innerHTML = employeeHTML;
}
