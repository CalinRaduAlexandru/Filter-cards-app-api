const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "test",
    database: "filter-cards",
  },
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/", (req, res) => {
  const { name, email, phone, number } = req.body;
  db("users")
    .insert({
      name: name,
      email: email,
      phone: phone,
      number: number,
      joined: new Date(),
    })
    .then(console.log);
});

app.get("/", (req, res) => {
  db("users")
    .select()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: "oupsy" });
    });
});

app.listen(3000, () => {
  console.log("apps running on 3000");
});
