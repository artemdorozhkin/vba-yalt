import * as vscode from "vscode";
import TreeParser from "./TreeParser";

export const provider = vscode.languages.registerCompletionItemProvider(
  { scheme: "file", language: "vba" },
  {
    provideCompletionItems(document, position) {
      return provideCompletions(document, position);
    },
  }
);

function provideCompletions(
  document: vscode.TextDocument,
  position: vscode.Position
): vscode.CompletionItem[] {
  const text = document.getText();
  const treeParser: TreeParser = new TreeParser(text, position);
  const completions = treeParser.getCompletions();

  return completions;
}
