import { FablerInputModifier } from "../core/fabler-input-modifier";

// Dummy data table for input lookup
const dataTable: { [key: string]: string } = {
  "look around": "look",
  "scooby": "look"
};

export class MichaelModifier implements FablerInputModifier {
  public async modifyInput(userInput: string): Promise<string> {
	  // Check input against data table
    if (dataTable[userInput]) {
      return dataTable[userInput];
    }

    // Return the original input if no match is found
    return userInput;
 //   let rval: string = userInput + 'x';
 //   return rval;
  }

}
