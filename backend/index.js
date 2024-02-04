const express = require("express");
const OpenAI = require("openai");
const app = express();
const cors = require("cors");
const Chats = require("./Schema");
const mongoose = require("mongoose");

app.use(cors())

app.use(express.json());
mongoose.connect(
 process.env.DB_URL
);

app.get("/getChats",async(req,res)=>{
  const chats=await Chats.findOne({})
  res.send(chats)

})

app.post("/getCode", async (req, res) => {
  try {
    const { prompt } = req.body;

    const apiUrl = "https://api.getknit.ai/v1/router/run";

    const authToken = process.env.KNIT_API_KEY
    const requestData = {
      messages: [
        {
          role: "system",
          content:
            "You are an coding ninja that does two work first translates code from one programming language to another , you can recognize the input code and decide the language and user should input the desired coding language and secondly provide code depending upon the user prompt, use markdowns and also provide colors for the keywords, remember not to explain only give the code and ask user to enter missing details like programming language",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: {
        name: "openai/gpt-4-1106-preview",
      },
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": authToken,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    //add to DB
    const allChats = await Chats.findOne({});

    if (allChats) {
      allChats.codeChats.push({
        user: prompt,
        genius: responseData.responseText,
      });
      await allChats.save();
    } else {
      const chat = new Chats({
        codeChats: {
          user: prompt,
          genius: responseData.responseText,
        },
      });
      await chat.save();
    }

    res.json(responseData);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/getImage", async (req, res) => {
  const { prompt } = req.body;
  const apiKey = process.env.OPENAI_API_KEY
  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });
  try {
    const response = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });

    res.json({ url: response.data[0].url });

    const allChats = await Chats.findOne({});

    if (allChats) {
      allChats.imageChats.push({
        user: prompt,
        genius: response.data[0].url,
      });

      await allChats.save();
    } else {
      const chat = new Chats({
        imageChats: {
          user: prompt,
          genius: response.data[0].url,
        },
      });
      await chat.save();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});
app.get("/", (req, res) => {
  res.send("TEST");
});

app.listen(5000, () => {
  console.log("Server started");
});
