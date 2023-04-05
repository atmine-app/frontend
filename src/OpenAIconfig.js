import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function summarizeText(text, res, req) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const description = req.body.description

  try {
    const response = await openai.Completion.create({
      engine: "text-davinci-003",
      prompt: generatePromptSummary(description),
      max_tokens: 100,
      stop: null,
      temperature: 0.7,
    });
    res.status(200).json({ result: response.data.choices[0].text });
    const summary = response.choices[0].text.trim();
    return summary;
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePromptSummary(description) {
  return `You are given this text that is the description of a property, i want you to summarize it in less than 30 words: ${description}
`;
}
