import { FablerInputModifier } from "../core/fabler-input-modifier";

// Dummy data table for input lookup
const dataTable: { [key: string]: string } = {
  "look around": "look",
  "scooby": "look"
};

// Mock function to simulate LLM lookup (replace with actual LLM API call)
async function llmLookup(query: string): Promise<string> {
  // Replace with actual LLM API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`LLM response for: ${query}`);
    }, 1000);
  });
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
}
