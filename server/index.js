import express from "express";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import { model } from "../server/models/user.model.js";
import { modelC } from "../server/models/user.model.company.js";
import { modelAdd } from "../server/models/user.model.add.js";

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

//company insert
app.post("/api/insert/company", async (req, res) => {
  try {
    await modelC.create({
      name: req.body.name,
      url: req.body.name,
    });

    res.send(true);
  } catch (error) {
    console.log(error);
    res.send(false);
  }
});

//insert add

app.post("/api/insert/adds", async (req, res) => {
  try {
    await modelAdd.create({
      companyId: req.body.companyId,
      primaryText: req.body.primaryText,
      headline: req.body.headline,
      description: req.body.description,
      CTA: req.body.CTA,
      imageUrl: req.body.imageUrl,
    });

    res.send(true);
  } catch (error) {
    console.log(error);
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

//find searching add

app.post("/api/search", async (req, res) => {
  let keyword = req.body.keyword;
  console.log("from server", keyword);

  try {
    let result = await modelAdd.aggregate([
      {
        $lookup: {
          from: "companies",
          localField: "companyId",
          foreignField: "_id",
          as: "company",
        },
      },
      {
        $unwind: "$company",
      },

      {
        $match: {
          $or: [
            {
              primaryText: new RegExp(keyword, "i"),
            },
            {
              description: new RegExp(keyword, "i"),
            },
            {
              headline: new RegExp(keyword, "i"),
            },
            {
              "company.name": new RegExp(keyword, "i"),
            },
          ],
        },
      },
      {
        $group: {
          _id: {
            _id: "$_id",
            primaryText: "$primaryText",
            headline: "$headline",
            description: "$description",
            CTA: "$CTA",
            imageUrl: "$imageUrl",
          },
          company: {
            $push: "$company.name",
          },
        },
      },
      {
        $project: {
          _id: "$_id._id",
          primaryText: "$_id.primaryText",
          headline: "$_id.headline",
          description: "$_id.description",
          CTA: "$_id.CTA",
          imageUrl: "$_id.imageUrl",
          company: 1,
        },
      },
    ]);
    console.log("server", result);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

//port
app.listen(3000, () => console.log("Example app listening on port 3000!"));
