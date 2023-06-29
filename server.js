const express = require('express');
const cors=require("cors");
const { Configuration, OpenAIApi } = require('openai');
require("dotenv").config();

const app = express();
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Backend!!");
});

app.post("/convert", async (req, res) => {
    const { code, language } = req.body;
    const messages = [
      { role: "system", content: "You are a code editor."},
      { role: "user", content: `Convert this code to ${language}: ${code}`}
    ];
  
    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages
      });
      const convertedCode = response.data.choices[0].message.content;
      res.send({ converted: convertedCode });
    } catch (error) {
      console.log(error);
      res.send({ msg: error.message });
    }
  });
  

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
