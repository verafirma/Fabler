import { FablerInputModifier } from "../core/fabler-input-modifier.js";
import OpenAI from "openai";

// Dummy data table for input lookup
const dataTable: { [key: string]: string } = {
  "look around": "look",
  "look": "look"
};

// Initialize the OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure to set your OpenAI API key in environment variables
});

async function llmLookup(query: string): Promise<string> {
  try {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct", // Specify the model you want to use
      prompt: `Paraphrase this sentence into a one or two-word phrase suitable for an interactive fiction game if it contains the word look, only return the word look: ${query}`, // Updated prompt
      max_tokens: 50, // Adjust the token limit as needed
    });
    if (response.choices && response.choices[0]) {
      return response.choices[0].text.trim();
    } else {
      throw new Error("No response from LLM");
    }
  } catch (error) {
    console.error("Error querying LLM:", error);
    return query; // Fallback to the original input in case of an error
  }
}

export class MichaelModifier implements FablerInputModifier {
  public async modifyInput(userInput: string): Promise<string> {
    // Check input against data table
    if (dataTable[userInput]) {
      return dataTable[userInput];
    }

    // If not found in dataTable, query the LLM
    const llmResponse = await llmLookup(userInput);
    return llmResponse;
  }
}lModifier implements FablerInputModifier {
  public async modifyInput(userInput: string): Promise<string> {
    // Check input against data table
    if (dataTable[userInput]) {
      return dataTable[userInput];
    }

    // If not found in dataTable, query the LLM
    const llmResponse = await llmLookup(userInput);
    return llmResponse;
  }
}
