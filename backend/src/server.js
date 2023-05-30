import express from "express";
import { db, connectToDb } from "./db.js";
const app = express();
app.use(express.json());
app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;
  const article = await db.collection("articles").findOne({ name });
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: "Article not found" });
  }
});

app.put("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;

  await db.collection("articles").updateOne({ name }, { $inc: { upvotes: 1 } });
  const article = await db.collection("articles").findOne({ name });

  if (article) {
    res.json(article);
  } else {
    res.send(`The article ${name} does not exist`);
  }
});

app.put("/api/articles/:name/downvote", async (req, res) => {
  const { name } = req.params;

  await db
    .collection("articles")
    .updateOne({ name }, { $inc: { downvotes: 1 } });
  const article = await db.collection("articles").findOne({ name });

  if (article) {
    res.send(
      `The article ${name} has been downvoted for ${article.downvotes} times!!!`
    );
  } else {
    res.send(`The article ${name} does not exist`);
  }
});

app.post("/api/articles/:name/comments", async (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;

  await db.collection("articles").updateOne(
    { name },
    {
      $push: { comments: { postedBy, text } },
    }
  );
  const article = await db.collection("articles").findOne({ name });

  if (article) {
    res.send(article.comments);
  } else {
    res.send("The article does not exist");
  }
});

connectToDb(() => {
  console.log("Connected to database!");

  app.listen(8000, () => console.log("Listening on port 8000"));
});
