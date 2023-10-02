import {
  CancellationToken,
  CompletionContext,
  CompletionItem,
  CompletionItemKind,
  CompletionItemProvider,
  CompletionList,
  CompletionTriggerKind,
  ExtensionContext,
  Position,
  ProviderResult,
  Range,
  SymbolKind,
  TextDocument,
  languages,
} from "vscode";
import TreeParser from "./TreeParser";
import * as fs from "fs";
import path = require("path");
import Token from "./Token";

export function getDef(extPath: string): {
  completions: CompletionItem[];
  tokens: Token[];
} {
  //TODO: добавить вложенность для модулей и классов
  let defCompletions: CompletionItem[] = [];
  const defTokens: Token[] = [];

  const defPath = path.join(extPath, "def", "test");
  const defFolders = getSubfolders(defPath);

  defFolders.forEach((defFolder) => {
    const defLib = getModuleNameToken("", path.basename(defFolder));

    const files = getFiles(defFolder);

    files.forEach((file) => {
      const ext = path.extname(file);
      const defModule = getModuleNameToken(ext, path.basename(file, ext));

      const data = fs.readFileSync(file);
      const treeParser = new TreeParser(data.toString());

      defModule.childrens.push(...treeParser.parsedTokens);

      defLib.childrens.push(defModule);
      defTokens.push(defLib);

      if (defCompletions.length > 0) defCompletions = [];
      defCompletions.push(...treeParser.tokensToCompletions(defTokens));
    });
  });

  return { completions: defCompletions, tokens: defTokens };
}

function getModuleNameToken(ext: string, name: string = ""): Token {
  switch (ext) {
    case ".cls":
      return new Token(
        name,
        SymbolKind.Class,
        CompletionItemKind.Class,
        new Range(0, 0, 0, 0)
      );

    default:
      return new Token(
        name,
        SymbolKind.Module,
        CompletionItemKind.Module,
        new Range(0, 0, 0, 0)
      );
  }
}

export default class VBACompletionProvider implements CompletionItemProvider {
  private completions: CompletionItem[] = [];
  private tokens: Token[] = [];

  constructor(
    private readonly defCompletions: CompletionItem[],
    private readonly defTokens: Token[],
    private readonly keyCompletions: CompletionItem[]
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

    this.tokens.push(...treeParser.parsedTokens);

    if (context.triggerKind == CompletionTriggerKind.TriggerCharacter) {
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

      if (parentToken) {
        this.completions = [];
        this.completions.push(
          ...treeParser.childrenTokensToCompletions(parentToken)
        );

        return this.completions;
      }
      console.log("here");

      return;
    }

    this.completions = [];
    this.completions.push(...treeParser.getCompletions());
    this.completions.push(...this.defCompletions);
    this.completions.push(...this.keyCompletions);

    return this.completions;
  }

  resolveCompletionItem(
    item: CompletionItem,
    token: CancellationToken
  ): ProviderResult<CompletionItem> {
    // console.log(`documentation for ${item.label} for example`);
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
