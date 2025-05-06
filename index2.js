const express = require("express");
const { TodoModel, UserModel } = require("./db2");
const mongoose = require("mongoose");
const { auth, JWT_SECRET } = require("./auth");
const jwt = require("jsonwebtoken");

mongoose.connect(
  "mongodb+srv://sashbob0704:sairam%40123$@cluster0.6vq71.mongodb.net/todo-app"
);

const app = express();
app.use(express.json());

const PORT = 3000;

app.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const age = req.body.age;

  await UserModel.create({
    name: name,
    age: age,
    email: email,
    password: password,
  });

  res.json({
    message: "You're Signed Up",
  });
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const response = await UserModel.findOne({
    email: email,
    password: password,
  });
  if (response) {
    const token = jwt.sign(
      {
        id: response._id.toString(),
      },
      JWT_SECRET
    );

    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect creds",
    });
  }
});

app.post("/todos", auth, async (req, res) => {
  const userId = req.userId;
  const description = req.body.description;
  const done = req.body.done;
  await TodoModel.create({
    userId,
    description,
    done,
  });

  res.json({
    message: "Todo created",
  });
});

app.get("/todos", auth, async (req, res) => {
  const userId = req.userId;

  const todos = await TodoModel.find({
    userId,
  });

  res.json({ todos });
});

app.listen(PORT, (req, res) => {
  console.log(`The app is running on port: ${PORT}`);
});
