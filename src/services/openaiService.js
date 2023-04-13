// services/openaiService.js
import axios from "axios";

const openAIService = {
  async summarize(description) {
    const prompt = `You are given this text that is the description of a property, i want you to summarize it in less than 15 words: ${description}
`;
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY ; // Do NOT expose your API key on the client-side

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          prompt: prompt,
          max_tokens: 35,
          stop: null,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
          },
        }
      );
        console.log('response.data.choices[0].text.trim()', response.data.choices[0].text.trim())
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error("OpenAI API Error:", error.message);

      if (error.response) {
        console.error("OpenAI API Response:", error.response.status, error.response.data);
      } else {
        console.error("An error occurred during your request.");
      }

      throw error;
    }
  },
};

export default openAIService;
