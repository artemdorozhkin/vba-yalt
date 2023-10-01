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

export default class VBACompletionProvider implements CompletionItemProvider {
  constructor(private readonly extPath: string) {}

  provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
    context: CompletionContext
  ): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {
    const text = document.getText();
    let treeParser = new TreeParser(text, position);
    const completions = treeParser.getCompletions();

    const defPath = path.join(this.extPath, "def");
    const defFolders = getSubfolders(defPath);
    defFolders.forEach((defFolder) => {
      console.log(path.dirname(defFolder));
      completions.push(
        this.getModuleNameCompletion(path.dirname(defFolder), "")
      );
      const files = getFiles(defFolder);

      files.forEach((file) => {
        const ext = path.extname(file);
        completions.push(
          this.getModuleNameCompletion(ext, path.basename(file, ext))
        );
        const data = fs.readFileSync(file);
        treeParser = new TreeParser(data.toString(), position);
        const fileCompletions = treeParser.getCompletions();
        completions.push(...fileCompletions);
      });
    });

    return completions;
  }
  getModuleNameCompletion(ext: string, name: string): CompletionItem {
    switch (ext) {
      case ".cls":
        return new CompletionItem(name, CompletionItemKind.Class);

      default:
        return new CompletionItem(name, CompletionItemKind.Module);
    }
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
