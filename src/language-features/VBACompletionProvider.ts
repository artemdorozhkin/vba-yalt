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
import { basename, dirname, join } from "path";
import { readFileSync, readdirSync, statSync } from "fs";
import path = require("path");
import { TokenManager } from "../tokens/TokenManager";
import TokenParser from "../tokens/TokenParser";
import { BaseToken, LibToken } from "../tokens/Tokens";
import { KeywordsBuilder } from "./KeywordsBuilder";
import { TokenContext, TokenContextKind } from "../tokens/TokenContext";

export function getDef(extPath: string): {
  completions: CompletionItem[];
  tokens: BaseToken[];
} {
  const defCompletions: CompletionItem[] = [];
  const defTokens: BaseToken[] = [];
  const tokenManager: TokenManager = new TokenManager();

  const defPath = join(extPath, "def");
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

export function getKeywords(extPath: string) {
  const builder = new KeywordsBuilder(
    path.join(extPath, "def", "keywords.json")
  );

  const tokens = builder.keywords;

  const tokenManager: TokenManager = new TokenManager();
  const completions: CompletionItem[] = [];
  tokenManager.tokensToCompletions(tokens, completions);

  return { tokens, completions };
}

export default class VBACompletionProvider implements CompletionItemProvider {
  private completions: CompletionItem[] = [];
  private tokens: BaseToken[] = [];
  private readonly tokenManager: TokenManager = new TokenManager();

  constructor(
    private readonly def: {
      completions: CompletionItem[];
      tokens: BaseToken[];
    },
    private readonly keywords: {
      tokens: BaseToken[];
      completions: CompletionItem[];
    }
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
    this.completions = [];
    lib.addModule(treeParser.tokens);
    this.tokens.push(lib);

    const tokenContext = new TokenContext(document, position).getContext();
    switch (tokenContext) {
      case TokenContextKind.ClauseTypeContext:
        this.completions = this.getClauseTypeCompletions();
        break;

      case TokenContextKind.ObjectTypeContext:
        this.completions = this.getObjectTypeCompletions();
        break;

      case TokenContextKind.ChildrensContext:
        const word = this.getWordAtPosition(document, position, -1);
        if (!word) return;
        this.completions = this.getChildrensCompletions(word);
        break;

      default:
        this.completions = this.getNonContextCompletions(position);
    }
    return this.completions;
  }

  getNonContextCompletions(position: Position): CompletionItem[] {
    this.tokenManager.tokensToCompletions(this.tokens, this.completions);

    this.tokenManager.childrenToCompletionsRecoursive(
      this.tokens,
      this.completions,
      position
    );

    this.completions.push(
      ...this.def.completions,
      ...this.keywords.completions
    );

    return this.completions;
  }

  private getClauseTypeCompletions(): CompletionItem[] {
    this.tokens.push(...this.def.tokens, ...this.keywords.tokens);

    this.tokenManager.setClauseTypeContextTokens(this.tokens, this.completions);
    return this.completions;
  }

  getObjectTypeCompletions(): CompletionItem[] {
    this.tokens.push(...this.def.tokens);

    this.tokenManager.setObjectTypeContextTokens(this.tokens, this.completions);
    return this.completions;
  }

  private getChildrensCompletions(parent: string): CompletionItem[] {
    let parentToken: BaseToken | null = this.getParentByName(parent);
    if (parentToken && parentToken.returnType)
      parentToken = this.getParentByName(parentToken.returnType!);

    if (parentToken) {
      this.tokenManager.childrenToCompletions([parentToken], this.completions, {
        forcePredeclared: true,
      });
    }
    return this.completions;
  }

  private getParentByName(word: string) {
    let parentToken: BaseToken | null = this.tokenManager.getTokenByLabel(
      word,
      this.tokens
    );

    if (!parentToken)
      parentToken = this.tokenManager.getTokenByLabel(word, this.def.tokens);

    return parentToken;
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
