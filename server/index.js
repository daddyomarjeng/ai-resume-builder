const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const multer = require("multer");
const path = require("path");
const arrayToString = require("./helpers/ArrayToString");
const GPTFunction = require("./helpers/GPTFunction");

const app = express();
const PORT = 4000;

app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

let database = [];
app.post("/resume/create", upload.single("headshotImage"), async (req, res) => {
  const {
    fullName,
    currentPosition,
    currentLength,
    currentTechnologies,
    workHistory, //JSON format
  } = req.body;

  const workArray = JSON.parse(workHistory); //an array

  //👇🏻 group the values into an object
  const newEntry = {
    // id: generateID(),
    id: 3,
    fullName,
    image_url: `http://localhost:4000/uploads/${req.file.filename}`,
    currentPosition,
    currentLength,
    currentTechnologies,
    workHistory: workArray,
  };

  const workHistoryString = arrayToString(workArray);

  // The job description prompt
  const prompt1 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}. Can you write a 100 words description for the top of the resume(first person writing)?`;
  // The job responsibilities prompt
  const prompt2 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}. Can you write 10 points for a resume on what I am good at?`;
  // The job achievements prompt
  const prompt3 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n During my years I worked at ${workHistoryString.length} companies. ${workHistoryString} \n Can you write me 50 words for each company seperated in numbers of my succession in the company (in first person)?`;

  // generate a GPT-3 result
  const description = await GPTFunction(prompt1);
  const keypoints = await GPTFunction(prompt2);
  const jobResponsibilities = await GPTFunction(prompt3);
  // put them into an object
  const chatgptData = { description, keypoints, jobResponsibilities };
  //log the result
  //   console.log(chatgptData);

  const data = { ...newEntry, ...chatgptData };
  database.push(data);

  res.json({
    message: "Request successful!",
    data: data,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
