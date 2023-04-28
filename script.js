const employeeContainer = document.getElementById("employee-container");

fetch("employee.json")
  .then(response => response.json())
  .then(data => {
    employeeContainer.innerHTML = `
      <h2>${data[0].name}</h2>
      <ul>
        <li><strong>Age:</strong> ${data[0].age}</li>
        <li><strong>Email:</strong> ${data[0].email}</li>
        <li><strong>Phone Number:</strong> ${data[0].phone}</li>
        <li><strong>Department:</strong> ${data[0].department}</li>
      </ul>
      <h2>${data[1].name}</h2>
      <ul>
        <li><strong>Age:</strong> ${data[1].age}</li>
        <li><strong>Email:</strong> ${data[1].email}</li>
        <li><strong>Phone Number:</strong> ${data[1].phone}</li>
        <li><strong>Department:</strong> ${data[1].department}</li>
      </ul>
    `;
  })
  .catch(error => console.log(error));
