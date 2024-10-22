import { FablerInputModifier } from "../core/fabler-input-modifier";

export class MichaelModifier implements FablerInputModifier {
  public async modifyInput(userInput: string): Promise<string> {
    let rval: string = userInput + 'x';
    return rval;
  }

}