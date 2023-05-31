import express from "express";
import multer from "multer";
import { db, connectToDb } from "./db.js";
const app = express();
const upload = multer({ dest: "uploads/" });
app.use(express.json());

// create a function to get all articles
app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;
  const article = await db.collection("articles").findOne({ name });
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: "Article not found" });
  }
});

// create upvote function
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

// create downvote function
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

// add comment function
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

// upload resume function
app.post("/api/upload-resume", upload.single("resume"), (req, res) => {
  const uploadedFile = req.file;

  res.send(req.file);

  // const uploadedFile = req.file;
});

connectToDb(() => {
  console.log("Connected to database!");

  app.listen(8000, () => console.log("Listening on port 8000"));
});
