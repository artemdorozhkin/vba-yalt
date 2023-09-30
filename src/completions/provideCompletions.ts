import * as vscode from "vscode";
import TreeParser from "./TreeParser";
import * as fs from "fs";

export const provider = vscode.languages.registerCompletionItemProvider(
  { scheme: "file", language: "vba" },
  {
    provideCompletionItems(document, position) {
      return provideCompletions(document, position);
    },
  }
);

async function provideCompletions(
  document: vscode.TextDocument,
  position: vscode.Position
): Promise<vscode.CompletionItem[]> {
  const text = document.getText();
  let treeParser: TreeParser = new TreeParser(text, position);
  const completions = treeParser.getCompletions();

  const data = fs.readFileSync(
    "C:\\Users\\aador\\development\\typescript\\vba\\def\\vba\\strings.bas"
  );

  treeParser = new TreeParser(data.toString(), position);
  const excelCompletions = treeParser.getCompletions();
  completions.push(...excelCompletions);
  return completions;
}
