import OpenAI from "openai";

// Access the API key from environment variables
const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;

// Create an instance of the OpenAI client
const openai = new OpenAI({
  apiKey: OPENAI_KEY,
  dangerouslyAllowBrowser: true, // Note: Using this flag can be risky; ensure you understand the implications.
});

export default openai;
