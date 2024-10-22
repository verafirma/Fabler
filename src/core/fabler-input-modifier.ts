
export interface FablerInputModifier {
  modifyInput(userInput: string): Promise<string>
}