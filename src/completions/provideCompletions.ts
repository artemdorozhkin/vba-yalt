import {
  CancellationToken,
  CompletionContext,
  CompletionItem,
  CompletionItemKind,
  CompletionItemProvider,
  CompletionList,
  ExtensionContext,
  Position,
  ProviderResult,
  TextDocument,
  languages,
} from "vscode";
import TreeParser from "./TreeParser";
import * as fs from "fs";
import path = require("path");

export function getDefCompletions(extPath: string): CompletionItem[] {
  const defCompletions: CompletionItem[] = [];

  const defPath = path.join(extPath, "def");
  const defFolders = getSubfolders(defPath);
  defFolders.forEach((defFolder) => {
    console.log(path.dirname(defFolder));
    defCompletions.push(getModuleNameCompletion(path.dirname(defFolder), ""));
    const files = getFiles(defFolder);

    files.forEach((file) => {
      const ext = path.extname(file);
      defCompletions.push(
        getModuleNameCompletion(ext, path.basename(file, ext))
      );
      const data = fs.readFileSync(file);
      const treeParser = new TreeParser(data.toString());
      const fileCompletions = treeParser.getCompletions();
      defCompletions.push(...fileCompletions);
    });
  });

  return defCompletions;
}

function getModuleNameCompletion(ext: string, name: string): CompletionItem {
  switch (ext) {
    case ".cls":
      return new CompletionItem(name, CompletionItemKind.Class);

    default:
      return new CompletionItem(name, CompletionItemKind.Module);
  }
}

export default class VBACompletionProvider implements CompletionItemProvider {
  constructor(private readonly defCompletions: CompletionItem[]) {}

  provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
    context: CompletionContext
  ): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {
    const text = document.getText();
    let treeParser = new TreeParser(text, position);
    const completions = treeParser.getCompletions();
    completions.push(...this.defCompletions);

    return completions;
  }

  resolveCompletionItem(
    item: CompletionItem,
    token: CancellationToken
  ): ProviderResult<CompletionItem> {
    console.log(item);
    return;
  }
}

function getSubfolders(folderPath: string) {
  const subfolders: string[] = fs.readdirSync(folderPath);

  return subfolders
    .map((subfolder) => path.join(folderPath, subfolder))
    .filter((folderPath) => fs.statSync(folderPath).isDirectory());
}

function getFiles(folderPath: string) {
  const files = fs.readdirSync(folderPath);

  return files
    .map((file) => path.join(folderPath, file))
    .filter((filePath) => fs.statSync(filePath).isFile());
}
