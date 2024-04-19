require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
app.use(cors(), express.json());

app.post("/", async (req, res) => {
  try {
    const { dish } = req.body;
    const prompt = `write the recipe for ${dish}.
**Ingredients:**
Provide the ingredients for ${dish}.

**Instructions:**
Then, provide the instructions to cook ${dish}.

**Extra Add-Ons:**
Finally, list any extra add-ons for ${dish}.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const lines = text.split("\n");

    console.log("Generated Text:", text);

    let data = {};
    let currentSection = "";

    lines.forEach((line) => {
      if (line.startsWith("**")) {
        currentSection = line.substring(2, line.length - 2).trim();
        data[currentSection] = [];
      } else if (line.startsWith("*")) {
        data[currentSection].push(line.substring(2).trim());
      } else if (currentSection === "Instructions:") {
        data[currentSection].push(line.trim());
      }
    });

    console.log("Data:", data);
    res.send({
      msg: "Here is the data",
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: "Error occurred",
      err,
    });
  }
});


app.post("/dish", async (req, res) => {
  try {
    const { dish } = req.body;
    const prompt = `generate an image of ${dish} dish `;

    async function searchImage(query) {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/customsearch/v1",
          {
            params: {
              key: process.env.API_KEY1,
              cx: process.env.CUSTOM_SEARCH_ENGINE_ID,
              q: query,
              searchType: "image",
            },
          }
        ); 

        if (response.data.items && response.data.items.length > 0) {
          const imageUrl = response.data.items[0].link;
          return imageUrl;
        } else {
          return null;
        }
      } catch (error) {
        console.error("Error fetching image:", error);
        return null;
      }
    }

    const imageUrl = await searchImage(dish);

    res.send({
      msg: "Here is the data",
      imageUrl,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: "Error occurred",
      err,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
