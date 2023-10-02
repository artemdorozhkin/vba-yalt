import {
  CancellationToken,
  CompletionContext,
  CompletionItem,
  CompletionItemProvider,
  CompletionList,
  CompletionTriggerKind,
  Position,
  ProviderResult,
  Range,
  TextDocument,
} from "vscode";
import TokenParser from "./TokenParser";
import { BaseToken, LibToken } from "./Tokens";
import { basename, dirname, join } from "path";
import { readFileSync, readdirSync, statSync } from "fs";
import path = require("path");
import { TokenManager } from "./TokenManager";

export function getDef(extPath: string): {
  completions: CompletionItem[];
  tokens: BaseToken[];
} {
  const defCompletions: CompletionItem[] = [];
  const defTokens: BaseToken[] = [];
  const tokenManager: TokenManager = new TokenManager();

  const defPath = join(extPath, "def", "test");
  const defFolders = getSubfolders(defPath);

  defFolders.forEach((defFolder) => {
    const files = getFiles(defFolder);
    const lib = new LibToken(basename(defFolder));

    files.forEach((file: string) => {
      const data = readFileSync(file);
      const treeParser = new TokenParser(data.toString(), file);

      lib.addModule(treeParser.tokens);
    });
    defTokens.push(lib);
  });
  tokenManager.tokensToCompletions(defTokens, defCompletions);
  tokenManager.childrenToCompletionsRecoursive(defTokens, defCompletions);

  return { completions: defCompletions, tokens: defTokens };
}

export default class VBACompletionProvider implements CompletionItemProvider {
  private completions: CompletionItem[] = [];
  private tokens: BaseToken[] = [];
  private readonly tokenManager: TokenManager = new TokenManager();

  constructor(
    private readonly defCompletions: CompletionItem[],
    private readonly defTokens: BaseToken[],
    private readonly keywordsCompletions: CompletionItem[]
  ) {}

  provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
    context: CompletionContext
  ): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {
    const text = document.getText();
    const lib = new LibToken(basename(dirname(document.fileName)));
    const treeParser = new TokenParser(text, document.fileName, position);

    this.tokens = [];
    lib.addModule(treeParser.tokens);
    this.tokens.push(lib);

    if (
      context.triggerKind == CompletionTriggerKind.TriggerCharacter ||
      (context.triggerKind == CompletionTriggerKind.Invoke &&
        this.prevCharIsDot(document, position))
    ) {
      const word = this.getWordAtPosition(document, position, -1);

      if (!word) return;

      const parentToken: BaseToken | null = this.getParentByName(word);

      if (parentToken && (parentToken.returnType || parentToken.isEnum())) {
        let returnedType: BaseToken | null;
        if (parentToken.isEnum()) {
          returnedType = parentToken;
        } else {
          returnedType = this.getParentByName(parentToken.returnType!);
        }

        if (!returnedType) return;

        this.completions = [];

        this.tokenManager.childrenToCompletions(
          [returnedType],
          this.completions
        );

        return this.completions;
      }

      return;
    }

    this.completions = [];
    this.tokenManager.tokensToCompletions(this.tokens, this.completions);

    this.tokenManager.childrenToCompletionsRecoursive(
      this.tokens,
      this.completions,
      position
    );

    this.completions.push(...this.defCompletions);
    this.completions.push(...this.keywordsCompletions);

    return this.completions;
  }
  private getParentByName(word: string) {
    let parentToken: BaseToken | null = this.tokenManager.getTokenByLabel(
      word,
      this.tokens
    );

    if (!parentToken)
      parentToken = this.tokenManager.getTokenByLabel(word, this.defTokens);

    return parentToken;
  }

  prevCharIsDot(document: TextDocument, position: Position): boolean {
    return (
      document.getText(
        new Range(
          position.line,
          position.character - 1,
          position.line,
          position.character
        )
      ) == "."
    );
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
  const subfolders: string[] = readdirSync(folderPath);

  return subfolders
    .map((subfolder) => join(folderPath, subfolder))
    .filter((folderPath) => statSync(folderPath).isDirectory());
}

function getFiles(folderPath: string) {
  const files = readdirSync(folderPath);

  return files
    .map((file) => path.join(folderPath, file))
    .filter((filePath) => statSync(filePath).isFile());
}
