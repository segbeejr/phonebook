// Define variables for the form and table
const form = document.getElementById("contact-form");
const table = document.getElementById("contacts-table");

// Define a variable for the contacts array
let contacts = [];

// Add an event listener to the form for submitting the contact
form.addEventListener("submit", function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the form values
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const image = document.getElementById("image").files[0];
  const index = document.getElementById("index").value;

  // Create an object for the contact
  const contact = { name, phone, email };

  // Add the image to the contact object if it exists
  if (image) {
    const reader = new FileReader();
    reader.onload = function() {
      contact.image = reader.result;
      addOrUpdateContact(contact, index);
    }
    reader.readAsDataURL(image);
  } else {
    addOrUpdateContact(contact, index);
  }

  // Clear the form fields
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
  document.getElementById("image").value = "";
  document.getElementById("index").value = "";
});

// Function for adding or updating a contact
function addOrUpdateContact(contact, index) {
  if (index) {
    contacts[index] = contact;
  } else {
    contacts.push(contact);
  }
  renderContacts();
}

// Function for rendering the contacts in the table
function renderContacts() {
  // Clear the table body
  table.querySelector("tbody").innerHTML = "";

  // Loop through the contacts and add them to the table
  contacts.forEach(function(contact, index) {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdPhone = document.createElement("td");
    const tdEmail = document.createElement("td");
    const tdImage = document.createElement("td");
    const tdActions = document.createElement("td");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    tdName.innerText = contact.name;
    tdPhone.innerText = contact.phone;
    tdEmail.innerText = contact.email;
    if (contact.image) {
      const img = document.createElement("img");
      img.src = contact.image;
      tdImage.appendChild(img);
    }
    editButton.innerText = "Edit";
    editButton.addEventListener("click", function() {
      // Set the form values to the contact values
      document.getElementById("name").value = contact.name;
      document.getElementById("phone").value = contact.phone;
      document.getElementById("email").value = contact.email;
      if (contact.image) {
        const imgPreview = document.getElementById("image-preview");
        imgPreview.style.backgroundImage = `url(${contact.image})`;
      }
      document.getElementById("index").value = index;
    });
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", function() {
      contacts.splice(index, 1);
      renderContacts();
    });

    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);
    tr.appendChild(tdName);
    tr.appendChild(tdPhone);
    tr.appendChild(tdEmail);
    tr.appendChild(tdImage);
    tr.appendChild(tdActions);
    table.querySelector("tbody").appendChild(tr);
  });
}

// Add an event listener to the search button for filtering the contacts
document.getElementById("search-button").addEventListener("click", function() {
  const searchTerm = document.getElementById("search").value.toLowerCase();

  // Filter the contacts array based on the search term
  const filteredContacts = contacts.filter(function(contact) {
    return contact.name.toLowerCase().includes(searchTerm) ||
           contact.phone.toLowerCase().includes(searchTerm) ||
           contact.email.toLowerCase().includes(searchTerm);
  });

  // Render the filtered contacts
  renderFilteredContacts(filteredContacts);
});

// Function for rendering the filtered contacts in the table
function renderFilteredContacts(filteredContacts) {
  // Clear the table body
  table.querySelector("tbody").innerHTML = "";

  // Loop through the filtered contacts and add them to the table
  filteredContacts.forEach(function(contact, index) {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdPhone = document.createElement("td");
    const tdEmail = document.createElement("td");
    const tdImage = document.createElement("td");
    const tdActions = document.createElement("td");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    tdName.innerText = contact.name;
    tdPhone.innerText = contact.phone;
    tdEmail.innerText = contact.email;
    if (contact.image) {
      const img = document.createElement("img");
      img.src = contact.image;
      tdImage.appendChild(img);
    }
    editButton.innerText = "Edit";
    editButton.addEventListener("click", function() {
      // Set the form values to the contact values
      document.getElementById("name").value = contact.name;
      document.getElementById("phone").value = contact.phone;
      document.getElementById("email").value = contact.email;
      if (contact.image) {
        const imgPreview = document.getElementById("image-preview");
        imgPreview.style.backgroundImage = `url(${contact.image})`;
      }
      document.getElementById("index").value = index;
    });
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", function() {
      contacts.splice(index, 1);
      renderFilteredContacts(filteredContacts);
    });

    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);
    tr.appendChild(tdName);
    tr.appendChild(tdPhone);
    tr.appendChild(tdEmail);
    tr.appendChild(tdImage);
    tr.appendChild(tdActions);
    table.querySelector("tbody").appendChild(tr);
  });
}
