import express from "express";
let articleInfo = [
  {
    name: "learn-react",
    upvotes: 0,
    comments: [],
  },
  {
    name: "learn-node",
    upvotes: 0,
    comments: [],
  },
  {
    name: "mongodb",
    upvotes: 0,
    comments: [],
  },
];

const app = express();
app.use(express.json());

app.put("/api/articles/:name/upvote", (req, res) => {
  const { name } = req.params;
  const article = articleInfo.find((article) => article.name === name);
  if (article) {
    article.upvotes += 1;
    res.send(
      `The article ${name} has been upvoted for ${article.upvotes} times!!!`
    );
  } else {
    res.send(`The article ${name} does not exist`);
  }
});

app.post("/api/articles/:name/comments", (req, res) => {
  const { name } = req.params;
  const { userName, text } = req.body;
  const article = articleInfo.find((article) => article.name === name);
  if (article) {
    article.comments.push({ userName, text });
    res.send(
      `The comment has been added to the article ${name}  ${userName}: ${text}`
    );
  } else {
    res.send("The article does not exist");
  }
});

app.listen(8000, () => console.log("Listening on port 8000"));
