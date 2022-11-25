import express from "express";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import { model } from "../server/models/user.model.js";

app.use(cors());
app.use(express.json());
//database connection
mongoose.connect("mongodb://localhost:27017/productdb", {
  useNewUrlParser: true,
});

mongoose.connection
  .once("open", () => console.log("connected"))
  .on("error", (error) => {
    console.log("Your mongo error", error);
  });
//product add
app.post("/api/insert", async (req, res) => {
  try {
    await model.create({
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      ratings: req.body.ratings,
    });

    res.send(true);
  } catch (error) {
    res.send(false);
  }
});
//find product details based on given id's
app.post("/api/compare", async (req, res) => {
  try {
    let id1 = await req.body.proId1;
    let id2 = await req.body.proId2;
    let result = await model.find({ id: { $in: [id1, id2] } });
    if (result.length == 2) {
      res.status(200).send(result);
    } else if (result.length < 2) {
      res.status(200).send(false);
    }
  } catch (error) {
    res.send(error);
  }
});
//port
app.listen(3000, () => console.log("Example app listening on port 3000!"));
