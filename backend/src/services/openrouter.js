const OpenAI = require("openai");

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function chat(message) {
  const response = await client.chat.completions.create({
    model: "deepseek/deepseek-chat-v3.1",
    messages: [
      {
        role: "user",
        content: message
      }
    ]
  });

  return response.choices[0].message.content;
}

module.exports = { chat };
