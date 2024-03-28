const express = require("express");
// const BodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const articleRouter = require("./routes/articles");
const Article = require('./models/article');
const methodOverride = require('method-override');


const uri="mongodb+srv://clnarayanan:Traveller2504@bharatintern.jcqihqw.mongodb.net/?retryWrites=true&w=majority&appName=BharatIntern";
mongoose.connect(uri)


dotenv.config();
const app = express();
app.use(cors());
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.set("views","./views")
app.use(express.urlencoded({extended:false}))

app.get("/", async(req, res) => {
  const articles = await Article.find().sort({createAt:'desc'});
  res.render(`articles/index`, { articles: articles });
});

app.use("/articles", articleRouter);

app.listen(3001);
