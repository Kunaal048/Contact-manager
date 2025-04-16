const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/contactdb")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

const Contact = mongoose.model("Contact", {
  name: String,
  email: String,
  phone: String,
});

app.get("/contacts", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

app.post("/contacts", async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const contact = new Contact(req.body);
  await contact.save();
  res.json(contact);
});

app.put("/contacts/:id", async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update contact" });
  }
});

app.delete("/contacts/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));