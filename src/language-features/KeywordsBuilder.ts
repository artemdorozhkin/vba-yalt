import { SymbolKind, CompletionItemKind } from "vscode";
import { BaseToken } from "../tokens/Tokens";
import { readFileSync } from "fs";

export type Keyword = {
  context: string[];
  description: string;
};

export class KeywordToken extends BaseToken {
  private _keyword?: Keyword;

  public get symbol(): SymbolKind {
    return SymbolKind.TypeParameter;
  }
  public get completion(): CompletionItemKind {
    return CompletionItemKind.Keyword;
  }

  public get keyword(): Keyword | null {
    return this._keyword || null;
  }

  public setKeyword(value: Keyword) {
    this._keyword = value;

    this._keyword.context = this._keyword.context.map((ctx) => {
      return ctx.toLowerCase();
    });
  }
}

export class KeywordsBuilder {
  private readonly _keywords: KeywordToken[] = [];
  constructor(keywordsPath: string) {
    const data = readFileSync(keywordsPath);
    const json = JSON.parse(data.toString());

    for (const label in json) {
      const keyword = new KeywordToken(label);
      keyword.setKeyword(json[label]);
      this._keywords.push(keyword);
    }
  }

  public get keywords(): KeywordToken[] {
    return this._keywords;
  }
}
