const form = document.getElementById("contactForm");
const list = document.getElementById("contactList");

async function loadContacts() {
  const res = await fetch("http://localhost:3000/contacts");
  const data = await res.json();
  list.innerHTML = "";
  data.forEach(contact => {
    const li = document.createElement("li");
    li.innerHTML = `${contact.name} (${contact.email}, ${contact.phone}) 
      <button onclick="deleteContact('${contact._id}')">Delete</button>`;
    list.appendChild(li);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const contact = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
  };
  await fetch("http://localhost:3000/contacts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });
  form.reset();
  loadContacts();
});

async function deleteContact(id) {
  await fetch(`http://localhost:3000/contacts/${id}`, {
    method: "DELETE",
  });
  loadContacts();
}

loadContacts();