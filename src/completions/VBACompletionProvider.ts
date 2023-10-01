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
import Token from "./Token";

export function getDefCompletions(extPath: string): {
  completions: CompletionItem[];
  tokens: Token[];
} {
  //TODO: добавить вложенность для модулей и классов
  const defCompletions: CompletionItem[] = [];
  const defTokens: Token[] = [];

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
      defTokens.push(...treeParser.parsedTokens);
    });
  });

  return { completions: defCompletions, tokens: defTokens };
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
  private completions: CompletionItem[] = [];
  private tokens: Token[] = [];

  constructor(
    private readonly defCompletions: CompletionItem[],
    private readonly defTokens: Token[]
  ) {}

  provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
    context: CompletionContext
  ): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {
    const text = document.getText();
    const treeParser = new TreeParser(text, position);

    this.tokens = [];
    this.completions = [];

    this.tokens.push(...treeParser.parsedTokens);
    if (context.triggerCharacter == ".") {
      const word = this.getWordAtPosition(document, position, -1);
      if (!word) return;

      let parentToken: Token | undefined;
      for (const token of this.tokens) {
        if (word.toLowerCase() == token.label.toLowerCase()) {
          parentToken = token;
          break;
        }
      }

      if (!parentToken) {
        for (const token of this.defTokens) {
          if (word.toLowerCase() == token.label.toLowerCase()) {
            parentToken = token;
            break;
          }
        }
      }

      console.log(this.defTokens);

      if (parentToken) {
        this.completions.push(
          ...treeParser.tokensToCompletions([parentToken], position)
        );
        console.log(this.completions);

        return this.completions;
      }
    }

    this.completions.push(...treeParser.getCompletions());
    this.completions.push(...this.defCompletions);

    return this.completions;
  }

  resolveCompletionItem(
    item: CompletionItem,
    token: CancellationToken
  ): ProviderResult<CompletionItem> {
    console.log(`documentation for ${item.label} for example`);
    return;
  }

  getWordAtPosition(
    document: TextDocument,
    position: Position,
    offset: number = 0
  ): string | null {
    const totalPosition = new Position(
      position.line,
      position.character + offset
    );
    const wordRange = document.getWordRangeAtPosition(totalPosition);
    if (wordRange) {
      const word = document.getText(wordRange);
      return word;
    }
    return null;
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
