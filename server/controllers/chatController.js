import dotenv from "dotenv";
dotenv.config();


import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const handleChat = async (req, res) => {
  const { message } = req.body;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
  You are MentHer’s helpful assistant. Only answer questions about MentHer.
  Ignore anything unrelated.
  Context: MentHer is a mentorship platform for women, with booking, chat, community, and resources.

  Question: ${message}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Sorry, something went wrong." });
  }
};
