import express from "express";
import fs from "fs";
import path from "path";

const expres = express();
expres.use(express.json());

expres.get("/users", (req, res) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "src", "model", "users.json"))
  );
  return res.send(data);
});

expres.post("/users", (req, res) => {
  const { name, age } = req.body;
  const { id } = req.params;

  return res.send("post");
});

expres.put("/users/:id", (req, res) => {
  const { name, age } = req.body;
  const { id } = req.params;
  const data = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "src", "model", "users.json"))
  );
const newData = data.find((e)=>e.id == id);
 newData.name = name ||newData.name;
 newData.age = age  ||newData.age
  fs.writeFileSync(
    path.join(process.cwd(), "src", "model", "users.json"),
    JSON.stringify(data)
  );
    return res.send("put");
});

expres.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "src", "model", "users.json"))
  );
  const newData = data.filter((e) => e.id != id);
  fs.writeFileSync(
    path.join(process.cwd(), "src", "model", "users.json"),
    JSON.stringify(newData)
  );
  return res.send("delete");
});

expres.listen(2000, console.log("2000 cerate sever"));
